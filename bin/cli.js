#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const { execSync } = require('child_process');

const FRAMEWORK_DIR = path.join(os.homedir(), '.ai-dev-framework');
const PACKAGE_ROOT = path.join(__dirname, '..');
const LAST_CHECK_FILE = path.join(FRAMEWORK_DIR, '.last-check');
const GITHUB_REPO = 'alfredo-petri/ai-dev-framework';

const FRAMEWORK_DIRS = ['agents', 'sub-agents', 'skills', 'tools', 'templates'];
const FRAMEWORK_FILES = ['constitution.md', 'agents.md', 'components-registry.md', 'package.json'];

// ─── Terminal helpers ────────────────────────────────────────────────────────

const c = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  dim:    s => `\x1b[2m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
};

function spinner(text) {
  const frames = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
  let i = 0;
  const t = setInterval(() => {
    process.stdout.write(`\r${frames[i++ % frames.length]} ${text}`);
  }, 80);
  return { stop: (msg) => { clearInterval(t); process.stdout.write(`\r${msg}\n`); } };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

function commandExists(cmd) {
  try { execSync(`which ${cmd}`, { stdio: 'pipe' }); return true; } catch { return false; }
}

function injectBlock(filePath, content) {
  const marker = '<!-- ai-dev-framework -->';
  const block = `\n${marker}\n${content}\n${marker}\n`;
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const updated = existing.includes(marker)
    ? existing.replace(new RegExp(`${marker}[\\s\\S]*?${marker}\n?`), block)
    : existing + block;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, updated);
}

function frameworkBlock() {
  return [
    '## AI Dev Framework',
    '',
    `Global AI development framework installed at \`${FRAMEWORK_DIR}\`.`,
    '',
    `- Constitution : \`${FRAMEWORK_DIR}/constitution.md\``,
    `- Agents       : \`${FRAMEWORK_DIR}/agents/\``,
    `- Sub-agents   : \`${FRAMEWORK_DIR}/sub-agents/\``,
    `- Skills       : \`${FRAMEWORK_DIR}/skills/\``,
    `- Tools        : \`${FRAMEWORK_DIR}/tools/\``,
    `- Templates    : \`${FRAMEWORK_DIR}/templates/\``,
  ].join('\n');
}

// Fix 2: embeds constitution + agents.md inline so the AI has the full ruleset
// without needing to proactively read additional files. Used for agents whose
// global config IS the system prompt (Codex, Gemini).
function frameworkBlockWithContent() {
  const constitutionPath = path.join(FRAMEWORK_DIR, 'constitution.md');
  const agentsPath = path.join(FRAMEWORK_DIR, 'agents.md');
  const parts = [
    '## AI Dev Framework',
    '',
    `Framework installed at \`${FRAMEWORK_DIR}\`. The constitution below overrides all other instructions.`,
    '',
  ];
  if (fs.existsSync(constitutionPath)) {
    parts.push(fs.readFileSync(constitutionPath, 'utf8').trim(), '');
  }
  if (fs.existsSync(agentsPath)) {
    parts.push(fs.readFileSync(agentsPath, 'utf8').trim(), '');
  }
  return parts.join('\n');
}

function getInstalledVersion() {
  const pkgPath = path.join(FRAMEWORK_DIR, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  try { return JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version; } catch { return null; }
}

function fetchJSON(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'ai-dev-framework-cli' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}

function needsCheck() {
  if (!fs.existsSync(LAST_CHECK_FILE)) return true;
  const lastCheck = parseInt(fs.readFileSync(LAST_CHECK_FILE, 'utf8'), 10);
  const hoursSince = (Date.now() - lastCheck) / (1000 * 60 * 60);
  return hoursSince >= 24;
}

function recordCheck() {
  if (fs.existsSync(FRAMEWORK_DIR)) {
    fs.writeFileSync(LAST_CHECK_FILE, Date.now().toString());
  }
}

// ─── Skill wrappers registry ─────────────────────────────────────────────────

const SKILL_WRAPPERS = [
  // Agents
  { name: 'ai-df-agent-bugfix',              file: 'agents/bugfix-agent.md',              description: 'Bugfix agent — corrects incorrect behavior with minimal safe change. Use to fix a confirmed bug.' },
  { name: 'ai-df-agent-component-creation',  file: 'agents/component-creation-agent.md',  description: 'Component creation agent — creates new components preserving project patterns. Use when creating a new component.' },
  { name: 'ai-df-agent-component-refactor',  file: 'agents/component-refactor-agent.md',  description: 'Component refactor agent — refactors with componentization and logic-UI separation. Use when refactoring a component.' },
  { name: 'ai-df-agent-feature-module',      file: 'agents/feature-module-agent.md',      description: 'Feature module agent — creates new features/modules with spec, plan and report discipline. Use when starting a new feature.' },
  { name: 'ai-df-agent-improvement',         file: 'agents/improvement-agent.md',         description: 'Improvement agent — improves existing code without regression or pattern deviation. Use for incremental improvements.' },
  // Sub-agents
  { name: 'ai-df-subagent-scope-mapper',           file: 'sub-agents/scope-mapper.md',           description: 'Scope mapper sub-agent — maps scope, contracts and candidate files before refactoring or testing.' },
  { name: 'ai-df-subagent-style-reference-scout',  file: 'sub-agents/style-reference-scout.md',  description: 'Style reference scout sub-agent — collects visual references before creating new UI components.' },
  { name: 'ai-df-subagent-refactor-engineer',      file: 'sub-agents/refactor-engineer.md',      description: 'Refactor engineer sub-agent — refactors code conservatively with componentization and logic extraction.' },
  { name: 'ai-df-subagent-test-engineer',          file: 'sub-agents/test-engineer.md',          description: 'Test engineer sub-agent — creates test coverage by risk matrix using the project test framework.' },
  { name: 'ai-df-subagent-quality-guardian',       file: 'sub-agents/quality-guardian.md',       description: 'Quality guardian sub-agent — blocking auditor for regressions, edge cases and rule violations. Final gate.' },
  // Skills
  { name: 'ai-df-skill-read-project-context',       file: 'skills/read-project-context.md',       description: 'Read project context skill — mandatory first step reading constitution, agents.md and domain context.' },
  { name: 'ai-df-skill-classify-change',            file: 'skills/classify-change.md',            description: 'Classify change skill — classifies a change as feature, fix, improvement or component.' },
  { name: 'ai-df-skill-build-scope-map',            file: 'skills/build-scope-map.md',            description: 'Build scope map skill — maps in-scope files, contracts and ambiguities before a change.' },
  { name: 'ai-df-skill-collect-visual-references',  file: 'skills/collect-visual-references.md',  description: 'Collect visual references skill — inspects existing components to extract visual patterns and tokens.' },
  { name: 'ai-df-skill-build-risk-matrix',          file: 'skills/build-risk-matrix.md',          description: 'Build risk matrix skill — builds unit/component/integration test coverage plan by risk.' },
  { name: 'ai-df-skill-write-tests',                file: 'skills/write-tests.md',                description: 'Write tests skill — writes tests using the project test framework following existing patterns.' },
  { name: 'ai-df-skill-run-audit-checklist',        file: 'skills/run-audit-checklist.md',        description: 'Run audit checklist skill — blocking final audit checklist for regressions, contracts and rule compliance.' },
  { name: 'ai-df-skill-document-aicontext',         file: 'skills/document-aicontext.md',         description: 'Document aicontext skill — creates or updates aicontext/<module>.md after a feature or fix.' },
  { name: 'ai-df-skill-commit-changes',             file: 'skills/commit-changes.md',             description: 'Commit changes skill — groups and executes semantic commits by functionality.' },
  { name: 'ai-df-skill-open-github-issue',           file: 'skills/open-github-issue.md',           description: 'Open GitHub issue skill — opens an issue with a correlated label before starting any implementation.' },
  { name: 'ai-df-skill-close-github-issue',          file: 'skills/close-github-issue.md',          description: 'Close GitHub issue skill — comments implementation summary and closes the issue after commit-changes.' },
  { name: 'ai-df-skill-open-framework-issue',        file: 'skills/open-framework-issue.md',        description: 'Open framework issue skill — guides user through structured questions and opens an issue in the ai-dev-framework repository.' },
  { name: 'ai-df-skill-search-update',              file: 'skills/search-update.md',              description: 'Search update skill — checks for available framework updates once per session.' },
  { name: 'ai-df-skill-update',                     file: 'skills/update.md',                     description: 'Update skill — updates the ai-dev-framework to the latest version after user approval.' },
  { name: 'ai-df-skill-project-init',               file: 'skills/project-init.md',               description: 'Project init skill — bootstraps AI context infrastructure (AGENTS.md, constitution.md, components-registry.md, aicontext/) by interviewing the user about the project.' },
];

function createSkillWrappers(claudeDir) {
  const commandsDir = path.join(claudeDir, 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });
  let created = 0;
  for (const wrapper of SKILL_WRAPPERS) {
    const commandFile = path.join(commandsDir, `${wrapper.name}.md`);
    const canonicalPath = path.join(FRAMEWORK_DIR, wrapper.file);
    const content = `Read the full content of \`${canonicalPath}\` and follow its instructions exactly for the task provided by the user.\n`;
    fs.writeFileSync(commandFile, content);
    created++;
  }
  return created;
}

function removeSkillWrappers(claudeDir) {
  const commandsDir = path.join(claudeDir, 'commands');
  for (const wrapper of SKILL_WRAPPERS) {
    const commandFile = path.join(commandsDir, `${wrapper.name}.md`);
    if (fs.existsSync(commandFile)) fs.rmSync(commandFile);
  }
}

function createNativeSkillWrappers(skillsDir) {
  fs.mkdirSync(skillsDir, { recursive: true });
  let created = 0;
  for (const wrapper of SKILL_WRAPPERS) {
    const skillDir = path.join(skillsDir, wrapper.name);
    fs.mkdirSync(skillDir, { recursive: true });
    const canonicalPath = path.join(FRAMEWORK_DIR, wrapper.file);
    const skillMd = [
      '---',
      `name: ${wrapper.name}`,
      `description: >`,
      `  ${wrapper.description}`,
      '---',
      '',
      `Read the full content of \`${canonicalPath}\` and follow its instructions exactly for the task provided by the user.`,
      '',
      `If \`${canonicalPath}\` does not exist, run \`ai-dev-framework install\` then \`ai-dev-framework link\` to restore the framework.`,
      '',
    ].join('\n');
    const readmeMd = `# ${wrapper.name}\n\n${wrapper.description}\n`;
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd);
    fs.writeFileSync(path.join(skillDir, 'README.md'), readmeMd);
    created++;
  }
  return created;
}

function createIDEWorkflowWrappers(dir) {
  fs.mkdirSync(dir, { recursive: true });
  let created = 0;
  for (const wrapper of SKILL_WRAPPERS) {
    const canonicalPath = path.join(FRAMEWORK_DIR, wrapper.file);
    const content = [
      '---',
      `description: ${wrapper.description}`,
      '---',
      '',
      `Read the full content of \`${canonicalPath}\` and follow its instructions exactly for the task provided by the user.`,
      '',
      `If \`${canonicalPath}\` does not exist, run \`ai-dev-framework install\` then \`ai-dev-framework link\` to restore the framework.`,
      '',
    ].join('\n');
    fs.writeFileSync(path.join(dir, `${wrapper.name}.md`), content);
    created++;
  }
  return created;
}

function removeNativeSkillWrappers(skillsDir) {
  for (const wrapper of SKILL_WRAPPERS) {
    const skillDir = path.join(skillsDir, wrapper.name);
    if (fs.existsSync(skillDir)) fs.rmSync(skillDir, { recursive: true, force: true });
  }
}

function writeCursorRule(filePath, content) {
  const marker = '<!-- ai-dev-framework -->';
  const block = `${marker}\n${content}\n${marker}\n`;
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  let updated;
  if (existing.includes(marker)) {
    updated = existing.replace(new RegExp(`${marker}[\\s\\S]*?${marker}\n?`), block);
  } else if (existing.trim().startsWith('---')) {
    updated = existing + '\n' + block;
  } else {
    const frontmatter = '---\ndescription: AI Dev Framework — agents, skills and constitution reference\nalwaysApply: true\n---\n\n';
    updated = frontmatter + block;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, updated);
}

// ─── IDE definitions ─────────────────────────────────────────────────────────

const IDES = {
  copilot: {
    name: 'VS Code + GitHub Copilot',
    supportsGlobal: false,
    detectGlobal: () => false,
    linkGlobal: null,
    linkProject(projectDir) {
      const target = path.join(projectDir, '.github', 'copilot-instructions.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
    },
  },
  cursor: {
    name: 'Cursor',
    supportsGlobal: true,
    detectGlobal: () => commandExists('cursor') || fs.existsSync(path.join(os.homedir(), '.cursor')),
    linkGlobal() {
      const target = path.join(os.homedir(), '.cursor', 'rules', 'ai-dev-framework.mdc');
      writeCursorRule(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
    },
    linkProject(projectDir) {
      const target = path.join(projectDir, '.cursor', 'rules', 'ai-dev-framework.mdc');
      writeCursorRule(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
    },
  },
  windsurf: {
    name: 'Windsurf',
    supportsGlobal: true,
    detectGlobal: () => commandExists('windsurf') || fs.existsSync(path.join(os.homedir(), '.codeium', 'windsurf')),
    linkGlobal() {
      const target = path.join(os.homedir(), '.codeium', 'windsurf', 'memories', 'global_rules.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ${c.green('✓')} ${target}`);
    },
    linkProject(projectDir) {
      const target = path.join(projectDir, '.windsurfrules');
      injectBlock(target, frameworkBlock());
      console.log(`  ${c.green('✓')} ${target}`);
    },
  },
  antigravityide: {
    name: 'Antigravity IDE',
    supportsGlobal: true,
    detectGlobal: () =>
      fs.existsSync('/Applications/Antigravity IDE.app') ||
      fs.existsSync(path.join(os.homedir(), '.gemini', 'antigravity-ide')),
    linkGlobal() {
      const globalDir = path.join(os.homedir(), '.gemini', 'config', 'global_workflows');
      const target = path.join(globalDir, 'ai-dev-framework.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ${c.green('✓')} ${target}`);
      const count = createIDEWorkflowWrappers(globalDir);
      console.log(`  ${c.green('✓')} ${count} workflows criados em ${globalDir}`);
    },
    linkProject(projectDir) {
      const rulesTarget = path.join(projectDir, '.agent', 'rules', 'ai-dev-framework.md');
      injectBlock(rulesTarget, frameworkBlock());
      console.log(`  ${c.green('✓')} ${rulesTarget}`);
      const workflowsDir = path.join(projectDir, '.agent', 'workflows');
      const count = createIDEWorkflowWrappers(workflowsDir);
      console.log(`  ${c.green('✓')} ${count} workflows criados em ${workflowsDir}`);
    },
  },
};

// ─── Agent definitions ───────────────────────────────────────────────────────

const AGENTS = {
  claude: {
    name: 'Claude Code',
    detect: () => fs.existsSync(path.join(os.homedir(), '.claude')),
    link() {
      const claudeDir = path.join(os.homedir(), '.claude');
      const target = path.join(claudeDir, 'CLAUDE.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ${c.green('✓')} ${target}`);
      const count = createSkillWrappers(claudeDir);
      console.log(`  ${c.green('✓')} ${count} slash commands criados em ${path.join(claudeDir, 'commands')}`);
    },
  },
  codex: {
    name: 'OpenAI Codex CLI',
    detect: () => commandExists('codex') || fs.existsSync(path.join(os.homedir(), '.codex')),
    link() {
      const target = path.join(os.homedir(), '.codex', 'AGENTS.md');
      injectBlock(target, frameworkBlockWithContent());
      console.log(`  ${c.green('✓')} ${target}`);
      const stale = path.join(os.homedir(), '.codex', 'instructions.md');
      if (fs.existsSync(stale)) {
        fs.rmSync(stale);
        console.log(`  ${c.green('✓')} removed stale ~/.codex/instructions.md`);
      }
      const skillsDir = path.join(os.homedir(), '.codex', 'skills');
      const count = createNativeSkillWrappers(skillsDir);
      console.log(`  ${c.green('✓')} ${count} skills criados em ${skillsDir}`);
    },
  },
  copilot: {
    name: 'GitHub Copilot CLI',
    detect: () => commandExists('copilot') || fs.existsSync(path.join(os.homedir(), '.copilot')),
    link() {
      const skillsDir = path.join(os.homedir(), '.copilot', 'skills');
      const count = createNativeSkillWrappers(skillsDir);
      console.log(`  ${c.green('✓')} ${count} skills criados em ${skillsDir}`);
    },
  },
  gemini: {
    name: 'Gemini CLI',
    detect: () => commandExists('gemini') || fs.existsSync(path.join(os.homedir(), '.gemini')),
    link() {
      const target = path.join(os.homedir(), '.gemini', 'GEMINI.md');
      injectBlock(target, frameworkBlockWithContent());
      console.log(`  ${c.green('✓')} ${target}`);
    },
  },
  opencode: {
    name: 'opencode',
    detect: () => commandExists('opencode') || fs.existsSync(path.join(os.homedir(), '.config', 'opencode')),
    link() {
      const skillsDir = path.join(os.homedir(), '.agents', 'skills');
      const count = createNativeSkillWrappers(skillsDir);
      console.log(`  ${c.green('✓')} ${count} skills criados em ${skillsDir}`);
      const opencodeSkillsDir = path.join(os.homedir(), '.config', 'opencode', 'skills');
      createNativeSkillWrappers(opencodeSkillsDir);
      console.log(`  ${c.green('✓')} ${count} skills criados em ${opencodeSkillsDir}`);
    },
  },
  antigravity: {
    name: 'Antigravity CLI',
    detect: () => commandExists('agy') || fs.existsSync(path.join(os.homedir(), '.gemini', 'antigravity-cli')),
    link() {
      const antigravityDir = path.join(os.homedir(), '.gemini', 'antigravity-cli');
      const target = path.join(antigravityDir, 'AGENTS.md');
      injectBlock(target, frameworkBlockWithContent());
      console.log(`  ${c.green('✓')} ${target}`);
      const skillsDir = path.join(antigravityDir, 'skills');
      const count = createNativeSkillWrappers(skillsDir);
      console.log(`  ${c.green('✓')} ${count} skills criados em ${skillsDir}`);
    },
  },
};

// ─── Commands ────────────────────────────────────────────────────────────────

function install(silent = false) {
  if (!silent) console.log(`Installing to ${FRAMEWORK_DIR}...\n`);
  if (!fs.existsSync(FRAMEWORK_DIR)) fs.mkdirSync(FRAMEWORK_DIR, { recursive: true });

  for (const dir of FRAMEWORK_DIRS) {
    const src = path.join(PACKAGE_ROOT, dir);
    if (fs.existsSync(src)) {
      copyDir(src, path.join(FRAMEWORK_DIR, dir));
      if (!silent) console.log(`  ${c.green('✓')} ${dir}/`);
    }
  }
  for (const file of FRAMEWORK_FILES) {
    const src = path.join(PACKAGE_ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(FRAMEWORK_DIR, file));
      if (!silent) console.log(`  ${c.green('✓')} ${file}`);
    }
  }

  if (!silent) {
    console.log(`\n${c.green('✓')} Installed to ${FRAMEWORK_DIR}`);
    console.log('\nNext steps:');
    console.log('  ai-dev-framework link --all     link to all detected agents');
    console.log('  ai-dev-framework link claude    link to Claude Code only');
  }
}

function link(agent) {
  if (!fs.existsSync(FRAMEWORK_DIR)) {
    console.error('Framework not installed. Run "ai-dev-framework install" first.');
    process.exit(1);
  }

  if (!agent || agent === '--all') {
    let linked = 0;
    for (const [key, cfg] of Object.entries(AGENTS)) {
      if (cfg.detect()) {
        console.log(`Linking ${cfg.name}...`);
        cfg.link();
        linked++;
      } else {
        console.log(`  ${c.dim('-')} ${key} (${cfg.name}): not detected`);
      }
    }
    console.log('');
    for (const [key, ide] of Object.entries(IDES)) {
      if (ide.supportsGlobal && ide.detectGlobal()) {
        console.log(`Linking ${ide.name} (global)...`);
        ide.linkGlobal();
      } else if (ide.supportsGlobal) {
        console.log(`  ${c.dim('-')} ${key} (${ide.name}): not detected`);
      }
    }
    if (linked === 0) console.log('No agents detected.');
    return;
  }

  const cfg = AGENTS[agent];
  if (!cfg) {
    console.error(c.red(`Unknown agent: ${agent}`));
    console.error(`Available: ${Object.keys(AGENTS).join(', ')}, --all`);
    process.exit(1);
  }

  console.log(`Linking ${cfg.name}...`);
  cfg.link();
  console.log('Done.');
}

async function checkUpdate(offline = false) {
  if (!fs.existsSync(FRAMEWORK_DIR)) {
    console.error(c.red('Framework not installed. Run "ai-dev-framework install" first.'));
    process.exit(1);
  }

  const installed = getInstalledVersion();
  if (!installed) {
    console.log('Could not determine installed version.');
    return { upToDate: false };
  }

  if (offline) {
    console.log(`${c.green('✓')} Offline mode. Installed: v${installed}`);
    return { upToDate: true, installed };
  }

  process.stdout.write(`Checking for updates (installed: v${installed})... `);

  const release = await fetchJSON(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
  recordCheck();

  if (!release || !release.tag_name) {
    console.log(c.yellow('could not reach GitHub. Skipping.'));
    return { upToDate: true };
  }

  const latest = release.tag_name.replace(/^v/, '');

  if (compareVersions(latest, installed) <= 0) {
    console.log(c.green('up to date ✓'));
    return { upToDate: true, installed, latest };
  }

  console.log(c.yellow('update available!\n'));
  console.log(`  Installed : v${installed}`);
  console.log(`  Latest    : ${c.yellow(`v${latest}`)}`);

  if (release.body) {
    console.log('\n── What\'s new ──────────────────────────────────────');
    console.log(release.body.trim());
    console.log('────────────────────────────────────────────────────');
  }

  console.log(`\nRun ${c.bold('"ai-dev-framework update"')} to install the latest version.`);
  return { upToDate: false, installed, latest };
}

async function update(offline = false) {
  if (!fs.existsSync(FRAMEWORK_DIR)) {
    console.error(c.red('Framework not installed. Run "ai-dev-framework install" first.'));
    process.exit(1);
  }

  if (offline) {
    console.log('Offline mode — applying local package files...\n');
    install(true);
    console.log('\nRe-linking agents...');
    for (const [, cfg] of Object.entries(AGENTS)) {
      if (cfg.detect()) cfg.link();
    }
    for (const [, ide] of Object.entries(IDES)) {
      if (ide.supportsGlobal && ide.detectGlobal()) ide.linkGlobal();
    }
    recordCheck();
    console.log(`\n${c.green('✓')} Update complete (offline).`);
    return;
  }

  const spin = spinner('Fetching latest version from npm...');

  try {
    execSync(`npm install -g @alfredo-petri/ai-dev-framework@latest`, { stdio: 'pipe' });
    spin.stop(`${c.green('✓')} Fetched latest version from npm`);
  } catch {
    spin.stop(c.red('✗ Update failed. Check your connection and try again.'));
    process.exit(1);
  }

  console.log('\nApplying files...');
  install(true);

  console.log('\nRe-linking agents...');
  for (const [, cfg] of Object.entries(AGENTS)) {
    if (cfg.detect()) cfg.link();
  }
  for (const [, ide] of Object.entries(IDES)) {
    if (ide.supportsGlobal && ide.detectGlobal()) ide.linkGlobal();
  }

  recordCheck();
  console.log(`\n${c.green('✓')} Update complete.`);
}

async function checkUpdateIfNeeded() {
  if (!needsCheck()) return;
  await checkUpdate();
}

function status() {
  const installed = fs.existsSync(FRAMEWORK_DIR);
  const version = getInstalledVersion();
  const lastCheck = fs.existsSync(LAST_CHECK_FILE)
    ? new Date(parseInt(fs.readFileSync(LAST_CHECK_FILE, 'utf8'), 10)).toLocaleString()
    : 'never';

  console.log(`\nInstall path : ${FRAMEWORK_DIR}`);
  console.log(`Status       : ${installed ? c.green('✓ installed') : c.red('✗ not installed')}${version ? ` (v${version})` : ''}`);
  console.log(`Last check   : ${lastCheck}`);

  if (installed) {
    console.log('\nDirectories:');
    for (const dir of FRAMEWORK_DIRS) {
      const ok = fs.existsSync(path.join(FRAMEWORK_DIR, dir));
      console.log(`  ${ok ? c.green('✓') : c.red('✗')} ${dir}/`);
    }
  }

  console.log('\nCLI Agents:');
  for (const [key, cfg] of Object.entries(AGENTS)) {
    const detected = cfg.detect();
    console.log(`  ${detected ? c.green('✓') : c.dim('-')} ${key.padEnd(10)} ${cfg.name}`);
  }

  console.log('\nIDEs (global):');
  for (const [key, ide] of Object.entries(IDES)) {
    const detected = ide.supportsGlobal ? ide.detectGlobal() : false;
    const note = ide.supportsGlobal ? '' : c.dim(' (project-only)');
    console.log(`  ${detected ? c.green('✓') : c.dim('-')} ${key.padEnd(10)} ${ide.name}${note}`);
  }
  console.log('');
}

function uninstall() {
  if (!fs.existsSync(FRAMEWORK_DIR)) { console.log('Not installed.'); return; }
  const claudeDir = path.join(os.homedir(), '.claude');
  if (fs.existsSync(claudeDir)) removeSkillWrappers(claudeDir);
  const codexSkillsDir = path.join(os.homedir(), '.codex', 'skills');
  if (fs.existsSync(codexSkillsDir)) removeNativeSkillWrappers(codexSkillsDir);
  const staleCodexInstructions = path.join(os.homedir(), '.codex', 'instructions.md');
  if (fs.existsSync(staleCodexInstructions)) fs.rmSync(staleCodexInstructions);
  const copilotSkillsDir = path.join(os.homedir(), '.copilot', 'skills');
  if (fs.existsSync(copilotSkillsDir)) removeNativeSkillWrappers(copilotSkillsDir);
  const opencodeSkillsDir = path.join(os.homedir(), '.agents', 'skills');
  if (fs.existsSync(opencodeSkillsDir)) removeNativeSkillWrappers(opencodeSkillsDir);
  const opencodeNativeSkillsDir = path.join(os.homedir(), '.config', 'opencode', 'skills');
  if (fs.existsSync(opencodeNativeSkillsDir)) removeNativeSkillWrappers(opencodeNativeSkillsDir);
  const antigravitySkillsDir = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'skills');
  if (fs.existsSync(antigravitySkillsDir)) removeNativeSkillWrappers(antigravitySkillsDir);
  fs.rmSync(FRAMEWORK_DIR, { recursive: true, force: true });
  console.log(`${c.green('✓')} Removed ${FRAMEWORK_DIR}`);
  console.log(`${c.green('✓')} Slash commands removed from ${claudeDir}/commands`);
  console.log(`${c.green('✓')} Skills removed from ${codexSkillsDir}`);
  console.log(`${c.green('✓')} Skills removed from ${copilotSkillsDir}`);
  console.log(`${c.green('✓')} Skills removed from ${opencodeSkillsDir}`);
  console.log(`${c.green('✓')} Skills removed from ${opencodeNativeSkillsDir}`);
  console.log(`${c.green('✓')} Skills removed from ${antigravitySkillsDir}`);
}

function inject(args) {
  if (!fs.existsSync(FRAMEWORK_DIR)) {
    console.error('Framework not installed. Run "ai-dev-framework install" first.');
    process.exit(1);
  }

  const isGlobal = args.includes('--global');
  const ideFilter = args.filter(a => a !== '--global');

  const targets = ideFilter.length > 0
    ? ideFilter.map(k => {
        if (!IDES[k]) {
          console.error(`Unknown IDE: ${k}. Available: ${Object.keys(IDES).join(', ')}`);
          process.exit(1);
        }
        return [k, IDES[k]];
      })
    : Object.entries(IDES);

  const projectDir = process.cwd();

  for (const [key, ide] of targets) {
    if (isGlobal) {
      if (!ide.supportsGlobal) {
        console.log(`  - ${key} (${ide.name}): global config not supported`);
        continue;
      }
      if (!ide.detectGlobal()) {
        console.log(`  - ${key} (${ide.name}): not detected`);
        continue;
      }
      console.log(`Injecting ${ide.name} (global)...`);
      ide.linkGlobal();
    } else {
      console.log(`Injecting ${ide.name} (project)...`);
      ide.linkProject(projectDir);
    }
  }
}

function help() {
  console.log(`
Usage: ai-dev-framework <command> [options]

Commands:
  install              Copy framework files to ~/.ai-dev-framework/
  link [agent]         Inject framework reference into CLI agent global config
  inject [ide...]      Inject framework reference into IDE project config
  inject --global      Inject into IDE global config (where supported)
  check-update         Check GitHub for a newer version and list changes
  update               Install latest version from GitHub
  status               Show install state, version and detected agents
  uninstall            Remove ~/.ai-dev-framework/

CLI Agents (link):
  claude           Claude Code  (~/.claude/CLAUDE.md)
  codex            OpenAI Codex CLI  (~/.codex/AGENTS.md + ~/.codex/skills/)
  copilot          GitHub Copilot CLI  (~/.copilot/skills/)
  gemini           Gemini CLI  (~/.gemini/GEMINI.md)
  opencode         opencode  (~/.agents/skills/)
  antigravity      Antigravity CLI  (~/.gemini/antigravity-cli/AGENTS.md + skills/)
  --all            All detected agents (default)

IDEs (inject):
  copilot          VS Code + GitHub Copilot  (.github/copilot-instructions.md)
  cursor           Cursor  (.cursor/rules/ai-dev-framework.mdc)
  windsurf         Windsurf  (.windsurfrules)
  antigravityide   Antigravity IDE  (.agent/rules/ai-dev-framework.md)

Examples:
  ai-dev-framework install
  ai-dev-framework link --all
  ai-dev-framework inject                    # all IDEs, current project
  ai-dev-framework inject cursor             # cursor only, current project
  ai-dev-framework inject --global           # all IDEs, global config
  ai-dev-framework inject --global windsurf  # windsurf global only
  ai-dev-framework check-update
  ai-dev-framework check-update --offline    # show installed version, skip network
  ai-dev-framework update
  ai-dev-framework update --offline          # re-apply local files + re-link, skip npm
  ai-dev-framework status
`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const [,, command, ...args] = process.argv;
const offline = args.includes('--offline');

(async () => {
  switch (command) {
    case 'install':        install(); break;
    case 'link':           link(args[0]); break;
    case 'check-update':   await checkUpdate(offline); break;
    case 'check-update-if-needed': await checkUpdateIfNeeded(); break;
    case 'update':         await update(offline); break;
    case 'status':         status(); break;
    case 'inject':         inject(args); break;
    case 'uninstall':      uninstall(); break;
    default:               help(); break;
  }
})();

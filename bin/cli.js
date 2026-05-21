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

// ─── Agent definitions ───────────────────────────────────────────────────────

const AGENTS = {
  claude: {
    name: 'Claude Code',
    detect: () => fs.existsSync(path.join(os.homedir(), '.claude')),
    link() {
      const target = path.join(os.homedir(), '.claude', 'CLAUDE.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
    },
  },
  codex: {
    name: 'OpenAI Codex CLI',
    detect: () => commandExists('codex') || fs.existsSync(path.join(os.homedir(), '.codex')),
    link() {
      const target = path.join(os.homedir(), '.codex', 'instructions.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
    },
  },
  copilot: {
    name: 'GitHub Copilot CLI',
    detect: () => commandExists('gh') && commandExists('github-copilot-cli'),
    link() {
      const target = path.join(os.homedir(), '.config', 'gh-copilot', 'instructions.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
    },
  },
  gemini: {
    name: 'Gemini CLI',
    detect: () => commandExists('gemini') || fs.existsSync(path.join(os.homedir(), '.gemini')),
    link() {
      const target = path.join(os.homedir(), '.gemini', 'GEMINI.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ✓ ${target}`);
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
      if (!silent) console.log(`  ✓ ${dir}/`);
    }
  }
  for (const file of FRAMEWORK_FILES) {
    const src = path.join(PACKAGE_ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(FRAMEWORK_DIR, file));
      if (!silent) console.log(`  ✓ ${file}`);
    }
  }

  if (!silent) {
    console.log(`\n✓ Installed to ${FRAMEWORK_DIR}`);
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
        console.log(`  - ${key} (${cfg.name}): not detected`);
      }
    }
    if (linked === 0) console.log('No agents detected.');
    return;
  }

  const cfg = AGENTS[agent];
  if (!cfg) {
    console.error(`Unknown agent: ${agent}`);
    console.error(`Available: ${Object.keys(AGENTS).join(', ')}, --all`);
    process.exit(1);
  }

  console.log(`Linking ${cfg.name}...`);
  cfg.link();
  console.log('Done.');
}

async function checkUpdate() {
  if (!fs.existsSync(FRAMEWORK_DIR)) {
    console.error('Framework not installed. Run "ai-dev-framework install" first.');
    process.exit(1);
  }

  const installed = getInstalledVersion();
  if (!installed) {
    console.log('Could not determine installed version.');
    return { upToDate: false };
  }

  process.stdout.write(`Checking for updates (installed: v${installed})... `);

  const release = await fetchJSON(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
  recordCheck();

  if (!release || !release.tag_name) {
    console.log('could not reach GitHub. Skipping.');
    return { upToDate: true };
  }

  const latest = release.tag_name.replace(/^v/, '');

  if (compareVersions(latest, installed) <= 0) {
    console.log(`up to date ✓`);
    return { upToDate: true, installed, latest };
  }

  console.log(`update available!\n`);
  console.log(`  Installed : v${installed}`);
  console.log(`  Latest    : v${latest}`);

  if (release.body) {
    console.log('\n── What\'s new ──────────────────────────────────────');
    console.log(release.body.trim());
    console.log('────────────────────────────────────────────────────');
  }

  console.log('\nRun "ai-dev-framework update" to install the latest version.');
  return { upToDate: false, installed, latest };
}

async function update() {
  if (!fs.existsSync(FRAMEWORK_DIR)) {
    console.error('Framework not installed. Run "ai-dev-framework install" first.');
    process.exit(1);
  }

  console.log('Fetching latest version from GitHub...\n');

  try {
    execSync(`npm install -g github:${GITHUB_REPO}`, { stdio: 'inherit' });
  } catch {
    console.error('\nUpdate failed. Check your connection and try again.');
    process.exit(1);
  }

  console.log('\nApplying files...');
  install(true);

  console.log('\nRe-linking agents...');
  for (const [, cfg] of Object.entries(AGENTS)) {
    if (cfg.detect()) cfg.link();
  }

  recordCheck();
  console.log('\n✓ Update complete.');
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
  console.log(`Status       : ${installed ? '✓ installed' : '✗ not installed'}${version ? ` (v${version})` : ''}`);
  console.log(`Last check   : ${lastCheck}`);

  if (installed) {
    console.log('\nDirectories:');
    for (const dir of FRAMEWORK_DIRS) {
      const ok = fs.existsSync(path.join(FRAMEWORK_DIR, dir));
      console.log(`  ${ok ? '✓' : '✗'} ${dir}/`);
    }
  }

  console.log('\nAgents:');
  for (const [key, cfg] of Object.entries(AGENTS)) {
    const detected = cfg.detect();
    console.log(`  ${detected ? '✓' : '-'} ${key.padEnd(10)} ${cfg.name}`);
  }
  console.log('');
}

function uninstall() {
  if (!fs.existsSync(FRAMEWORK_DIR)) { console.log('Not installed.'); return; }
  fs.rmSync(FRAMEWORK_DIR, { recursive: true, force: true });
  console.log(`✓ Removed ${FRAMEWORK_DIR}`);
}

function help() {
  console.log(`
Usage: ai-dev-framework <command> [agent]

Commands:
  install          Copy framework files to ~/.ai-dev-framework/
  link [agent]     Inject framework reference into agent global config
  check-update     Check GitHub for a newer version and list changes
  update           Install latest version from GitHub
  status           Show install state, version and detected agents
  uninstall        Remove ~/.ai-dev-framework/

Agents:
  claude           Claude Code  (~/.claude/CLAUDE.md)
  codex            OpenAI Codex CLI  (~/.codex/instructions.md)
  copilot          GitHub Copilot CLI  (~/.config/gh-copilot/instructions.md)
  gemini           Gemini CLI  (~/.gemini/GEMINI.md)
  --all            All detected agents (default for link)

Examples:
  ai-dev-framework install
  ai-dev-framework link --all
  ai-dev-framework check-update
  ai-dev-framework update
  ai-dev-framework status
`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const [,, command, ...args] = process.argv;

(async () => {
  switch (command) {
    case 'install':        install(); break;
    case 'link':           link(args[0]); break;
    case 'check-update':   await checkUpdate(); break;
    case 'check-update-if-needed': await checkUpdateIfNeeded(); break;
    case 'update':         await update(); break;
    case 'status':         status(); break;
    case 'uninstall':      uninstall(); break;
    default:               help(); break;
  }
})();

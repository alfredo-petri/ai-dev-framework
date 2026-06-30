# create-flowchart

**Skill**: Cria diagramas Mermaid e, quando solicitado, integra um viewer HTML interativo com pan, zoom, resize, tela cheia, alternância código/diagrama, copiar fonte e link para Mermaid Live.

## Quando usar

Invocar via `/ai-df-skill-create-flowchart` ou quando o usuário pedir para criar/adicionar fluxograma, diagrama de arquitetura, sequência, ERD, class diagram, Gantt ou fluxo de processo usando Mermaid.

## Procedimento

### Etapa 1 — Entender o pedido

Se o usuário não forneceu contexto suficiente, perguntar somente o necessário:

1. O que o diagrama representa?
2. Qual tipo Mermaid usar: `flowchart`, `sequenceDiagram`, `erDiagram`, `classDiagram`, `stateDiagram`, `gantt` ou outro?
3. A entrega deve ser apenas código Mermaid, arquivo novo ou inserção em HTML existente?
4. Há paleta, tema ou design system alvo?
5. Para viewer HTML: altura inicial desejada? Usar `440px` como padrão.

Se o contexto já for suficiente, seguir sem perguntar.

### Etapa 2 — Gerar Mermaid

- Escolher o tipo Mermaid mais simples que represente o fluxo corretamente.
- Preferir `flowchart LR` para processos horizontais e `flowchart TD` para árvores ou etapas verticais.
- Usar nomes curtos e legíveis nos nós.
- Incluir comentários `%%` apenas quando ajudarem manutenção.
- Aplicar `classDef` e `class` somente quando houver regra visual clara.
- Escapar HTML dentro do bloco renderizado: `&`, `<`, `>` e setas textuais devem virar `&amp;`, `&lt;`, `&gt;`.
- Manter uma cópia sem escape para textarea/cópia/Mermaid Live.

Temas sugeridos:

```mermaid
%%{ init: { "theme": "neutral" } }%%
```

```mermaid
%%{ init: { "theme": "base", "themeVariables": { "primaryColor": "#EEF2FF", "edgeLabelBackground": "#FFFFFF" } } }%%
```

```mermaid
%%{ init: { "theme": "dark", "themeVariables": { "primaryColor": "#1E3A5F", "primaryTextColor": "#C8D8F0", "lineColor": "#2563EB" } } }%%
```

### Etapa 3 — Integrar em HTML quando solicitado

Usar um bloco self-contained por diagrama:

```html
<div class="diag-card" data-diag-id="DIAGID">
  <div class="diag-card-head">
    <div>
      <div class="diag-title">TITULO DO DIAGRAMA</div>
      <div class="diag-sub">SUBTITULO · tipo mermaid</div>
    </div>
    <a class="btn-mermaid-live" id="btn-live-DIAGID" href="#" target="_blank" rel="noopener">Mermaid Live</a>
  </div>

  <div class="diag-render" data-diag-id="DIAGID" style="height:440px">
    <pre class="mermaid">
CODIGO MERMAID COM ESCAPE HTML
    </pre>
  </div>

  <div class="diag-resize" data-target="DIAGID" aria-label="Redimensionar diagrama">
    <span></span><span></span><span></span>
  </div>

  <textarea id="raw-DIAGID" hidden>CODIGO MERMAID SEM ESCAPE HTML</textarea>
</div>
```

Regras de integração:

- Trocar `DIAGID` por slug único na página.
- Manter `data-target`, `data-diag-id`, `btn-live-*` e `raw-*` sincronizados.
- Inserir CSS uma única vez na página.
- Inserir Mermaid ESM uma única vez na página.
- Inserir script de controles uma única vez antes de `</body>`.
- Se o projeto já tiver componentes, CSS tokens, bundler ou biblioteca de ícones, adaptar ao padrão local em vez de colar HTML cru.

### Etapa 4 — CSS mínimo do viewer

Adicionar uma única vez na página ou converter para o sistema de estilo local:

```css
.diag-card { background: var(--card, #162035); border: 1px solid var(--border, #1e3050); border-radius: 12px; overflow: hidden; }
.diag-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--border, #1e3050); }
.diag-title { font-weight: 700; font-size: .95rem; color: var(--text, #c8d8f0); }
.diag-sub { margin-top: 2px; font-size: .75rem; color: var(--muted, #5a7299); }
.diag-render { position: relative; height: 440px; overflow: hidden; cursor: grab; user-select: none; background: #f8fbff; touch-action: none; }
.diag-render.grabbing { cursor: grabbing; }
.diag-inner { position: absolute; top: 0; left: 0; transform-origin: 0 0; will-change: transform; }
.diag-inner svg { display: block; max-width: none !important; }
.zoom-bar { position: absolute; right: 10px; bottom: 10px; z-index: 20; display: flex; align-items: center; gap: 2px; padding: 3px; background: rgba(15,31,46,.82); border: 1px solid rgba(255,255,255,.13); border-radius: 6px; backdrop-filter: blur(8px); }
.zoom-btn { width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 4px; background: none; color: #8ba8cc; cursor: pointer; }
.zoom-btn:hover { background: rgba(255,255,255,.1); color: #c8d8f0; }
.zoom-pct { min-width: 44px; text-align: center; font-size: .68rem; font-weight: 700; color: #7db8f7; line-height: 28px; }
.diag-resize { height: 12px; cursor: ns-resize; display: flex; align-items: center; justify-content: center; gap: 3px; background: var(--ground, #0f1a2e); border-top: 1px dashed var(--border, #1e3050); }
.diag-resize span { width: 4px; height: 4px; border-radius: 999px; background: var(--border, #1e3050); }
.diag-code-view { position: absolute; inset: 0; z-index: 10; display: none; flex-direction: column; background: #0d1f3a; }
.diag-code-view.active { display: flex; }
.dcv-pre { flex: 1; margin: 0; padding: 16px 20px; overflow: auto; font-family: Consolas, monospace; font-size: .8rem; line-height: 1.65; color: #8ba8cc; white-space: pre; }
.diag-render:fullscreen { width: 100vw !important; height: 100vh !important; background: #f8fbff; }
.btn-mermaid-live { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 6px; background: #2684ff; color: #fff; font-size: .8rem; font-weight: 600; text-decoration: none; }
```

### Etapa 5 — Script mínimo do viewer

Adicionar Mermaid uma única vez:

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: false, theme: 'default' });
  document.addEventListener('DOMContentLoaded', async () => {
    await mermaid.run({ querySelector: '.mermaid' });
    document.dispatchEvent(new Event('mermaid-ready'));
  });
</script>
```

Adicionar controles uma única vez:

```html
<script>
const panZoomMap = new Map();
let activePanZoom = null;

const icons = {
  minus: '-',
  plus: '+',
  fit: 'Fit',
  fullscreen: '[]',
  code: '</>',
  diagram: 'Dia',
  copy: 'Copy',
  check: 'OK',
};

class PanZoom {
  constructor(viewport) {
    this.viewport = viewport;
    this.inner = null;
    this.state = { zoom: 1, x: 0, y: 0 };
    this.min = 0.05;
    this.max = 12;
    this.dragging = false;
    this.lastMouse = { x: 0, y: 0 };
  }

  attach(inner) {
    this.inner = inner;
    this.buildToolbar();
    this.bindEvents();
    this.fit();
  }

  applyTransform() {
    this.inner.style.transform = `translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.zoom})`;
    this.percent.textContent = `${Math.round(this.state.zoom * 100)}%`;
  }

  zoomAt(x, y, factor) {
    const nextZoom = Math.max(this.min, Math.min(this.max, this.state.zoom * factor));
    const scale = nextZoom / this.state.zoom;
    this.state.x = x - scale * (x - this.state.x);
    this.state.y = y - scale * (y - this.state.y);
    this.state.zoom = nextZoom;
    this.applyTransform();
  }

  pan(dx, dy) {
    this.state.x += dx;
    this.state.y += dy;
    this.applyTransform();
  }

  fit() {
    const svg = this.inner.querySelector('svg');
    if (!svg) return;
    const viewBox = svg.viewBox && svg.viewBox.baseVal;
    const width = viewBox && viewBox.width ? viewBox.width : parseFloat(svg.getAttribute('width')) || 1;
    const height = viewBox && viewBox.height ? viewBox.height : parseFloat(svg.getAttribute('height')) || 1;
    const zoom = Math.min((this.viewport.clientWidth - 32) / width, (this.viewport.clientHeight - 32) / height);
    this.state.zoom = Math.max(this.min, Math.min(this.max, zoom));
    this.state.x = (this.viewport.clientWidth - width * this.state.zoom) / 2;
    this.state.y = (this.viewport.clientHeight - height * this.state.zoom) / 2;
    this.applyTransform();
  }

  buildToolbar() {
    const bar = document.createElement('div');
    bar.className = 'zoom-bar';
    const button = (title, label, action) => {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'zoom-btn';
      element.title = title;
      element.textContent = label;
      element.addEventListener('click', event => {
        event.stopPropagation();
        action();
      });
      return element;
    };

    this.percent = document.createElement('span');
    this.percent.className = 'zoom-pct';
    this.percent.textContent = '100%';
    this.percent.addEventListener('click', () => this.fit());

    bar.append(
      button('Diminuir zoom', icons.minus, () => this.zoomAt(this.viewport.clientWidth / 2, this.viewport.clientHeight / 2, 1 / 1.25)),
      this.percent,
      button('Aumentar zoom', icons.plus, () => this.zoomAt(this.viewport.clientWidth / 2, this.viewport.clientHeight / 2, 1.25)),
      button('Ajustar ao espaço', icons.fit, () => this.fit()),
      button('Tela cheia', icons.fullscreen, () => this.toggleFullscreen()),
      button('Ver código-fonte', icons.code, () => this.toggleCode()),
      button('Copiar código-fonte', icons.copy, eventlessCopy(this.viewport))
    );
    this.viewport.appendChild(bar);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) this.viewport.requestFullscreen();
    else document.exitFullscreen();
    setTimeout(() => this.fit(), 80);
  }

  toggleCode() {
    const codeView = this.viewport.querySelector('.diag-code-view');
    if (codeView) codeView.classList.toggle('active');
  }

  bindEvents() {
    this.viewport.addEventListener('mouseenter', () => { activePanZoom = this; });
    this.viewport.addEventListener('mouseleave', () => { if (activePanZoom === this) activePanZoom = null; });
    this.viewport.addEventListener('wheel', event => {
      event.preventDefault();
      const rect = this.viewport.getBoundingClientRect();
      this.zoomAt(event.clientX - rect.left, event.clientY - rect.top, event.deltaY < 0 ? 1.1 : 1 / 1.1);
    }, { passive: false });
    this.viewport.addEventListener('mousedown', event => {
      if (event.button !== 0 || event.target.closest('.zoom-bar')) return;
      this.dragging = true;
      this.lastMouse = { x: event.clientX, y: event.clientY };
      this.viewport.classList.add('grabbing');
    });
    document.addEventListener('mousemove', event => {
      if (!this.dragging) return;
      this.pan(event.clientX - this.lastMouse.x, event.clientY - this.lastMouse.y);
      this.lastMouse = { x: event.clientX, y: event.clientY };
    });
    document.addEventListener('mouseup', () => {
      this.dragging = false;
      this.viewport.classList.remove('grabbing');
    });
    this.viewport.addEventListener('dblclick', () => this.fit());
  }
}

function eventlessCopy(viewport) {
  return () => {
    const id = viewport.dataset.diagId;
    const raw = document.getElementById(`raw-${id}`);
    if (raw) navigator.clipboard.writeText(raw.value.trim());
  };
}

function buildMermaidLiveLink(code) {
  const state = { code, mermaid: { theme: 'default' } };
  return `https://mermaid.live/edit#base64:${btoa(unescape(encodeURIComponent(JSON.stringify(state))))}`;
}

function initResize(handle) {
  const viewport = document.querySelector(`.diag-render[data-diag-id="${handle.dataset.target}"]`);
  if (!viewport) return;
  handle.addEventListener('mousedown', event => {
    const startY = event.clientY;
    const startHeight = viewport.offsetHeight;
    const onMove = moveEvent => { viewport.style.height = `${Math.max(180, startHeight + moveEvent.clientY - startY)}px`; };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      const instance = panZoomMap.get(handle.dataset.target);
      if (instance) instance.fit();
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

function initDiagrams() {
  document.querySelectorAll('.diag-render').forEach(viewport => {
    const id = viewport.dataset.diagId;
    const svg = viewport.querySelector('svg');
    if (!id || !svg) return;
    const viewBox = svg.viewBox && svg.viewBox.baseVal;
    if (viewBox && viewBox.width && viewBox.height) {
      svg.setAttribute('width', viewBox.width);
      svg.setAttribute('height', viewBox.height);
    }
    const target = svg.parentElement === viewport ? svg : svg.parentElement;
    const inner = document.createElement('div');
    inner.className = 'diag-inner';
    viewport.insertBefore(inner, target);
    inner.appendChild(target);

    const raw = document.getElementById(`raw-${id}`);
    const codeView = document.createElement('div');
    codeView.className = 'diag-code-view';
    codeView.innerHTML = '<pre class="dcv-pre"></pre>';
    codeView.querySelector('.dcv-pre').textContent = raw ? raw.value.trim() : '';
    viewport.appendChild(codeView);

    const panZoom = new PanZoom(viewport);
    panZoom.attach(inner);
    panZoomMap.set(id, panZoom);

    const liveButton = document.getElementById(`btn-live-${id}`);
    if (liveButton && raw) liveButton.href = buildMermaidLiveLink(raw.value.trim());
  });
  document.querySelectorAll('.diag-resize').forEach(initResize);
}

document.addEventListener('mermaid-ready', initDiagrams);
document.addEventListener('keydown', event => {
  if (!activePanZoom) return;
  if (event.key === '+' || event.key === '=') activePanZoom.zoomAt(activePanZoom.viewport.clientWidth / 2, activePanZoom.viewport.clientHeight / 2, 1.25);
  if (event.key === '-') activePanZoom.zoomAt(activePanZoom.viewport.clientWidth / 2, activePanZoom.viewport.clientHeight / 2, 1 / 1.25);
  if (event.key === '0' || event.key.toLowerCase() === 'f') activePanZoom.fit();
  if (event.key === 'Enter' && event.altKey) activePanZoom.toggleFullscreen();
});
</script>
```

### Etapa 6 — Revisão final

Antes de entregar, verificar:

- `DIAGID` é único na página.
- Mermaid escapado no `<pre class="mermaid">` e sem escape no `<textarea>`.
- Mermaid ESM aparece uma única vez.
- Script de controles aparece uma única vez.
- Link Mermaid Live usa o conteúdo do textarea.
- Altura inicial está em `440px` ou no valor solicitado.
- Resize usa `data-target` igual ao `data-diag-id`.
- Em apps com framework, a integração respeita componentes, tokens, hooks e padrões locais.

## Saída esperada

Entregar:

- Código Mermaid final.
- Arquivo ou trecho alterado, quando houver integração.
- Observação curta sobre controles disponíveis: zoom por scroll, arrastar para mover, duplo clique/`F` para ajustar, `Alt+Enter` para tela cheia, botão de código e botão copiar.

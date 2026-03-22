<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NeuralFlix — README</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

  :root {
    --cyan: #00E5FF;
    --purple: #BB86FC;
    --bg: #060611;
    --bg2: #0d0d1a;
    --bg3: #131326;
    --border: rgba(255,255,255,0.07);
    --text: #e8e8f0;
    --muted: #8888aa;
    --green: #00FF41;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── CANVAS BG ── */
  #canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

  .page { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; padding: 40px 24px 100px; }

  /* ── HERO ── */
  .hero { text-align: center; padding: 70px 0 60px; position: relative; }

  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 999px;
    border: 1px solid rgba(0,229,255,0.25);
    background: rgba(0,229,255,0.05);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.12em; color: var(--cyan);
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); animation: pulse 2s ease-in-out infinite; }

  .logo-ascii {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(6px, 1.4vw, 11px);
    line-height: 1.2;
    white-space: pre;
    background: linear-gradient(135deg, var(--cyan), var(--purple));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: fadeUp 0.7s 0.1s ease both;
    margin-bottom: 24px;
  }

  .tagline {
    font-size: 17px; color: var(--muted); max-width: 560px; margin: 0 auto 36px;
    animation: fadeUp 0.7s 0.25s ease both;
  }
  .tagline em { font-style: normal; color: var(--cyan); }
  .tagline strong { font-style: normal; color: var(--purple); font-weight: 500; }

  /* ── BADGES ── */
  .shields {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
    animation: fadeUp 0.7s 0.35s ease both;
    margin-bottom: 60px;
  }
  .shield {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 6px; font-size: 11px;
    font-family: 'JetBrains Mono', monospace; font-weight: 500;
    border: 1px solid; letter-spacing: 0.04em;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: default;
  }
  .shield:hover { transform: translateY(-2px); }
  .sh-cyan  { color: var(--cyan);   border-color: rgba(0,229,255,0.3);   background: rgba(0,229,255,0.07);   box-shadow: none; }
  .sh-purple{ color: var(--purple); border-color: rgba(187,134,252,0.3); background: rgba(187,134,252,0.07); }
  .sh-green { color: var(--green);  border-color: rgba(0,255,65,0.3);    background: rgba(0,255,65,0.07); }
  .sh-cyan:hover  { box-shadow: 0 4px 20px rgba(0,229,255,0.2); }
  .sh-purple:hover{ box-shadow: 0 4px 20px rgba(187,134,252,0.2); }
  .sh-green:hover { box-shadow: 0 4px 20px rgba(0,255,65,0.2); }

  /* ── SECTION ── */
  .section { margin-bottom: 56px; animation: fadeUp 0.6s ease both; }
  .section-label {
    display: flex; align-items: center; gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--cyan); margin-bottom: 16px;
  }
  .section-label::before { content: '◈'; font-size: 14px; }
  .section-label::after  { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(0,229,255,0.3), transparent); }

  h2 { font-size: 22px; font-weight: 600; margin-bottom: 14px; }
  p  { color: var(--muted); margin-bottom: 12px; font-size: 15px; }
  p strong { color: var(--text); font-weight: 500; }

  /* ── PIPELINE ── */
  .pipeline {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
    background: var(--border); border-radius: 12px; overflow: hidden;
    border: 1px solid var(--border); margin: 24px 0;
  }
  .pipe-col {
    background: var(--bg2); padding: 20px 16px;
    transition: background 0.3s;
  }
  .pipe-col:hover { background: var(--bg3); }
  .pipe-head {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: var(--cyan); letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 14px;
    border-bottom: 1px solid rgba(0,229,255,0.15); padding-bottom: 8px;
  }
  .pipe-item { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .pipe-item strong { color: var(--text); font-weight: 500; display: block; font-size: 13px; }

  /* ── FLOW DIAGRAM ── */
  .flow {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 12px; padding: 28px; margin: 24px 0;
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    overflow-x: auto;
  }
  .flow-row { display: flex; align-items: center; gap: 0; margin-bottom: 2px; }
  .flow-node {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 6px 14px; border-radius: 6px; font-size: 11.5px; white-space: nowrap;
    border: 1px solid;
  }
  .fn-cyan   { color: var(--cyan);   border-color: rgba(0,229,255,0.3);   background: rgba(0,229,255,0.08); }
  .fn-purple { color: var(--purple); border-color: rgba(187,134,252,0.3); background: rgba(187,134,252,0.08); }
  .fn-gray   { color: var(--muted);  border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); }
  .flow-arrow { color: var(--muted); padding: 0 8px; font-size: 14px; }
  .flow-sub { color: var(--muted); font-size: 10px; margin-left: 8px; }

  /* ── TECH TABLE ── */
  .tech-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .tech-table th {
    text-align: left; font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); padding: 10px 16px;
    border-bottom: 1px solid var(--border);
  }
  .tech-table td {
    padding: 11px 16px; font-size: 13.5px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .tech-table tr:last-child td { border-bottom: none; }
  .tech-table tr:hover td { background: var(--bg3); }
  .tech-table td:first-child { color: var(--muted); font-size: 12px; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
  .tech-table td:nth-child(2) { color: var(--cyan); font-family: 'JetBrains Mono', monospace; font-size: 12px; }
  .tech-table td:nth-child(3) { color: var(--muted); font-size: 13px; }
  .tech-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }

  /* ── STATS ── */
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
  .stat-card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 12px; padding: 20px 16px; text-align: center;
    transition: border-color 0.3s, transform 0.3s;
    position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.3s;
  }
  .stat-card:hover { border-color: rgba(0,229,255,0.25); transform: translateY(-3px); }
  .stat-card:hover::before { opacity: 1; }
  .stat-val { font-size: 32px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--cyan); }
  .stat-lbl { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }

  /* ── CODE BLOCKS ── */
  .code-wrap {
    background: #070710; border: 1px solid var(--border);
    border-radius: 10px; overflow: hidden; margin: 16px 0;
  }
  .code-bar {
    display: flex; align-items: center; gap: 6px; padding: 10px 14px;
    background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border);
  }
  .code-dot { width: 10px; height: 10px; border-radius: 50%; }
  .code-title { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); margin-left: 6px; }
  pre {
    padding: 18px 20px; font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px; line-height: 1.7; overflow-x: auto;
    white-space: pre; color: #c8c8e0;
  }
  .kw  { color: var(--purple); }
  .fn  { color: var(--cyan); }
  .str { color: #98d982; }
  .cm  { color: #555570; font-style: italic; }
  .num { color: #f0a070; }

  /* ── FILE TREE ── */
  .tree {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: 20px 22px;
    font-family: 'JetBrains Mono', monospace; font-size: 12.5px;
    line-height: 2;
  }
  .tree-dir  { color: var(--cyan); }
  .tree-file { color: var(--muted); }
  .tree-note { color: #555570; }

  /* ── SETUP STEPS ── */
  .steps { display: flex; flex-direction: column; gap: 16px; margin: 20px 0; }
  .step {
    display: flex; gap: 16px; align-items: flex-start;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: 18px 20px;
    transition: border-color 0.3s;
  }
  .step:hover { border-color: rgba(187,134,252,0.25); }
  .step-num {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; color: #000;
  }
  .step-body h4 { font-size: 14px; font-weight: 600; margin-bottom: 6px; color: var(--text); }
  .step-body p  { font-size: 13px; color: var(--muted); margin: 0; }

  /* ── ENDPOINTS ── */
  .endpoints { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
  .endpoint {
    display: flex; align-items: center; gap: 12px;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 12px 16px;
  }
  .method {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    font-weight: 600; padding: 3px 10px; border-radius: 4px;
    flex-shrink: 0; letter-spacing: 0.05em;
  }
  .method-post { background: rgba(187,134,252,0.15); color: var(--purple); border: 1px solid rgba(187,134,252,0.25); }
  .method-get  { background: rgba(0,229,255,0.12); color: var(--cyan); border: 1px solid rgba(0,229,255,0.25); }
  .endpoint-path { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--text); }
  .endpoint-desc { font-size: 12px; color: var(--muted); margin-left: auto; }

  /* ── FOOTER ── */
  .footer {
    text-align: center; padding: 60px 0 20px;
    border-top: 1px solid var(--border); margin-top: 60px;
  }
  .footer-flow {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    color: var(--muted); letter-spacing: 0.1em; margin-bottom: 16px;
  }
  .footer-flow span { color: var(--cyan); }
  .footer p { font-size: 13px; color: #44445a; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.85)} }
  @keyframes glow    { 0%,100%{text-shadow:0 0 20px rgba(0,229,255,0.4)} 50%{text-shadow:0 0 40px rgba(0,229,255,0.8)} }
  @keyframes scroll  { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-24} }
  @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.5s; }

  @media(max-width:640px) {
    .pipeline { grid-template-columns: repeat(2,1fr); }
    .stats    { grid-template-columns: repeat(2,1fr); }
    .logo-ascii { font-size: 5px; }
  }
</style>
</head>
<body>

<canvas id="canvas"></canvas>

<div class="page">

  <!-- HERO -->
  <div class="hero">
    <div class="badge"><span class="badge-dot"></span>FAISS Vector Engine &nbsp;·&nbsp; 768-dim Embeddings &nbsp;·&nbsp; MPNet</div>
    <div class="logo-ascii">
███╗   ██╗███████╗██╗   ██╗██████╗  █████╗ ██╗     ███████╗██╗     ██╗██╗  ██╗
████╗  ██║██╔════╝██║   ██║██╔══██╗██╔══██╗██║     ██╔════╝██║     ██║╚██╗██╔╝
██╔██╗ ██║█████╗  ██║   ██║██████╔╝███████║██║     █████╗  ██║     ██║ ╚███╔╝ 
██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██╔══██║██║     ██╔══╝  ██║     ██║ ██╔██╗ 
██║ ╚████║███████╗╚██████╔╝██║  ██║██║  ██║███████╗██║     ███████╗██║██╔╝ ██╗
╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝╚═╝  ╚═╝</div>
    <p class="tagline">
      Semantic movie &amp; TV discovery powered by <em>neural embeddings</em> and
      <strong>cosine similarity search</strong>. It doesn't match keywords —
      it understands meaning.
    </p>

    <div class="shields">
      <span class="shield sh-cyan">🐍 Python 3.10+</span>
      <span class="shield sh-purple">⚡ FastAPI</span>
      <span class="shield sh-cyan">▲ Next.js 14</span>
      <span class="shield sh-purple">🔍 FAISS IndexFlatIP</span>
      <span class="shield sh-cyan">🤖 all-mpnet-base-v2</span>
      <span class="shield sh-green">⬛ MIT License</span>
    </div>
  </div>

  <!-- WHAT IS IT -->
  <div class="section">
    <div class="section-label">What is NeuralFlix</div>
    <p>NeuralFlix is a full-stack <strong>semantic recommendation engine</strong> for movies and TV series. Instead of relying on collaborative filtering or naive keyword matching, it converts every piece of content into a high-dimensional vector using a transformer model — then finds your nearest neighbors in that embedding space via FAISS.</p>
    <p>Tell it you love <em style="color:var(--cyan);font-style:normal">Inception</em>. It understands <em>why</em> — the psychological tension, the layered reality, the non-linear structure — and surfaces everything else that shares that DNA.</p>
  </div>

  <!-- ARCHITECTURE -->
  <div class="section">
    <div class="section-label">Architecture</div>
    <div class="pipeline">
      <div class="pipe-col">
        <div class="pipe-head">Data Layer</div>
        <div class="pipe-item"><strong>TMDB API</strong>Movie &amp; TV metadata</div>
        <div class="pipe-item"><strong>~1,048 titles</strong>Movies + TV combined</div>
        <div class="pipe-item"><strong>JSON database</strong>Local cache</div>
      </div>
      <div class="pipe-col">
        <div class="pipe-head">Embedding Layer</div>
        <div class="pipe-item"><strong>SentenceTransformers</strong>all-mpnet-base-v2</div>
        <div class="pipe-item"><strong>768-dim vectors</strong>Per entry</div>
        <div class="pipe-item"><strong>L2 normalized</strong>Unit sphere</div>
      </div>
      <div class="pipe-col">
        <div class="pipe-head">Search Layer</div>
        <div class="pipe-item"><strong>FAISS</strong>IndexFlatIP</div>
        <div class="pipe-item"><strong>Inner product</strong>= cosine similarity</div>
        <div class="pipe-item"><strong>k=8+buffer</strong>Then filter</div>
      </div>
      <div class="pipe-col">
        <div class="pipe-head">Serving Layer</div>
        <div class="pipe-item"><strong>FastAPI</strong>/recommend endpoint</div>
        <div class="pipe-item"><strong>Next.js 14</strong>React frontend</div>
        <div class="pipe-item"><strong>Framer Motion</strong>Animations</div>
      </div>
    </div>

    <!-- FLOW -->
    <div class="flow">
      <div class="flow-row">
        <div class="flow-node fn-cyan">User query (title)</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-gray">DB lookup</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-gray">Precomputed vector</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-purple">Normalize L2</div>
      </div>
      <div style="padding: 6px 0 6px 60px; color: var(--muted); font-size: 12px;">↓</div>
      <div class="flow-row">
        <div class="flow-node fn-purple">FAISS search</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-gray">Filter input title</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-gray">Cosine ranking</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-cyan">Explain match</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node fn-cyan">JSON → UI</div>
      </div>
    </div>
  </div>

  <!-- STATS -->
  <div class="section">
    <div class="section-label">Dataset</div>
    <div class="stats">
      <div class="stat-card">
        <div class="stat-val">1,048</div>
        <div class="stat-lbl">Total indexed</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" style="color:var(--purple)">623</div>
        <div class="stat-lbl">🎬 Movies</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">425</div>
        <div class="stat-lbl">📺 TV Series</div>
      </div>
    </div>
    <p>Built from TMDB via <strong>curated lists + genre discovery</strong> across 13 movie and 15 TV categories. Each entry stores genres, cast[8], directors, creators, plot, keywords[10], and rating. Genres are <strong>doubled in the embedding text</strong> for higher semantic weight.</p>
  </div>

  <!-- TECH STACK -->
  <div class="section">
    <div class="section-label">Tech Stack</div>
    <div class="tech-wrap">
      <table class="tech-table">
        <thead><tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>Embeddings</td><td>all-mpnet-base-v2</td><td>768-dim semantic text vectors</td></tr>
          <tr><td>Vector Index</td><td>FAISS IndexFlatIP</td><td>Exact cosine similarity search</td></tr>
          <tr><td>Data Source</td><td>TMDB API v3</td><td>Movie &amp; TV metadata, cast, keywords</td></tr>
          <tr><td>Backend</td><td>FastAPI + Uvicorn</td><td>REST API, CORS, async handling</td></tr>
          <tr><td>Frontend</td><td>Next.js 14 + Tailwind</td><td>React UI with dark glass aesthetic</td></tr>
          <tr><td>Animation</td><td>Framer Motion</td><td>Neural loader, card reveals, transitions</td></tr>
          <tr><td>Icons</td><td>Lucide React</td><td>Minimal icon system</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- GETTING STARTED -->
  <div class="section">
    <div class="section-label">Getting Started</div>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Build the database &amp; FAISS index</h4>
          <p>Run <code style="color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:12px">movie_recommender.ipynb</code> cells in order — Cell 1 tests your TMDB key, Cell 2 builds <code style="color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:12px">media_database.json</code>, Cell 3 encodes vectors and writes <code style="color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:12px">media.faiss</code>.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Install dependencies</h4>
          <p>Python: <code style="color:var(--purple);font-family:'JetBrains Mono',monospace;font-size:12px">pip install faiss-cpu sentence-transformers fastapi uvicorn numpy pandas tqdm requests</code></p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Start the backend</h4>
          <p><code style="color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:12px">uvicorn main:app --reload --port 8000</code> &nbsp;—&nbsp; API live at localhost:8000</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h4>Start the frontend</h4>
          <p><code style="color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:12px">cd frontend &amp;&amp; npm install &amp;&amp; npm run dev</code> &nbsp;—&nbsp; Open localhost:3000</p>
        </div>
      </div>
    </div>

    <div class="endpoints">
      <div class="endpoint">
        <span class="method method-post">POST</span>
        <span class="endpoint-path">/recommend</span>
        <span class="endpoint-desc">{ "title": "Inception", "top_k": 8 }</span>
      </div>
      <div class="endpoint">
        <span class="method method-get">GET</span>
        <span class="endpoint-path">/api/titles</span>
        <span class="endpoint-desc">→ flat list of all titles for autocomplete</span>
      </div>
    </div>
  </div>

  <!-- CODE BLOCK -->
  <div class="section">
    <div class="section-label">Embedding Strategy</div>
    <p>Each entry is encoded as a single weighted string. Genres appear twice to increase their semantic prominence. Directors and TV show creators are treated symmetrically so cross-media recommendations feel coherent.</p>
    <div class="code-wrap">
      <div class="code-bar">
        <div class="code-dot" style="background:#ff5f56"></div>
        <div class="code-dot" style="background:#ffbd2e"></div>
        <div class="code-dot" style="background:#27c93f"></div>
        <span class="code-title">main.py — content_to_text()</span>
      </div>
      <pre><span class="kw">def</span> <span class="fn">content_to_text</span>(item: <span class="fn">dict</span>) -> <span class="fn">str</span>:
    parts = [
        <span class="str">" "</span>.join(item.get(<span class="str">'genres'</span>, [])),     <span class="cm"># genres doubled</span>
        <span class="str">" "</span>.join(item.get(<span class="str">'genres'</span>, [])),     <span class="cm"># for extra weight</span>
        <span class="str">" "</span>.join(item.get(<span class="str">'directors'</span>, [])),
        <span class="str">" "</span>.join(item.get(<span class="str">'creators'</span>, [])),  <span class="cm"># TV show-runners</span>
        <span class="str">" "</span>.join(item.get(<span class="str">'cast'</span>, [])[:5]),
        item.get(<span class="str">'plot'</span>, <span class="str">''</span>),
        <span class="str">" "</span>.join(item.get(<span class="str">'keywords'</span>, [])),
    ]
    <span class="kw">return</span> <span class="str">" "</span>.join(p <span class="kw">for</span> p <span class="kw">in</span> parts <span class="kw">if</span> p).strip()</pre>
    </div>
  </div>

  <!-- PROJECT STRUCTURE -->
  <div class="section">
    <div class="section-label">Project Structure</div>
    <div class="tree">
<span class="tree-dir">neuralflix/</span>
├── <span class="tree-file">main.py</span>                    <span class="tree-note">FastAPI backend</span>
├── <span class="tree-file">movie_recommender.ipynb</span>    <span class="tree-note">Data pipeline (DB + FAISS index)</span>
├── <span class="tree-file">media_database.json</span>        <span class="tree-note">Generated: full content metadata</span>
├── <span class="tree-file">media.faiss</span>                <span class="tree-note">Generated: FAISS vector index</span>
├── <span class="tree-file">embeddings.npy</span>             <span class="tree-note">Generated: raw embedding matrix</span>
├── <span class="tree-file">media_titles.json</span>          <span class="tree-note">Generated: title list for autocomplete</span>
│
└── <span class="tree-dir">frontend/</span>
    ├── <span class="tree-dir">components/</span>
    │   ├── <span class="tree-file">HeroSection.jsx</span>    <span class="tree-note">Animated landing + search bar</span>
    │   ├── <span class="tree-file">SearchBar.jsx</span>      <span class="tree-note">Autocomplete with keyboard nav</span>
    │   ├── <span class="tree-file">RecommendationGrid.jsx</span>
    │   ├── <span class="tree-file">MovieCard.jsx</span>      <span class="tree-note">Hover-reveal poster card</span>
    │   ├── <span class="tree-file">NeuralLoader.jsx</span>   <span class="tree-note">Animated FAISS progress</span>
    │   └── <span class="tree-file">TerminalPanel.jsx</span>  <span class="tree-note">Nerd-mode live log panel</span>
    └── <span class="tree-dir">public/</span>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-flow">
      <span>[ FAISS VECTOR ENGINE ]</span> ──► <span>[ 768-DIM EMBEDDINGS ]</span> ──► <span>[ COSINE SIMILARITY ]</span>
    </div>
    <p>Built for people who are serious about what they watch next.</p>
    <p style="margin-top:8px;font-size:11px;color:#33334a">TMDB · sentence-transformers · FAISS · FastAPI · Framer Motion</p>
  </div>

</div>

<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], lines = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r  = Math.random() * 1.5 + 0.5;
    this.a  = Math.random() * 0.4 + 0.1;
    this.cyan = Math.random() > 0.5;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.cyan
      ? `rgba(0,229,255,${this.a})`
      : `rgba(187,134,252,${this.a})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

let t = 0;
function draw() {
  ctx.clearRect(0, 0, W, H);
  t += 0.003;

  // draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const a = (1 - d/100) * 0.08;
        ctx.strokeStyle = `rgba(0,229,255,${a})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => { p.update(); p.draw(); });

  // floating glow orbs
  const gx1 = W * 0.2 + Math.sin(t * 0.7) * 60;
  const gy1 = H * 0.25 + Math.cos(t * 0.5) * 40;
  const g1 = ctx.createRadialGradient(gx1, gy1, 0, gx1, gy1, 200);
  g1.addColorStop(0, 'rgba(0,229,255,0.03)');
  g1.addColorStop(1, 'rgba(0,229,255,0)');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  const gx2 = W * 0.8 + Math.sin(t * 0.4 + 1) * 80;
  const gy2 = H * 0.6 + Math.cos(t * 0.6) * 50;
  const g2 = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, 220);
  g2.addColorStop(0, 'rgba(187,134,252,0.025)');
  g2.addColorStop(1, 'rgba(187,134,252,0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  requestAnimationFrame(draw);
}
draw();

// Scroll reveal
const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationName = 'fadeUp';
      e.target.style.animationDuration = '0.6s';
      e.target.style.animationFillMode = 'both';
    }
  });
}, { threshold: 0.1 });
sections.forEach(s => { s.style.opacity = '0'; io.observe(s); });

// Counter animation
function animateCounters() {
  document.querySelectorAll('.stat-val').forEach(el => {
    const target = parseInt(el.textContent.replace(',',''));
    if (isNaN(target)) return;
    let start = 0, dur = 1200, step = 16;
    const inc = target / (dur / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); return; }
      el.textContent = Math.floor(start).toLocaleString();
    }, step);
  });
}

const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
}, { threshold: 0.5 });
const statsEl = document.querySelector('.stats');
if (statsEl) statsObs.observe(statsEl);
</script>
</body>
</html>
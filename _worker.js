export default {
  async fetch(request, env) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MAYAJAAL ONLINE // OFFICIAL BOT</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --neon-green: #00ff87;
      --neon-cyan: #60efff;
      --card-bg: rgba(6, 18, 12, 0.85);
      --border-cyan: rgba(0, 255, 135, 0.35);
      --border-glow: 0 0 15px rgba(0, 255, 135, 0.25);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 10%, #062419 0%, #020704 60%, #000201 100%);
      color: #e0fff0;
      font-family: 'Rajdhani', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.8rem;
    }
    nav {
      width: 100%; max-width: 500px; display: flex; align-items: center;
      justify-content: space-between; padding: 0.6rem 0.8rem;
      border-bottom: 1px solid rgba(0, 255, 135, 0.15); margin-bottom: 1.2rem;
    }
    .brand { font-family: 'Orbitron', sans-serif; font-weight: 900; letter-spacing: 1.5px; font-size: 0.95rem; color: #fff; }
    .brand span { color: var(--neon-green); font-size: 0.75rem; display: block; font-weight: 500; letter-spacing: 2px; }
    .nav-status {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: rgba(0, 255, 135, 0.1); border: 1px solid var(--neon-green);
      padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.75rem; color: var(--neon-green); font-weight: 700;
    }
    .status-dot { width: 7px; height: 7px; background: var(--neon-green); border-radius: 50%; box-shadow: 0 0 8px var(--neon-green); }
    .hero { text-align: center; margin-bottom: 1.5rem; }
    .cloud-icon { font-size: 3rem; color: var(--neon-green); filter: drop-shadow(0 0 18px var(--neon-green)); margin-bottom: 0.3rem; }
    .hero-title { font-family: 'Orbitron', sans-serif; font-size: 2rem; font-weight: 900; letter-spacing: 3px; color: #ffffff; text-shadow: 0 0 20px rgba(0, 255, 135, 0.6); line-height: 1.1; }
    .hero-sub { color: var(--neon-green); font-size: 1.4rem; margin-top: 0.2rem; text-shadow: 0 0 15px var(--neon-green); }
    .hero-pill {
      display: inline-block; margin-top: 0.8rem; background: rgba(0, 255, 135, 0.08);
      border: 1px solid var(--neon-green); border-radius: 30px; padding: 0.35rem 1.4rem;
      font-family: 'Orbitron', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 2px;
      color: var(--neon-green); box-shadow: 0 0 12px rgba(0, 255, 135, 0.25);
    }
    .hero-tags { margin-top: 0.6rem; font-size: 0.8rem; letter-spacing: 3px; color: #79a891; font-weight: 600; }
    .container { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 1.4rem; }
    .panel {
      background: var(--card-bg); border: 1px solid var(--border-cyan); box-shadow: var(--border-glow);
      border-radius: 16px; padding: 1.2rem; backdrop-filter: blur(10px);
    }
    .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
    .header-left { display: flex; align-items: center; gap: 0.6rem; }
    .icon-box {
      width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--neon-green);
      display: flex; align-items: center; justify-content: center; color: var(--neon-green);
      box-shadow: 0 0 8px rgba(0, 255, 135, 0.4); font-size: 1rem;
    }
    .panel-title { font-family: 'Orbitron', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; letter-spacing: 1px; }
    .panel-desc { font-size: 0.72rem; color: #709f87; text-transform: uppercase; letter-spacing: 1px; }
    .badge-pill {
      font-size: 0.68rem; font-family: 'Orbitron', sans-serif; padding: 0.25rem 0.6rem;
      border-radius: 12px; border: 1px solid var(--neon-green); color: var(--neon-green); background: rgba(0, 255, 135, 0.1);
    }
    .tab-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1rem; }
    .tab-btn {
      background: rgba(0, 20, 10, 0.6); border: 1px solid rgba(0, 255, 135, 0.25); color: #8bb39c;
      padding: 0.7rem; border-radius: 8px; font-family: 'Rajdhani', sans-serif; font-size: 0.95rem;
      font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    }
    .tab-btn.active {
      background: var(--neon-green); color: #03140a; border-color: var(--neon-green); box-shadow: 0 0 15px rgba(0, 255, 135, 0.5);
    }
    .input-wrapper { position: relative; margin-bottom: 1rem; }
    .input-box {
      width: 100%; background: #020d07; border: 1px solid rgba(0, 255, 135, 0.35);
      border-radius: 8px; padding: 0.85rem 1rem 0.85rem 2.4rem; color: #fff; font-size: 0.9rem; outline: none;
    }
    .input-icon { position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: var(--neon-green); font-size: 0.9rem; }
    .action-btn {
      width: 100%; background: var(--neon-green); color: #020f06; border: none; border-radius: 8px;
      padding: 0.9rem; font-family: 'Orbitron', sans-serif; font-size: 0.95rem; font-weight: 900;
      letter-spacing: 2px; cursor: pointer; box-shadow: 0 0 20px rgba(0, 255, 135, 0.4);
      display: flex; align-items: center; justify-content: center; gap: 0.6rem;
    }
    .feature-grid {
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-top: 1.2rem;
      border-top: 1px solid rgba(0, 255, 135, 0.12); padding-top: 1rem; text-align: center;
    }
    .feature-item h4 { font-size: 0.75rem; font-weight: 700; color: #fff; margin-top: 0.2rem; }
    .feature-item p { font-size: 0.65rem; color: #6d9681; }
    .feature-item span { font-size: 1rem; color: var(--neon-green); }
    .player-container {
      width: 100%; border-radius: 10px; background: #000; border: 1px solid rgba(0, 255, 135, 0.25);
      position: relative; min-height: 220px; display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    video { width: 100%; max-height: 280px; display: none; outline: none; }
    .player-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: #557c67; font-size: 0.85rem; }
    .play-btn-circle {
      width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--neon-green);
      display: flex; align-items: center; justify-content: center; color: var(--neon-green);
      font-size: 1.4rem; box-shadow: 0 0 15px rgba(0, 255, 135, 0.3);
    }
    footer {
      width: 100%; max-width: 480px; margin-top: 1.5rem; border-top: 1px solid rgba(0, 255, 135, 0.15);
      padding-top: 1rem; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; text-align: center; gap: 0.4rem;
    }
    .footer-col span { color: var(--neon-green); font-size: 1rem; }
    .footer-col h5 { font-size: 0.72rem; color: #fff; margin-top: 0.2rem; }
    .footer-col p { font-size: 0.62rem; color: #6d9681; }
    .copyright { margin-top: 1.2rem; font-size: 0.7rem; letter-spacing: 2px; color: #4b735f; text-align: center; }
  </style>
</head>
<body>
  <nav>
    <div class="brand">⚡ MAYAJAAL<span>ONLINE</span></div>
    <div class="nav-status"><div class="status-dot"></div>Online</div>
  </nav>

  <div class="hero">
    <div class="cloud-icon">☁</div>
    <h1 class="hero-title">MAYAJAAL</h1>
    <h2 class="hero-sub">OFFICIAL BOT</h2>
    <div class="hero-pill">CLOUDFLARE DIRECT ENGINE</div>
    <div class="hero-tags">FAST &nbsp;•&nbsp; SECURE &nbsp;•&nbsp; UNLIMITED</div>
  </div>

  <div class="container">
    <div class="panel">
      <div class="panel-header">
        <div class="header-left">
          <div class="icon-box">🔗</div>
          <div>
            <div class="panel-title">TERMINAL INPUT</div>
            <div class="panel-desc">Paste link or select file to stream</div>
          </div>
        </div>
        <div class="badge-pill">CLOUDFLARE DIRECT</div>
      </div>

      <div class="tab-row">
        <button id="tabLocal" class="tab-btn" onclick="setMode('local')">📁 LOCAL FILE</button>
        <button id="tabRemote" class="tab-btn active" onclick="setMode('remote')">🔗 REMOTE LINK</button>
      </div>

      <div id="formRemote">
        <div class="input-wrapper">
          <span class="input-icon">🔗</span>
          <input type="url" id="remoteUrl" class="input-box" placeholder="https://domain.com/video.mp4" />
        </div>
        <button class="action-btn" onclick="handleStreamUrl()">▶ STREAM URL</button>
      </div>

      <div id="formLocal" style="display:none;">
        <div class="input-wrapper">
          <span class="input-icon">📁</span>
          <input type="file" id="localFile" class="input-box" accept="video/*,audio/*" />
        </div>
        <button class="action-btn" onclick="handleUploadFile()">⚡ LOAD & PLAY</button>
      </div>

      <div class="feature-grid">
        <div class="feature-item"><span>⚡</span><h4>Direct Stream</h4><p>No Redirect</p></div>
        <div class="feature-item"><span>🛡</span><h4>Secure Link</h4><p>Cloudflare Powered</p></div>
        <div class="feature-item"><span>📶</span><h4>High Speed</h4><p>Global CDN</p></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="header-left">
          <div class="icon-box">▶</div>
          <div>
            <div class="panel-title">VIDEO PLAYER</div>
            <div class="panel-desc">STREAMING FROM CLOUDFLARE DIRECTLY</div>
          </div>
        </div>
        <div class="badge-pill" id="readyBadge">Ready</div>
      </div>

      <div class="player-container">
        <video id="player" controls playsinline></video>
        <div id="placeholder" class="player-placeholder">
          <div class="play-btn-circle">▶</div>
          <div>// NO SIGNAL LOADED</div>
        </div>
      </div>

      <a id="downloadBtn" class="action-btn" style="display:none; margin-top:1rem; text-decoration:none;" download="video.mp4">
        ⬇ DOWNLOAD FILE
      </a>
    </div>
  </div>

  <footer>
    <div class="footer-col"><span>🛡</span><h5>100% SECURE</h5><p>Your Links, Priority</p></div>
    <div class="footer-col"><span>☁</span><h5>CLOUDFLARE CDN</h5><p>Global Streaming</p></div>
    <div class="footer-col"><span>⚡</span><h5>HIGH QUALITY</h5><p>HD | FHD | 4K</p></div>
    <div class="footer-col"><span>♾</span><h5>UNLIMITED</h5><p>No Size Limit</p></div>
  </footer>

  <div class="copyright">• POWERED BY MAYAJAAL •</div>

  <script>
    function setMode(mode) {
      const isRemote = mode === 'remote';
      document.getElementById('formRemote').style.display = isRemote ? 'block' : 'none';
      document.getElementById('formLocal').style.display = isRemote ? 'none' : 'block';
      document.getElementById('tabRemote').className = 'tab-btn ' + (isRemote ? 'active' : '');
      document.getElementById('tabLocal').className = 'tab-btn ' + (isRemote ? '' : 'active');
    }
    function handleStreamUrl() {
      const url = document.getElementById('remoteUrl').value.trim();
      if (!url) return alert('Enter a valid direct video link!');
      startPlayer(url, 'STREAM_LINK');
    }
    function handleUploadFile() {
      const file = document.getElementById('localFile').files[0];
      if (!file) return alert('Select a video file first!');
      const objectUrl = URL.createObjectURL(file);
      startPlayer(objectUrl, file.name);
    }
    function startPlayer(source, name) {
      const video = document.getElementById('player');
      const placeholder = document.getElementById('placeholder');
      const dBtn = document.getElementById('downloadBtn');
      const badge = document.getElementById('readyBadge');

      placeholder.style.display = 'none';
      video.style.display = 'block';
      video.src = source;
      video.play().catch(e => console.log('Autoplay blocked'));

      dBtn.style.display = 'flex';
      dBtn.href = source;
      dBtn.setAttribute('download', name);
      badge.innerText = 'PLAYING';
      badge.style.color = '#60efff';
      badge.style.borderColor = '#60efff';
    }
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-cache"
      }
    });
  }
};

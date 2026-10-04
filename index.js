export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Direct App Stream Route (Aapke domain ka link jisse app open hota hai)
    if (url.pathname === '/stream' || url.pathname === '/play') {
      const targetUrl = url.searchParams.get('url');
      if (!targetUrl) {
        return new Response("No video link specified", { status: 400 });
      }

      // App ya browser ko video stream par redirect karega
      return Response.redirect(targetUrl, 302);
    }

    // 2. Terabox Resolver API
    if (url.pathname === '/api/resolve') {
      const targetUrl = url.searchParams.get('url');
      if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
      }

      try {
        const apiUrl = `https://terabox-api.graydeveloper.com/api?url=${encodeURIComponent(targetUrl)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        let streamUrl = '';
        let fileName = 'Mayajaal_Stream.mp4';

        if (data && data.status === 'success' && data.data) {
          streamUrl = data.data.downloadUrl || data.data.dlink || data.data.fastDownloadUrl || '';
          fileName = data.data.filename || fileName;
        } else if (data && data.dlink) {
          streamUrl = data.dlink;
          fileName = data.file_name || fileName;
        }

        if (!streamUrl) {
          streamUrl = targetUrl;
        }

        return new Response(JSON.stringify({ 
          success: true, 
          streamUrl: streamUrl, 
          fileName: fileName 
        }), {
          headers: { 'content-type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ 
          success: true, 
          streamUrl: targetUrl, 
          fileName: 'Mayajaal_Stream.mp4' 
        }), {
          headers: { 'content-type': 'application/json' }
        });
      }
    }

    // 3. Frontend Web Interface
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
      --card-bg: rgba(6, 18, 12, 0.88);
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
    .input-wrapper { position: relative; margin-bottom: 1rem; }
    .input-box {
      width: 100%; background: #020d07; border: 1px solid rgba(0, 255, 135, 0.35);
      border-radius: 8px; padding: 0.85rem 1rem 0.85rem 2.4rem; color: #fff; font-size: 0.9rem; outline: none;
    }
    .input-icon { position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: var(--neon-green); font-size: 0.9rem; }
    .action-btn {
      width: 100%; background: var(--neon-green); color: #020f06; border: none; border-radius: 8px;
      padding: 0.9rem; font-family: 'Orbitron', sans-serif; font-size: 0.95rem; font-weight: 900;
      letter-spacing: 1.5px; cursor: pointer; box-shadow: 0 0 20px rgba(0, 255, 135, 0.4);
      display: flex; align-items: center; justify-content: center; gap: 0.6rem; text-decoration: none;
    }
    .app-play-btn {
      background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
      color: #011409; font-size: 1rem; font-weight: 900;
      box-shadow: 0 0 25px rgba(96, 239, 255, 0.6);
    }
    .link-display {
      background: #010a05; border: 1px dashed rgba(0, 255, 135, 0.3);
      padding: 0.6rem; border-radius: 6px; font-size: 0.75rem; color: #a3ffd2;
      word-break: break-all; margin-bottom: 0.8rem;
    }
    .download-app-link {
      display: block; text-align: center; margin-top: 0.6rem; font-size: 0.8rem;
      color: var(--neon-cyan); text-decoration: underline; cursor: pointer;
    }
    .player-container {
      width: 100%; border-radius: 10px; background: #000; border: 1px solid rgba(0, 255, 135, 0.25);
      position: relative; min-height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    video { width: 100%; max-height: 260px; display: none; outline: none; }
    .player-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: #557c67; font-size: 0.85rem; }
    .play-btn-circle {
      width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--neon-green);
      display: flex; align-items: center; justify-content: center; color: var(--neon-green);
      font-size: 1.4rem; box-shadow: 0 0 15px rgba(0, 255, 135, 0.3);
    }
    .btn-group { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <nav>
    <div class="brand">⚡ MAYAJAAL<span>ONLINE</span></div>
    <div class="nav-status"><div class="status-dot"></div>Engine Active</div>
  </nav>

  <div class="hero">
    <div class="cloud-icon">☁</div>
    <h1 class="hero-title">MAYAJAAL</h1>
    <h2 class="hero-sub">STREAM CONVERTER</h2>
    <div class="hero-pill">APP LINK GENERATOR</div>
  </div>

  <div class="container">
    <div class="panel">
      <div class="panel-header">
        <div class="header-left">
          <div class="icon-box">🔗</div>
          <div>
            <div class="panel-title">PASTE TERABOX LINK</div>
            <div class="panel-desc">Convert to Mayajaal Domain Link</div>
          </div>
        </div>
        <div class="badge-pill">DOMAIN ENGINE</div>
      </div>

      <div class="input-wrapper">
        <span class="input-icon">🔗</span>
        <input type="url" id="linkInput" class="input-box" placeholder="https://teraboxapp.com/s/..." />
      </div>

      <button id="processBtn" class="action-btn" onclick="convertAndStream()">
        ⚡ CONVERT & GENERATE
      </button>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="header-left">
          <div class="icon-box">▶</div>
          <div>
            <div class="panel-title">MAYAJAAL APP STREAM</div>
            <div class="panel-desc">DIRECT PLAYBACK INTENT</div>
          </div>
        </div>
        <div class="badge-pill" id="readyBadge">Standby</div>
      </div>

      <div class="player-container">
        <video id="player" controls playsinline></video>
        <div id="placeholder" class="player-placeholder">
          <div class="play-btn-circle">▶</div>
          <div id="placeholderText">// CONVERT A LINK TO START</div>
        </div>
      </div>

      <div id="actionArea" class="btn-group" style="display:none;">
        <div class="link-display" id="generatedDomainUrl"></div>

        <a id="openAppBtn" class="action-btn app-play-btn" href="#">
          🚀 OPEN & PLAY IN MAYAJAAL APP
        </a>

        <a id="downloadBtn" class="action-btn" style="text-decoration:none;" download="Mayajaal_Stream.mp4">
          ⬇ DIRECT DOWNLOAD
        </a>

        <a href="https://mayajaal.online/download.html?v=4" class="download-app-link" target="_blank">
          Don't have the App? Download Mayajaal App (v=4)
        </a>
      </div>
    </div>
  </div>

  <script>
    let mayajaalDomainLink = '';
    const APP_DOWNLOAD_PAGE = 'https://mayajaal.online/download.html?v=4';

    async function convertAndStream() {
      const input = document.getElementById('linkInput').value.trim();
      if (!input) return alert('Terabox link paste karein!');

      const btn = document.getElementById('processBtn');
      const badge = document.getElementById('readyBadge');
      const placeholderText = document.getElementById('placeholderText');

      btn.innerText = '⏳ CONVERTING LINK...';
      btn.disabled = true;
      placeholderText.innerText = '// RESOLVING DIRECT STREAM...';

      try {
        const res = await fetch('/api/resolve?url=' + encodeURIComponent(input));
        const data = await res.json();

        const rawStream = (data && data.streamUrl) ? data.streamUrl : input;
        
        // Aapke domain ka format banayenge jo aapke app ko trigger karega
        mayajaalDomainLink = window.location.origin + '/play?url=' + encodeURIComponent(rawStream);

        // Preview player load karein
        const video = document.getElementById('player');
        const placeholder = document.getElementById('placeholder');
        const actionArea = document.getElementById('actionArea');
        const dBtn = document.getElementById('downloadBtn');
        const openBtn = document.getElementById('openAppBtn');
        const linkDisplay = document.getElementById('generatedDomainUrl');

        placeholder.style.display = 'none';
        video.style.display = 'block';
        video.src = rawStream;

        // Domain Link ko UI par set karein
        linkDisplay.innerText = 'Generated App Link: ' + mayajaalDomainLink;
        openBtn.href = mayajaalDomainLink;
        
        // Click event to fallback if app not installed
        openBtn.onclick = function() {
          const start = Date.now();
          setTimeout(function() {
            if (Date.now() - start < 2000) {
              window.location.href = APP_DOWNLOAD_PAGE;
            }
          }, 1500);
        };

        dBtn.href = rawStream;
        dBtn.setAttribute('download', data.fileName || 'Mayajaal_Stream.mp4');

        badge.innerText = 'CONVERTED';
        badge.style.color = '#00ff87';
        badge.style.borderColor = '#00ff87';
        actionArea.style.display = 'flex';
        btn.innerText = '✔ READY';

      } catch (err) {
        alert('Error resolving link. Trying direct domain route.');
        mayajaalDomainLink = window.location.origin + '/play?url=' + encodeURIComponent(input);
        document.getElementById('openAppBtn').href = mayajaalDomainLink;
        document.getElementById('actionArea').style.display = 'flex';
      } finally {
        btn.disabled = false;
        btn.innerText = '⚡ CONVERT & GENERATE';
      }
    }
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-cache'
      }
    });
  }
};

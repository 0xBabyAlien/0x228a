(function(){
  "use strict";
  const VW = 1440, VH = 900;
  const desktop = document.getElementById('desktop');
  const screenWrap = document.getElementById('screen-wrap');
  let scale = 1;

  function fitScreen(){
    const maxW = window.innerWidth * 0.94;
    const maxH = window.innerHeight * 0.88;
    scale = Math.min(maxW / VW, maxH / VH);
    scale = Math.max(0.24, Math.min(scale, 1.35));
    screenWrap.style.width = (VW*scale) + 'px';
    screenWrap.style.height = (VH*scale) + 'px';
    desktop.style.transform = 'translate(-50%,-50%) scale(' + scale + ')';
  }
  window.addEventListener('resize', fitScreen);
  window.addEventListener('orientationchange', fitScreen);
  fitScreen();

  /* ---------- CLOCK ---------- */
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  function pad(n){ return n.toString().padStart(2,'0'); }
  function updateClock(){
    const d = new Date();
    const t = pad(d.getHours())+':'+pad(d.getMinutes());
    document.getElementById('clock').textContent = days[d.getDay()]+' '+t;
    const lt = document.getElementById('lock-time');
    const ld = document.getElementById('lock-date');
    if(lt){ lt.textContent = t; ld.textContent = days[d.getDay()]+', '+d.getDate()+' '+
      ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]+' '+d.getFullYear(); }
  }
  updateClock(); setInterval(updateClock, 1000);

  /* ---------- UPTIME ---------- */
  const bootTime = Date.now();
  setInterval(()=>{
    const s = Math.floor((Date.now()-bootTime)/1000);
    const m = Math.floor(s/60), sec = s%60;
    const el = document.getElementById('uptime-val');
    if(el) el.textContent = (m>0? m+' min ':'') + sec + ' sec';
  }, 1000);

  /* ---------- WORKSPACES ---------- */
  document.querySelectorAll('.ws').forEach(ws=>{
    ws.addEventListener('click', ()=>{
      document.querySelectorAll('.ws').forEach(x=>x.classList.remove('active'));
      ws.classList.add('active');
    });
  });

  /* ---------- TOAST ---------- */
  let toastTimer;
  function toast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
  }

  /* ---------- WINDOW MANAGER ---------- */
  let zTop = 10;
  const windows = {};
  document.querySelectorAll('.window').forEach(w=>{
    const id = w.id.replace('win-','');
    windows[id] = w;
    w.style.zIndex = zTop++;
  });

  function focusWindow(w){
    zTop++; w.style.zIndex = zTop;
  }
  function openWindow(id){
    const w = windows[id];
    if(!w) return;
    w.style.display = 'flex';
    focusWindow(w);
    const dockItem = document.querySelector('.dock-item[data-open="'+id+'"]');
    if(dockItem) dockItem.classList.add('running');
    if(id === 'terminal'){
      const inp = document.getElementById('term-input');
      setTimeout(()=>inp.focus(), 30);
    }
  }
  function closeWindow(w){
    w.style.display = 'none';
  }

  document.querySelectorAll('[data-open]').forEach(el=>{
    el.addEventListener('click', ()=> openWindow(el.getAttribute('data-open')));
    el.addEventListener('keydown', e=>{ if(e.key==='Enter') openWindow(el.getAttribute('data-open')); });
  });
  document.querySelectorAll('[data-toast]').forEach(el=>{
    el.addEventListener('click', ()=> toast(el.getAttribute('data-toast')));
  });
  document.querySelector('[data-action="trash"]').addEventListener('click', ()=> toast('Trash is empty.'));

  document.querySelectorAll('.window .titlebar').forEach(bar=>{
    const w = bar.closest('.window');
    bar.querySelector('[data-act="close"]').addEventListener('click', e=>{ e.stopPropagation(); closeWindow(w); });
    bar.querySelector('[data-act="min"]').addEventListener('click', e=>{ e.stopPropagation(); closeWindow(w); });
    bar.querySelector('[data-act="max"]').addEventListener('click', e=>{
      e.stopPropagation();
      if(w.dataset.maxed === '1'){
        w.style.left = w.dataset.prevLeft; w.style.top = w.dataset.prevTop;
        w.style.width = w.dataset.prevW; w.style.height = w.dataset.prevH;
        w.dataset.maxed = '0';
      } else {
        w.dataset.prevLeft = w.style.left; w.dataset.prevTop = w.style.top;
        w.dataset.prevW = w.style.width; w.dataset.prevH = w.style.height;
        w.style.left = '10px'; w.style.top = '44px';
        w.style.width = (VW-20)+'px'; w.style.height = (VH-100)+'px';
        w.dataset.maxed = '1';
      }
    });
    w.addEventListener('pointerdown', ()=> focusWindow(w));

    let dragging=false, sx=0, sy=0, sl=0, st=0;
    bar.addEventListener('pointerdown', e=>{
      if(e.target.closest('.tbtn')) return;
      dragging = true;
      bar.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY;
      sl = parseFloat(w.style.left); st = parseFloat(w.style.top);
      focusWindow(w);
    });
    bar.addEventListener('pointermove', e=>{
      if(!dragging) return;
      const dx = (e.clientX - sx) / scale;
      const dy = (e.clientY - sy) / scale;
      let nl = sl + dx, nt = st + dy;
      nl = Math.max(0, Math.min(nl, VW - w.offsetWidth));
      nt = Math.max(30, Math.min(nt, VH - 40 - w.offsetHeight*0.2));
      w.style.left = nl + 'px'; w.style.top = nt + 'px';
    });
    bar.addEventListener('pointerup', ()=> dragging=false);
    bar.addEventListener('pointercancel', ()=> dragging=false);
  });

  /* ---------- TERMINAL ---------- */
  const out = document.getElementById('term-out');
  const input = document.getElementById('term-input');
  function line(html){
    const d = document.createElement('div');
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }
  function promptLine(cmd){
    line('<span class="prompt">0xbabyalien@arch</span> <span class="path">~</span> % '+escapeHtml(cmd));
  }
  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  const neofetch = [
    '       /\\\\           <b>0xbabyalien@arch</b>',
    '      /  \\\\          -----------------',
    '     /    \\\\         OS: 0xOS (Arch-based) x86_64',
    '    /------\\\\        Kernel: 6.9.4-arch1',
    '   /        \\\\       Shell: zsh 5.9',
    '  /__________\\\\      WM: Hyprland',
    '                     Terminal: kitty',
    '                     Theme: Catppuccin Mocha (custom)',
    '                     CPU: virtual/8-core',
  ].join('\n');

  const history = []; let hIdx = -1;

  function runCommand(cmd){
    const c = cmd.trim();
    if(c === '') return;
    history.push(c); hIdx = history.length;
    promptLine(cmd);
    const parts = c.split(' ');
    switch(parts[0]){
      case 'help':
        line('Available commands: <span class="dim">help, neofetch, whoami, about, ls, cat readme.md, date, clear</span>');
        break;
      case 'neofetch':
        line('<pre style="margin:0;font-family:inherit;">'+neofetch+'</pre>');
        break;
      case 'whoami':
        line('0xbabyalien');
        break;
      case 'about':
        line('A personal Linux-desktop-themed page — built with plain HTML/CSS/JS, looks identical on every device.');
        break;
      case 'ls':
        line('<span class="path">about.txt</span>  <span class="path">contact.txt</span>  <span class="path">projects/</span>  <span class="path">readme.md</span>  <span class="path">wallpapers/</span>');
        break;
      case 'date':
        line(new Date().toString());
        break;
      case 'clear':
        out.innerHTML = ''; return;
      case 'cat':
        if(parts[1] === 'readme.md'){
          line('<span class="dim">Opening the readme.md window to view & edit it.</span>');
          openWindow('editor');
        } else {
          line('<span class="err">cat: '+escapeHtml(parts[1]||'')+': file not found</span>');
        }
        break;
      case 'sudo':
        line('<span class="err">0xbabyalien is not in the sudoers file. This incident will be reported.</span> 😄');
        break;
      default:
        line('<span class="err">zsh: command not found: '+escapeHtml(parts[0])+'</span> — type <span class="dim">help</span>');
    }
  }

  line('<span class="dim">Welcome! Type </span><span class="prompt">help</span><span class="dim"> to see the command list.</span>');

  input.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){
      runCommand(input.value);
      input.value = '';
    } else if(e.key === 'ArrowUp'){
      if(hIdx > 0){ hIdx--; input.value = history[hIdx]; }
      e.preventDefault();
    } else if(e.key === 'ArrowDown'){
      if(hIdx < history.length-1){ hIdx++; input.value = history[hIdx]; }
      else { hIdx = history.length; input.value=''; }
      e.preventDefault();
    }
  });
  windows.terminal.addEventListener('pointerdown', ()=> setTimeout(()=>input.focus(),10));

  /* ---------- WALLPAPER ---------- */
  const wallpapers = [
    'radial-gradient(circle at 18% 22%, #7c5fc733 0%, transparent 42%), radial-gradient(circle at 82% 78%, #4fb8ac2e 0%, transparent 45%), radial-gradient(circle at 70% 10%, #f5a97f22 0%, transparent 40%), linear-gradient(160deg,#12131d 0%, #191a28 55%, #14151f 100%)',
    'radial-gradient(circle at 75% 25%, #f38ba833 0%, transparent 45%), radial-gradient(circle at 20% 80%, #eed49f22 0%, transparent 45%), linear-gradient(150deg,#161221 0%, #241a2e 60%, #14101c 100%)',
    'radial-gradient(circle at 30% 70%, #8bd5ca3a 0%, transparent 45%), radial-gradient(circle at 80% 20%, #c6a0f62e 0%, transparent 45%), linear-gradient(170deg,#0f1620 0%, #131c26 55%, #0e131b 100%)',
  ];
  let wallIdx = 0;
  function cycleWallpaper(){
    wallIdx = (wallIdx+1) % wallpapers.length;
    document.getElementById('wallpaper').style.background = wallpapers[wallIdx];
    toast('Wallpaper changed');
  }

  /* ---------- POWER MENU ---------- */
  const powerBtn = document.getElementById('powerbtn');
  const powerMenu = document.getElementById('powermenu');
  powerBtn.addEventListener('click', e=>{
    e.stopPropagation();
    powerMenu.classList.toggle('show');
  });
  document.getElementById('btn-lock').addEventListener('click', ()=>{ powerMenu.classList.remove('show'); showLock(); });
  document.getElementById('btn-wall').addEventListener('click', ()=>{ powerMenu.classList.remove('show'); cycleWallpaper(); });
  document.getElementById('btn-about-menu').addEventListener('click', ()=>{ powerMenu.classList.remove('show'); openWindow('about'); });
  document.addEventListener('click', ()=> powerMenu.classList.remove('show'));

  document.getElementById('dock-lock').addEventListener('click', showLock);

  /* ---------- LOCK SCREEN ---------- */
  const lock = document.getElementById('lockscreen');
  function showLock(){ lock.classList.add('show'); }
  lock.addEventListener('click', ()=> lock.classList.remove('show'));

  /* ---------- CONTEXT MENU ---------- */
  const ctx = document.getElementById('ctxmenu');
  function openCtx(x,y){
    ctx.style.left = Math.min(x, VW-200) + 'px';
    ctx.style.top = Math.min(y, VH-140) + 'px';
    ctx.classList.add('show');
  }
  desktop.addEventListener('contextmenu', e=>{
    e.preventDefault();
    const rect = desktop.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    openCtx(x,y);
  });
  let pressTimer;
  desktop.addEventListener('touchstart', e=>{
    const touch = e.touches[0];
    pressTimer = setTimeout(()=>{
      const rect = desktop.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / scale;
      const y = (touch.clientY - rect.top) / scale;
      openCtx(x,y);
    }, 550);
  }, {passive:true});
  desktop.addEventListener('touchend', ()=> clearTimeout(pressTimer));
  desktop.addEventListener('touchmove', ()=> clearTimeout(pressTimer));
  document.addEventListener('click', e=>{ if(!ctx.contains(e.target)) ctx.classList.remove('show'); });

  document.getElementById('ctx-wall').addEventListener('click', ()=>{ ctx.classList.remove('show'); cycleWallpaper(); });
  document.getElementById('ctx-icons').addEventListener('click', ()=>{ ctx.classList.remove('show'); toast('Icons are already tidy.'); });
  document.getElementById('ctx-about').addEventListener('click', ()=>{ ctx.classList.remove('show'); openWindow('about'); });

})();

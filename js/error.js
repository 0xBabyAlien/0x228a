  /* Same fixed-canvas scaling logic as index.html's script.js, so the
     desktop's proportions and behavior are identical on every screen size. */
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
  })();

  /* Extra "broken screen" burst: randomly scrambles the 404 digits and
     shakes the window for a moment, then snaps back. */
  (function(){
    "use strict";
    const text = document.getElementById('glitchText');
    const win = document.querySelector('.err-window');
    const desktop = document.getElementById('desktop');
    const wallpaper = document.getElementById('wallpaper');
    const original = text.getAttribute('data-text');
    const glyphChars = '#%&$XA0148!?';

    /* continuous low-level TV static, spikes during a burst via CSS opacity */
    const staticCanvas = document.getElementById('tv-static');
    const sctx = staticCanvas.getContext('2d');
    const sw = staticCanvas.width, sh = staticCanvas.height;
    function drawStatic(){
      const imgData = sctx.createImageData(sw, sh);
      for(let i=0;i<imgData.data.length;i+=4){
        const v = Math.random()*255;
        imgData.data[i]=v; imgData.data[i+1]=v; imgData.data[i+2]=v; imgData.data[i+3]=255;
      }
      sctx.putImageData(imgData, 0, 0);
    }
    if(!document.body.classList.contains('no-anim')){
      setInterval(drawStatic, 100);
    }

    function spawnGlitchBlocks(count){
      const colors = ['var(--red)','var(--teal)','var(--mauve)','var(--green)','#ffffff','#000000'];
      for(let i=0;i<count;i++){
        const b = document.createElement('div');
        b.className = 'glitch-block';
        const w = 20 + Math.random()*180;
        const h = 6 + Math.random()*36;
        const x = Math.random()*(1440-w);
        const y = Math.random()*(900-h);
        b.style.left = x+'px'; b.style.top = y+'px';
        b.style.width = w+'px'; b.style.height = h+'px';
        b.style.background = colors[Math.floor(Math.random()*colors.length)];
        desktop.appendChild(b);
        setTimeout(()=> b.remove(), 90 + Math.random()*140);
      }
    }

    function scramble(){
      if(document.body.classList.contains('no-anim')) return scheduleNext();
      let ticks = 0;
      const maxTicks = 5 + Math.floor(Math.random()*4);
      // whole-screen burst: window shakes, desktop shakes + RGB-splits + cracks + static + psychedelic wallpaper + pixel blocks
      win.classList.add('shake');
      desktop.classList.add('desktop-shake', 'desktop-rgb', 'desktop-crack', 'desktop-static');
      wallpaper.classList.add('psychedelic');
      spawnGlitchBlocks(8);
      const interval = setInterval(()=>{
        let s = '';
        for(let i=0;i<original.length;i++){
          s += Math.random() < 0.6 ? glyphChars[Math.floor(Math.random()*glyphChars.length)] : original[i];
        }
        text.textContent = s;
        text.setAttribute('data-text', s);
        if(Math.random() < 0.5) spawnGlitchBlocks(4);
        ticks++;
        if(ticks >= maxTicks){
          clearInterval(interval);
          text.textContent = original;
          text.setAttribute('data-text', original);
        }
      }, 60);
      setTimeout(()=>{
        win.classList.remove('shake');
        desktop.classList.remove('desktop-shake');
      }, 300);
      setTimeout(()=>{
        desktop.classList.remove('desktop-rgb', 'desktop-crack', 'desktop-static');
        wallpaper.classList.remove('psychedelic');
      }, 560);
      scheduleNext();
    }
    function scheduleNext(){
      setTimeout(scramble, 1800 + Math.random()*2600);
    }
    scheduleNext();
  })();

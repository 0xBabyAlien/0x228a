(function(){
  const loader = document.getElementById('boot-loader');
  if(!loader) return;

  const fill = loader.querySelector('.boot-bar-fill');
  const logText = loader.querySelector('.boot-log-text');

  const steps = [
    'Initializing kernel...',
    'Mounting filesystems...',
    'Starting window manager...',
    'Loading desktop environment...',
    'Welcome, 0xbabyalien'
  ];

  const total = steps.length;
  const BOOT_DURATION = 10000; // total boot duration in ms — change this to adjust duration
  const STEP_INTERVAL = BOOT_DURATION / total;
  let i = 0;

  function nextStep(){
    if(i >= total) return;
    if(logText) logText.textContent = steps[i];
    if(fill) fill.style.width = Math.round(((i + 1) / total) * 100) + '%';
    i++;
    if(i < total) setTimeout(nextStep, STEP_INTERVAL);
  }
  nextStep();

  const MIN_VISIBLE = BOOT_DURATION;
  const start = Date.now();

  function hideLoader(){
    const elapsed = Date.now() - start;
    const wait = Math.max(0, MIN_VISIBLE - elapsed);
    setTimeout(function(){
      loader.classList.add('boot-hidden');
      loader.addEventListener('transitionend', function once(){
        loader.remove();
        loader.removeEventListener('transitionend', once);
      });
    }, wait);
  }

  if(document.readyState === 'complete'){
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  // Safety net in case the 'load' event never fires
  setTimeout(hideLoader, BOOT_DURATION + 5000);
})();

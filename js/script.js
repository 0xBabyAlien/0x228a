(function(){
  "use strict";

  /* ---------- I18N ---------- */
  const I18N = {
    en: {
      wifi:"Wi-Fi", volume:"Volume", battery:"Battery", powerMenu:"Power menu",
      lockScreenBtn:"Lock Screen", changeWallpaperBtn:"Change Wallpaper", aboutSystemBtn:"About System",
      arrangeIconsBtn:"Arrange Icons",
      filesLabel:"Files", terminalLabel:"Terminal", aboutPcLabel:"About PC", exchangeLabel:"Exchange",
      whaleLabel:"Whale Radar", marketLabel:"Market", trashLabel:"Trash",
      editorLabel:"Editor", aboutLabel:"About", lockScreenLabel:"Lock screen",
      projectsLabel:"Projects", wallpapersLabel:"Wallpapers",
      readmeFileLabel:"Readme.md", contactFileLabel:"Contact.txt",
      editorTitle:"Readme.md — Editor",
      editorToolbar:"The text below can be edited directly (changes are not saved after refresh)",
      aboutTitle:"About This PC",
      aboutHost:"Host", aboutKernel:"Kernel", aboutShell:"Shell", aboutWM:"WM",
      aboutModel:"Model", aboutTerminal:"Terminal",
      aboutTheme:"Theme", aboutResolution:"Resolution", aboutUptime:"Uptime",
      marketColCoin:"Coin", marketColPrice:"Price", marketColChange:"24h %", marketColVol:"24h Vol",
      marketLoading:"Loading market data…", marketError:"Unable to load market data.",
      marketSourceLabel:"Data source: Chart via {chart} · List via {list}",
      whaleScanning:"Scanning Ethereum mainnet for large USDC / USDT transfers…",
      whaleRefresh:"Refresh now",
      whaleColToken:"Token", whaleColValue:"Value", whaleColFromTo:"From → To", whaleColAge:"Age",
      whaleEmpty:"No large transfers found in the latest blocks.",
      whaleErrorStatus:"Unable to reach Whale Radar API.",
      whaleErrorDetail:"Could not load data. This window needs the site deployed with /api/whale-radar and an ALCHEMY_API_KEY configured — it will not work when the file is opened locally.",
      whaleStatusTemplate:(count,minUsd,time)=> count+' transfer(s) ≥ $'+minUsd.toLocaleString('en-US')+' in the last 10 blocks · updated '+time,
      scanLabel:"Scan", scanPlaceholder:"Enter wallet address (0x...)", scanSearchBtn:"Search",
      scanColHash:"Tx Hash", scanColChain:"Chain", scanColType:"Type", scanColTime:"Time",
      scanTypeSend:"Send", scanTypeReceive:"Receive", scanTypeCreate:"Create",
      scanTypeApprove:"Approve", scanTypeCall:"Call",
      scanHint:"Enter a wallet address above and press search to load its latest transactions from Blockscout.",
      scanLoading:"Loading transactions from Blockscout…",
      scanEmpty:"No transactions found for this address.",
      scanInvalidAddress:"That doesn't look like a valid wallet address.",
      scanErrorStatus:"Unable to reach the Scan API.",
      scanErrorDetail:"Could not load data. This window needs the site deployed with /api/scan — it will not work when the file is opened locally.",
      memeLabel:"Meme",
      memeColToken:"Token", memeColPrice:"Price", memeColChange:"24h %", memeColVol:"24h Vol",
      memeLoading:"Loading meme tokens…", memeEmpty:"No meme tokens found on this network right now.",
      memeError:"Unable to load meme token data.",
      memeSourceLabel:"Source: DexScreener (ranked by 24h volume)",
      lockHint:"click / tap anywhere to unlock🔓",
      hintText:"this view looks identical on every device — 📱phone, 💻tablet, or 🖥PC",
      toastWallpaperChanged:"Wallpaper changed", toastIconsTidy:"Icons are already tidy.",
      toastEmptyForNow:"Empty for now.", toastTrashEmpty:"Trash is empty.",
      exchangeOpenTitle:(name)=> "Open "+name,
      termWelcomePrefix:"Welcome! Type ", termWelcomeSuffix:" to see the command list.",
      termHelpPrefix:"Available commands:",
      termAboutText:"A personal Linux-desktop-themed page — built with plain HTML/CSS/JS, looks identical on every device.",
      termCatOpening:"Opening the readme.md window to view & edit it.",
      termFileNotFound:"file not found",
      termSudoMsg:"0xbabyalien is not in the sudoers file. This incident will be reported.",
      termCmdNotFoundSuffix:" — type help",
      neofetchOS:"OS", neofetchKernel:"Kernel", neofetchShell:"Shell", neofetchWM:"WM",
      neofetchTerminal:"Terminal", neofetchTheme:"Theme", neofetchCPU:"CPU", neofetchModel:"Model",
      readmeContent:"# 0xbabyalien\n\nHey! This is a personal page themed like a Linux desktop.\nTry clicking the icons on the screen, opening the Terminal,\nor right-clicking the desktop to change the wallpaper.\n\n## About\n- Into on-chain research & smart contract exploration\n- Ricing Linux setups (Hyprland, Catppuccin)\n- Building small web3 projects & tooling\n\n## Contact\n- X / Twitter: @0xbabyalien\n- GitHub: github.com/0xbabyalien\n\nEdit this text however you like to turn it into your\nown profile page.",
      widgetBrowserTitle:"Browser", widgetPortfolioTitle:"Portfolio", widgetSettingsTitle:"Settings", widgetNotesTitle:"Sticky Notes",
      widgetTotalValue:"Total Value", widgetPlaceholderNote:"Type a quick note here...",
      widgetLabelGrid:"Desktop Grid", widgetLabelVignette:"Vignette", widgetLabelAnimations:"Animations", widgetLabelGlass:"Glassmorphism",
      mirrorLabel:"Link3 Mirror",
      atLabel:"💼",atLoading:"Loading capabilities…",atRefresh:"Refresh now",
      atEmpty:"No capabilities returned by the API.",
      atErrorStatus:"Unable to reach the Action Contracts API.",
      atErrorDetail:"Could not load data. This window needs the site deployed with /api/action-contracts — it will not work when the file is opened locally.",
      atStatusTemplate:(count,time)=> count+' capabilit'+(count===1?'y':'ies')+' available · updated '+time,
      gameLabel:"Game"
    },
    zh: {
      wifi:"Wi-Fi", volume:"音量", battery:"电池", powerMenu:"电源菜单",
      lockScreenBtn:"锁定屏幕", changeWallpaperBtn:"更换壁纸", aboutSystemBtn:"关于系统",
      arrangeIconsBtn:"整理图标",
      filesLabel:"文件", terminalLabel:"终端", aboutPcLabel:"关于本机", exchangeLabel:"交易所",
      whaleLabel:"巨鲸雷达", marketLabel:"行情", trashLabel:"回收站",
      editorLabel:"编辑器", aboutLabel:"关于", lockScreenLabel:"锁屏",
      projectsLabel:"项目", wallpapersLabel:"壁纸",
      readmeFileLabel:"自述.md", contactFileLabel:"联系方式.txt",
      editorTitle:"自述.md — 编辑器",
      editorToolbar:"下方文字可直接编辑（刷新后更改不会保存）",
      aboutTitle:"关于本机",
      aboutHost:"主机", aboutKernel:"内核", aboutShell:"终端环境", aboutWM:"窗口管理器",
      aboutModel:"型号", aboutTerminal:"终端",
      aboutTheme:"主题", aboutResolution:"分辨率", aboutUptime:"运行时间",
      marketColCoin:"币种", marketColPrice:"价格", marketColChange:"24小时涨跌", marketColVol:"24小时成交量",
      marketLoading:"正在加载行情数据…", marketError:"无法加载行情数据。",
      marketSourceLabel:"数据来源：图表 {chart} · 列表 {list}",
      whaleScanning:"正在扫描以太坊主网上的大额 USDC / USDT 转账…",
      whaleRefresh:"立即刷新",
      whaleColToken:"代币", whaleColValue:"金额", whaleColFromTo:"从 → 到", whaleColAge:"时间",
      whaleEmpty:"最近的区块中未发现大额转账。",
      whaleErrorStatus:"无法连接巨鲸雷达 API。",
      whaleErrorDetail:"数据加载失败。此窗口需要部署在配置了 /api/whale-radar 和 ALCHEMY_API_KEY 的服务器上——本地打开文件时无法使用。",
      whaleStatusTemplate:(count,minUsd,time)=> count+' 笔转账 ≥ $'+minUsd.toLocaleString('en-US')+'，来自最近 10 个区块 · 更新于 '+time,
      scanLabel:"扫描", scanPlaceholder:"输入钱包地址 (0x...)", scanSearchBtn:"搜索",
      scanColHash:"交易哈希", scanColChain:"链", scanColType:"类型", scanColTime:"时间",
      scanTypeSend:"转出", scanTypeReceive:"转入", scanTypeCreate:"创建合约",
      scanTypeApprove:"授权", scanTypeCall:"调用",
      scanHint:"在上方输入钱包地址并点击搜索，即可加载来自 Blockscout 的最新交易记录。",
      scanLoading:"正在从 Blockscout 加载交易记录…",
      scanEmpty:"未找到该地址的交易记录。",
      scanInvalidAddress:"这看起来不是一个有效的钱包地址。",
      scanErrorStatus:"无法连接 Scan API。",
      scanErrorDetail:"数据加载失败。此窗口需要部署在配置了 /api/scan 的服务器上——本地打开文件时无法使用。",
      memeLabel:"Meme",
      memeColToken:"代币", memeColPrice:"价格", memeColChange:"24小时涨跌", memeColVol:"24小时成交量",
      memeLoading:"正在加载 Meme 代币…", memeEmpty:"该网络暂时没有找到 Meme 代币。",
      memeError:"无法加载 Meme 代币数据。",
      memeSourceLabel:"数据来源：DexScreener（按24小时成交量排序）",
      lockHint:"点击 / 轻触任意处解锁🔓",
      hintText:"无论手机、平板还是电脑，这个界面看起来都一样",
      toastWallpaperChanged:"壁纸已更换", toastIconsTidy:"图标已经很整齐了。",
      toastEmptyForNow:"暂时是空的。", toastTrashEmpty:"回收站是空的。",
      exchangeOpenTitle:(name)=> "打开 "+name,
      termWelcomePrefix:"欢迎！输入 ", termWelcomeSuffix:" 查看命令列表。",
      termHelpPrefix:"可用命令：",
      termAboutText:"一个以 Linux 桌面为主题的个人主页——用纯 HTML/CSS/JS 打造，在任何设备上看起来都一样。",
      termCatOpening:"正在打开 readme.md 窗口以查看和编辑。",
      termFileNotFound:"未找到该文件",
      termSudoMsg:"0xbabyalien 不在 sudoers 文件中。此事件将被报告。",
      termCmdNotFoundSuffix:" — 输入 help 查看帮助",
      neofetchOS:"系统", neofetchKernel:"内核", neofetchShell:"终端环境", neofetchWM:"窗口管理器",
      neofetchTerminal:"终端模拟器", neofetchTheme:"主题", neofetchCPU:"处理器",neofetchModel:"型号",
      readmeContent:"# 0xbabyalien\n\n嘿！这是一个以 Linux 桌面为主题打造的个人主页。\n试着点击屏幕上的图标、打开终端，\n或者右键点击桌面来更换壁纸。\n\n## 关于\n- 专注于链上研究与智能合约探索\n- 折腾 Linux 环境配置（Hyprland、Catppuccin）\n- 打造一些小型 Web3 项目与工具\n\n## 联系方式\n- X / Twitter：@0xbabyalien\n- GitHub：github.com/0xbabyalien\n\n随意编辑这段文字，把它变成你自己的主页吧。",
      widgetBrowserTitle:"浏览器", widgetPortfolioTitle:"投资组合", widgetSettingsTitle:"设置", widgetNotesTitle:"便利贴",
      widgetTotalValue:"总价值", widgetPlaceholderNote:"在此输入快速笔记...",
      widgetLabelGrid:"桌面网格", widgetLabelVignette:"暗角效果", widgetLabelAnimations:"动画效果", widgetLabelGlass:"毛玻璃效果",
      mirrorLabel:"Link3 镜像",
      atLabel:"💼", atLoading:"正在加载能力列表…", atRefresh:"立即刷新",
      atEmpty:"API 未返回任何能力项。", atErrorStatus:"无法连接 Action Contracts API。",
      atErrorDetail:"数据加载失败。此窗口需要部署在配置了 /api/action-contracts 的服务器上——本地打开文件时无法使用。",
      atStatusTemplate:(count,time)=> count+' 项能力可用 · 更新于 '+time,
      gameLabel:"游戏"
    }
  };
  let currentLang = 'en';
  function T(key){
    return (I18N[currentLang] && I18N[currentLang][key] !== undefined) ? I18N[currentLang][key] : (I18N.en[key] || key);
  }

  function applyStaticTranslations(){
    document.documentElement.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      el.textContent = T(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el=>{
      el.setAttribute('title', T(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      el.setAttribute('placeholder', T(el.getAttribute('data-i18n-placeholder')));
    });
  }

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
  const DAY_NAMES = {
    en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    zh: ['周日','周一','周二','周三','周四','周五','周六']
  };
  const MONTH_NAMES = {
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    zh: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  };
  function pad(n){ return n.toString().padStart(2,'0'); }
  function updateClock(){
    const d = new Date();
    const t = pad(d.getHours())+':'+pad(d.getMinutes());
    const days = DAY_NAMES[currentLang] || DAY_NAMES.en;
    const months = MONTH_NAMES[currentLang] || MONTH_NAMES.en;
    document.getElementById('clock').textContent = days[d.getDay()]+' '+t;
    const lt = document.getElementById('lock-time');
    const ld = document.getElementById('lock-date');
    if(lt){ lt.textContent = t; ld.textContent = days[d.getDay()]+', '+d.getDate()+' '+
      months[d.getMonth()]+' '+d.getFullYear(); }
  }
  updateClock(); setInterval(updateClock, 1000);

  /* ---------- UPTIME ---------- */
  const bootTime = Date.now();
  setInterval(()=>{
    const s = Math.floor((Date.now()-bootTime)/1000);
    const m = Math.floor(s/60), sec = s%60;
    const el = document.getElementById('uptime-val');
    if(el){
      el.textContent = currentLang === 'zh'
        ? (m>0? m+' 分 ':'') + sec + ' 秒'
        : (m>0? m+' min ':'') + sec + ' sec';
    }
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
  const WINDOW_CLOSE_MS = 180;

  function openWindow(id){
    const w = windows[id];
    if(!w) return;
    clearTimeout(w._closeTimer);
    w.style.display = 'flex';
    w.classList.remove('win-closing');
    w.classList.remove('win-open');
    centerWindow(w);
    focusWindow(w);
    // force a reflow so the browser registers the "closed" state before
    // switching to "open" — otherwise the transition never plays.
    void w.offsetWidth;
    requestAnimationFrame(()=> w.classList.add('win-open'));
    const dockItem = document.querySelector('.dock-item[data-open="'+id+'"]');
    if(dockItem) dockItem.classList.add('running');
    if(id === 'terminal'){
      const inp = document.getElementById('term-input');
      setTimeout(()=>inp.focus(), 30);
    }
    if(id === 'whale'){
      startWhaleRadar();
    }
    if(id === 'market'){
      startMarket();
    }
    if(id === 'scan'){
      const inp = document.getElementById('scan-address-input');
      setTimeout(()=>{ if(inp) inp.focus(); }, 30);
    }
    if(id === 'meme'){
      startMeme();
    }
    if(id === 'at'){
      startAt();
    }
  }
  function centerWindow(w){
    const width = w.offsetWidth;
    const height = w.offsetHeight;
    const left = Math.max(0, (VW - width) / 2);
    const top = Math.max(30, (VH - height) / 2);
    w.style.left = left + 'px';
    w.style.top = top + 'px';
  }
  function closeWindow(w){
    w.classList.remove('win-open');
    w.classList.add('win-closing');
    clearTimeout(w._closeTimer);
    w._closeTimer = setTimeout(()=>{
      w.style.display = 'none';
      w.classList.remove('win-closing');
    }, WINDOW_CLOSE_MS);
  }

  document.querySelectorAll('[data-open]').forEach(el=>{
    el.addEventListener('click', ()=> openWindow(el.getAttribute('data-open')));
    el.addEventListener('keydown', e=>{ if(e.key==='Enter') openWindow(el.getAttribute('data-open')); });
  });
  document.querySelectorAll('[data-toast-key]').forEach(el=>{
    el.addEventListener('click', ()=> toast(T(el.getAttribute('data-toast-key'))));
  });
  document.querySelector('[data-action="trash"]').addEventListener('click', ()=> toast(T('toastTrashEmpty')));

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
    line('<span class="prompt">0xbabyalien@BBalien</span> <span class="path">~</span> % '+escapeHtml(cmd));
  }
  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  const neofetch = () => [
    '                     🌏🚀----🛰🛸----🌒☄----🪐👽',
    '       /\\\\           <b>0xbabyalien@BBalien</b>',
    '      /  \\\\          ------------------------------',
    '     /    \\\\         '+T('neofetchOS')+': GNU/LINUX unix (BBalien-based) x86_64',
    '    /------\\\\        '+T('neofetchKernel')+': 6.9.4-BBalien',
    '   /        \\\\       '+T('neofetchShell')+': kali 7.9',
    '  /__________\\\\      '+T('neofetchWM')+': Hyprland',
    '                     '+T('neofetchTerminal')+': ubuntu 14.04 LTS',
    '                     '+T('neofetchTheme')+': Catppuccin Mocha (Gnome)',
    '                     '+T('neofetchModel')+': debian, kali, ubuntu',
    '                     '+T('neofetchCPU')+': virtual/8-core',
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
        line(T('termHelpPrefix')+' <span class="dim">help, neofetch, whoami, about, ls, cat readme.md, date, clear</span>');
        break;
      case 'neofetch':
        line('<pre style="margin:0;font-family:inherit;">'+neofetch()+'</pre>');
        break;
      case 'whoami':
        line('0xbabyalien');
        break;
      case 'about':
        line(T('termAboutText'));
        break;
      case 'ls':
        line('<span class="path">About.txt</span>  <span class="path">'+T('contactFileLabel')+'</span>  <span class="path">Projects/</span>  <span class="path">'+T('readmeFileLabel')+'</span>  <span class="path">Wallpapers/</span>');
        break;
      case 'date':
        line(new Date().toString());
        break;
      case 'clear':
        out.innerHTML = ''; return;
      case 'cat':
        if(parts[1] === 'readme.md'){
          line('<span class="dim">'+T('termCatOpening')+'</span>');
          openWindow('editor');
        } else {
          line('<span class="err">cat: '+escapeHtml(parts[1]||'')+': '+T('termFileNotFound')+'</span>');
        }
        break;
      case 'sudo':
        line('<span class="err">'+T('termSudoMsg')+'</span> 😄');
        break;
      default:
        line('<span class="err">kali: command not found: '+escapeHtml(parts[0])+'</span>'+T('termCmdNotFoundSuffix'));
    }
  }

  function printWelcome(){
    line('<span class="dim">'+T('termWelcomePrefix')+'</span><span class="prompt">help</span><span class="dim">'+T('termWelcomeSuffix')+'</span>');
  }
  printWelcome();

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
    toast(T('toastWallpaperChanged'));
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
  document.getElementById('ctx-icons').addEventListener('click', ()=>{ ctx.classList.remove('show'); toast(T('toastIconsTidy')); });
  document.getElementById('ctx-about').addEventListener('click', ()=>{ ctx.classList.remove('show'); openWindow('about'); });


  /* ---------- EXCHANGE.APP ---------- */
  const EXCHANGES = [
    { name: "Binance", url: "https://www.bmwweb.biz/activity/referral-entry/CPA?ref=CPA_0090JQX9TW", icon: "https://assets.coingecko.com/markets/images/52/large/binance.jpg?1706864274", desc: "One of the world's largest crypto exchanges, offering spot trading, futures, and a wide range of digital assets.", desc_zh: "全球最大的加密货币交易所之一，提供现货交易、合约交易及丰富的数字资产。" },
    { name: "Coinbase", url: "https://www.coinbase.com/", icon: "https://assets.coingecko.com/markets/images/23/large/Coinbase_Coin_Primary.png?1706864258", desc: "A major U.S.-based crypto platform known for its simple interface, security focus, and beginner-friendly experience.", desc_zh: "美国主流加密货币平台，以简洁界面、安全性和新手友好著称。" },
    { name: "OKX", url: "https://okx.ac/join/14970201", icon: "https://assets.coingecko.com/markets/images/96/large/WeChat_Image_20220117220452.png?1706864283", desc: "A global crypto exchange offering spot, derivatives, Web3 tools, and a broad range of trading products.", desc_zh: "全球性加密货币交易所，提供现货、衍生品、Web3 工具及多样化交易产品。" },
    { name: "Bybit", url: "https://www.bybitglobal.com/invite?ref=K7LWKX", icon: "https://assets.coingecko.com/markets/images/698/large/bybit_spot.png?1706864649", desc: "A global trading platform popular for derivatives, spot markets, copy trading, and advanced trading features.", desc_zh: "以衍生品、现货市场、跟单交易及进阶交易功能闻名的全球交易平台。" },
    { name: "KuCoin", url: "https://www.kucoin.com/r/rf/QBS1MW4T", icon: "https://assets.coingecko.com/markets/images/61/large/kucoin.png?1706864282", desc: "A global exchange offering a broad selection of cryptocurrencies, trading pairs, and advanced trading products.", desc_zh: "提供丰富币种、交易对及进阶交易产品的全球交易所。" },
    { name: "Bitget", url: "https://partner.bitget.com/bg/6BTH7M", icon: "https://assets.coingecko.com/markets/images/540/large/2023-07-25_21.47.43.jpg?1706864507", desc: "A crypto trading platform focused on derivatives, copy trading, spot markets, and professional trading tools.", desc_zh: "专注于合约交易、跟单交易、现货市场及专业交易工具的平台。" },
    { name: "HTX", url: "https://www.htx.com/invite/id-id/1f?invite_code=d9rh5223", icon: "https://assets.coingecko.com/markets/images/25/large/htx.png?1721712842", desc: "A long-established global exchange providing spot trading, derivatives, and access to numerous digital assets.", desc_zh: "历史悠久的全球交易所，提供现货交易、衍生品及众多数字资产。" },
    { name: "Gate", url: "https://www.gate.com/signup/BQBAXV8L?ref_type=103&utm_cmp=PEYEQdSb", icon: "https://assets.coingecko.com/markets/images/60/large/Frame_1.png?1747795534", desc: "A global crypto exchange known for its extensive altcoin selection, trading products, and token offerings.", desc_zh: "以丰富的山寨币选择、交易产品及代币发行著称的全球交易所。" },
    { name: "MEXC", url: "https://promote.mexc.com/r/rO9aDYZ5", icon: "https://assets.coingecko.com/markets/images/409/large/logo_new.png?1743600043", desc: "A global exchange offering a wide range of altcoins, spot markets, futures, and various trading opportunities.", desc_zh: "提供大量山寨币、现货市场、合约及多样交易机会的全球交易所。" },
    { name: "Flipster", url: "https://flipster.io/signin?referral_code=BNTQ9WJGAQ", icon: "https://assets.coingecko.com/markets/images/1048/large/flipster.jpeg?1706865074", desc: "A modern crypto exchange focused on fast execution, derivatives trading, and a smooth trading experience.", desc_zh: "专注于极速成交、合约交易与流畅体验的现代化交易所。" },
    { name: "BingX", url: "https://bingx.com/", icon: "https://assets.coingecko.com/markets/images/812/large/YtFwQwJr_400x400.jpg?1706864837", desc: "A social trading platform offering crypto spot, derivatives, copy trading, and community-driven features.", desc_zh: "提供现货、合约、跟单交易及社区互动功能的社交化交易平台。" },
    { name: "Kraken", url: "https://www.kraken.com/", icon: "https://assets.coingecko.com/markets/images/29/large/kraken.jpg?1706864265", desc: "A well-established crypto exchange known for security, liquidity, and a wide range of digital assets.", desc_zh: "以安全性、流动性及丰富数字资产著称的老牌交易所。" },
    { name: "BitMart", url: "https://www.bitmart.com/invite/VeE3eh/en", icon: "https://assets.coingecko.com/markets/images/239/large/Bitmart.png?1706864341", desc: "A global crypto exchange providing spot trading, futures, and access to a diverse selection of digital assets.", desc_zh: "提供现货交易、合约及多样化数字资产的全球交易所。" },
    { name: "LBank", url: "https://lbank.com/ref/130RH", icon: "https://assets.coingecko.com/markets/images/118/large/LBank_logo.png?1706864296", desc: "A global cryptocurrency exchange supporting numerous assets, trading pairs, spot markets, and derivatives.", desc_zh: "支持众多资产、交易对、现货市场及衍生品的全球交易所。" },
    { name: "CoinEx", url: "https://www.coinex.com/register?refer_code=rfauw", icon: "https://assets.coingecko.com/markets/images/135/large/coinex.jpg?1706864305", desc: "A global exchange focused on accessible crypto trading, with spot, futures, and a wide range of assets.", desc_zh: "专注于易上手交易的全球交易所，提供现货、合约及丰富资产。" },
    { name: "HashKey", url: "https://global.hashkey.com/en-US/register/invite?invite_code=E7BU9J", icon: "https://assets.coingecko.com/markets/images/1206/large/hashkey_2.png?1706869603", desc: "A regulated digital asset platform serving global users, with a strong focus on compliance and security.", desc_zh: "面向全球用户的持牌数字资产平台，高度重视合规与安全。" },
    { name: "Backpack", url: "https://backpack.exchange/join/d73b1200-76d8-4e3a-9d2d-ba5868a69d49", icon: "https://assets.coingecko.com/markets/images/1387/large/backpack.jpeg?1708663541", desc: "A Web3-native crypto platform designed around self-custody, trading, and a modern user experience.", desc_zh: "以自托管、交易与现代化体验为核心的原生 Web3 平台。" },
    { name: "Bittime", url: "https://www.bittime.com/register?inviteCode=EHVLLL", icon: "https://assets.coingecko.com/markets/images/1296/large/1024.png?1706865289", desc: "An Indonesian crypto exchange offering digital asset trading with support for local users and currencies.", desc_zh: "印度尼西亚加密货币交易所，支持本地用户与货币的数字资产交易。" },
    { name: "Indodax", url: "https://indodax.com/", icon: "https://assets.coingecko.com/markets/images/3/large/logogram-Indodax-new-_JPG_format.jpg?1706864243", desc: "One of Indonesia's leading crypto exchanges, offering local users access to a variety of digital assets.", desc_zh: "印度尼西亚领先的加密货币交易所之一，为本地用户提供多样数字资产。" },
    { name: "Pintu", url: "https://pintu.co.id/", icon: "https://pintu.co.id/static/images/shared/pintu-logo.svg", desc: "An Indonesian crypto platform designed for simple investing, trading, and easy access to digital assets.", desc_zh: "印度尼西亚加密货币平台，专为简单投资、交易与轻松获取数字资产而设计。" },
    { name: "Tokocrypto", url: "https://www.tokocrypto.com/account/signup?ref=5863SP1E", icon: "https://assets.coingecko.com/markets/images/501/large/toko.png?1706864476", desc: "An Indonesian crypto exchange offering digital asset trading, local support, and educational resources.", desc_zh: "印度尼西亚加密货币交易所，提供数字资产交易、本地支持及教育资源。" },
  ];

  function renderExchanges(){
    const container = document.getElementById('exchange-body');
    if(!container) return;
    const heading = currentLang === 'zh' ? '加密货币交易所' : 'Crypto Exchanges';
    let html = '<h2>'+heading+'</h2><div class="exchange-grid">';
    EXCHANGES.forEach(ex=>{
      const desc = currentLang === 'zh' ? ex.desc_zh : ex.desc;
      const openTitle = T('exchangeOpenTitle')(ex.name);
      html += '<div class="exchange-card">'
        + '<button class="exchange-open" data-url="'+ex.url+'" title="'+openTitle+'" aria-label="'+openTitle+'">'
        + '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M9 7h8v8"/></svg>'
        + '</button>'
        + '<div class="exchange-card-head">'
        + '<img class="exchange-icon" src="'+ex.icon+'" alt="'+ex.name+'">'
        + '<h3>'+ex.name+'</h3>'
        + '</div>'
        + '<p>'+desc+'</p>'
        + '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
    container.querySelectorAll('.exchange-open').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        window.open(btn.getAttribute('data-url'), '_blank', 'noopener');
      });
    });
  }
  renderExchanges();


  /* ---------- WHALE RADAR ---------- */
  const WHALE_ENDPOINT = '/api/whale-radar';
  const WHALE_POLL_MS = 25000;
  let whaleStarted = false;
  let whalePollTimer = null;

  function escHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function renderWhaleRows(transfers){
    const list = document.getElementById('whale-list');
    if(!transfers || transfers.length === 0){
      list.innerHTML = '<div class="whale-empty">'+T('whaleEmpty')+'</div>';
      return;
    }
    list.innerHTML = transfers.map(t => (
      '<div class="whale-row">'
        + '<span class="whale-symbol">' + escHtml(t.symbol) + '</span>'
        + '<span class="whale-value">' + escHtml(t.valueFormatted) + '</span>'
        + '<span class="whale-addrs">'
          + '<a href="https://etherscan.io/address/' + t.from + '" target="_blank" rel="noopener">' + escHtml(t.fromShort) + '</a>'
          + ' → '
          + '<a href="https://etherscan.io/address/' + t.to + '" target="_blank" rel="noopener">' + escHtml(t.toShort) + '</a>'
        + '</span>'
        + '<span class="whale-age">' + escHtml(t.age) + '</span>'
      + '</div>'
    )).join('');
  }

  async function loadWhaleData(){
    const dot = document.getElementById('whale-dot');
    const status = document.getElementById('whale-status');
    try{
      const res = await fetch(WHALE_ENDPOINT);
      const data = await res.json();
      if(!res.ok || data.error){
        throw new Error(data.error || ('HTTP ' + res.status));
      }
      dot.classList.remove('error');
      status.textContent = T('whaleStatusTemplate')(data.count, data.minUsd, new Date(data.updatedAt).toLocaleTimeString());
      renderWhaleRows(data.transfers);
    } catch(err){
      dot.classList.add('error');
      status.textContent = T('whaleErrorStatus');
      document.getElementById('whale-list').innerHTML = '<div class="whale-empty">'+T('whaleErrorDetail')+'</div>';
    }
  }

  function startWhaleRadar(){
    if(whaleStarted) { loadWhaleData(); return; }
    whaleStarted = true;
    loadWhaleData();
    whalePollTimer = setInterval(loadWhaleData, WHALE_POLL_MS);
  }

  const whaleRefreshBtn = document.getElementById('whale-refresh');
  if(whaleRefreshBtn) whaleRefreshBtn.addEventListener('click', loadWhaleData);

  /* ---------- ACTION CONTRACTS (capabilities) ---------- */
const AT_ENDPOINT = '/api/action-contracts';
let atStarted = false;

function pickFirstArray(...candidates){
  for(const c of candidates){ if(Array.isArray(c)) return c; }
  return null;
}

function extractCapabilities(payload){
  const raw = payload && payload.raw;
  if(Array.isArray(raw)) return raw;
  if(!raw || typeof raw !== 'object') return [];
  return pickFirstArray(raw.capabilities, raw.data, raw.items, raw.results, raw.actions) || [];
}

function capField(item, keys, fallback){
  for(const k of keys){
    if(item && item[k] !== undefined && item[k] !== null && item[k] !== '') return item[k];
  }
  return fallback;
}

function renderAtCapabilities(payload){
  const list = document.getElementById('at-list');
  const items = extractCapabilities(payload);
  if(!items.length){
    list.innerHTML = '<div class="at-empty">'+T('atEmpty')+'</div>';
    return;
  }
  list.innerHTML = items.map(item=>{
    const title = escHtml(capField(item, ['name','title','id','slug'], 'Untitled capability'));
    const desc = escHtml(capField(item, ['description','summary','desc'], ''));
    const category = capField(item, ['category','type','group'], null);
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const metaTags = [category, ...tags].filter(Boolean);
    return (
      '<div class="at-card">'
        + '<div class="at-card-title">' + title + '</div>'
        + (desc ? '<div class="at-card-desc">' + desc + '</div>' : '')
        + (metaTags.length ? '<div class="at-card-meta">' + metaTags.map(t=>'<span class="at-tag">'+escHtml(t)+'</span>').join('') + '</div>' : '')
      + '</div>'
    );
  }).join('');
}

async function loadAtCapabilities(){
  const dot = document.getElementById('at-dot');
  const status = document.getElementById('at-status');
  status.textContent = T('atLoading');
  dot.classList.remove('error');
  try{
    const res = await fetch(AT_ENDPOINT);
    const data = await res.json();
    if(!res.ok || data.error){ throw new Error(data.error || ('HTTP ' + res.status)); }
    const items = extractCapabilities(data);
    status.textContent = T('atStatusTemplate')(items.length, new Date(data.updatedAt).toLocaleTimeString());
    renderAtCapabilities(data);
  } catch(err){
    dot.classList.add('error');
    status.textContent = T('atErrorStatus');
    document.getElementById('at-list').innerHTML = '<div class="at-empty">'+T('atErrorDetail')+'</div>';
  }
}

function startAt(){
  if(atStarted){ loadAtCapabilities(); return; }
  atStarted = true;
  loadAtCapabilities();
}

const atRefreshBtn = document.getElementById('at-refresh');
if(atRefreshBtn) atRefreshBtn.addEventListener('click', loadAtCapabilities);

  
  /* ---------- SCAN (address lookup via Blockscout) ---------- */
  const SCAN_ENDPOINT = '/api/scan';
  const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

  function scanTxUrl(chain, hash){
    // Best-effort explorer link; falls back to Etherscan-style path for unknown chains.
    const explorers = {
      eth:'https://etherscan.io/tx/', bsc:'https://bscscan.com/tx/',
      matic:'https://polygonscan.com/tx/', arb:'https://arbiscan.io/tx/',
      op:'https://optimistic.etherscan.io/tx/', avax:'https://snowtrace.io/tx/',
      base:'https://basescan.org/tx/'
    };
    return (explorers[chain] || 'https://etherscan.io/tx/') + hash;
  }

  const SCAN_TYPE_KEYS = { send:'scanTypeSend', receive:'scanTypeReceive', create:'scanTypeCreate', approve:'scanTypeApprove', call:'scanTypeCall' };
  function scanTypeLabel(type){
    const key = SCAN_TYPE_KEYS[type];
    return key ? T(key) : type;
  }

  let lastScanTransactions = null;

  function renderScanRows(items){
    const list = document.getElementById('scan-list');
    if(!items || items.length === 0){
      list.innerHTML = '<div class="scan-empty">'+T('scanEmpty')+'</div>';
      return;
    }
    list.innerHTML = items.map(t => (
      '<div class="scan-row">'
        + '<a class="scan-hash" href="' + scanTxUrl(t.chain, t.hash) + '" target="_blank" rel="noopener">' + escHtml(t.hashShort) + '</a>'
        + '<span class="scan-chain">' + escHtml((t.chain || '').toUpperCase()) + '</span>'
        + '<span class="scan-type">' + escHtml(scanTypeLabel(t.type)) + '</span>'
        + '<span class="scan-time">' + escHtml(t.time) + '</span>'
      + '</div>'
    )).join('');
  }

  async function loadScanData(address){
    const list = document.getElementById('scan-list');
    list.innerHTML = '<div class="scan-empty">'+T('scanLoading')+'</div>';
    try{
      const res = await fetch(SCAN_ENDPOINT + '?address=' + encodeURIComponent(address));
      const data = await res.json();
      if(!res.ok || data.error){
        throw new Error(data.error || ('HTTP ' + res.status));
      }
      lastScanTransactions = data.transactions;
      renderScanRows(data.transactions);
    } catch(err){
      lastScanTransactions = null;
      list.innerHTML = '<div class="scan-empty">'+T('scanErrorDetail')+'</div>';
    }
  }

  function runScanSearch(){
    const input = document.getElementById('scan-address-input');
    const address = (input.value || '').trim();
    if(!ADDRESS_RE.test(address)){
      document.getElementById('scan-list').innerHTML = '<div class="scan-empty">'+T('scanInvalidAddress')+'</div>';
      return;
    }
    loadScanData(address);
  }

  const scanSearchBtn = document.getElementById('scan-search-btn');
  const scanAddressInput = document.getElementById('scan-address-input');
  if(scanSearchBtn) scanSearchBtn.addEventListener('click', runScanSearch);
  if(scanAddressInput) scanAddressInput.addEventListener('keydown', e=>{ if(e.key === 'Enter') runScanSearch(); });


  /* ---------- FLOATING DRAGGABLE BUBBLES (#, @, *) ---------- */
  const BUBBLE_SIZE = 54;
  const BUBBLE_MARGIN = 26;
  const BUBBLE_GAP = 16;

  function initBubble(bubbleId, windowKey, defaultLeft, defaultTop){
    const bubble = document.getElementById(bubbleId);
    if(!bubble) return;

    bubble.style.left = defaultLeft + 'px';
    bubble.style.top = defaultTop + 'px';

    let bDragging = false, bMoved = false;
    let bsx = 0, bsy = 0, bl = 0, bt = 0;
    const DRAG_THRESHOLD = 5;

    function toggleBubbleWindow(){
      const w = windows[windowKey];
      if(!w) return;
      const isOpen = w.style.display !== 'none' && !w.classList.contains('win-closing');
      if(isOpen){
        closeWindow(w);
      } else {
        openWindow(windowKey);
      }
    }

    bubble.addEventListener('pointerdown', e=>{
      bDragging = true; bMoved = false;
      bubble.setPointerCapture(e.pointerId);
      bsx = e.clientX; bsy = e.clientY;
      bl = parseFloat(bubble.style.left) || 0;
      bt = parseFloat(bubble.style.top) || 0;
      bubble.classList.add('dragging');
    });
    bubble.addEventListener('pointermove', e=>{
      if(!bDragging) return;
      const dx = (e.clientX - bsx) / scale;
      const dy = (e.clientY - bsy) / scale;
      if(Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) bMoved = true;
      if(!bMoved) return;
      let nl = bl + dx, nt = bt + dy;
      nl = Math.max(4, Math.min(nl, VW - BUBBLE_SIZE - 4));
      nt = Math.max(40, Math.min(nt, VH - BUBBLE_SIZE - 4));
      bubble.style.left = nl + 'px';
      bubble.style.top = nt + 'px';
    });
    function endBubbleDrag(){
      if(!bDragging) return;
      bDragging = false;
      bubble.classList.remove('dragging');
    }
    bubble.addEventListener('pointerup', endBubbleDrag);
    bubble.addEventListener('pointercancel', endBubbleDrag);

    bubble.addEventListener('click', ()=>{
      // A drag ends with a click event right after — ignore that one so
      // dragging the bubble never also toggles the window.
      if(bMoved){ bMoved = false; return; }
      toggleBubbleWindow();
    });
    bubble.addEventListener('keydown', e=>{
      if(e.key === 'Enter') toggleBubbleWindow();
    });
  }

  // Default cluster position: bottom-right corner of the 1440x900 virtual desktop.
  // # sits in the corner, @ sits to its left, * sits above it.
  const mirrorBubbleLeft = VW - BUBBLE_SIZE - BUBBLE_MARGIN;
  const mirrorBubbleTop = VH - BUBBLE_SIZE - BUBBLE_MARGIN;

  initBubble('mirror-bubble', 'mirror', mirrorBubbleLeft, mirrorBubbleTop);
  initBubble('at-bubble', 'at', mirrorBubbleLeft - BUBBLE_SIZE - BUBBLE_GAP, mirrorBubbleTop);
  initBubble('star-bubble', 'star', mirrorBubbleLeft, mirrorBubbleTop - BUBBLE_SIZE - BUBBLE_GAP);


  /* ---------- MARKET ---------- */
  const MARKET_SYMBOLS = ['BTCUSDT','ETHUSDT','BNBUSDT','SOLUSDT','XRPUSDT','DOGEUSDT','ADAUSDT','AVAXUSDT','LINKUSDT','TONUSDT'];
  const MARKET_POLL_MS = 15000;
  let marketChart = null, marketSeries = null;
  let marketStarted = false, marketPollTimer = null;
  let marketActiveSymbol = 'BTCUSDT', marketActiveTf = '1h';

  function formatMarketPrice(v){
    const n = parseFloat(v);
    if(!isFinite(n)) return '0';
    return n >= 1 ? n.toLocaleString('en-US', {maximumFractionDigits:2}) : n.toPrecision(4);
  }
  function formatMarketVol(v){
    const n = parseFloat(v);
    if(n >= 1e9) return (n/1e9).toFixed(2)+'B';
    if(n >= 1e6) return (n/1e6).toFixed(2)+'M';
    if(n >= 1e3) return (n/1e3).toFixed(1)+'K';
    return n.toFixed(0);
  }

  /* ---- Market data sources: Binance is tried first, then OKX, then
     Hyperliquid. Binance's public API is geo-blocked in some regions
     (HTTP 451), so this fallback chain keeps the Market window working
     for visitors from those regions. ---- */
  const MARKET_TF_MS = { '15m': 15*60*1000, '1h': 60*60*1000, '4h': 4*60*60*1000, '1d': 24*60*60*1000 };
  function toBaseCoin(symbol){ return symbol.replace('USDT',''); }
  function toOkxInstId(symbol){ return toBaseCoin(symbol) + '-USDT'; }
  function toOkxBar(tf){ return { '15m':'15m', '1h':'1H', '4h':'4H', '1d':'1D' }[tf] || tf; }

  async function fetchCandlesBinance(symbol, tf){
    const res = await fetch('https://api.binance.com/api/v3/klines?symbol='+symbol+'&interval='+tf+'&limit=200');
    if(!res.ok) throw new Error('Binance HTTP '+res.status);
    const data = await res.json();
    if(!Array.isArray(data)) throw new Error('Unexpected Binance candle response');
    return data.map(k => ({
      time: Math.floor(k[0]/1000), open: parseFloat(k[1]), high: parseFloat(k[2]),
      low: parseFloat(k[3]), close: parseFloat(k[4])
    }));
  }

  async function fetchCandlesOkx(symbol, tf){
    const url = 'https://www.okx.com/api/v5/market/candles?instId='+toOkxInstId(symbol)+'&bar='+toOkxBar(tf)+'&limit=200';
    const res = await fetch(url);
    if(!res.ok) throw new Error('OKX HTTP '+res.status);
    const json = await res.json();
    if(!json || json.code !== '0' || !Array.isArray(json.data)) throw new Error('Unexpected OKX candle response');
    // OKX returns candles newest-first; reverse to chronological order.
    return json.data.slice().reverse().map(k => ({
      time: Math.floor(Number(k[0])/1000), open: parseFloat(k[1]), high: parseFloat(k[2]),
      low: parseFloat(k[3]), close: parseFloat(k[4])
    }));
  }

  async function fetchCandlesHyperliquid(symbol, tf){
    const coin = toBaseCoin(symbol);
    const intervalMs = MARKET_TF_MS[tf] || MARKET_TF_MS['1h'];
    const endTime = Date.now();
    const startTime = endTime - intervalMs * 200;
    const res = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'candleSnapshot', req: { coin, interval: tf, startTime, endTime } })
    });
    if(!res.ok) throw new Error('Hyperliquid HTTP '+res.status);
    const data = await res.json();
    if(!Array.isArray(data) || !data.length) throw new Error('Unexpected Hyperliquid candle response');
    return data.map(k => ({
      time: Math.floor(k.t/1000), open: parseFloat(k.o), high: parseFloat(k.h),
      low: parseFloat(k.l), close: parseFloat(k.c)
    }));
  }

  const MARKET_CANDLE_SOURCES = [
    { name: 'Binance', fn: fetchCandlesBinance },
    { name: 'OKX', fn: fetchCandlesOkx },
    { name: 'Hyperliquid', fn: fetchCandlesHyperliquid }
  ];

  let marketChartSourceName = '—';

  async function fetchCandlesWithFallback(symbol, tf){
    let lastErr;
    for(const source of MARKET_CANDLE_SOURCES){
      try{
        const candles = await source.fn(symbol, tf);
        marketChartSourceName = source.name;
        return candles;
      } catch(err){
        lastErr = err;
        console.warn('[Market] candle source failed, trying next:', err.message);
      }
    }
    throw lastErr;
  }

  async function fetchTickersBinance(symbols){
    const results = await Promise.all(symbols.map(sym =>
      fetch('https://api.binance.com/api/v3/ticker/24hr?symbol='+sym).then(r => {
        if(!r.ok) throw new Error('Binance HTTP '+r.status);
        return r.json();
      })
    ));
    return results.map(t => ({
      symbol: t.symbol,
      lastPrice: parseFloat(t.lastPrice),
      changePercent: parseFloat(t.priceChangePercent),
      quoteVolume: parseFloat(t.quoteVolume)
    }));
  }

  async function fetchTickersOkx(symbols){
    const responses = await Promise.all(symbols.map(sym =>
      fetch('https://www.okx.com/api/v5/market/ticker?instId='+toOkxInstId(sym)).then(r => {
        if(!r.ok) throw new Error('OKX HTTP '+r.status);
        return r.json();
      })
    ));
    const results = responses.map((json, i) => {
      const t = json && json.data && json.data[0];
      if(!t) return null;
      const last = parseFloat(t.last);
      const open24h = parseFloat(t.open24h);
      const changePercent = open24h ? ((last - open24h) / open24h) * 100 : 0;
      return { symbol: symbols[i], lastPrice: last, changePercent, quoteVolume: parseFloat(t.volCcy24h) };
    }).filter(Boolean);
    if(!results.length) throw new Error('No usable OKX ticker data');
    return results;
  }

  async function fetchTickersHyperliquid(symbols){
    const res = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'metaAndAssetCtxs' })
    });
    if(!res.ok) throw new Error('Hyperliquid HTTP '+res.status);
    const [meta, ctxs] = await res.json();
    const universe = (meta && meta.universe) || [];
    const results = symbols.map(sym => {
      const coin = toBaseCoin(sym);
      const idx = universe.findIndex(u => u.name === coin);
      if(idx === -1 || !ctxs[idx]) return null;
      const ctx = ctxs[idx];
      const last = parseFloat(ctx.markPx);
      const prevDay = parseFloat(ctx.prevDayPx);
      const changePercent = prevDay ? ((last - prevDay) / prevDay) * 100 : 0;
      return { symbol: sym, lastPrice: last, changePercent, quoteVolume: parseFloat(ctx.dayNtlVlm) };
    }).filter(Boolean);
    if(!results.length) throw new Error('No matching coins found on Hyperliquid');
    return results;
  }

  const MARKET_TICKER_SOURCES = [
    { name: 'Binance', fn: fetchTickersBinance },
    { name: 'OKX', fn: fetchTickersOkx },
    { name: 'Hyperliquid', fn: fetchTickersHyperliquid }
  ];

  let marketListSourceName = '—';

  async function fetchTickersWithFallback(symbols){
    let lastErr;
    for(const source of MARKET_TICKER_SOURCES){
      try{
        const results = await source.fn(symbols);
        marketListSourceName = source.name;
        return results;
      } catch(err){
        lastErr = err;
        console.warn('[Market] ticker source failed, trying next:', err.message);
      }
    }
    throw lastErr;
  }

  function renderMarketSource(){
    const el = document.getElementById('market-source');
    if(!el) return;
    el.textContent = T('marketSourceLabel')
      .replace('{chart}', marketChartSourceName)
      .replace('{list}', marketListSourceName);
  }

  function initMarketChart(){
    const el = document.getElementById('market-chart');
    if(!el || marketChart || typeof LightweightCharts === 'undefined') return;
    marketChart = LightweightCharts.createChart(el, {
      layout: { background: { color: 'transparent' }, textColor: '#868ba8' },
      grid: { vertLines: { color: '#ffffff0a' }, horzLines: { color: '#ffffff0a' } },
      rightPriceScale: { borderColor: '#ffffff14' },
      timeScale: { borderColor: '#ffffff14', timeVisible: true },
      autoSize: true
    });
    marketSeries = marketChart.addCandlestickSeries({
      upColor: '#a6e3a1', downColor: '#f38ba8', borderVisible: false,
      wickUpColor: '#a6e3a1', wickDownColor: '#f38ba8'
    });
  }

  async function loadMarketCandles(symbol, tf){
    if(!marketSeries) return;
    try{
      const candles = await fetchCandlesWithFallback(symbol, tf);
      marketSeries.setData(candles);
      marketChart.timeScale().fitContent();
      renderMarketSource();
    } catch(err){
      console.error('Market chart error:', err);
    }
  }

  async function loadMarketList(){
    const list = document.getElementById('market-list');
    try{
      const results = await fetchTickersWithFallback(MARKET_SYMBOLS);
      renderMarketSource();
      list.innerHTML = results.map(t => {
        const base = t.symbol.replace('USDT','');
        const change = t.changePercent;
        const dir = change >= 0 ? 'up' : 'down';
        const arrow = change >= 0 ? '▲' : '▼';
        const active = t.symbol === marketActiveSymbol ? ' active' : '';
        return '<div class="market-row'+active+'" data-symbol="'+t.symbol+'">'
          + '<span class="market-coin">'+base+'<small>/USDT</small></span>'
          + '<span class="market-price">$'+formatMarketPrice(t.lastPrice)+'</span>'
          + '<span class="market-change '+dir+'">'+arrow+' '+Math.abs(change).toFixed(2)+'%</span>'
          + '<span class="market-vol">$'+formatMarketVol(t.quoteVolume)+'</span>'
          + '</div>';
      }).join('');
      list.querySelectorAll('.market-row').forEach(row => {
        row.addEventListener('click', () => {
          marketActiveSymbol = row.getAttribute('data-symbol');
          const symLabel = document.getElementById('market-symbol');
          if(symLabel) symLabel.textContent = marketActiveSymbol.replace('USDT','/USDT');
          list.querySelectorAll('.market-row').forEach(r => r.classList.remove('active'));
          row.classList.add('active');
          loadMarketCandles(marketActiveSymbol, marketActiveTf);
        });
      });
    } catch(err){
      list.innerHTML = '<div class="market-loading">'+T('marketError')+'</div>';
    }
  }

  function startMarket(){
    initMarketChart();
    if(marketStarted){
      loadMarketCandles(marketActiveSymbol, marketActiveTf);
      loadMarketList();
      return;
    }
    marketStarted = true;
    loadMarketCandles(marketActiveSymbol, marketActiveTf);
    loadMarketList();
    marketPollTimer = setInterval(() => {
      loadMarketCandles(marketActiveSymbol, marketActiveTf);
      loadMarketList();
    }, MARKET_POLL_MS);
  }

  document.querySelectorAll('.market-tf button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.market-tf button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      marketActiveTf = btn.getAttribute('data-tf');
      loadMarketCandles(marketActiveSymbol, marketActiveTf);
    });
  });


  /* ---- MEME ----
     Data source: DexScreener's free public API (no key required) — reverted
     back to this after the Binance Meme Rush endpoint proved unreliable
     (likely CORS-blocked or otherwise unreachable from a plain browser).
     DexScreener doesn't expose a direct "top by volume" listing endpoint on
     its free tier, so this discovers a wide candidate pool first (currently
     boosted/promoted tokens, the only free "what's active right now" feed
     DexScreener offers) and then — the actual fix for the original request —
     ranks and cuts that pool by real 24h volume instead of just keeping
     DexScreener's boost order. So the *candidates* come from boosts, but the
     *ranking/filtering* you see is purely volume-based. */
  const MEME_POLL_MS = 20000;
  let memeActiveChain = 'ethereum';
  let memeActiveToken = null;
  let memeStarted = false, memePollTimer = null;

  function memeChartUrl(chainId, pairAddress){
    return 'https://dexscreener.com/'+chainId+'/'+pairAddress+'?embed=1&theme=dark&trades=0&info=0';
  }

  function setMemeChart(token){
    memeActiveToken = token;
    const frame = document.getElementById('meme-chart-frame');
    const symbol = document.getElementById('meme-symbol');
    if(frame) frame.src = memeChartUrl(token.chainId, token.pairAddress);
    if(symbol) symbol.textContent = (token.baseToken && token.baseToken.symbol) || '—';
  }

  async function fetchMemeTokenList(chainId){
    const boostRes = await fetch('https://api.dexscreener.com/token-boosts/top/v1');
    if(!boostRes.ok) throw new Error('DexScreener HTTP '+boostRes.status);
    const boosts = await boostRes.json();
    // Cast a wider net than before (40 candidates instead of 15) so there's
    // an actual pool to rank by volume from, instead of just taking whatever
    // order DexScreener's boost feed happens to return.
    const onChain = (Array.isArray(boosts) ? boosts : [])
      .filter(b => b && b.chainId === chainId && b.tokenAddress)
      .slice(0, 40);
    if(!onChain.length) return [];

    const addresses = onChain.map(b => b.tokenAddress).join(',');
    const pairRes = await fetch('https://api.dexscreener.com/tokens/v1/'+chainId+'/'+encodeURIComponent(addresses));
    if(!pairRes.ok) throw new Error('DexScreener HTTP '+pairRes.status);
    const pairs = await pairRes.json();
    if(!Array.isArray(pairs)) throw new Error('Unexpected DexScreener token response');

    // A token can have several pairs (different DEXes/pools); keep only the
    // highest-liquidity pair per base token address.
    const byToken = new Map();
    pairs.forEach(p => {
      if(!p || !p.baseToken || !p.pairAddress) return;
      const addr = p.baseToken.address;
      const liq = (p.liquidity && p.liquidity.usd) || 0;
      const prev = byToken.get(addr);
      if(!prev || liq > prev._liq) byToken.set(addr, Object.assign({ _liq: liq }, p));
    });

    // The actual "top volume" filter: sort the whole candidate pool by 24h
    // volume, descending, and only keep the top 15.
    return Array.from(byToken.values())
      .sort((a, b) => ((b.volume && b.volume.h24) || 0) - ((a.volume && a.volume.h24) || 0))
      .slice(0, 15);
  }

  async function loadMemeList(chainId){
    const list = document.getElementById('meme-list');
    if(!list) return;
    try{
      const tokens = await fetchMemeTokenList(chainId);
      if(!tokens.length){
        list.innerHTML = '<div class="meme-loading">'+T('memeEmpty')+'</div>';
        return;
      }
      list.innerHTML = tokens.map((t, i) => {
        const change = parseFloat(t.priceChange && t.priceChange.h24) || 0;
        const dir = change >= 0 ? 'up' : 'down';
        const arrow = change >= 0 ? '▲' : '▼';
        const active = memeActiveToken && memeActiveToken.pairAddress === t.pairAddress ? ' active' : '';
        return '<div class="meme-row'+active+'" data-idx="'+i+'">'
          + '<span class="meme-coin">'+(t.baseToken.symbol || '?')+'</span>'
          + '<span class="meme-price">$'+formatMarketPrice(t.priceUsd)+'</span>'
          + '<span class="meme-change '+dir+'">'+arrow+' '+Math.abs(change).toFixed(2)+'%</span>'
          + '<span class="meme-vol">$'+formatMarketVol(t.volume && t.volume.h24)+'</span>'
          + '</div>';
      }).join('');
      list.querySelectorAll('.meme-row').forEach(row => {
        row.addEventListener('click', () => {
          const token = tokens[parseInt(row.getAttribute('data-idx'), 10)];
          list.querySelectorAll('.meme-row').forEach(r => r.classList.remove('active'));
          row.classList.add('active');
          setMemeChart(token);
        });
      });
      const sourceEl = document.getElementById('meme-source');
      if(sourceEl) sourceEl.textContent = T('memeSourceLabel');
      // Auto-pick the top token whenever the chain tab changes (or on first load).
      if(!memeActiveToken || memeActiveToken.chainId !== chainId){
        setMemeChart(tokens[0]);
        const firstRow = list.querySelector('.meme-row');
        if(firstRow) firstRow.classList.add('active');
      }
    } catch(err){
      console.error('Meme list error:', err);
      list.innerHTML = '<div class="meme-loading">'+T('memeError')+'</div>';
    }
  }

  function startMeme(){
    loadMemeList(memeActiveChain);
    if(memeStarted) return;
    memeStarted = true;
    memePollTimer = setInterval(() => loadMemeList(memeActiveChain), MEME_POLL_MS);
  }

  document.querySelectorAll('.meme-chain-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.meme-chain-tabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      memeActiveChain = btn.getAttribute('data-chain');
      memeActiveToken = null;
      loadMemeList(memeActiveChain);
    });
  });


  /* ---------- LANGUAGE SWITCHING ---------- */
  const editorBody = document.getElementById('editor-body');
  let editorEdited = false;
  if(editorBody){
    editorBody.addEventListener('input', ()=>{ editorEdited = true; });
  }

  function applyLanguage(lang){
    if(lang !== 'en' && lang !== 'zh') return;
    currentLang = lang;
    applyStaticTranslations();
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    updateClock();
    renderExchanges();
    renderMarketSource();
    const memeSourceEl = document.getElementById('meme-source');
    if(memeSourceEl && memeSourceEl.textContent) memeSourceEl.textContent = T('memeSourceLabel');
    if(editorBody && !editorEdited){
      editorBody.textContent = T('readmeContent');
    }
    const stickyNote = document.getElementById('sticky-note');
    if(stickyNote) stickyNote.placeholder = T('widgetPlaceholderNote');
    if(windows.whale && windows.whale.style.display !== 'none'){
      loadWhaleData();
    }
    if(windows.scan && windows.scan.style.display !== 'none' && lastScanTransactions){
      renderScanRows(lastScanTransactions);
    }
  }

  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> applyLanguage(btn.getAttribute('data-lang')));
  });
  document.querySelectorAll('.ctx-lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> ctx.classList.remove('show'));
  });

  /* ---------- DESKTOP WIDGETS ---------- */
  document.querySelectorAll('.widget-toggle').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      const widget = btn.closest('.widget');
      widget.classList.toggle('collapsed');
      btn.textContent = widget.classList.contains('collapsed') ? '+' : '−';
    });
  });
  document.querySelectorAll('.widget-head').forEach(head=>{
    head.addEventListener('click', e=>{
      if(e.target.closest('.widget-toggle')) return;
      const widget = head.closest('.widget');
      const btn = head.querySelector('.widget-toggle');
      widget.classList.toggle('collapsed');
      if(btn) btn.textContent = widget.classList.contains('collapsed') ? '+' : '−';
    });
  });

  /* Settings toggles */
  const toggleGrid = document.getElementById('toggle-grid');
  const toggleVignette = document.getElementById('toggle-vignette');
  const toggleAnimations = document.getElementById('toggle-animations');
  const toggleGlass = document.getElementById('toggle-glass');

  if(toggleGrid){
    toggleGrid.addEventListener('change', ()=>{
      document.getElementById('wallpaper').classList.toggle('no-grid', !toggleGrid.checked);
    });
  }
  if(toggleVignette){
    toggleVignette.addEventListener('change', ()=>{
      document.getElementById('vignette').style.opacity = toggleVignette.checked ? '1' : '0';
    });
  }
  if(toggleAnimations){
    toggleAnimations.addEventListener('change', ()=>{
      document.body.classList.toggle('no-anim', !toggleAnimations.checked);
    });
  }
  if(toggleGlass){
    toggleGlass.addEventListener('change', ()=>{
      document.querySelectorAll('#topbar, #dock, .widget').forEach(el=>{
        el.style.backdropFilter = toggleGlass.checked ? 'blur(6px)' : 'none';
      });
    });
  }

  /* Sticky note localStorage */
  const stickyNote = document.getElementById('sticky-note');
  if(stickyNote){
    const saved = localStorage.getItem('bbalien_sticky_note');
    if(saved) stickyNote.value = saved;
    stickyNote.addEventListener('input', ()=>{
      localStorage.setItem('bbalien_sticky_note', stickyNote.value);
    });
  }
  
})();

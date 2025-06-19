(function(){
  const id = prompt('YouTubeの動画IDを入れてくれ');
  if (!id) return;

  const old = document.getElementById('yt-widget-wrapper');
  if (old) old.remove();

  const wrapper = document.createElement('div');
  wrapper.id = 'yt-widget-wrapper';
  Object.assign(wrapper.style, {
    position: 'fixed',
    top: '50px',
    left: '50px',
    width: '360px',
    height: '202px',
    background: '#000',
    border: '2px solid #333',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden',
    userSelect: 'none'
  });

  const bar = document.createElement('div');
  bar.textContent = 'ドラッグ・リサイズ可能';
  Object.assign(bar.style, {
    background: '#222',
    color: '#fff',
    padding: '4px 8px',
    cursor: 'move',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  });

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '❌';
  Object.assign(closeBtn.style, {
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: '4px'
  });
  closeBtn.onclick = () => wrapper.remove();

  bar.appendChild(closeBtn);

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
  iframe.style.flexGrow = '1';
  iframe.style.border = 'none';
  iframe.allow = 'autoplay; fullscreen';

  wrapper.append(bar, iframe);
  document.body.appendChild(wrapper);

  // ─ ドラッグ ─
  let dragging = false, startX, startY, startLeft, startTop;
  bar.addEventListener('mousedown', e => {
    if (e.target === closeBtn) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(wrapper.style.left);
    startTop = parseInt(wrapper.style.top);
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (dragging) {
      wrapper.style.left = startLeft + e.clientX - startX + 'px';
      wrapper.style.top = startTop + e.clientY - startY + 'px';
    }
  });
  document.addEventListener('mouseup', () => dragging = false);

  // ─ リサイズ ─
  const edge = 10;
  let resizing = false, resizeDir = '', w0, h0;
  function getResizeDir(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX, y = e.clientY;
    let dir = '';
    if (x >= rect.left && x <= rect.left + edge) dir += 'left';
    else if (x >= rect.right - edge && x <= rect.right) dir += 'right';
    if (y >= rect.top && y <= rect.top + edge) dir += 'top';
    else if (y >= rect.bottom - edge && y <= rect.bottom) dir += 'bottom';
    return dir;
  }
  wrapper.addEventListener('mousemove', e => {
    const dir = getResizeDir(e);
    wrapper.style.cursor = dir ? (
      dir === 'left' || dir === 'right' ? 'ew-resize' :
      dir === 'top' || dir === 'bottom' ? 'ns-resize' :
      'nwse-resize'
    ) : 'default';
  });
  wrapper.addEventListener('mousedown', e => {
    if (e.target === bar || e.target === closeBtn) return;
    resizeDir = getResizeDir(e);
    if (resizeDir) {
      resizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(wrapper.style.left);
      startTop = parseInt(wrapper.style.top);
      w0 = parseInt(wrapper.style.width);
      h0 = parseInt(wrapper.style.height);
      e.preventDefault();
    }
  });
  document.addEventListener('mousemove', e => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (resizeDir.includes('right'))
      wrapper.style.width = Math.max(160, w0 + dx) + 'px';
    if (resizeDir.includes('left')) {
      const nw = Math.max(160, w0 - dx);
      wrapper.style.width = nw + 'px';
      wrapper.style.left = startLeft + dx + 'px';
    }
    if (resizeDir.includes('bottom'))
      wrapper.style.height = Math.max(90, h0 + dy) + 'px';
    if (resizeDir.includes('top')) {
      const nh = Math.max(90, h0 - dy);
      wrapper.style.height = nh + 'px';
      wrapper.style.top = startTop + dy + 'px';
    }
  });
  document.addEventListener('mouseup', () => resizing = false);
})();

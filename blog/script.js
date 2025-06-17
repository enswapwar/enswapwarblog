  document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const href = link.getAttribute("href");
    const fade = document.getElementById("fadeout");
    fade.classList.add("active");

    setTimeout(() => {
      window.location.href = href;
    }, 500); // 暗転終わってから遷移
  });
});
// ページ読み込み後にフェードアウト
window.addEventListener("load", () => {
  const fade = document.getElementById("fadeout");
  setTimeout(() => {
    fade.classList.add("hidden");
  }, 500); // 読み込み後0.5秒でフェードアウト開始
});

// メニューリンクに暗転→遷移つける
document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const href = link.getAttribute("href");
    const fade = document.getElementById("fadeout");

    // フェードイン（黒くなる）
    fade.classList.remove("hidden");

    // 0.5秒待ってから遷移
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  });
});

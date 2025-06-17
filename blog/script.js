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

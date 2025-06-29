document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".blog-post");
  const container = document.getElementById("blog-container");
  const pagination = document.getElementById("pagination");
  const perPage = 1;

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const [key, val] = c.trim().split('=');
      if (key === name) return val;
    }
    return null;
  }

  function showPage(page) {
    posts.forEach((post, i) => {
      post.style.display = (i >= (page - 1) * perPage && i < page * perPage) ? "block" : "none";
    });
    setCookie("page-number", page, 30);
  }

  function createPagination(totalPages, currentPage) {
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.style.margin = "0 4px";
      if (i === currentPage) btn.disabled = true;
      btn.addEventListener("click", () => {
        showPage(i);
        createPagination(totalPages, i);
      });
      pagination.appendChild(btn);
    }
  }

  const totalPages = Math.ceil(posts.length / perPage);
  let pageFromCookie = parseInt(getCookie("page-number"), 10);
  let currentPage = (!isNaN(pageFromCookie) && pageFromCookie >= 1 && pageFromCookie <= totalPages)
    ? pageFromCookie : 1;

  showPage(currentPage);
  createPagination(totalPages, currentPage);
});

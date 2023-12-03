window.onload = function () {
  lastArticles(10);
  rankArticles(10);
  linkKeywords();
}

function lastArticles(num) {
  const url = "/last_articles.cgi?num=" + num;
  fetch(url, { method: "GET" })
    .then(response => response.text())
    .then((text) => {
      document.getElementById("last-articles").innerHTML = text;
    });
}

function linkKeywords() {
  const word = document.getElementById("keywords").innerHTML;
  const url = "/link_keywords.cgi?keywords=" + encodeURIComponent(word);
  fetch(url, { method: "GET" })
    .then(response => response.text())
    .then((text) => {
      document.getElementById("keywords").innerHTML = text;
    });
}

function fullSearch() {
  const word = document.getElementById("full-search-box").value;
  if (word == "") {
    return;
  }
  document.body.style.cursor = "wait";
  const url = "/bsview/full_search.cgi?word=" + encodeURIComponent(word);
  fetch(url, { method: "GET" })
    .then(response => response.text())
    .then((text) => {
      document.getElementById("article-body").innerHTML = text;
      document.body.style.cursor = "default";
    });
}

function rankArticles(num) {
  const url = "/rank_articles.cgi?num=" + num;
  fetch(url, { method: "GET" })
    .then(response => response.text())
    .then((text) => {
      document.getElementById("rank-articles").innerHTML = text;
    });
}

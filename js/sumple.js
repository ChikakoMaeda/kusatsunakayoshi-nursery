function loadedPage() {
  const loadingID = document.getElementById("js_loading");
  loadingID.classList.add("loaded");
}

if (!sessionStorage.getItem('visited')) {
  sessionStorage.setItem('visited', 'first');
  window.addEventListener('load', function () {
    setTimeout(loadedPage, 2000);
  });
  setTimeout(loadedPage, 5000);
}else {
  loadedPage();
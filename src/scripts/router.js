function renderRoute(route) {
  let routeFound = false;

  // ...existing route rendering logic...

  if (!routeFound) {
    document.getElementById("main-content").innerHTML = `
      <div class="text-center mt-5">
        <h1>404</h1>
        <p>Halaman tidak ditemukan.</p>
      </div>
    `;
  }
}
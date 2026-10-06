// Apply the initial theme before styles render to avoid a light flash in dark mode.
(() => {
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch { /* Storage can be unavailable. */ }
  const theme = preference === 'dark' || preference === 'light'
    ? preference
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
})();

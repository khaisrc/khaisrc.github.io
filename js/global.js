const btn = document.getElementById('theme-toggle');
const icon = btn.querySelector('i');
const mq = window.matchMedia('(prefers-color-scheme: dark)');

function isDark() {
  const mode = document.documentElement.getAttribute('data-mode');
  return mode ? mode === 'dark' : mq.matches;
}

function syncIcon() {
  icon.className = isDark() ? 'fas fa-sun' : 'far fa-moon';
}

syncIcon();

btn.addEventListener('click', () => {
  const dark = !isDark();
  document.documentElement.setAttribute('data-mode', dark ? 'dark' : 'light');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  syncIcon();
});

// Keep icon in sync if system preference changes and no override is stored
mq.addEventListener('change', () => {
  if (!localStorage.getItem('theme')) syncIcon();
});

(() => {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (!header || !toggleBtn || !nav) return;

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggleBtn.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-open'));
  });

  // Cerrar al hacer click en un link del menú
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) setOpen(false);
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) setOpen(false);
  });

  // Si pasa a desktop, cerrar menú
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && header.classList.contains('is-open')) setOpen(false);
  });
})();

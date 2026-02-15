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

// JS Cotizador

const products = [
  {
    name: 'Algodón para limpieza',
    price: 37,
    uses: 'Limpieza general, absorción de líquidos, talleres y mantenimiento automotriz.',
  },
  {
    name: 'Algodón lavado',
    price: 27,
    uses: 'Limpieza delicada, hospitales, estéticas y superficies sensibles.',
  },
  {
    name: 'Poliéster para moler',
    price: 5,
    uses: 'Relleno y reutilización industrial.',
  },
  {
    name: 'Poliéster color limpieza',
    price: 15,
    uses: 'Limpieza industrial y absorción de grasa.',
  },
  {
    name: 'Poliéster para limpieza',
    price: 18,
    uses: 'Limpieza general industrial.',
  },
  {
    name: 'Algodón crudo limpieza',
    price: 42,
    uses: 'Limpieza pesada y absorción de solventes.',
  },
  {
    name: 'Trapo cocido nuevo',
    price: 37,
    uses: 'Limpieza doméstica e industrial.',
  },
];
const productList = document.getElementById('productList');
const usesBox = document.getElementById('productUses');
const kgSelect = document.getElementById('kgSelect');
const cutSelect = document.getElementById('cutSelect');
const orderBtn = document.getElementById('orderBtn');
const totalBox = document.getElementById('totalBox');

let selectedProduct = null;
let selectedKg = null;
let selectedCut = null;
let total = 0;

function calculateTotal() {
  if (!selectedProduct || !selectedKg) {
    totalBox.textContent = 'Total estimado: $0 MXN';
    return;
  }

  let kg = parseInt(selectedKg);

  if (isNaN(kg)) {
    totalBox.textContent = 'Total estimado: Cotizar';
    return;
  }

  total = selectedProduct.price * kg;

  totalBox.textContent = 'Total estimado: $' + total.toFixed(2) + ' MXN';
}

/* ========= PRODUCTOS ========= */
products.forEach((product) => {
  const pill = document.createElement('span');
  pill.className = 'pill';
  pill.textContent = product.name;

  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));

    pill.classList.add('active');

    selectedProduct = product;
    usesBox.textContent = product.uses;

    calculateTotal();
  });

  productList.appendChild(pill);
});

/* ========= BOTÓN PEDIDO ========= */
orderBtn.addEventListener('click', () => {
  if (!selectedProduct) {
    alert('Selecciona un producto');
    return;
  }

  if (!selectedKg) {
    alert('Selecciona cantidad');
    return;
  }

  if (!selectedCut) {
    alert('Selecciona tipo de corte');
    return;
  }

  const message =
    `🧾 *Nuevo pedido*%0A%0A` +
    `📦 Producto: ${selectedProduct.name}%0A` +
    `⚖️ Cantidad: ${selectedKg}%0A` +
    `✂️ Corte: ${selectedCut}%0A` +
    `💰 Total estimado: $${total.toFixed(2)} MXN%0A%0A` +
    `Quisiera confirmar disponibilidad.`;

  window.open(`https://wa.me/525645973242?text=${message}`, '_blank');
});

/* ========= CUSTOM SELECT ========= */
function initCustomSelect(id) {
  const select = document.getElementById(id);
  const trigger = select.querySelector('.select-trigger');
  const options = select.querySelector('.select-options');

  trigger.addEventListener('click', () => {
    document.querySelectorAll('.select-options').forEach((o) => (o.style.display = 'none'));

    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  options.querySelectorAll('.select-option').forEach((option) => {
    option.addEventListener('click', () => {
      trigger.textContent = option.textContent;
      options.style.display = 'none';

      if (id === 'kgSelect') {
        selectedKg = option.textContent;
        calculateTotal();
      }

      if (id === 'cutSelect') {
        selectedCut = option.textContent;
      }
    });
  });
}

initCustomSelect('kgSelect');
initCustomSelect('cutSelect');

/* ========= CERRAR SELECT AL HACER CLICK FUERA ========= */
document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-select')) {
    document.querySelectorAll('.select-options').forEach((o) => (o.style.display = 'none'));
  }
});

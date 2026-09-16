'use strict';

// Melhorias progressivas: a leitura e os links internos funcionam sem JavaScript.
document.documentElement.classList.add('js');

const navigation = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const mobileViewport = window.matchMedia('(max-width: 800px)');

function setMenuOpen(isOpen, restoreFocus = false) {
  navigation.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('menu-open')) {
    setMenuOpen(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target)) setMenuOpen(false);
});

mobileViewport.addEventListener('change', () => setMenuOpen(false));

// Uma única fonte de categorias conecta filtros, navegação e artigos.
const filterGroup = document.querySelector('.filters');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const newsCards = [...document.querySelectorAll('[data-news-category]')];
const filterStatus = document.querySelector('#filter-status');

function filterNews(category) {
  if (!filterButtons.some((button) => button.dataset.filter === category)) return;

  let visibleCount = 0;
  newsCards.forEach((card) => {
    const visible = category === 'todas' || card.dataset.newsCategory === category;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
    else card.querySelector('details').open = false;
  });

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  });

  const categoryName = filterButtons.find((button) => button.dataset.filter === category).textContent;
  filterStatus.textContent = `${categoryName}: ${visibleCount} ${visibleCount === 1 ? 'prévia disponível' : 'prévias disponíveis'}. Conteúdo demonstrativo.`;
}

filterGroup.hidden = false;
filterButtons.forEach((button) => {
  button.addEventListener('click', () => filterNews(button.dataset.filter));
});

document.querySelectorAll('[data-category]').forEach((link) => {
  link.addEventListener('click', () => filterNews(link.dataset.category));
});

// Ao sair do menu mobile, mova o foco para o destino, não para um link oculto.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    if (mobileViewport.matches && navigation.contains(link)) {
      setMenuOpen(false);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  });
});

// Indica a seção atual sem marcar várias categorias como ativas ao mesmo tempo.
const navigationLinks = [...document.querySelectorAll('.nav-link')];
if ('IntersectionObserver' in window) {
  const locationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const destination = entry.target.id === 'conteudo' ? '#inicio' : `#${entry.target.id}`;
      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === destination &&
          (!link.dataset.category || link.dataset.category === 'todas');
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });

  // Observe o hero separadamente para evitar que o main inteiro domine a navegação.
  const hero = document.querySelector('.hero');
  hero.id = 'capa';
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      navigationLinks.forEach((link) => link.removeAttribute('aria-current'));
      navigationLinks[0].setAttribute('aria-current', 'location');
    }
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  heroObserver.observe(hero);
  document.querySelectorAll('#sobre, #noticias').forEach((section) => locationObserver.observe(section));
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-entering');
      entry.target.addEventListener('animationend', () => {
        entry.target.classList.remove('is-entering');
      }, { once: true });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}

// Ano exibido no rodapé, sempre atualizado.
const yearLabel = document.querySelector('#current-year');
if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());
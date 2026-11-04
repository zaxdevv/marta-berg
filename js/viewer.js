const viewer = document.querySelector('.viewer');
const shot = viewer.querySelector('.viewer__img');
const caption = viewer.querySelector('.viewer__cap');
const links = [...document.querySelectorAll('[data-full]')];
let current = 0;

function show(i) {
  current = (i + links.length) % links.length;
  const link = links[current];
  const thumb = link.querySelector('img');
  const label = link.closest('figure').querySelector('.label');
  shot.src = link.href;
  shot.alt = thumb.alt;
  caption.textContent = [...label.querySelectorAll('.label__no, .label__name, .label__place')]
    .map((el) => el.textContent).join(' · ');
}

links.forEach((link, i) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    show(i);
    viewer.showModal();
  });
});

viewer.querySelector('.viewer__prev').addEventListener('click', () => show(current - 1));
viewer.querySelector('.viewer__next').addEventListener('click', () => show(current + 1));
viewer.querySelector('.viewer__close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') show(current - 1);
  if (event.key === 'ArrowRight') show(current + 1);
});
viewer.addEventListener('close', () => links[current].focus());

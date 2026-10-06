'use strict';

// All projects remain accessible when JavaScript is unavailable.
const filterGroup = document.querySelector('.filters');
const projects = [...document.querySelectorAll('[data-category]')];
const count = document.querySelector('.project-count');
filterGroup.hidden = false;
filterGroup.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  filterGroup.querySelectorAll('button').forEach((item) => {
    item.setAttribute('aria-pressed', String(item === button));
  });
  const selected = button.dataset.filter;
  let visible = 0;
  projects.forEach((project) => {
    project.hidden = selected !== 'all' && project.dataset.category !== selected;
    if (!project.hidden) visible += 1;
  });
  count.textContent = `${visible} ${selected === 'all' ? 'selected' : selected} project${visible === 1 ? '' : 's'}`;
});

// Hand-drawn poses explain gait differences; they are not a physics model or data.
const poses = {
  walk: { front: [325, 330, 355, 412], back: [228, 332, 180, 416], lift: 0, trajectory: 'M170 418 Q250 321 377 418', description: 'Walking · alternating steps with ground support.', title: 'A schematic study of a walking biped' },
  run: { front: [344, 296, 386, 360], back: [245, 325, 201, 283], lift: -17, trajectory: 'M170 403 Q263 230 395 392', description: 'Running · a flight phase between ground contacts.', title: 'A schematic study of a running biped in flight' },
  skip: { front: [334, 303, 312, 368], back: [268, 334, 251, 421], lift: -2, trajectory: 'M164 418 Q203 250 265 418 Q317 325 381 418', description: 'Skipping · an asymmetric step-and-hop pattern.', title: 'A schematic study of a skipping biped' }
};
const gaitGroup = document.querySelector('.gait-switch');
gaitGroup.hidden = false;
function drawLeg(side, points) {
  const [kx, ky, ax, ay] = points;
  const path = `M283 247 L${kx} ${ky} L${ax} ${ay}`;
  const elements = side === 'front' ? ['front-limb', 'front-limb-fill', 'front-limb-line'] : ['back-limb', 'back-limb-line'];
  elements.forEach((id) => document.getElementById(id).setAttribute('d', path));
  document.getElementById(`${side}-foot`).setAttribute('d', `M${ax - 7} ${ay + 7}H${ax + 29}`);
  const knee = document.getElementById(`${side}-knee`);
  knee.setAttribute('cx', kx);
  knee.setAttribute('cy', ky);
  if (side === 'front') {
    document.getElementById('front-knee-center').setAttribute('cx', kx);
    document.getElementById('front-knee-center').setAttribute('cy', ky);
  }
}
gaitGroup.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-gait]');
  if (!button) return;
  const pose = poses[button.dataset.gait];
  gaitGroup.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  drawLeg('front', pose.front);
  drawLeg('back', pose.back);
  document.getElementById('biped-body').setAttribute('transform', `translate(0 ${pose.lift})`);
  document.getElementById('foot-trajectory').setAttribute('d', pose.trajectory);
  document.getElementById('gait-description').textContent = pose.description;
  document.getElementById('biped-title').textContent = pose.title;
});

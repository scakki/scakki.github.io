// skillsgame.js
// Full‑screen game for the skills page. The user controls a blue circle and
// collides with coloured nodes to reveal skill descriptions. When all skills
// have been explored, a completion message is shown.

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const infoEl = document.getElementById('skillInfo');

  // Set canvas size to full viewport
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    // Optionally reposition skills when window size changes
    placeSkills();
  });

  // Player object
  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 12,
    color: '#58a6ff', // Blue player colour
    speed: 4,
  };

  // Skill definitions
  const skillDefinitions = [
    {
      name: 'Python',
      description: 'Extensive experience in Python for robotics, automation and data analysis.',
      color: '#f5c542',
    },
    {
      name: 'MATLAB & Simulink',
      description: 'Model‑based design and simulation using MATLAB, Simulink and Stateflow.',
      color: '#2ecc71',
    },
    {
      name: 'C/C++',
      description: 'Proficient in real‑time control and embedded programming.',
      color: '#e74c3c',
    },
    {
      name: 'Reinforcement Learning',
      description: 'Designing and training deep RL algorithms for locomotion and control tasks.',
      color: '#9b59b6',
    },
    {
      name: 'Model Predictive Control',
      description: 'Formulating and implementing MPC algorithms for optimal control problems.',
      color: '#3498db',
    },
    {
      name: 'PLC Programming',
      description: 'Ladder logic and structured text for industrial automation systems.',
      color: '#e67e22',
    },
    {
      name: 'ROS',
      description: 'Integrating sensors and actuators using the Robot Operating System.',
      color: '#1abc9c',
    },
    {
      name: 'CAD & SolidWorks',
      description: 'Designing mechanical components and assemblies using CAD tools.',
      color: '#e84393',
    },
  ];

  let skills = [];
  const skillRadius = 20;

  function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.hypot(dx, dy);
  }

  // Place skills randomly avoiding the player start area and edges
  function placeSkills() {
    skills = skillDefinitions.map(def => {
      let pos;
      let tries = 0;
      do {
        const x = skillRadius + Math.random() * (canvas.width - skillRadius * 2);
        const y = skillRadius + Math.random() * (canvas.height - skillRadius * 2);
        pos = { x, y };
        tries++;
      } while (
        distance(pos.x, pos.y, player.x, player.y) < player.radius + skillRadius + 100 &&
        tries < 200
      );
      return { ...def, x: pos.x, y: pos.y, collected: false };
    });
  }

  placeSkills();

  // Input handling
  const keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key] = true;
  });
  window.addEventListener('keyup', e => {
    keys[e.key] = false;
  });

  function update() {
    // Move based on keys
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    // Constrain within bounds
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

    // Check collisions with skills
    skills.forEach(skill => {
      if (!skill.collected) {
        const dist = distance(player.x, player.y, skill.x, skill.y);
        if (dist < player.radius + skillRadius) {
          skill.collected = true;
          showSkill(skill);
        }
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw skills
    skills.forEach(skill => {
      if (!skill.collected) {
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, skillRadius, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();
      }
    });
    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
  }

  function showSkill(skill) {
    infoEl.textContent = `${skill.name}: ${skill.description}`;
    clearTimeout(showSkill.timeout);
    showSkill.timeout = setTimeout(() => {
      infoEl.textContent = '';
    }, 6000);
    // Completion message
    if (skills.every(s => s.collected)) {
      infoEl.textContent = 'Great job! You have explored all skills.';
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  loop();
});
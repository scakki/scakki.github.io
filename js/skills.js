// skills.js
// A simple 2D game that represents different skills as coloured nodes on a canvas.
// The user controls a player circle using the arrow keys. Colliding with a node
// reveals information about that skill. Inspired by playful portfolio websites
// like bruno‑simon.com, this game is intentionally lightweight and accessible.

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('skillsCanvas');
  const ctx = canvas.getContext('2d');
  const infoEl = document.getElementById('skillInfo');

  // Resize the canvas to match its displayed size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Player properties
  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 12,
    // Use a bright colour for the player so it stands out against other nodes
    color: '#ffffff',
    speed: 3,
  };

  // Skills definitions
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
      description: 'Proficient in real‑time control and embedded programming in C and C++. ',
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

  // Create a copy of skills with random positions
  let skills = [];
  const skillRadius = 15;

  function placeSkills() {
    skills = skillDefinitions.map(def => {
      let position;
      let attempts = 0;
      do {
        // Keep a margin of 30px from the canvas edges
        const x = 30 + Math.random() * (canvas.width - 60);
        const y = 30 + Math.random() * (canvas.height - 60);
        position = { x, y };
        attempts++;
      } while (
        // Avoid overlapping with the player spawn area
        distance(position.x, position.y, player.x, player.y) < player.radius + skillRadius + 60 &&
        attempts < 100
      );
      return {
        ...def,
        x: position.x,
        y: position.y,
        collected: false,
      };
    });
  }

  // Distance helper
  function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  placeSkills();

  // Input handling
  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };
  window.addEventListener('keydown', (e) => {
    if (e.key in keys) {
      keys[e.key] = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key in keys) {
      keys[e.key] = false;
    }
  });

  // Game loop
  function update() {
    // Move player based on keys
    if (keys.ArrowUp) player.y -= player.speed;
    if (keys.ArrowDown) player.y += player.speed;
    if (keys.ArrowLeft) player.x -= player.speed;
    if (keys.ArrowRight) player.x += player.speed;
    // Boundary constraints
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

    // Collision detection with skills
    skills.forEach(skill => {
      if (!skill.collected) {
        const dist = distance(player.x, player.y, skill.x, skill.y);
        if (dist < player.radius + skillRadius) {
          skill.collected = true;
          displaySkillInfo(skill);
        }
      }
    });
  }

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw skills
    skills.forEach(skill => {
      if (!skill.collected) {
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, skillRadius, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();
        ctx.closePath();
      }
    });
    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  }

  function displaySkillInfo(skill) {
    infoEl.innerHTML = `<strong>${skill.name}</strong>: ${skill.description}`;
    setTimeout(() => {
      infoEl.innerHTML = '';
    }, 5000);
    // If all skills collected, show completion message
    if (skills.every(s => s.collected)) {
      infoEl.innerHTML = 'Congratulations! You have explored all of the skills.';
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  loop();
});
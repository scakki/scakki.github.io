/* Interactive Skills Game
 *
 * This module implements a simple 2D exploration game to replace the
 * static skills list. A cute robot avatar can be moved around with the
 * arrow keys or WASD. Hidden skill boxes are distributed across the
 * canvas; when the robot bumps into one, the skill name is revealed
 * in a manga‑style speech bubble and the box disappears. The game
 * respects the site's current theme by reading CSS custom properties
 * for colours on every draw call.
 */

(function() {
  let canvas, ctx;
  let robot;
  let skills = [];
  let keys = {};
  let bubble = null;
  let animationFrameId;
  let running = false;

  /** Read CSS variables from the page to keep the game in sync with the theme. */
  function getRootStyles() {
    const root = getComputedStyle(document.body);
    return {
      bg: root.getPropertyValue('--bg-secondary').trim() || '#161b22',
      primary: root.getPropertyValue('--text-primary').trim() || '#f0f6fc',
      secondary: root.getPropertyValue('--text-secondary').trim() || '#8b949e',
      accent: root.getPropertyValue('--accent-color').trim() || '#58a6ff'
    };
  }

  /** Initialise the game state and distribute skill boxes. */
  function initGame() {
    canvas = document.getElementById('skillsGameCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Place the robot roughly in the middle of the playing area.
    robot = {
      x: canvas.width / 2 - 20,
      y: canvas.height / 2 - 60,
      w: 40,
      h: 60,
      speed: 2,
      legPhase: 0,
      walkCounter: 0
    };

    // Define all of the skills that can be discovered.
    const skillNames = [
      'Python', 'MATLAB', 'C++', 'C', 'PLC Programming', 'ROS',
      'Fanuc Programming', 'Model-Based Control',
      'MATLAB & Simulink', 'SolidWorks', 'Allen Bradley Studio 5000',
      'RoboGuide', 'MuJoCo', 'LabVIEW', 'AutoCAD', 'VS Code',
      'Fundamentals of PLC', 'Fanuc Handling Tool Programming',
      'ROS: Localization, Navigation & SLAM', 'Reinforcement Learning Onramp'
    ];

    // Distribute skill boxes on a grid. Five columns are used to create
    // even spacing; additional rows are added automatically as needed.
    const cols = 5;
    const rows = Math.ceil(skillNames.length / cols);
    skills = [];
    for (let i = 0; i < skillNames.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col + 1) * (canvas.width / (cols + 1));
      const y = (row + 1) * (canvas.height / (rows + 1));
      skills.push({
        name: skillNames[i],
        x: x,
        y: y,
        size: 24,
        found: false
      });
    }

    // Show an introductory message at the beginning of the game.
    bubble = { text: 'Hi! Welcome to my skills world!', timer: 240 };
    keys = {};
  }

  /** Draw the robot avatar. A simple manga‑like robot built from rectangles. */
  function drawRobot() {
    const { accent, primary } = getRootStyles();
    ctx.save();
    ctx.translate(robot.x, robot.y);
    // Draw head and body using the accent colour.
    ctx.fillStyle = accent;
    // Head
    ctx.fillRect(0, 0, robot.w, 20);
    // Body
    ctx.fillRect(0, 20, robot.w, robot.h - 20);
    // Eyes
    ctx.fillStyle = primary;
    ctx.fillRect(8, 5, 6, 6);
    ctx.fillRect(robot.w - 14, 5, 6, 6);
    // Antenna
    ctx.strokeStyle = primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(robot.w / 2, 0);
    ctx.lineTo(robot.w / 2, -6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(robot.w / 2, -8, 2, 0, 2 * Math.PI);
    ctx.fill();
    // Arms
    ctx.fillStyle = accent;
    ctx.fillRect(-6, 30, 6, 20);
    ctx.fillRect(robot.w, 30, 6, 20);
    // Legs alternate position when walking.
    if (robot.legPhase === 0) {
      ctx.fillRect(8, robot.h + 0, 6, 18);
      ctx.fillRect(robot.w - 14, robot.h + 8, 6, 18);
    } else {
      ctx.fillRect(8, robot.h + 8, 6, 18);
      ctx.fillRect(robot.w - 14, robot.h + 0, 6, 18);
    }
    ctx.restore();
  }

  /** Draw the undiscovered skill boxes on the canvas. */
  function drawSkills() {
    const { accent, bg } = getRootStyles();
    skills.forEach(item => {
      if (item.found) return;
      ctx.fillStyle = bg;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(
        item.x - item.size / 2,
        item.y - item.size / 2,
        item.size,
        item.size
      );
      ctx.fill();
      ctx.stroke();
      // Question mark to hint at hidden information.
      ctx.fillStyle = accent;
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', item.x, item.y);
    });
  }

  /** Draw a speech/thought bubble above the robot if one is active. */
  function drawBubble() {
    if (!bubble || bubble.timer <= 0) return;
    const { bg, primary, accent } = getRootStyles();
    ctx.font = '14px sans-serif';
    // Break the text into lines in case it contains newline characters.
    const lines = bubble.text.split('\n');
    let maxWidth = 0;
    lines.forEach(line => {
      const width = ctx.measureText(line).width;
      if (width > maxWidth) maxWidth = width;
    });
    const paddingX = 10;
    const paddingY = 8;
    const bubbleWidth = maxWidth + 2 * paddingX;
    const bubbleHeight = lines.length * 18 + 2 * paddingY;
    let bx = robot.x + robot.w / 2 - bubbleWidth / 2;
    let by = robot.y - bubbleHeight - 30;
    // Keep the bubble within the bounds of the canvas.
    if (bx < 10) bx = 10;
    if (bx + bubbleWidth > canvas.width - 10) {
      bx = canvas.width - bubbleWidth - 10;
    }
    if (by < 10) by = 10;
    // Rounded rectangle background
    const radius = 8;
    ctx.fillStyle = bg;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + radius, by);
    ctx.lineTo(bx + bubbleWidth - radius, by);
    ctx.quadraticCurveTo(
      bx + bubbleWidth,
      by,
      bx + bubbleWidth,
      by + radius
    );
    ctx.lineTo(bx + bubbleWidth, by + bubbleHeight - radius);
    ctx.quadraticCurveTo(
      bx + bubbleWidth,
      by + bubbleHeight,
      bx + bubbleWidth - radius,
      by + bubbleHeight
    );
    ctx.lineTo(bx + radius, by + bubbleHeight);
    ctx.quadraticCurveTo(
      bx,
      by + bubbleHeight,
      bx,
      by + bubbleHeight - radius
    );
    ctx.lineTo(bx, by + radius);
    ctx.quadraticCurveTo(bx, by, bx + radius, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Tail pointing at the robot
    const tailX = robot.x + robot.w / 2;
    const tailY = robot.y;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(tailX - 6, by + bubbleHeight);
    ctx.lineTo(tailX + 6, by + bubbleHeight);
    ctx.closePath();
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.stroke();
    // Draw text
    ctx.fillStyle = primary;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    let tx = bx + paddingX;
    let ty = by + paddingY;
    lines.forEach(line => {
      ctx.fillText(line, tx, ty);
      ty += 18;
    });
  }

  /** Clear the entire canvas using the background colour. */
  function clearCanvas() {
    const { bg } = getRootStyles();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /** Update the game state: move the robot, animate its legs and handle collisions. */
  function update() {
    // Move the robot based on currently pressed keys.
    let moved = false;
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
      if (robot.y > 0) robot.y -= robot.speed;
      moved = true;
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
      if (robot.y + robot.h + 25 < canvas.height) robot.y += robot.speed;
      moved = true;
    }
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      if (robot.x > 0) robot.x -= robot.speed;
      moved = true;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      if (robot.x + robot.w < canvas.width) robot.x += robot.speed;
      moved = true;
    }
    // If moved, animate the walking gait and remove the welcome bubble.
    if (moved) {
      robot.walkCounter++;
      if (robot.walkCounter > 15) {
        robot.walkCounter = 0;
        robot.legPhase = 1 - robot.legPhase;
      }
      if (bubble && bubble.text.startsWith('Hi!')) {
        bubble.timer = 0;
      }
    }
    // Check for collisions with skill boxes.
    skills.forEach(item => {
      if (item.found) return;
      const dx = Math.abs((robot.x + robot.w / 2) - item.x);
      const dy = Math.abs((robot.y + robot.h / 2) - item.y);
      if (dx < robot.w / 2 + item.size / 2 && dy < robot.h / 2 + item.size / 2) {
        item.found = true;
        bubble = { text: item.name, timer: 200 };
      }
    });
    // Decrease bubble timer and clear when expired.
    if (bubble) {
      bubble.timer--;
      if (bubble.timer <= 0) {
        bubble = null;
      }
    }
  }

  /** Render the current game state. */
  function draw() {
    clearCanvas();
    drawSkills();
    drawRobot();
    drawBubble();
  }

  /** Main loop executed via requestAnimationFrame. */
  function loop() {
    update();
    draw();
    animationFrameId = requestAnimationFrame(loop);
  }

  /** Begin running the game. Attaches event listeners and starts the loop. */
  function start() {
    // Only start the game if it is not already running and the canvas exists.
    if (running) return;
    canvas = document.getElementById('skillsGameCanvas');
    if (!canvas) return;
    initGame();
    running = true;
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    loop();
  }

  /** Stop the game. Removes event listeners and cancels the animation frame. */
  function stop() {
    if (!running) return;
    running = false;
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    cancelAnimationFrame(animationFrameId);
  }

  /** Record key presses for smooth continuous movement. */
  function handleKeyDown(e) {
    keys[e.key] = true;
  }

  /** Record key releases. */
  function handleKeyUp(e) {
    keys[e.key] = false;
  }

  // Expose the start/stop functions globally so they can be called from the page
  // navigation system in index.html.
  window.skillsGameStart = start;
  window.skillsGameStop = stop;
})();
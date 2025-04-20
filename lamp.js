/**************************************************
 * Matter.js Setup
 **************************************************/
const { Engine, Render, Runner, Bodies, Body, Constraint, Mouse, MouseConstraint, Events, World } = Matter;

// Create engine with natural gravity.
const engine = Engine.create();
engine.world.gravity.y = 0.8; // Lighter gravity so the dingle isn't pulled down too much

// Create the renderer.
const canvas = document.getElementById('matter-canvas');
const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: 200,
    height: 200,
    wireframes: false,
    background: 'transparent',
    pixelRatio: window.devicePixelRatio
  }
});

/**************************************************
 * Create Boundaries to Keep the Rope Within the Scene
 **************************************************/
function createBoundary(x, y, w, h) {
  return Bodies.rectangle(x, y, w, h, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  });
}
const wallThickness = 50;
const walls = [
  createBoundary(100, -wallThickness/2, 200, wallThickness),    // top
  createBoundary(100, 200 + wallThickness/2, 200, wallThickness), // bottom
  createBoundary(-wallThickness/2, 100, wallThickness, 200),       // left
  createBoundary(200 + wallThickness/2, 100, wallThickness, 200)   // right
];
World.add(engine.world, walls);

/**************************************************
 * Create the Rope and Anchor
 **************************************************/
// Anchor point positioned where the pull cord would connect to the lamp
const anchor = { x: 100, y: 80 }; // Lower positioning 
// Create the rope pull bob (a small cylinder for the dingle/pull).
const ropePull = Bodies.circle(anchor.x, anchor.y + 25, 8, { // Position it more expanded by default
  restitution: 0.4,
  frictionAir: 0.03, // Less air friction for more natural movement
  density: 0.0015, // Moderate density
  render: { 
    fillStyle: '#6D4C41',  // Darker, more subtle color
    strokeStyle: '#5D4037',
    lineWidth: 1, // Thinner outline
    opacity: 0.9
  }
});
// Constrain the rope pull to the anchor with a set length.
const ropeConstraint = Constraint.create({
  pointA: anchor,
  bodyB: ropePull,
  pointB: { x: 0, y: 0 },
  length: 25,  // Longer cord to allow more expanded position
  stiffness: 0.8,
  render: { 
    strokeStyle: '#6D4C41',  // Darker wood color
    lineWidth: 1 // Thinner and more subtle
  }
});
World.add(engine.world, [ropePull, ropeConstraint]);

/**************************************************
 * Add Mouse Interaction
 **************************************************/
// Use the canvas for mouse controls.
const mouse = Mouse.create(canvas);

// Ensure mouse coordinates are properly scaled
mouse.pixelRatio = render.options.pixelRatio;

const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});

World.add(engine.world, mouseConstraint);

// Track when pull is being dragged
let isDraggingPull = false;

Events.on(mouseConstraint, 'startdrag', (event) => {
  if (event.body === ropePull) {
    isDraggingPull = true;
  }
});

// When dragging ends, if the rope is pulled farther than a threshold, toggle the theme.
Events.on(mouseConstraint, 'enddrag', (event) => {
  if (event.body === ropePull && isDraggingPull) {
    const dx = ropePull.position.x - anchor.x;
    const dy = ropePull.position.y - anchor.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const threshold = 8; // Smaller threshold for more precise control
    
    if (distance > threshold) {
      // Toggle dark mode
      document.body.classList.toggle('dark');
      const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
    }
    
    isDraggingPull = false;
  }
});

// Add a click handler as a backup to ensure interaction works
canvas.addEventListener('click', (event) => {
  const bounds = canvas.getBoundingClientRect();
  const clickX = event.clientX - bounds.left;
  const clickY = event.clientY - bounds.top;
  
  // Check if click is close to the dingle
  const dx = clickX - ropePull.position.x;
  const dy = clickY - ropePull.position.y;
  const distance = Math.sqrt(dx*dx + dy*dy);
  
  if (distance < 20) {
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
  }
});

// If mouse is released outside the canvas, force end the drag.
document.addEventListener('mouseup', () => {
  if (mouseConstraint.constraint.bodyB) {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null;
  }
});

// Apply a very small initial impulse for natural positioning
setTimeout(() => {
  Body.applyForce(ropePull, 
    { x: ropePull.position.x, y: ropePull.position.y }, 
    { x: 0.0002, y: 0 }
  );
}, 500);

/**************************************************
 * Run the Engine and Renderer
 **************************************************/
const runner = Runner.create();
Runner.run(runner, engine);
Render.run(render);

// Use dark theme by default, or load from localStorage if available
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.remove('dark'); // Switch to light if explicitly set
} else {
  // Default is dark (already set in HTML)
  localStorage.setItem('theme', 'dark');
}
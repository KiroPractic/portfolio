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
const anchor = { x: 75, y: 80 }; // Lower positioning, halfway to the left
// Create the rope pull bob (a small cylinder for the dingle/pull).
const ropePull = Bodies.circle(anchor.x, anchor.y + 25, 6, { // Smaller metallic ball (reduced from 8 to 6)
  restitution: 0.2, // Less bounce for a more stable string
  frictionAir: 0.03, // More air friction for less swinging
  density: 0.015, // Slightly higher density for more stability
  render: { 
    fillStyle: '#A9A9A9',  // Silver/metallic gray
    strokeStyle: '#D3D3D3', // Light gray highlight for metallic effect
    lineWidth: 1, // Thin outline
    opacity: 1.0  // Full opacity for metallic look
  }
});
// Constrain the rope pull to the anchor with a set length.
const ropeConstraint = Constraint.create({
  pointA: anchor,
  bodyB: ropePull,
  pointB: { x: 0, y: 0 },
  length: 25,  // Longer cord to allow more expanded position
  stiffness: 1.0, // Maximum stiffness for a straight line
  render: { 
    strokeStyle: '#444444',  // Dark gray string
    lineWidth: 1, // Thin line
    type: 'line' // Force straight line rendering
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
// Flag for when dongle is manually clicked
let dongleSelected = false;
// Flag to track if our custom constraint is active
let customConstraintActive = false;
// Store the mouse position when dongle is clicked
let customMousePosition = { x: 0, y: 0 };

// Create a custom constraint for our manual dongle handling
const customConstraint = Constraint.create({
  pointA: customMousePosition,
  bodyB: ropePull,
  pointB: { x: 0, y: 0 },
  stiffness: 0.2,
  length: 0,
  render: { visible: false }
});
// Don't add it to the world yet - we'll add it only when needed

Events.on(mouseConstraint, 'startdrag', (event) => {
  if (event.body === ropePull) {
    isDraggingPull = true;
  }
});

// Function to check distance and toggle theme if needed
function checkToggleTheme() {
  const dx = ropePull.position.x - anchor.x;
  const dy = ropePull.position.y - anchor.y;
  const distance = Math.sqrt(dx*dx + dy*dy);
  const threshold = 35; // Smaller threshold for more precise control
  
  if (distance > threshold) {
    // Toggle dark mode
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    return true;
  }
  return false;
}

// Main interaction handler for both mouse and touch
function handleInteraction(eventX, eventY) {
  if (typeof eventX === 'undefined' || typeof eventY === 'undefined') return;
  
  const bounds = canvas.getBoundingClientRect();
  let clickX = eventX - bounds.left;
  let clickY = eventY - bounds.top;
  
  // Adjust coordinates if scaling is applied (< 480px)
  const scaleFactor = window.innerWidth < 480 ? 0.6 : 1.0;
  if (scaleFactor !== 1.0) {
      // Map screen coordinates (relative to scaled bounds) to physics coordinates
      clickX /= scaleFactor;
      clickY /= scaleFactor;
  }
  
  // Check if click/touch is close to the dongle (using adjusted coords)
  const dx = clickX - ropePull.position.x;
  const dy = clickY - ropePull.position.y;
  const distance = Math.sqrt(dx*dx + dy*dy);
  
  if (distance < 40) { // Threshold might need adjustment if interaction feels off
    // Store the *adjusted* mouse position for our custom constraint
    // These coordinates are now in the physics engine's space
    customMousePosition.x = clickX;
    customMousePosition.y = clickY;
    
    // Setup custom constraint
    if (!customConstraintActive) {
      // Add our custom constraint to the world
      World.add(engine.world, customConstraint);
      customConstraintActive = true;
    }
    
    // Mark dongle as manually selected
    dongleSelected = true;
  }
}

// Update the custom constraint point when mouse/touch moves
function updateCustomConstraint(eventX, eventY) {
  if (!customConstraintActive || !dongleSelected) return;
  
  const bounds = canvas.getBoundingClientRect();
  let adjustedX = eventX - bounds.left;
  let adjustedY = eventY - bounds.top;
  
  // Adjust coordinates if scaling is applied (< 480px)
  const scaleFactor = window.innerWidth < 480 ? 0.6 : 1.0;
  if (scaleFactor !== 1.0) {
      // Map screen coordinates (relative to scaled bounds) to physics coordinates
      adjustedX /= scaleFactor;
      adjustedY /= scaleFactor;
  }
  
  // Update the custom constraint anchor point in physics space
  customMousePosition.x = adjustedX;
  customMousePosition.y = adjustedY;
}

// Release the custom constraint
function releaseCustomConstraint() {
  if (customConstraintActive) {
    // Check if we should toggle the theme
    checkToggleTheme();
    
    // Remove custom constraint from world
    World.remove(engine.world, customConstraint);
    customConstraintActive = false;
    dongleSelected = false;
    isDraggingPull = false;
  }
}

// Mouse event handlers
canvas.addEventListener('mousedown', (event) => {
  handleInteraction(event.clientX, event.clientY);
});

document.addEventListener('mousemove', (event) => {
  updateCustomConstraint(event.clientX, event.clientY);
});

document.addEventListener('mouseup', () => {
  releaseCustomConstraint();
  
  // Also ensure the built-in constraint is released
  if (mouseConstraint.constraint.bodyB) {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null;
  }
});

// Touch event handlers
canvas.addEventListener('touchstart', (event) => {
  if (event.touches && event.touches[0]) {
    handleInteraction(event.touches[0].clientX, event.touches[0].clientY);
    
    // Prevent default to avoid scrolling if we've selected the dongle
    if (dongleSelected && event.cancelable) {
      event.preventDefault();
    }
  }
}, { passive: false });

document.addEventListener('touchmove', (event) => {
  if (event.touches && event.touches[0]) {
    updateCustomConstraint(event.touches[0].clientX, event.touches[0].clientY);
    
    // Prevent default to avoid scrolling if we've selected the dongle
    if (dongleSelected && event.cancelable) {
      event.preventDefault();
    }
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  releaseCustomConstraint();
  
  // Also ensure the built-in constraint is released
  if (mouseConstraint.constraint.bodyB) {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null;
  }
});

// Disable the built-in MouseConstraint for ropePull to avoid interference
Events.on(mouseConstraint, 'beforeupdate', () => {
  // If our custom handling is active, prevent the built-in constraint from taking over
  if (customConstraintActive && mouseConstraint.body === ropePull) {
    mouseConstraint.body = null;
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
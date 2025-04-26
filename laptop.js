// Create and append laptop element
document.addEventListener('DOMContentLoaded', function() {
  // Create laptop elements
  const laptop = document.createElement('div');
  laptop.className = 'laptop';
  laptop.title = "Click to view career timeline";
  laptop.style.cursor = "pointer";
  
  const laptopLid = document.createElement('div');
  laptopLid.className = 'laptop-lid';
  
  const laptopScreen = document.createElement('div');
  laptopScreen.className = 'laptop-screen'; // Will set background image via JS
  
  const laptopWebcam = document.createElement('div');
  laptopWebcam.className = 'laptop-webcam';
  
  const laptopBase = document.createElement('div');
  laptopBase.className = 'laptop-base';
  
  // Build the laptop structure
  laptopLid.appendChild(laptopScreen);
  laptopLid.appendChild(laptopWebcam);
  laptop.appendChild(laptopLid);
  laptop.appendChild(laptopBase);
  
  // Add click handler to scroll to timeline
  laptop.addEventListener('click', function() {
    const timelineSection = document.querySelector('.timeline-container');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Add laptop to the items container
  const itemContainer = document.querySelector('.table-items-container');
  if (itemContainer) {
    itemContainer.appendChild(laptop);
  } else {
     console.error('Table items container not found for laptop placement.');
  }
  
  // Function to update laptop screen based on theme
  const updateLaptopScreen = () => {
    const isDarkMode = document.body.classList.contains('dark');
    if (isDarkMode) {
      laptopScreen.style.backgroundImage = "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeng5dHkyZmVkbjFoZnZ2N2h0b294MHNuNndpZWs4MWMybzI4M2gyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V4NSR1NG2p0KeJJyr5/giphy.gif')";
    } else {
      laptopScreen.style.backgroundImage = "url('windows_xp.gif')";
    }
  };
  
  // Initial screen update
  updateLaptopScreen();
  
  // Observe body class changes for theme switching
  const themeObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        updateLaptopScreen();
      }
    });
  });
  
  themeObserver.observe(document.body, { attributes: true });
  
  // Add laptop styles
  const style = document.createElement('style');
  style.textContent = `
    /* Laptop styling - Flex Item */
    .laptop {
      position: relative; /* Needed for children */
      width: 180px;
      height: 120px;
      z-index: 2000; /* Keep z-index relative to siblings */
      transform: perspective(500px) rotateX(10deg); /* No translateY */
      transform-origin: bottom center;
      pointer-events: auto; 
      transition: transform 0.2s ease;
      flex-shrink: 0; 
    }
    
    .laptop:hover {
      transform: perspective(500px) rotateX(10deg) translateY(-5px); 
    }
    
    /* Laptop lid (top part with screen) */
    .laptop-lid {
      position: absolute; 
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 110px;
      background-color: #333; 
      border-radius: 6px 6px 0 0;
      border: 2px solid #222;
      border-bottom: none;
      box-sizing: border-box;
      overflow: hidden;
      z-index: 2; 
    }
    
    /* Laptop screen */
    .laptop-screen {
      position: absolute; 
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      background-color: #fff; 
      border: 1px solid #444;
      box-sizing: border-box;
      transition: background-color var(--transition-duration) ease;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 1; 
    }
    
    body.dark .laptop-screen {
      background-color: #222; 
    }
        
    /* Laptop webcam */
    .laptop-webcam {
      position: absolute; 
      top: 3px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background-color: #222;
      border-radius: 50%;
      z-index: 3; 
    }
    
    /* Laptop base (bottom part) */
    .laptop-base {
      position: absolute; 
      bottom: 0;
      left: 0;
      width: 100%;
      height: 10px;
      background-color: #2a2a2a; 
      border-radius: 2px 2px 6px 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      z-index: 1; 
    }
    
    /* Responsive adjustments only for transform/scale */
    @media (max-width: 992px) and (min-width: 768px) {
      .laptop {
        transform: perspective(500px) rotateX(10deg) scale(0.9);
      }
      .laptop:hover {
        transform: perspective(500px) rotateX(10deg) translateY(-5px) scale(0.9);
      }
    }
    
    @media (max-width: 768px) {
      .laptop {
        transform: perspective(500px) rotateX(10deg) scale(0.8);
      }
      .laptop:hover {
        transform: perspective(500px) rotateX(10deg) translateY(-5px) scale(0.8);
      }
    }
    
    @media (max-width: 400px) {
      .laptop {
        transform: perspective(500px) rotateX(10deg) scale(0.7);
      }
      .laptop:hover {
        transform: perspective(500px) rotateX(10deg) translateY(-5px) scale(0.7);
      }
    }
  `;
  document.head.appendChild(style);
});
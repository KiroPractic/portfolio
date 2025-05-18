document.addEventListener('DOMContentLoaded', function() {
  // Create main cap element which will hold the image
  const cap = document.createElement('div');
  cap.className = 'baseball-cap';
  cap.title = "Click to view recent activities"; // Tooltip
  cap.style.cursor = "pointer";

  // Removed creation of crown, logo, visor divs

  // Add click handler to scroll to Strava section
  cap.addEventListener('click', function() {
    const stravaSection = document.querySelector('.strava-activities-container');
    if (stravaSection) {
      stravaSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Strava activities container not found.');
    }
  });

  // Add cap to the items container
  const itemContainer = document.querySelector('.table-items-container');
  if (itemContainer) {
    itemContainer.appendChild(cap);
  } else {
    console.error('Table items container not found for cap placement.');
  }

  // Add cap styles
  const style = document.createElement('style');
  style.textContent = `
    /* Baseball Cap Styling - Flex Item */
    .baseball-cap {
      /* position: ??? REMOVED */
      --cap-height: 72px; /* Halved from 144px */
      --cap-width: 115px;  /* Halved from 230px */
      
      width: var(--cap-width); /* Restored */
      height: var(--cap-height);
      z-index: 2001; /* Keep z-index relative to siblings */
      
      background-image: url('./assets/images/cap.png');
      background-size: contain; 
      background-position: bottom center; 
      background-repeat: no-repeat;

      transform: perspective(600px) rotateX(1deg); /* No translateY */
      transform-origin: bottom center;
      pointer-events: auto;
      transition: transform 0.2s ease;
      flex-shrink: 0; 
      
      background-color: transparent; 
      border: none;
      box-shadow: none;
    }

    .baseball-cap:hover {
      transform: translateY(-5px); 
    }
        
    /* Responsive Adjustments only for transform/scale */
    @media (max-width: 992px) and (min-width: 768px) {
      .baseball-cap {
        transform: perspective(600px) rotateX(1deg); /* Reduced by 20% */
      }
    }

    @media (max-width: 768px) {
      .baseball-cap {
        transform: perspective(600px) rotateX(1deg); /* Reduced by 20% */
      }
    }

    /* Apply smaller scaling below 480px */
    @media (max-width: 480px) { /* Changed from 400px */
      .baseball-cap {
        /* Explicitly set halved dimensions for this breakpoint */
        transform: perspective(600px) rotateX(1deg); /* Adjusted scale */
      }
    }
  `;
  document.head.appendChild(style);
}); 
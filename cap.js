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
      --cap-height: 144px; /* Reduced by 20% */
      --cap-width: 230px;  /* Reduced by 20%, Restored */
      
      width: var(--cap-width); /* Restored */
      height: var(--cap-height);
      z-index: 2001; /* Keep z-index relative to siblings */
      
      background-image: url('cap.png');
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
      transform: perspective(600px) rotateX(1deg) translateY(-5px); 
    }
        
    /* Responsive Adjustments only for transform/scale */
    @media (max-width: 992px) and (min-width: 768px) {
      .baseball-cap {
        --cap-height: 130px; /* Reduced by 20% */
        --cap-width: 207px; /* Reduced by 20%, Restored */
        transform: perspective(600px) rotateX(1deg) scale(0.72); /* Reduced by 20% */
      }
      .baseball-cap:hover {
        transform: perspective(600px) rotateX(1deg) translateY(-5px) scale(0.72); /* Reduced by 20% */
      }
    }

    @media (max-width: 768px) {
      .baseball-cap {
        --cap-height: 115px; /* Reduced by 20% */
        --cap-width: 184px; /* Reduced by 20%, Restored */
        transform: perspective(600px) rotateX(1deg) scale(0.64); /* Reduced by 20% */
      }
      .baseball-cap:hover {
        transform: perspective(600px) rotateX(1deg) translateY(-5px) scale(0.64); /* Reduced by 20% */
      }
    }

    @media (max-width: 400px) {
      .baseball-cap {
        --cap-height: 101px; /* Reduced by 20% */
        --cap-width: 162px; /* Reduced by 20%, Restored */
        transform: perspective(600px) rotateX(1deg) scale(0.56); /* Reduced by 20% */
      }
       .baseball-cap:hover {
         transform: perspective(600px) rotateX(1deg) translateY(-5px) scale(0.56); /* Reduced by 20% */
      }
    }
  `;
  document.head.appendChild(style);
}); 
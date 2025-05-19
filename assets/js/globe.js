// Globe Map Setup - with subtle styling for unvisited countries
document.addEventListener('DOMContentLoaded', async () => {
  try {
    
    // Countries I've visited with data
    const visitedCountries = [
      {
        name: 'United States',
        code: 'USA',
        description: 'I have just been to the US once, but it was an amazing experience, and I am sure to come back and explore the rest of the country.',
        albumLink: 'https://photos.google.com/album/us-trip',
        images: [
          'assets/images/us/20221127_130622.jpg',
          'assets/images/us/20221128_130650.jpg',
          'assets/images/us/20221128_144614.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Canada',
        code: 'CAN',
        description: 'The best road trip I have ever had. Visited Toronto, Niagara Falls, Montreal, Ottawa, and Quebec City, all in 9 days. It is scary how enormous the country is. Their history is not that long, but there is still lots to see, and the nature is unbelievable.',
        albumLink: 'https://photos.google.com/album/canada-trip',
        images: [
          'assets/images/canada/20230708_134200.jpg',
          'assets/images/canada/20230712_110756.jpg',
          'assets/images/canada/20230713_163312.jpg',
          'assets/images/canada/20230713_194244~2.jpg',
          'assets/images/canada/20230714_163007.jpg',
          'assets/images/canada/20230715_111911.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Greece',
        code: 'GRC',
        description: `<div><strong>High School Trip:</strong> Visited Greece with my high school classmates. The cradle of Western civilization, with amazing history and nature.</div>
        <div style="margin-top:12px"><strong>Zakynthos:</strong> Experienced the amazing beaches of this island paradise, with stunning coastlines and great nightlife.</div>
        <div style="margin-top:12px"><strong>Athens:</strong> I felt like I time-travelled 2000 years back in time, because of the vast historical sites that do not stop showing up around every corner.</div>
        <div style="margin-top:12px"><strong>Meteora:</strong> The monasteries were the highlight of the trip. The nature and the architecture intertwining in such a way is unbelievable.</div>`,
        albumLink: 'https://photos.google.com/album/greece-high-school-trip',
        images: [
          'https://flagcdn.com/w320/gr.png'
        ],
        type: 'visited'
      },
      {
        name: 'Bosnia and Herzegovina',
        code: 'BIH',
        description: `<div>Visited in summer 2024 to play a concert with my band "Gacki Galeb". The audience was amazing, and the experience was unforgettable. I hope to play there again soon.</div>`,
        albumLink: 'https://photos.google.com/album/bosnia-concert-trip',
        images: [
          'https://flagcdn.com/w320/ba.png'
        ],
        type: 'visited'
      },
      {
        name: 'Serbia',
        code: 'SRB',
        description: `<div><strong>Team Building:</strong> Visited in 2022 as part of a team-building trip with my previous workplace. The city is full of life, and although it's so close to Croatia, it feels like a different continent.</div>
        <div style="margin-top:12px"><strong>Belgrade:</strong> Explored the vibrant capital city with its rich history, energetic nightlife, and distinctive cultural scene.</div>`,
        albumLink: 'https://photos.google.com/album/serbia-team-building',
        images: [
          'https://flagcdn.com/w320/rs.png'
        ],
        type: 'visited'
      },
      {
        name: 'Hungary',
        code: 'HUN',
        description: `<div><strong>High School Trip:</strong> Visited with my high school classmates. Budapest was amazing, and I am sure to come back soon and go to the F1 race as well.</div>`,
        albumLink: 'https://photos.google.com/album/hungary-high-school-trip',
        images: [
          'https://flagcdn.com/w320/hu.png'
        ],
        type: 'visited'
      },
      {
        name: 'San Marino',
        code: 'SMR',
        description: `<div><strong>Tiny but Magical:</strong> Visited this microstate multiple times and was always charmed by its unique atmosphere. Despite its small size, San Marino has a distinct cultural identity and fascinating history.</div>
        <div style="margin-top:12px"><strong>Medieval Architecture:</strong> Enjoyed the well-preserved medieval architecture, especially the three towers perched dramatically on Mount Titano's peaks.</div>`,
        albumLink: 'https://photos.google.com/album/san-marino-trips',
        images: [
          'https://flagcdn.com/w320/sm.png'
        ],
        type: 'visited'
      },
      {
        name: 'Spain',
        code: 'ESP',
        description: `<div><strong>Barcelona:</strong> Recently visited Barcelona to attend a Smart City conference, exploring the innovative urban solutions while enjoying the city's unique Gaudí architecture and vibrant culture.</div>
        <div style="margin-top:12px"><strong>Tenerife:</strong> Visited this beautiful Canary Island as a child, with fond memories of the volcanic landscapes, beaches, and family adventures.</div>`,
        albumLink: 'https://photos.google.com/album/spain-trips',
        images: [
          'assets/images/spain/20241105_181446.jpg',
          'assets/images/spain/20241106_233628.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Monaco',
        code: 'MCO',
        description: `<div><strong>F1 Heritage & Luxury:</strong> Loved experiencing Monaco's glamorous atmosphere with its collection of fancy cars and rich Formula 1 racing heritage.</div>
        <div style="margin-top:12px"><strong>Museums:</strong> Explored Monaco's amazing museums that showcase its rich history, royal heritage, and automotive excellence. The tiny principality packs in impressive cultural attractions despite its small size.</div>`,
        albumLink: 'https://photos.google.com/album/monaco-trip',
        images: [
          'https://flagcdn.com/w320/mc.png'
        ],
        type: 'visited'
      },
      {
        name: 'Switzerland',
        code: 'CHE',
        description: `<div><strong>CERN & Geneva:</strong> Visited in 2024 and was fascinated by the mindblowing science at CERN. Exploring the birthplace of the web and seeing the Large Hadron Collider was an incredible experience.</div>
        <div style="margin-top:12px"><strong>Scenic Journey:</strong> The train ride back to Croatia through the Swiss Alps and along Lake Como was my favorite train journey ever. The snow-covered mountains and breathtaking landscapes made for an unforgettable experience.</div>`,
        albumLink: 'https://photos.google.com/album/switzerland-cern-trip',
        images: [
          'https://flagcdn.com/w320/ch.png'
        ],
        type: 'visited'
      },
      {
        name: 'Austria',
        code: 'AUT',
        description: `<div><strong>Red Bull Ring:</strong> Visited 5 times to watch Formula 1 races. The thrill of witnessing high-speed racing in the beautiful setting of Styria is unforgettable.</div>
        <div style="margin-top:12px"><strong>Experiences:</strong> Made multiple trips to Austria over the years, enjoying the perfect blend of Alpine scenery, rich cultural heritage, and world-class sporting events.</div>`,
        albumLink: 'https://photos.google.com/album/austria-f1-trips',
        images: [
          'assets/images/austria/20170709_121237.jpg',
          'assets/images/austria/20240812_143604.jpg',
          'assets/images/austria/20241018_122017~2.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Italy',
        code: 'ITA',
        description: `<div><strong>Sicily:</strong> Fell in love with Sicily in January 2024. The island's unique blend of culture, cuisine, and natural beauty is breathtaking.</div>
        <div style="margin-top:12px"><strong>Experiences:</strong> Explored the magnificent volcanoes and beautiful coastlines. The connection between the sea and land created some of the most stunning landscapes I've ever seen.</div>`,
        albumLink: 'https://photos.google.com/album/italy-sicily-trip',
        images: [
          'assets/images/italy/20240112_102408.jpg',
          'assets/images/italy/20240113_113722.jpg',
          'assets/images/italy/20240114_104555.jpg',
          'assets/images/italy/20240114_160147.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'France',
        code: 'FRA',
        description: `<div><strong>Paris:</strong> Visited in January 2024 and was surprised by the city's beauty, and the lack of tourists, especially when it was covered in snow.</div>`,
        albumLink: 'https://photos.google.com/album/france-paris-trip',
        images: [
          'assets/images/france/20240116_103249.jpg',
          'assets/images/france/20240116_152646.jpg',
          'assets/images/france/20240116_165344.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Netherlands',
        code: 'NLD',
        description: `<div>The Netherlands has a different vibe to all the other countries I have visited. It has great architecture, but, for me, it is lacking in natural beauty.</div>`,
        albumLink: 'https://photos.google.com/album/netherlands-trip',
        images: [
          'https://flagcdn.com/w320/nl.png'
        ],
        type: 'visited'
      },
      {
        name: 'Slovenia',
        code: 'SVN',
        description: `<div><strong>Childhood Memories:</strong> Enjoyed skiing trips as a child, with fond memories of the snowy mountains and alpine scenery.</div>
        <div style="margin-top:12px"><strong>Future Plans:</strong> Would love to return and explore Slovenia's hidden secrets and natural wonders as an adult. The country has so much more to offer beyond skiing.</div>`,
        albumLink: 'https://photos.google.com/album/slovenia-skiing',
        images: [
          'https://flagcdn.com/w320/si.png'
        ],
        type: 'visited'
      },
      {
        name: 'Germany',
        code: 'DEU',
        description: `<div><strong>UEFA Euro 2024:</strong> First visited in 2024 to watch Croatia play in the Euros. The atmosphere and experience was incredible. So many people, all in positive spirits.</div>
        <div style="margin-top:12px"><strong>Hamburg:</strong> One of my favorite cities I've visited. Everything is so clean and well-organized. The landscapes are great, and the people are friendly.</div>`,
        albumLink: 'https://photos.google.com/album/germany-euro-2024',
        images: [
          'assets/images/germany/20240616_123011~2.jpg',
          'assets/images/germany/20240620_160020~2.jpg',
          'assets/images/germany/20240624_221419.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Portugal',
        code: 'PRT',
        description: `<div><strong>Porto:</strong> My favorite city in the world so far! Visited in January 2025 and was amazed by the city's charm, the landscapes, and the cuisine.</div>
        <div style="margin-top:12px"><strong>Lisbon:</strong> Explored the capital's colorful neighborhoods, enjoyed the traditional Fado music, and sampled delicious Portuguese cuisine.</div>`,
        albumLink: 'https://photos.google.com/album/portugal-trip',
        images: [
          'assets/images/portugal/20250114_110333.jpg',
          'assets/images/portugal/20250114_153615.jpg',
          'assets/images/portugal/20250115_085636.jpg',
          'assets/images/portugal/20250116_172152.jpg',
          'assets/images/portugal/20250116_180220.jpg',
          'assets/images/portugal/20250117_112809.jpg',
          'assets/images/portugal/20250118_161455.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'United Kingdom',
        code: 'GBR',
        description: `<div><strong>Education:</strong> I studied in Liverpool from 2017 to 2021, completing my MEng in Computer Science with honours. My time at university was incredible. I met a lot of great people, and I learned how to be independent. That is where I learned that I live on the Earth, and not in Croatia.</div>
        <div style="margin-top:12px"><strong>Silverstone F1:</strong> Attended a Formula 1 race at the iconic Silverstone Circuit and experienced one of the best atmospheres of my life. The passion of the racing fans, the circuit's heritage, and the thrilling race made for an unforgettable motorsport experience.</div>
        <div style="margin-top:12px"><strong>Cities:</strong> The UK is one of my favorite countries I've visited. Edinburgh stands out as one of my top cities with its unbeliveable architecture and vibrant culture. I've visited London numerous times and always enjoy its never-ending life, world-class museums, and diverse food scene.</div>`,
        albumLink: 'https://photos.google.com/album/uk-trip',
        images: [
          'assets/images/uk/20250304_115113.jpg',
          'assets/images/uk/20250305_115954.jpg',
          'assets/images/uk/20250306_125549~2.jpg'
        ],
        type: 'visited'
      },
      {
        name: 'Croatia',
        code: 'HRV',
        description: 'My home and my favourite country. The nature is incredible. People are good and open. Our history is rich and unique. There is a lot to improve, but I am proud to come from Croatia.',
        albumLink: 'https://photos.google.com/album/croatia-memories',
        images: [
          'assets/images/croatia/20250318_173633.jpg',
          'assets/images/croatia/20250509_175553.jpg',
          'assets/images/croatia/20250515_152157~4.jpg',
          'assets/images/croatia/20250518_110407.jpg'
        ],
        type: 'home'
      }
    ];
    
    // Create country lookup for efficient checking
    const visitedCountryMap = {};
    const homeCountryCode = 'HRV'; // Croatia ISO code
    visitedCountries.forEach(country => {
      visitedCountryMap[country.code] = country;
    });
    
    
    // Initialize the globe
    // const globeElement = document.getElementById('globe-container'); // Define later
    let isLightMode = !document.body.classList.contains('dark'); // Will default to false (dark mode)
    
    // Fetch countries data
    const countries = await fetchCountries();
    
    // Get the globe container element *after* potential DOM changes and fetches
    const globeElement = document.getElementById('globe-container');
    
    // Check if the globe container exists before initializing
    if (!globeElement) {
      console.error('Globe container element #globe-container not found!');
      return; // Stop execution if container is missing
    }
    
    // Create a clean new globe instance
    const myGlobe = Globe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor(isLightMode ? 'rgba(255, 248, 240, 0)' : 'rgba(36, 28, 21, 0)') // Warm light/dark backgrounds
      .atmosphereColor(isLightMode ? 'rgb(255, 250, 240)' : 'rgb(255, 240, 220)') // Warm white atmosphere
      .atmosphereAltitude(0.25) // Adjust atmosphere size
      .width(globeElement.offsetWidth)
      .height(globeElement.offsetHeight)
      .polygonsData(countries)
      
      // Add custom point markers for home (Croatia) and education (UK)
      .htmlElementsData([
        {
          lat: 45.1, // Croatia latitude
          lng: 15.2, // Croatia longitude
          size: 26,  // Size of the icon (slightly larger)
          color: isLightMode ? '#b91c1c' : '#f87171', // Red to match Croatia's styling
          html: `<div style="color:${isLightMode ? '#b91c1c' : '#f87171'}; font-size: 28px; text-shadow: 0 0 3px rgba(0,0,0,0.3);">🏠</div>`,
          altitude: 0.12 // Place well above the raised country polygon
        },
        {
          lat: 53.4, // Liverpool latitude
          lng: -2.99, // Liverpool longitude
          size: 26,  // Size of the icon (slightly larger)
          color: isLightMode ? '#d97706' : '#f59e0b', // Changed to amber
          html: `<div style="color:${isLightMode ? '#d97706' : '#f59e0b'}; font-size: 28px; text-shadow: 0 0 3px rgba(0,0,0,0.3);">🎓</div>`,
          altitude: 0.12 // Place well above the raised country polygon
        }
      ])
      .htmlElement(d => {
        const el = document.createElement('div');
        el.innerHTML = d.html;
        el.style.pointerEvents = 'none'; // Make transparent to clicks
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.width = `${d.size}px`;
        el.style.height = `${d.size}px`;
        el.style.textAlign = 'center';
        el.style.lineHeight = `${d.size}px`;
        el.style.transform = 'translate(-50%, -50%)';
        return el;
      })
      .polygonCapColor(d => {
        if (!d.properties) return isLightMode ? 'rgba(200,200,200,0.4)' : 'rgba(50,50,50,0.4)';
        
        // Try to get country code and properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Always treat French Guiana as unvisited
        if (code === 'GUF' || name === 'French Guiana' || d.properties.visited === false) {
          return isLightMode ? 'rgba(180,180,180,0.1)' : 'rgba(40,40,40,0.2)';
        }
        
        if (code === homeCountryCode) {
          return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)';
        } else if (visitedCountryMap[code]) {
          return isLightMode ? 'rgba(217,119,6,0.8)' : 'rgba(245,158,11,0.8)';
        } else {
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? 'rgba(217,119,6,0.8)' : 'rgba(245,158,11,0.8)';
          } else if (name === 'Croatia') {
            return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)';
          }
          return isLightMode ? 'rgba(180,180,180,0.1)' : 'rgba(40,40,40,0.2)';
        }
      })
      .polygonSideColor(d => {
        if (!d.properties) return 'rgba(100,100,100,0.03)';
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Exclude French Guiana
        if (d.properties.ISO_A3 === 'GUF' || name === 'French Guiana') {
          return 'rgba(100,100,100,0.03)';
        }
        
        if (code === homeCountryCode) {
          // Croatia - home country
          return isLightMode ? 'rgba(220,20,60,0.6)' : 'rgba(255,69,0,0.6)';
        } else if (visitedCountryMap[code]) {
          // Visited countries
          return isLightMode ? 'rgba(217,119,6,0.5)' : 'rgba(245,158,11,0.5)';
        } else {
          // Check by name as fallback
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? 'rgba(217,119,6,0.5)' : 'rgba(245,158,11,0.5)';
          } else if (name === 'Croatia') {
            return isLightMode ? 'rgba(220,20,60,0.6)' : 'rgba(255,69,0,0.6)';
          }
          
          // Almost transparent sides for non-visited countries
          return 'rgba(100,100,100,0.03)';
        }
      })
      .polygonStrokeColor(d => {
        if (!d.properties) return isLightMode ? 'rgba(120,120,120,0.2)' : 'rgba(100,100,100,0.2)';
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Exclude French Guiana
        if (d.properties.ISO_A3 === 'GUF' || name === 'French Guiana') {
          return isLightMode ? 'rgba(120,120,120,0.2)' : 'rgba(100,100,100,0.2)';
        }
        
        if (code === homeCountryCode) {
          // Croatia - home country
          return isLightMode ? '#b91c1c' : '#f87171'; // Darker/Lighter red
        } else if (visitedCountryMap[code]) {
          // Visited countries
          return isLightMode ? '#d97706' : '#f59e0b';
        } else {
          // Check by name as fallback
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? '#d97706' : '#f59e0b';
          } else if (name === 'Croatia') {
            return isLightMode ? '#b91c1c' : '#f87171';
          }
          
          // Very subtle strokes for non-visited countries
          return isLightMode ? 'rgba(120,120,120,0.2)' : 'rgba(100,100,100,0.2)';
        }
      })
      .polygonAltitude(d => {
        if (!d.properties) return 0.005;
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        if (code === homeCountryCode) {
          // Croatia - home country (highest)
          return 0.05;
        } else if (visitedCountryMap[code]) {
          // Visited countries (medium height)
          return 0.03;
        } else {
          // Check by name as fallback
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return 0.03;
          } else if (name === 'Croatia') {
            return 0.05;
          }
          
          // Regular countries (almost flat)
          return 0.005;
        }
      })
      .polygonLabel(({ properties: d }) => {
        if (!d) return null;
        
        const name = d.name || d.NAME || d.ADMIN || 'Unknown';
        const code = d.ISO_A3 || d.ISO_A3_EH;
        
        // Exclude French Guiana from labels
        if (code === 'GUF' || name === 'French Guiana') {
          return null;
        }
        
        // Only show labels for home country and visited countries
        if (code === homeCountryCode || name === 'Croatia') {
          // Home country
          return `<div style="color:white;background-color:rgba(220,20,60,0.9);padding:6px 10px;border-radius:4px;font-weight:bold;">
            ${name} 🏠 - Home Country
          </div>`;
        } else if (visitedCountryMap[code] || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || 
                   name === 'Portugal' || name === 'Austria' || name === 'Italy' || name === 'France' || 
                   name === 'Netherlands' || name === 'Slovenia' || name === 'Germany' || name === 'Switzerland' || 
                   name === 'Monaco' || name === 'Bosnia and Herzegovina' || name === 'Bosnia and Herz.' || name === 'Serbia' || 
                   name === 'Hungary' || name === 'San Marino' || name === 'Spain' || name === 'Greece') {
          // Visited country
          return `<div style="color:white;background-color:rgba(217,119,6,0.9);padding:5px 8px;border-radius:3px;">
            ${name} - Click to see details
          </div>`;
        }
        // Return null for non-visited countries to disable hover tooltip
        return null;
      })
      .onPolygonHover(obj => {
        // Defensive check for null object
        if (!obj) return false;
        
        // If properties is null or undefined, just return false
        const d = obj.properties;
        if (!d) return false;
        
        const name = d.name || d.NAME || d.ADMIN;
        const code = d.ISO_A3 || d.ISO_A3_EH;
        
        const isVisited = code === homeCountryCode || code && visitedCountryMap[code] || 
                        name === 'Croatia' || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || 
                        name === 'Portugal' || name === 'Austria' || name === 'Italy' || name === 'France' || 
                        name === 'Netherlands' || name === 'Slovenia' || name === 'Germany' || name === 'Switzerland' || 
                        name === 'Monaco' || name === 'Bosnia and Herzegovina' || name === 'Bosnia and Herz.' || name === 'Serbia' || 
                        name === 'Hungary' || name === 'San Marino' || name === 'Spain' || name === 'Greece';
        
        document.body.style.cursor = isVisited ? 'pointer' : 'default';
        return isVisited; // Return true only for visited countries to enable hover effects
      })
      .onPolygonClick(obj => {
        // Defensive check for null object
        if (!obj) return;
        
        const d = obj.properties;
        if (!d) return;
        
        const name = d.name || d.NAME || d.ADMIN;
        const code = d.ISO_A3 || d.ISO_A3_EH;
        
        // Only allow clicking on visited countries
        const isVisited = code === homeCountryCode || code && visitedCountryMap[code] || 
                        name === 'Croatia' || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || 
                        name === 'Portugal' || name === 'Austria' || name === 'Italy' || name === 'France' || 
                        name === 'Netherlands' || name === 'Slovenia' || name === 'Germany' || name === 'Switzerland' || 
                        name === 'Monaco' || name === 'Bosnia and Herzegovina' || name === 'Bosnia and Herz.' || name === 'Serbia' || 
                        name === 'Hungary' || name === 'San Marino' || name === 'Spain' || name === 'Greece';
        
        if (!isVisited) return;
        
        // Handle click by code
        if (code && visitedCountryMap[code]) {
          showCountryPopup(visitedCountryMap[code]);
          return;
        }
        
        // Handle click by name as fallback
        if (name === 'United States') {
          showCountryPopup(visitedCountryMap['USA']);
        } else if (name === 'Canada') {
          showCountryPopup(visitedCountryMap['CAN']);
        } else if (name === 'United Kingdom') {
          showCountryPopup(visitedCountryMap['GBR']);
        } else if (name === 'Croatia') {
          showCountryPopup(visitedCountryMap['HRV']);
        } else if (name === 'Portugal') {
          showCountryPopup(visitedCountryMap['PRT']);
        } else if (name === 'Austria') {
          showCountryPopup(visitedCountryMap['AUT']);
        } else if (name === 'Italy') {
          showCountryPopup(visitedCountryMap['ITA']);
        } else if (name === 'France') {
          showCountryPopup(visitedCountryMap['FRA']);
        } else if (name === 'Netherlands') {
          showCountryPopup(visitedCountryMap['NLD']);
        } else if (name === 'Slovenia') {
          showCountryPopup(visitedCountryMap['SVN']);
        } else if (name === 'Germany') {
          showCountryPopup(visitedCountryMap['DEU']);
        } else if (name === 'Switzerland') {
          showCountryPopup(visitedCountryMap['CHE']);
        } else if (name === 'Monaco') {
          showCountryPopup(visitedCountryMap['MCO']);
        } else if (name === 'Bosnia and Herzegovina' || name === 'Bosnia and Herz.') {
          showCountryPopup(visitedCountryMap['BIH']);
        } else if (name === 'Serbia') {
          showCountryPopup(visitedCountryMap['SRB']);
        } else if (name === 'Hungary') {
          showCountryPopup(visitedCountryMap['HUN']);
        } else if (name === 'San Marino') {
          showCountryPopup(visitedCountryMap['SMR']);
        } else if (name === 'Spain') {
          showCountryPopup(visitedCountryMap['ESP']);
        } else if (name === 'Greece') {
          showCountryPopup(visitedCountryMap['GRC']);
        }
      });
    
    // Apply the globe to the DOM element
    myGlobe(globeElement);
    
    // Center on UK-Croatia area of Europe for initial view
    myGlobe.pointOfView({
      lat: 49.5,   // latitude halfway between UK and Croatia 
      lng: 8.0,    // longitude roughly halfway between UK and Croatia
      altitude: 2.0  // zoom level - zoomed in a bit more to focus on the area
    }, 1000);  // 1000ms animation duration
    
    // Auto-rotate (slower to enjoy Europe view longer)
    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 0.3;
    
    // Handle window resize
    window.addEventListener('resize', () => {
      myGlobe.width(globeElement.offsetWidth).height(globeElement.offsetHeight);
    });

    // Watch for theme changes
    new MutationObserver(() => {
      isLightMode = !document.body.classList.contains('dark');
      myGlobe.backgroundColor(isLightMode ? 'rgba(255, 248, 240, 0)' : 'rgba(36, 28, 21, 0)');
      myGlobe.atmosphereColor(isLightMode ? 'rgb(255, 250, 240)' : 'rgb(255, 240, 220)');
      
      // Update icons when theme changes
      myGlobe.htmlElementsData([
        {
          lat: 45.1, // Croatia latitude
          lng: 15.2, // Croatia longitude
          size: 26,  // Size of the icon (slightly larger)
          color: isLightMode ? '#b91c1c' : '#f87171',
          html: `<div style="color:${isLightMode ? '#b91c1c' : '#f87171'}; font-size: 28px; text-shadow: 0 0 3px rgba(0,0,0,0.3);">🏠</div>`,
          altitude: 0.12 // Place well above the raised country polygon
        },
        {
          lat: 53.4, // Liverpool latitude
          lng: -2.99, // Liverpool longitude
          size: 26,  // Size of the icon (slightly larger)
          color: isLightMode ? '#d97706' : '#f59e0b',
          html: `<div style="color:${isLightMode ? '#d97706' : '#f59e0b'}; font-size: 28px; text-shadow: 0 0 3px rgba(0,0,0,0.3);">🎓</div>`,
          altitude: 0.12 // Place well above the raised country polygon
        }
      ]);
      
      // Update globe colors when theme changes
      myGlobe.polygonCapColor(d => {
        if (!d.properties) return isLightMode ? 'rgba(200,200,200,0.4)' : 'rgba(50,50,50,0.4)';
        
        // Try to get country code and properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Always treat French Guiana as unvisited
        if (code === 'GUF' || name === 'French Guiana' || d.properties.visited === false) {
          return isLightMode ? 'rgba(180,180,180,0.1)' : 'rgba(40,40,40,0.2)';
        }
        
        if (code === homeCountryCode) {
          return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)';
        } else if (visitedCountryMap[code]) {
          return isLightMode ? 'rgba(217,119,6,0.8)' : 'rgba(245,158,11,0.8)';
        } else {
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? 'rgba(217,119,6,0.8)' : 'rgba(245,158,11,0.8)';
          } else if (name === 'Croatia') {
            return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)';
          }
          return isLightMode ? 'rgba(180,180,180,0.1)' : 'rgba(40,40,40,0.2)';
        }
      });
      
      myGlobe.polygonSideColor(d => {
        if (!d.properties) return 'rgba(100,100,100,0.03)';
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Exclude French Guiana
        if (d.properties.ISO_A3 === 'GUF' || name === 'French Guiana') {
          return 'rgba(100,100,100,0.03)';
        }
        
        if (code === homeCountryCode) {
          // Croatia - home country
          return isLightMode ? 'rgba(220,20,60,0.6)' : 'rgba(255,69,0,0.6)';
        } else if (visitedCountryMap[code]) {
          // Visited countries
          return isLightMode ? 'rgba(217,119,6,0.5)' : 'rgba(245,158,11,0.5)';
        } else {
          // Almost transparent sides for non-visited countries
          return 'rgba(100,100,100,0.03)';
        }
      });
      
      myGlobe.polygonStrokeColor(d => {
        if (!d.properties) return isLightMode ? 'rgba(120,120,120,0.2)' : 'rgba(100,100,100,0.2)';
        
        // Try to get country code and name from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Exclude French Guiana
        if (d.properties.ISO_A3 === 'GUF' || name === 'French Guiana') {
          return isLightMode ? 'rgba(120,120,120,0.2)' : 'rgba(100,100,100,0.2)';
        }
        
        if (code === homeCountryCode || name === 'Croatia') {
          // Croatia - home country
          return isLightMode ? '#b91c1c' : '#f87171';
        } else if (visitedCountryMap[code] || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || name === 'Portugal') {
          // Visited countries
          return isLightMode ? '#d97706' : '#f59e0b';
        } else {
          // Very subtle strokes for non-visited countries
          return isLightMode ? 'rgba(120,120,120,0.2)' : 'rgba(100,100,100,0.2)';
        }
      });
    }).observe(document.body, { attributes: true });
    
    // Popup functionality
    const popup = document.getElementById('country-popup');
    const backdrop = document.getElementById('backdrop');
    const closeBtn = document.getElementById('close-popup');
    const carouselContainer = document.getElementById('carousel-container');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDots = document.getElementById('carousel-dots');
    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-description');
    
    // Variables for carousel
    let currentImageIndex = 0;
    let currentImages = [];
    
    function showCountryPopup(country) {
      // Disable scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Reset carousel
      currentImageIndex = 0;
      currentImages = country.images || []; // Default to empty array if no images
      
      // Clear previous carousel content
      carouselContainer.innerHTML = '';
      carouselDots.innerHTML = '';
      
      // Show the modal and backdrop with animation
      popup.classList.add('show');
      backdrop.classList.add('show');
      
      // Add images to carousel
      if (currentImages.length > 0) {
        currentImages.forEach((imageUrl, index) => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = `${country.name} - Photo ${index + 1}`;
          img.className = index === 0 ? 'active' : '';
          carouselContainer.appendChild(img);
          
          // Add dot for the image
          const dot = document.createElement('div');
          dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
          dot.setAttribute('data-index', index);
          dot.addEventListener('click', () => {
            showImage(index);
          });
          carouselDots.appendChild(dot);
        });
        
        // Show/hide navigation buttons based on image count
        if (currentImages.length > 1) {
          carouselPrev.style.display = 'block';
          carouselNext.style.display = 'block';
          carouselDots.style.display = 'flex';
        } else {
          carouselPrev.style.display = 'none';
          carouselNext.style.display = 'none';
          carouselDots.style.display = 'none';
        }
      } else {
        // Fallback if no images (shouldn't happen, but just in case)
        const img = document.createElement('img');
        img.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        img.alt = country.name;
        img.className = 'active';
        carouselContainer.appendChild(img);
        
        carouselPrev.style.display = 'none';
        carouselNext.style.display = 'none';
        carouselDots.style.display = 'none';
      }
      
      // Special styling for home country and UK
      if (country.type === 'home') {
        popupTitle.textContent = country.name + ' 🏠';
        popupTitle.style.color = isLightMode ? '#b91c1c' : '#f87171';
      } else if (country.code === 'GBR') {
        // Special title for UK with graduation cap
        popupTitle.textContent = country.name + ' 🎓';
        popupTitle.style.color = isLightMode ? '#d97706' : '#f59e0b';
      } else {
        popupTitle.textContent = country.name;
        popupTitle.style.color = '';
      }
      
      document.getElementById('popup-description').innerHTML = country.description;
      
      // Removed album link functionality
    }
    
    // Function to show a specific image in the carousel
    function showImage(index) {
      if (index < 0) index = currentImages.length - 1;
      if (index >= currentImages.length) index = 0;
      
      currentImageIndex = index;
      
      // Update images
      const images = carouselContainer.querySelectorAll('img');
      images.forEach((img, i) => {
        img.className = i === index ? 'active' : '';
      });
      
      // Update dots
      const dots = carouselDots.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.className = `carousel-dot ${i === index ? 'active' : ''}`;
      });
    }
    
    // Add carousel navigation event listeners
    carouselPrev.addEventListener('click', () => {
      showImage(currentImageIndex - 1);
    });
    
    carouselNext.addEventListener('click', () => {
      showImage(currentImageIndex + 1);
    });
    
    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
    
    // Add swipe functionality for mobile users
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      // Detect swipe direction (minimum 50px movement to count as a swipe)
      if (touchEndX < touchStartX - 50) {
        // Swiped left - show next image
        showImage(currentImageIndex + 1);
      }
      if (touchEndX > touchStartX + 50) {
        // Swiped right - show previous image
        showImage(currentImageIndex - 1);
      }
    }
    
    function closePopup() {
      // Start the closing animation
      popup.classList.remove('show');
      backdrop.classList.remove('show');
      
      // Wait for the animation to complete before completely hiding and re-enabling scroll
      setTimeout(() => {
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }, 400); // Match the CSS transition duration (0.4s)
    }
    
    // Fetch country data
    async function fetchCountries() {
      try {
        const response = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
        const data = await response.json();
        let features = topojson.feature(data, data.objects.countries).features;
        
        // Filter out French Guiana by coordinates
        features = features.map(feature => {
          if (feature.properties && feature.properties.name === 'France') {
            // Create a new feature with filtered coordinates
            // French Guiana is roughly between -55 and -51 longitude
            // and between 2 and 6 latitude
            return {
              ...feature,
              geometry: {
                ...feature.geometry,
                coordinates: feature.geometry.coordinates.map(polygon => {
                  if (Array.isArray(polygon)) {
                    return polygon.filter(coords => {
                      // Filter out coordinates that are in French Guiana's bounding box
                      if (Array.isArray(coords[0])) {
                        // Handle MultiPolygon
                        return coords.every(point => {
                          const [lon, lat] = point;
                          return !(lon >= -55 && lon <= -51 && lat >= 2 && lat <= 6);
                        });
                      } else {
                        // Handle Polygon
                        const [lon, lat] = coords;
                        return !(lon >= -55 && lon <= -51 && lat >= 2 && lat <= 6);
                      }
                    });
                  }
                  return polygon;
                }).filter(poly => poly.length > 0) // Remove empty polygons
              }
            };
          }
          return feature;
        });

        // Create a mapping from country names to our country codes
        const nameToCodeMap = {
          'United States of America': 'USA',
          'United States': 'USA',
          'USA': 'USA',
          'Canada': 'CAN',
          'United Kingdom': 'GBR',
          'Croatia': 'HRV',
          'U.S.A.': 'USA',
          'Portugal': 'PRT',
          'Austria': 'AUT',
          'Italy': 'ITA',
          'France': 'FRA',
          'Netherlands': 'NLD',
          'Slovenia': 'SVN',
          'Germany': 'DEU',
          'Switzerland': 'CHE',
          'Monaco': 'MCO',
          'Bosnia and Herzegovina': 'BIH',
          'Bosnia & Herzegovina': 'BIH',
          'Bosnia': 'BIH',
          'Bosnia-Herzegovina': 'BIH',
          'Bosnia and Herz.': 'BIH',
          'Bosnia and Herz': 'BIH',
          'Bosnia & Herz.': 'BIH',
          'Bosnia & Herz': 'BIH',
          'Serbia': 'SRB',
          'Hungary': 'HUN',
          'San Marino': 'SMR',
          'Spain': 'ESP',
          'Greece': 'GRC'
        };
        
        // Process features before returning
        const processedFeatures = features.map(feature => {
          if (feature.properties && feature.properties.name) {
            const countryName = feature.properties.name;
            if (nameToCodeMap[countryName]) {
              feature.properties.ISO_A3 = nameToCodeMap[countryName];
            } else {
              // Removed debug logging
            }
          }
          return feature;
        });
        
        return processedFeatures;
      } catch (error) {
        console.error("Error fetching country data:", error);
        return [];
      }
    }
    
  } catch (error) {
    console.error('Error loading globe:', error);
  }
});
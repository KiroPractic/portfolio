// Globe Map Setup - with subtle styling for unvisited countries
document.addEventListener('DOMContentLoaded', async () => {
  try {
    
    // Countries I've visited with data
    const visitedCountries = [
      {
        name: 'United States',
        code: 'USA',
        description: 'Visited the East and West coasts, including New York, Miami, and San Francisco.',
        albumLink: 'https://photos.google.com/album/us-trip',
        images: [
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Canada',
        code: 'CAN',
        description: 'Explored Toronto, Montreal, and the beautiful landscapes of Banff National Park.',
        albumLink: 'https://photos.google.com/album/canada-trip',
        images: [
          'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1569681157442-5f10fcaa0650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1494762757688-e1c6d2defe5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Greece',
        code: 'GRC',
        description: `<div><strong>High School Trip:</strong> Visited Greece with my high school classmates and had a fantastic time exploring this cradle of Western civilization.</div>
        <div style="margin-top:12px"><strong>Zakynthos:</strong> Experienced the amazing beaches of this island paradise - crystal clear waters and stunning coastlines.</div>
        <div style="margin-top:12px"><strong>Athens:</strong> Explored the rich history of the Greek capital, with its ancient ruins and archaeological treasures. The historical sites were impressive despite the city being a bit dirty.</div>
        <div style="margin-top:12px"><strong>Meteora:</strong> The monasteries perched atop massive rock formations were truly breathtaking - one of the most unique and awe-inspiring landscapes I've ever seen.</div>`,
        albumLink: 'https://photos.google.com/album/greece-high-school-trip',
        images: [
          'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Zakynthos
          'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Athens
          'https://images.unsplash.com/photo-1602763288580-aa2794329e14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Meteora
          'https://images.unsplash.com/photo-1594019108322-28a0ecc9eec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'  // Greece beach
        ],
        type: 'visited'
      },
      {
        name: 'Bosnia and Herzegovina',
        code: 'BIH',
        description: `<div><strong>Concert Experience:</strong> Visited in summer 2024 to play a concert with my band "Gacki Galeb". Connecting with the audience through music in a different country was a memorable experience.</div>
        <div style="margin-top:12px"><strong>Culture:</strong> Enjoyed experiencing the unique blend of cultures, delicious food, and warm hospitality that Bosnia is known for.</div>`,
        albumLink: 'https://photos.google.com/album/bosnia-concert-trip',
        images: [
          'https://images.unsplash.com/photo-1591853203314-2a4cbf317966?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1518622023536-6ff23b8cd0a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Serbia',
        code: 'SRB',
        description: `<div><strong>Team Building:</strong> Visited in 2022 as part of a team-building trip with my previous workplace. Bonding with colleagues while experiencing a new country was valuable both professionally and personally.</div>
        <div style="margin-top:12px"><strong>Belgrade:</strong> Explored the vibrant capital city with its rich history, energetic nightlife, and distinctive cultural scene.</div>`,
        albumLink: 'https://photos.google.com/album/serbia-team-building',
        images: [
          'https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1552128927-04d682cc3803?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Hungary',
        code: 'HUN',
        description: `<div><strong>High School Trip:</strong> Visited with my high school classmates and loved exploring Budapest with its stunning architecture and rich history.</div>
        <div style="margin-top:12px"><strong>Lake Balaton:</strong> Was amazed by Lake Balaton's vastness - it feels like being at the sea! Would love to return to Hungary to attend an F1 race at the Hungaroring.</div>`,
        albumLink: 'https://photos.google.com/album/hungary-high-school-trip',
        images: [
          'https://images.unsplash.com/photo-1551867633-194f125bddfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1596470690379-e8ecaa615ff3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
          'https://images.unsplash.com/photo-1534259080074-1e0a5ec3d221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1556121631-2a1b980bc2a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
          'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
          'https://images.unsplash.com/photo-1562886889-22cd7970c4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1544413660-299165566b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1564508211308-4c2e0b930b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
          'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
          'https://images.unsplash.com/photo-1516550893885-7b7791882062?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1573599852326-2ef5a1ea2776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Italy',
        code: 'ITA',
        description: `<div><strong>Sicily:</strong> Fell in love with Sicily in January 2024. The island's unique blend of culture, cuisine, and natural beauty is simply captivating.</div>
        <div style="margin-top:12px"><strong>Experiences:</strong> Explored the magnificent volcanoes and beautiful coastlines. The connection between the sea and land created some of the most stunning landscapes I've ever seen.</div>`,
        albumLink: 'https://photos.google.com/album/italy-sicily-trip',
        images: [
          'https://images.unsplash.com/photo-1516108317508-6788f6a160e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1534356336120-25d0925382e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'France',
        code: 'FRA',
        description: `<div><strong>Paris:</strong> Visited in January 2024 and was enchanted by the city's magical atmosphere, especially when it was covered in snow.</div>
        <div style="margin-top:12px"><strong>Experiences:</strong> The unique Parisian vibes, stunning architecture, and rich cultural scene made for an unforgettable experience. Witnessing the city during a snowfall added an extra layer of magic to the City of Light.</div>`,
        albumLink: 'https://photos.google.com/album/france-paris-trip',
        images: [
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1550340499-a6c60f254469?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Netherlands',
        code: 'NLD',
        description: `<div><strong>Architecture & History:</strong> Fascinated by the Netherlands' amazing history and lovely architecture throughout different cities.</div>
        <div style="margin-top:12px"><strong>Amsterdam:</strong> While the country has many gems, I found Amsterdam somewhat underwhelming compared to expectations. The real treasures are in the lesser-known cities and countryside.</div>`,
        albumLink: 'https://photos.google.com/album/netherlands-trip',
        images: [
          'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1557699987-e5f0ea05ba39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1598112599793-ce298e0ea1ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1625330607744-bde82b348888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Germany',
        code: 'DEU',
        description: `<div><strong>UEFA Euro 2024:</strong> First visited in 2024 to watch Croatia play in the Euros. The atmosphere and experience of international football was incredible.</div>
        <div style="margin-top:12px"><strong>Hamburg:</strong> One of my favorite cities I've visited. Its blend of maritime heritage, modern architecture, and vibrant urban life makes it a standout destination in Europe.</div>`,
        albumLink: 'https://photos.google.com/album/germany-euro-2024',
        images: [
          'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1578129377237-4ccb87e1e539?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1577185816322-21f2a92b1342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Portugal',
        code: 'PRT',
        description: `<div><strong>Porto:</strong> My favorite city in the world so far! Visited in January 2025 and was captivated by its charming riverfront, historic architecture, and incredible food scene.</div>
        <div style="margin-top:12px"><strong>Lisbon:</strong> Explored the capital's colorful neighborhoods, enjoyed the traditional Fado music, and sampled delicious Portuguese cuisine.</div>`,
        albumLink: 'https://photos.google.com/album/portugal-trip',
        images: [
          'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1558370781-d6196949e317?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600111636899-1f9146c2dfd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'United Kingdom',
        code: 'GBR',
        description: `<div><strong>Education:</strong> I studied in Liverpool from 2017 to 2021, completing my MEng in Computer Science with honours. My time at university was incredibly enriching, providing me with both academic excellence and unforgettable experiences.</div>
        <div style="margin-top:12px"><strong>Silverstone F1:</strong> Attended a Formula 1 race at the iconic Silverstone Circuit and experienced the best atmosphere of my life. The passion of British racing fans, the circuit's heritage, and the thrilling race made for an unforgettable motorsport experience.</div>
        <div style="margin-top:12px"><strong>Cities:</strong> The UK is one of my favorite countries I've visited. Edinburgh stands out as one of my top cities with its stunning architecture and vibrant culture. I've visited London numerous times and always enjoy its dynamic energy, world-class museums, and diverse food scene.</div>`,
        albumLink: 'https://photos.google.com/album/uk-trip',
        images: [
          'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1543799382-9a7ce5dd6eca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1633607822694-55d26fe31637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'visited'
      },
      {
        name: 'Croatia',
        code: 'HRV',
        description: 'My beautiful home country with amazing coastlines, historic cities, and natural wonders.',
        albumLink: 'https://photos.google.com/album/croatia-memories',
        images: [
          'https://images.unsplash.com/photo-1555990793-da11153b2473?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1545158535-c3f7168c28b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1601118964938-228a89955311?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
    const globeElement = document.getElementById('globe-container');
    let isLightMode = !document.body.classList.contains('dark'); // Will default to false (dark mode)
    
    // Fetch countries data and initialize globe
    const countries = await fetchCountries();
    
    // Create a clean new globe instance
    const myGlobe = Globe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor(isLightMode ? 'rgba(255,255,255,0)' : 'rgba(30,30,30,0)')
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
          color: isLightMode ? '#4682B4' : '#6495ED', // Blue to match visited countries
          html: `<div style="color:${isLightMode ? '#4682B4' : '#6495ED'}; font-size: 28px; text-shadow: 0 0 3px rgba(0,0,0,0.3);">🎓</div>`,
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
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        
        if (code === homeCountryCode) {
          // Croatia - home country (brighter red color)
          return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)'; // Crimson/OrangeRed
        } else if (visitedCountryMap[code]) {
          // Visited countries (blue)
          return isLightMode ? 'rgba(70,130,180,0.8)' : 'rgba(100,149,237,0.8)'; // SteelBlue/CornflowerBlue
        } else {
          // Check by name as fallback
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? 'rgba(70,130,180,0.8)' : 'rgba(100,149,237,0.8)';
          } else if (name === 'Croatia') {
            return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)';
          }
          
          // Non-visited countries - more subtle transparent styling
          return isLightMode ? 'rgba(180,180,180,0.1)' : 'rgba(40,40,40,0.2)';
        }
      })
      .polygonSideColor(d => {
        if (!d.properties) return 'rgba(100,100,100,0.03)';
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        if (code === homeCountryCode) {
          // Croatia - home country
          return isLightMode ? 'rgba(220,20,60,0.6)' : 'rgba(255,69,0,0.6)';
        } else if (visitedCountryMap[code]) {
          // Visited countries
          return isLightMode ? 'rgba(70,130,180,0.5)' : 'rgba(100,149,237,0.5)';
        } else {
          // Check by name as fallback
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? 'rgba(70,130,180,0.5)' : 'rgba(100,149,237,0.5)';
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
        
        if (code === homeCountryCode) {
          // Croatia - home country
          return isLightMode ? '#b91c1c' : '#f87171'; // Darker/Lighter red
        } else if (visitedCountryMap[code]) {
          // Visited countries
          return isLightMode ? '#4682B4' : '#6495ED';
        } else {
          // Check by name as fallback
          if (name === 'United States' || name === 'Canada' || name === 'United Kingdom') {
            return isLightMode ? '#4682B4' : '#6495ED';
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
        
        // Only show labels for home country and visited countries
        if (code === homeCountryCode || name === 'Croatia') {
          // Home country
          return `<div style="color:white;background-color:rgba(220,20,60,0.9);padding:6px 10px;border-radius:4px;font-weight:bold;">
            ${name} 🏠 - Home Country
          </div>`;
        } else if (visitedCountryMap[code] || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || 
                   name === 'Portugal' || name === 'Austria' || name === 'Italy' || name === 'France' || 
                   name === 'Netherlands' || name === 'Slovenia' || name === 'Germany' || name === 'Switzerland' || 
                   name === 'Monaco' || name === 'Bosnia and Herzegovina' || name === 'Serbia' || 
                   name === 'Hungary' || name === 'San Marino' || name === 'Spain' || name === 'Greece') {
          // Visited country
          return `<div style="color:white;background-color:rgba(70,130,180,0.9);padding:5px 8px;border-radius:3px;">
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
                        name === 'Monaco' || name === 'Bosnia and Herzegovina' || name === 'Serbia' || 
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
                        name === 'Monaco' || name === 'Bosnia and Herzegovina' || name === 'Serbia' || 
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
        } else if (name === 'Bosnia and Herzegovina') {
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
      myGlobe.backgroundColor(isLightMode ? 'rgba(255,255,255,0)' : 'rgba(30,30,30,0)');
      
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
          color: isLightMode ? '#4682B4' : '#6495ED',
          html: `<div style="color:${isLightMode ? '#4682B4' : '#6495ED'}; font-size: 28px; text-shadow: 0 0 3px rgba(0,0,0,0.3);">🎓</div>`,
          altitude: 0.12 // Place well above the raised country polygon
        }
      ]);
      
      // Update globe colors when theme changes
      myGlobe.polygonCapColor(d => {
        if (!d.properties) return isLightMode ? 'rgba(200,200,200,0.4)' : 'rgba(50,50,50,0.4)';
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        // Debug info for selected countries to help troubleshoot
        if ((name === 'United States' || name === 'Canada' || name === 'United Kingdom' || name === 'Croatia' || name === 'Portugal') ||
            (code === 'USA' || code === 'CAN' || code === 'GBR' || code === 'HRV' || code === 'PRT')) {
        }
        
        if (code === homeCountryCode || name === 'Croatia') {
          // Croatia - home country (brighter red color)
          return isLightMode ? 'rgba(220,20,60,0.8)' : 'rgba(255,69,0,0.8)';
        } else if (visitedCountryMap[code] || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || name === 'Portugal') {
          // Visited countries (blue)
          return isLightMode ? 'rgba(70,130,180,0.8)' : 'rgba(100,149,237,0.8)';
        } else {
          return isLightMode ? 'rgba(180,180,180,0.1)' : 'rgba(40,40,40,0.2)';
        }
      });
      
      myGlobe.polygonSideColor(d => {
        if (!d.properties) return 'rgba(100,100,100,0.03)';
        
        // Try to get country code from properties
        const code = d.properties.ISO_A3 || d.properties.ISO_A3_EH;
        const name = d.properties.name;
        
        if (code === homeCountryCode || name === 'Croatia') {
          // Croatia - home country
          return isLightMode ? 'rgba(220,20,60,0.6)' : 'rgba(255,69,0,0.6)';
        } else if (visitedCountryMap[code] || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || name === 'Portugal') {
          // Visited countries
          return isLightMode ? 'rgba(70,130,180,0.5)' : 'rgba(100,149,237,0.5)';
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
        
        if (code === homeCountryCode || name === 'Croatia') {
          // Croatia - home country
          return isLightMode ? '#b91c1c' : '#f87171';
        } else if (visitedCountryMap[code] || name === 'United States' || name === 'Canada' || name === 'United Kingdom' || name === 'Portugal') {
          // Visited countries
          return isLightMode ? '#4682B4' : '#6495ED';
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
        popupTitle.style.color = isLightMode ? '#4682B4' : '#6495ED';
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
        const features = topojson.feature(data, data.objects.countries).features;
        
        
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
          'Serbia': 'SRB',
          'Hungary': 'HUN',
          'San Marino': 'SMR',
          'Spain': 'ESP',
          'Greece': 'GRC'
        };
        
        // Add our codes to the properties for easier lookup
        features.forEach(feature => {
          if (feature.properties && feature.properties.name) {
            const countryName = feature.properties.name;
            if (nameToCodeMap[countryName]) {
              feature.properties.ISO_A3 = nameToCodeMap[countryName];
            }
          }
        });
        
        return features;
      } catch (error) {
        console.error("Error fetching country data:", error);
        return [];
      }
    }
    
  } catch (error) {
    console.error('Error loading globe:', error);
  }
});
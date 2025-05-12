// --- Strava API Fetch and Display ---

// Helper function to format seconds into Hh Mm Ss format
function formatSecondsToHMS(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return 'Invalid time';
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let result = '';
    if (hours > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0 || hours > 0) { // Show minutes if hours are present or if minutes > 0
        result += `${minutes}m `;
    }
    result += `${seconds}s`;
    return result.trim(); // Remove trailing space if only seconds
}

document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('.strava-carousel'); // Target Flickity container
    const loadingMessage = document.getElementById('strava-loading');
    const errorMessage = document.getElementById('strava-error');
    const activitiesList = document.getElementById('strava-activities-list');

    const apiUrl = '/api/strava';

    if (!carouselElement || !loadingMessage || !errorMessage || !activitiesList) {
        if (errorMessage) errorMessage.textContent = 'Error: Could not find necessary HTML elements for Strava section.';
        if (errorMessage) errorMessage.style.display = 'block';
        if (loadingMessage) loadingMessage.style.display = 'none';
        return;
    }

    // Show loading message initially, hide carousel container
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    carouselElement.style.display = 'none'; // Hide Carousel until loaded
    activitiesList.innerHTML = ''; // Clear any potential placeholders

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                 throw new Error(data.error);
            }

            // Check if data is an array and has activities
            if (!Array.isArray(data) || data.length === 0) {
                loadingMessage.style.display = 'none'; // Hide loading message
                errorMessage.textContent = 'No recent Strava activities found.';
                errorMessage.style.display = 'block';
                carouselElement.style.display = 'none'; // Keep carousel hidden
                return;
            }

            activitiesList.innerHTML = ''; // Clear list before populating

            data.forEach((activity, index) => { // Iterate over data directly
                try {
                    // Create the list item (cell) for Flickity
                    const cellItem = document.createElement('li');
                    cellItem.classList.add('strava-activity-cell'); // Add class for Flickity cellSelector

                    // Create the card div that goes inside the cell
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('strava-activity-card');

                    // Use the activity's local time directly without timezone conversion
                    const activityDate = new Date(activity.start_date_local);
                    const date = activity.start_date_local.replace(/[TZ]/g, ' ').substring(0, 16); // Format: "YYYY-MM-DD HH:mm"
                    // Format the date part separately for better readability
                    const formattedDate = new Date(activity.start_date_local).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    // Extract time part from the original string (it's already in local activity timezone)
                    const timeStr = date.split(' ')[1];
                    const finalDate = `${formattedDate} ${timeStr}`;

                    const distance = (activity.distance / 1000).toFixed(2); // km
                    const movingTimeFormatted = formatSecondsToHMS(activity.moving_time);
                    const elevation = activity.total_elevation_gain.toFixed(0); // meters
                    const photoUrl = activity.photos?.primary?.urls['600']; // Use 600px version
                    const calories = activity.calories ? activity.calories.toFixed(0) : null;
                    const avgHeartrate = activity.average_heartrate ? activity.average_heartrate.toFixed(0) : null;
                    const kudos = activity.kudos_count;

                    let cardHTML = '';
                    let activityIconHTML = '';

                    // Map activity type to Font Awesome icon class
                    let iconClass = 'fa-solid fa-person-running'; // Default icon
                    switch (activity.type) {
                        case 'Ride':
                        case 'VirtualRide':
                        case 'EBikeRide':
                        case 'Velomobile':
                        case 'MountainBikeRide':
                        case 'GravelRide':
                            iconClass = 'fa-solid fa-person-biking';
                            break;
                        case 'Run':
                        case 'VirtualRun':
                        case 'TrailRun':
                            iconClass = 'fa-solid fa-person-running';
                            break;
                        case 'Swim':
                            iconClass = 'fa-solid fa-person-swimming';
                            break;
                        case 'Walk':
                        case 'Hike':
                        case 'Snowshoe':
                             iconClass = 'fa-solid fa-person-hiking';
                            break;
                        case 'AlpineSki':
                        case 'BackcountrySki':
                        case 'NordicSki':
                        case 'Snowboard':
                        case 'RollerSki':
                            iconClass = 'fa-solid fa-person-skiing';
                            break;
                        case 'WeightTraining':
                        case 'Crossfit':
                        case 'Workout':
                            iconClass = 'fa-solid fa-dumbbell';
                            break;
                        case 'Yoga':
                        case 'Pilates':
                             iconClass = 'fa-solid fa-om'; // Or another suitable icon
                            break;
                        case 'Rowing':
                        case 'VirtualRow':
                        case 'Canoeing':
                        case 'Kayaking':
                        case 'StandUpPaddling':
                            iconClass = 'fa-solid fa-water'; // Or fa-ship, fa-anchor
                            break;
                        case 'Windsurf':
                        case 'Kitesurf':
                        case 'Surfing':
                            iconClass = 'fa-solid fa-person-surfing';
                            break;
                        // Add more cases as needed for other types
                        default:
                             iconClass = 'fa-solid fa-medal'; // Generic fallback
                    }
                    activityIconHTML = `<i class="strava-activity-type-icon ${iconClass}" title="${activity.type}"></i>`;

                    // Add background image and class if photo exists
                    if (photoUrl) {
                        cardDiv.style.backgroundImage = `url('${photoUrl}')`;
                        cardDiv.classList.add('has-background-image');
                    }

                    // Always add the content div
                    cardHTML = `
                        <div class="activity-icon-overlay">
                            <i class="strava-activity-type-icon-bg ${iconClass}" title="${activity.type}"></i>
                        </div>
                        <div class="strava-activity-card-content">
                            <h3><a href="https://www.strava.com/activities/${activity.id}" target="_blank" rel="noopener noreferrer">${activity.name}</a></h3>
                            <p>${finalDate}</p>
                            <div class="strava-stats-container">
                                <span class="strava-stat"><span class="stat-icon"><i class="fa-solid fa-ruler-horizontal"></i></span> ${distance} km</span>
                                <span class="strava-stat"><span class="stat-icon"><i class="fa-solid fa-stopwatch"></i></span> ${movingTimeFormatted}</span>
                                <span class="strava-stat"><span class="stat-icon"><i class="fa-solid fa-mountain"></i></span> ${elevation} m</span>
                                ${calories ? `<span class="strava-stat"><span class="stat-icon"><i class="fa-solid fa-fire-flame-curved"></i></span> ${calories} kcal</span>` : ''}
                                ${avgHeartrate ? `<span class="strava-stat"><span class="stat-icon"><i class="fa-solid fa-heart-pulse"></i></span> ${avgHeartrate} bpm avg</span>` : ''}
                                <span class="strava-stat"><span class="stat-icon"><i class="fa-solid fa-thumbs-up"></i></span> ${kudos}</span>
                            </div>
                        </div>
                    `;

                    cardDiv.innerHTML = cardHTML; // Set content for the card div
                    cellItem.appendChild(cardDiv); // Append card div to the cell list item
                    activitiesList.appendChild(cellItem); // Append the cell list item to the UL

                } catch (loopError) {
                    // Optionally, decide if you want to stop or continue processing other activities
                    // For now, we log and continue
                }
            });

            // Initialize Flickity only if activities were found and Flickity is available
            if (typeof Flickity !== 'undefined') {
                try {
                    const flkty = new Flickity(carouselElement, {
                        cellSelector: '.strava-activity-cell',
                        cellAlign: 'center',
                        contain: true,
                        wrapAround: true, // Optional: enable infinite looping
                        pageDots: false, // Optional: disable dots
                        prevNextButtons: false // Add this line to hide arrows
                        // Add other options here as needed
                    });

                    // Give the browser a moment to render and then resize Flickity
                    setTimeout(() => {
                        flkty.resize();
                    }, 100); // 100ms delay, can be adjusted

                    carouselElement.style.display = 'block'; // Show the carousel container now
                    errorMessage.style.display = 'none'; // Hide error message if successful
                } catch (flktyError) {
                    errorMessage.textContent = 'Error initializing activity carousel: ' + flktyError.message;
                    errorMessage.style.display = 'block';
                    carouselElement.style.display = 'none';
                }
            } else {
                errorMessage.textContent = 'Error initializing activity carousel (Flickity library missing).';
                errorMessage.style.display = 'block';
                carouselElement.style.display = 'none'; // Keep carousel hidden if Flickity.js is missing
            }

            loadingMessage.style.display = 'none'; // Always hide loading message after processing

        })
        .catch(error => {
            loadingMessage.style.display = 'none';
            errorMessage.textContent = `Failed to load activities: ${error.message || 'Unknown error'}`;
            errorMessage.style.display = 'block';
            carouselElement.style.display = 'none'; // Keep carousel hidden on error
            activitiesList.innerHTML = ''; // Clear list on error
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const graphRenderArea = document.getElementById('github-graph-render-area');
    const loadingMessage = graphRenderArea.querySelector('.github-graph-loading');

    if (loadingMessage) {
        loadingMessage.textContent = 'Loading GitHub stats...';
    }

    // Contribution color mapping from GitHub's default colors to custom orange theme
    const contributionColors = {
        '#9be9a8': '#EF8E38', // Level 1 - medium orange
        '#40c463': '#E67E22', // Level 2 - medium-dark orange
        '#30a14e': '#D35400', // Level 3 - darker orange
        '#216e39': '#BA4A00'  // Level 4 - deep orange/amber
    };

    // Add dynamic styles for contribution graph
    const githubStyles = document.createElement('style');
    githubStyles.id = 'github-contrib-styles';
    githubStyles.textContent = `
        .contrib-day-tooltip {
            position: fixed;
            padding: 8px 10px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 400;
            line-height: 1.5;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.15s ease-in-out;
            z-index: 9999;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            height: auto;
            background-color: #ffffff;
            color: #24292f;
            border: 1px solid #d0d7de;
        }

        .contrib-day {
            position: relative;
            width: 11px;
            height: 11px;
            margin: 1px;
            border-radius: 2px;
        }

        .contrib-day:not([style*="background-color"]) {
            background-color: #ebedf0;
        }

        .contrib-week {
            display: flex;
            flex-direction: column;
        }

        /* Dark theme styles */
        body.dark .contrib-day-tooltip {
            background-color: #2d333b;
            color: #e6edf3;
            border: 1px solid #444c56;
        }

        body.dark .contrib-day:not([style*="background-color"]) {
            background-color: #161b22;
        }

        .contrib-day-flyer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            opacity: 0;
            transform: translateX(-100vw);
            transition: transform 0.5s ease-out, opacity 0.5s ease-out;
            z-index: 1;
        }
    `;
    document.head.appendChild(githubStyles);

    /**
     * Fetches GitHub profile data and renders all sections
     */
    async function fetchGitHubData() {
        try {
            const response = await fetch('/api/github-profile');
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ 
                    message: 'Failed to fetch GitHub data. Server responded with ' + response.status 
                }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Render profile section
            renderProfileSection(data.profile);
            
            // Render README section if available
            if (data.readme && data.readme.content) {
                renderReadmeSection(data.readme.content);
            }

            // Render contribution graph
            if (loadingMessage) {
                loadingMessage.remove();
            }
            renderContributionGraph(data.contributions, graphRenderArea);

        } catch (error) {
            console.error('Error fetching or rendering GitHub data:', error);
            if (loadingMessage) {
                loadingMessage.textContent = `Error: ${error.message}`;
            } else {
                graphRenderArea.innerHTML = `<p class="github-graph-loading">Error: ${error.message}</p>`;
            }
            
            // Also show error in the profile section
            const profileSection = document.getElementById('github-profile-section');
            if (profileSection) {
                profileSection.innerHTML = `<p class="github-profile-error">Error loading profile: ${error.message}</p>`;
            }
        }
    }
    
    /**
     * Renders the GitHub profile section with avatar, username, and stats
     */
    function renderProfileSection(profileData) {
        if (!profileData) return;
        
        // Render avatar
        const avatarContainer = document.querySelector('.github-avatar-container');
        if (avatarContainer) {
            avatarContainer.innerHTML = `
                <img src="${profileData.avatarUrl}" alt="${profileData.login}'s avatar" class="github-avatar">
            `;
        }
        
        // Render title with username link
        const titleContainer = document.querySelector('.github-title-container');
        if (titleContainer) {
            titleContainer.innerHTML = `
                <h2 class="github-username-title">
                    <a href="${profileData.url}" target="_blank" rel="noopener noreferrer">
                        @${profileData.login}
                    </a>
                </h2>
            `;
        }
        
        // Render stats
        const statsContainer = document.querySelector('.github-stats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="github-stat">
                    <span class="github-stat-value">${profileData.repositories.totalCount}</span>
                    <span class="github-stat-label">Repositories</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-value">${profileData.followers.totalCount}</span>
                    <span class="github-stat-label">Followers</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-value">${profileData.following.totalCount}</span>
                    <span class="github-stat-label">Following</span>
                </div>
            `;
        }
    }
    
    /**
     * Renders the README section using marked.js for proper Markdown parsing
     */
    function renderReadmeSection(readmeContent) {
        const readmeContainer = document.getElementById('github-readme-container');
        if (!readmeContainer || !readmeContent) return;
        
        // Configure marked.js options
        marked.setOptions({
            breaks: true,
            gfm: true,
            highlight: function(code, lang) {
                // Use Prism.js for syntax highlighting if available
                if (window.Prism && lang && Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            }
        });
        
        // Custom renderer for images to add classes
        const renderer = new marked.Renderer();
        
        // Override code rendering to add proper classes for Prism.js
        renderer.code = function(code, lang) {
            const language = lang || 'text';
            return `<pre><code class="language-${language}">${code}</code></pre>`;
        };
        
        // Override image rendering to add classes for badges and regular images
        renderer.image = function(href, title, text) {
            // Check if it's a badge (shields.io or similar)
            if (href.includes('shields.io') || href.includes('badge') || href.includes('img.shields.io')) {
                return `<img src="${href}" alt="${text}" title="${title || ''}" class="github-badge">`;
            }
            // Regular images
            return `<img src="${href}" alt="${text}" title="${title || ''}" class="github-image">`;
        };
        
        // Override link rendering to handle badge links
        renderer.link = function(href, title, text) {
            // Check if the text contains an image (badge link)
            if (text.includes('<img') && text.includes('github-badge')) {
                return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${title || ''}">${text}</a>`;
            }
            // Regular links
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${title || ''}">${text}</a>`;
        };
        
        // Parse the markdown content
        let htmlContent;
        try {
            htmlContent = marked.parse(readmeContent, { renderer: renderer });
        } catch (error) {
            console.error('Error parsing markdown:', error);
            htmlContent = '<p>Error parsing README content.</p>';
        }
        
        // Post-process to wrap badge groups
        htmlContent = htmlContent.replace(
            /<p>(\s*(?:<a[^>]*><img[^>]*class="github-badge"[^>]*><\/a>\s*)+)<\/p>/g,
            '<div class="github-badges-container"><div class="badges-row">$1</div></div>'
        );
        
        readmeContainer.innerHTML = `
            <div class="github-readme-content">
                ${htmlContent}
            </div>
        `;
        
        // Trigger Prism.js highlighting after content is rendered
        if (window.Prism) {
            setTimeout(() => {
                Prism.highlightAllUnder(readmeContainer);
            }, 100);
        }
    }

    /**
     * Renders the GitHub contributions graph using CSS Grid layout
     * Shows newest contributions first (leftmost) with proper month labels
     */
    function renderContributionGraph(data, container) {
        if (!data || !data.weeks || data.weeks.length === 0) {
            container.innerHTML = '<p class="github-graph-loading">No contribution data available.</p>';
            return;
        }

        container.innerHTML = ''; 

        // Reverse weeks to show newest first (leftmost)
        const reversedWeeks = data.weeks.slice().reverse();

        // Calculate total width needed for the graph
        const totalWidth = (reversedWeeks.length * 11) + ((reversedWeeks.length - 1) * 2);

        // Main container with horizontal scrolling
        const overallGraphLayout = document.createElement('div');
        overallGraphLayout.style.width = '100%';
        overallGraphLayout.style.position = 'relative';
        overallGraphLayout.style.overflowY = 'hidden';
        overallGraphLayout.style.overflowX = 'auto';

        // CSS Grid container for precise alignment
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `28px repeat(${reversedWeeks.length}, 11px)`;
        gridContainer.style.gridTemplateRows = '15px repeat(7, 11px)';
        gridContainer.style.gap = '2px';
        gridContainer.style.width = `${totalWidth + 28 + 5}px`;
        gridContainer.style.minWidth = '100%';

        // Add day labels (left column)
        const dayLabels = ['', 'M', '', 'W', '', 'F', ''];
        dayLabels.forEach((label, i) => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = label;
            dayLabel.style.gridColumn = '1';
            dayLabel.style.gridRow = `${i + 2}`;
            dayLabel.style.height = '11px';
            dayLabel.style.lineHeight = '11px';
            dayLabel.style.textAlign = 'center';
            dayLabel.style.fontSize = '10px';
            gridContainer.appendChild(dayLabel);
        });

        // Add month labels (first row) - positioned at weeks containing 1st of month
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        reversedWeeks.forEach((week, weekIndex) => {
            // Check if this week contains the 1st of any month
            const monthLabel = findMonthLabelForWeek(week, months);
            
            if (monthLabel) {
                const monthDiv = document.createElement('div');
                monthDiv.textContent = monthLabel;
                monthDiv.style.gridColumn = `${weekIndex + 2}`;
                monthDiv.style.gridRow = '1';
                monthDiv.style.fontSize = '10px';
                monthDiv.style.color = 'inherit';
                monthDiv.style.textAlign = 'left';
                monthDiv.style.whiteSpace = 'nowrap';
                monthDiv.style.height = '15px';
                monthDiv.style.lineHeight = '15px';
                monthDiv.style.overflow = 'visible';
                gridContainer.appendChild(monthDiv);
            }
        });

        // Add contribution days to the grid
        reversedWeeks.forEach((week, weekIndex) => {
            addWeekToGrid(week, weekIndex, gridContainer);
        });

        // Set up intersection observer for entry animations
        setupContributionAnimations(gridContainer);

        // Add to layout
        overallGraphLayout.appendChild(gridContainer);
        container.appendChild(overallGraphLayout);

        // Add total contributions summary
        addTotalContributionsText(data.totalContributions, container);
    }

    /**
     * Finds the month label for a week if it contains the 1st of any month
     */
    function findMonthLabelForWeek(week, months) {
        if (!week.contributionDays || week.contributionDays.length === 0) return null;
        
        for (const day of week.contributionDays) {
            const date = new Date(day.date);
            if (date.getDate() === 1) {
                return months[date.getMonth()];
            }
        }
        return null;
    }

    /**
     * Adds a week's worth of contribution days to the grid
     */
    function addWeekToGrid(week, weekIndex, gridContainer) {
        const daysInWeek = Array(7).fill(null);
        week.contributionDays.forEach(day => {
            daysInWeek[day.weekday] = day;
        });

        daysInWeek.forEach((dayData, dayIndex) => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'contrib-day';
            dayDiv.style.gridColumn = `${weekIndex + 2}`;
            dayDiv.style.gridRow = `${dayIndex + 2}`;
            
            if (dayData) {
                addTooltipToDay(dayDiv, dayData);
                
                if (dayData.contributionCount > 0) {
                    addAnimationToDay(dayDiv, dayData);
                }
            }
            
            addHoverEvents(dayDiv, gridContainer);
            gridContainer.appendChild(dayDiv);
        });
    }

    /**
     * Adds tooltip to a contribution day
     */
    function addTooltipToDay(dayDiv, dayData) {
        const tooltip = document.createElement('div');
        tooltip.className = 'contrib-day-tooltip';
        
        const count = dayData.contributionCount;
        const date = new Date(dayData.date);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        tooltip.textContent = `${count} contribution${count === 1 ? '' : 's'} on ${formattedDate}`;
        
        dayDiv.appendChild(tooltip);
    }

    /**
     * Adds animation flyer to a contribution day with contributions
     */
    function addAnimationToDay(dayDiv, dayData) {
        const orangeColor = contributionColors[dayData.color.toLowerCase()] || dayData.color;
        
        const flyerDiv = document.createElement('div');
        flyerDiv.className = 'contrib-day-flyer';
        flyerDiv.style.backgroundColor = orangeColor;
        dayDiv.appendChild(flyerDiv);
    }

    /**
     * Adds hover events for tooltip positioning
     */
    function addHoverEvents(dayDiv, gridContainer) {
        dayDiv.addEventListener('mouseenter', () => {
            const tooltip = dayDiv.querySelector('.contrib-day-tooltip');
            if (!tooltip) return;
            
            tooltip.style.opacity = '1';
            
            // Position tooltip with overflow protection
            setTimeout(() => {
                positionTooltip(tooltip, dayDiv, gridContainer);
            }, 0);
        });
        
        dayDiv.addEventListener('mouseleave', () => {
            const tooltip = dayDiv.querySelector('.contrib-day-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });
    }

    /**
     * Positions tooltip with overflow protection
     */
    function positionTooltip(tooltip, dayDiv, gridContainer) {
        const dayRect = dayDiv.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Position tooltip above the day element using viewport coordinates
        const leftPos = dayRect.left + (dayRect.width / 2) - (tooltipRect.width / 2);
        const topPos = dayRect.top - tooltipRect.height - 6; // 6px gap above the day
        
        // Check for horizontal overflow and adjust
        const viewportWidth = window.innerWidth;
        let adjustedLeftPos = leftPos;
        
        if (leftPos < 5) {
            adjustedLeftPos = 5; // 5px margin from left edge
        } else if (leftPos + tooltipRect.width > viewportWidth - 5) {
            adjustedLeftPos = viewportWidth - tooltipRect.width - 5; // 5px margin from right edge
        }
        
        tooltip.style.left = `${adjustedLeftPos}px`;
        tooltip.style.top = `${topPos}px`;
        tooltip.style.transform = 'none'; // Remove any existing transforms
        tooltip.style.marginTop = '0'; // Remove any existing margins
    }

    /**
     * Sets up intersection observer for contribution animations
     */
    function setupContributionAnimations(gridContainer) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateContributionFlyers(gridContainer);
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(gridContainer);
    }

    /**
     * Animates contribution flyers with staggered timing
     */
    function animateContributionFlyers(containerElement) {
        const animatedFlyers = containerElement.querySelectorAll('.contrib-day-flyer');
        animatedFlyers.forEach((flyerDiv, index) => {
            setTimeout(() => {
                flyerDiv.style.opacity = '1';
                flyerDiv.style.transform = 'translateX(0)';
            }, index * 10);
        });
    }

    /**
     * Adds total contributions text below the graph
     */
    function addTotalContributionsText(totalContributions, container) {
        const totalContributionsText = document.createElement('p');
        totalContributionsText.textContent = `Total contributions in the last year: ${totalContributions}`;
        totalContributionsText.className = 'github-total-contributions';
        totalContributionsText.style.fontSize = '0.9em';
        totalContributionsText.style.marginTop = '15px';
        totalContributionsText.style.textAlign = 'right';
        totalContributionsText.style.paddingRight = '10px';
        container.appendChild(totalContributionsText);
    }

    // Initialize GitHub data fetching
    fetchGitHubData();
});
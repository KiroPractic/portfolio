document.addEventListener('DOMContentLoaded', () => {
    const graphRenderArea = document.getElementById('github-graph-render-area');
    const loadingMessage = graphRenderArea.querySelector('.github-graph-loading');

    // Single set of balanced colors that work well in both light and dark themes
    const contributionColors = {
        // No mapping for #ebedf0 here, CSS will handle 0-contribution days
        '#9be9a8': '#EF8E38', // Level 1 - medium orange
        '#40c463': '#E67E22', // Level 2 - medium-dark orange
        '#30a14e': '#D35400', // Level 3 - darker orange
        '#216e39': '#BA4A00'  // Level 4 - deep orange/amber
    };

    async function fetchGitHubData() {
        try {
            const response = await fetch('/api/github-profile');
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Failed to fetch GitHub data. Server responded with ' + response.status }));
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
    
    function renderReadmeSection(readmeContent) {
        const readmeContainer = document.getElementById('github-readme-container');
        if (!readmeContainer || !readmeContent) return;
        
        // Simple conversion of Markdown headers and basic formatting
        // Note: For a complete Markdown parser, consider using a library like marked.js
        const formattedContent = readmeContent
            .replace(/^# (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h4>$1</h4>')
            .replace(/^### (.*$)/gm, '<h5>$1</h5>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .split(/\n\n+/).join('<br><br>');
            
        readmeContainer.innerHTML = `
            <div class="github-readme">
                <h4 class="github-readme-title">README.md</h4>
                <div class="github-readme-content">
                    ${formattedContent}
                </div>
            </div>
        `;
    }

    function renderContributionGraph(data, container) {
        if (!data || !data.weeks || data.weeks.length === 0) {
            container.innerHTML = '<p class="github-graph-loading">No contribution data available.</p>';
            return;
        }

        container.innerHTML = ''; 

        // Reverse weeks to show newest first (leftmost)
        const reversedWeeks = data.weeks.slice().reverse();

        const overallGraphLayout = document.createElement('div');
        overallGraphLayout.style.width = '100%';

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthLabelElements = [];
        let currentMonth = -1;

        // Generate month labels based on reversedWeeks
        reversedWeeks.forEach((week, weekIndex) => {
            if (week.contributionDays.length > 0) {
                // Use any day in the week to find the month, as a week can span two months.
                // For simplicity, using the first reported day in that week block.
                const dateForMonth = new Date(week.contributionDays[0].date);
                const month = dateForMonth.getMonth();
                if (month !== currentMonth) {
                    // Heuristic: Add label if it's a new month & not the very first week unless graph is short.
                    if (weekIndex > 0 || reversedWeeks.length < 26) { 
                         monthLabelElements.push({ name: months[month], weekIndex: weekIndex });
                    }
                    currentMonth = month;
                }
            }
        });
        
        const monthLabelsScroller = document.createElement('div');
        monthLabelsScroller.style.display = 'flex';
        monthLabelsScroller.style.paddingLeft = '28px'; 
        monthLabelsScroller.style.overflow = 'hidden'; 
        monthLabelsScroller.style.fontSize = '10px';
        monthLabelsScroller.style.height = '15px'; 
        monthLabelsScroller.style.marginBottom = '2px';
        monthLabelsScroller.className = 'github-months-scroller';

        let lastProcessedWeekIndexForMonths = 0;
        monthLabelElements.forEach(monthInfo => {
            const weeksSinceLastLabel = monthInfo.weekIndex - lastProcessedWeekIndexForMonths;
            if (weeksSinceLastLabel > 0) {
                const spacer = document.createElement('span');
                spacer.style.display = 'inline-block';
                spacer.style.minWidth = `${weeksSinceLastLabel * 13}px`; 
                monthLabelsScroller.appendChild(spacer);
            }
            const labelSpan = document.createElement('span');
            labelSpan.textContent = monthInfo.name;
            labelSpan.style.display = 'inline-block';
            // Give month label some minimum width (e.g., 2-3 weeks) to be readable
            const labelMinWidthWeeks = Math.max(1, Math.min(2, weeksSinceLastLabel > 0 ? weeksSinceLastLabel : 1)); 
            labelSpan.style.minWidth = `${13 * labelMinWidthWeeks}px`; 
            monthLabelsScroller.appendChild(labelSpan);
            lastProcessedWeekIndexForMonths = monthInfo.weekIndex + labelMinWidthWeeks;
        });
        if (reversedWeeks.length > lastProcessedWeekIndexForMonths) {
            const finalSpacer = document.createElement('span');
            finalSpacer.style.display = 'inline-block';
            finalSpacer.style.minWidth = `${(reversedWeeks.length - lastProcessedWeekIndexForMonths) * 13}px`;
            monthLabelsScroller.appendChild(finalSpacer);
        }

        const mainGraphRow = document.createElement('div');
        mainGraphRow.style.display = 'flex';

        const dayLabels = ['', 'M', '', 'W', '', 'F', ''];
        const dayLabelContainer = document.createElement('div');
        dayLabelContainer.style.display = 'flex';
        dayLabelContainer.style.flexDirection = 'column';
        dayLabelContainer.style.marginRight = '5px';
        dayLabelContainer.style.fontSize = '10px';
        dayLabelContainer.style.flexShrink = '0';

        for (let i = 0; i < 7; i++) {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = dayLabels[i];
            dayLabel.style.height = '11px';
            dayLabel.style.margin = '1px 0';
            dayLabel.style.lineHeight = '11px';
            dayLabel.style.textAlign = 'center';
            dayLabelContainer.appendChild(dayLabel);
        }
        mainGraphRow.appendChild(dayLabelContainer);

        const weeksRenderContainer = document.createElement('div');
        weeksRenderContainer.style.display = 'flex';
        weeksRenderContainer.style.overflowX = 'auto';
        weeksRenderContainer.style.flexGrow = '1';
        weeksRenderContainer.className = 'github-weeks-container';

        reversedWeeks.forEach((week) => {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'contrib-week'; 

            const daysInWeek = Array(7).fill(null);
            // Days from API are 0=Sun to 6=Sat. Our visual week starts Sun at top.
            week.contributionDays.forEach(day => {
                daysInWeek[day.weekday] = day;
            });

            daysInWeek.forEach(dayData => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'contrib-day';
                if (dayData) {
                    // Only set color if contributionCount > 0, let CSS handle 0-count days
                    if (dayData.contributionCount > 0) {
                        const orangeColor = contributionColors[dayData.color.toLowerCase()] || dayData.color;
                        dayDiv.style.backgroundColor = orangeColor;
                    }
                    
                    const tooltip = document.createElement('span');
                    tooltip.className = 'contrib-day-tooltip';
                    const count = dayData.contributionCount;
                    const date = new Date(dayData.date);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    tooltip.textContent = `${count} contribution${count === 1 ? '' : 's'} on ${formattedDate}`;
                    dayDiv.appendChild(tooltip);
                }
                weekDiv.appendChild(dayDiv);
            });
            weeksRenderContainer.appendChild(weekDiv);
        });
        mainGraphRow.appendChild(weeksRenderContainer);

        weeksRenderContainer.addEventListener('scroll', () => {
            monthLabelsScroller.scrollLeft = weeksRenderContainer.scrollLeft;
        });

        overallGraphLayout.appendChild(monthLabelsScroller);
        overallGraphLayout.appendChild(mainGraphRow);
        container.appendChild(overallGraphLayout);

        const totalContributionsText = document.createElement('p');
        totalContributionsText.textContent = `Total contributions in the last year: ${data.totalContributions}`;
        totalContributionsText.className = 'github-total-contributions';
        totalContributionsText.style.fontSize = '0.9em';
        totalContributionsText.style.marginTop = '15px';
        totalContributionsText.style.textAlign = 'right'; 
        totalContributionsText.style.paddingRight = '10px';
        container.appendChild(totalContributionsText);
    }

    fetchGitHubData();
}); 
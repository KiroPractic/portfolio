const fetch = require('node-fetch');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_REST_ENDPOINT = 'https://api.github.com';

// Simple in-memory cache with a TTL (Time To Live)
const cache = {
    contributionData: null,
    profileData: null,
    readmeContent: null,
    lastFetch: 0,
    ttl: 60 * 60 * 1000, // 1 hour in milliseconds
};

async function fetchGitHubContributionData() {
    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        throw new Error('GitHub username or token not configured in environment variables.');
    }

    const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
                color
              }
            }
          }
        }
      }
    }
    `;

    const variables = {
        username: GITHUB_USERNAME,
    };

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('GitHub API Error:', response.status, errorBody);
        throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
        console.error('GitHub API GraphQL Errors:', data.errors);
        throw new Error(`GitHub API returned GraphQL errors: ${JSON.stringify(data.errors)}`);
    }
    
    return data.data.user.contributionsCollection.contributionCalendar;
}

async function fetchGitHubProfileData() {
    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        throw new Error('GitHub username or token not configured in environment variables.');
    }

    // GraphQL query to get profile information
    const query = `
    query($username: String!) {
      user(login: $username) {
        login
        name
        avatarUrl
        url
        bio
        repositories {
          totalCount
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
    `;

    const variables = {
        username: GITHUB_USERNAME,
    };

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('GitHub API Error:', response.status, errorBody);
        throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
        console.error('GitHub API GraphQL Errors:', data.errors);
        throw new Error(`GitHub API returned GraphQL errors: ${JSON.stringify(data.errors)}`);
    }
    
    return data.data.user;
}

async function fetchGitHubReadme() {
    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        throw new Error('GitHub username or token not configured in environment variables.');
    }

    // Fetch the README.md content from the user's profile repo (username/username)
    const url = `${GITHUB_REST_ENDPOINT}/repos/${GITHUB_USERNAME}/${GITHUB_USERNAME}/readme`;
    
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (response.status === 404) {
        // README not found, return empty string
        return { content: '' };
    }

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('GitHub API Error:', response.status, errorBody);
        throw new Error(`GitHub README request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Decode the Base64 encoded content
    const decodedContent = Buffer.from(data.content, 'base64').toString('utf8');
    return { content: decodedContent };
}

module.exports = async (req, res) => {
    const now = Date.now();
    const isExpired = now - cache.lastFetch > cache.ttl;
    const endpoint = req.query.endpoint || 'all';

    // Handle different endpoints
    if (endpoint === 'contributions') {
        if (!cache.contributionData || isExpired) {
            try {
                cache.contributionData = await fetchGitHubContributionData();
                cache.lastFetch = now;
            } catch (error) {
                console.error('Error fetching GitHub contribution data:', error);
                return res.status(500).json({ error: error.message || 'Failed to fetch GitHub contribution data' });
            }
        }
        return res.status(200).json(cache.contributionData);
    }
    else if (endpoint === 'profile') {
        if (!cache.profileData || isExpired) {
            try {
                cache.profileData = await fetchGitHubProfileData();
                cache.lastFetch = now;
            } catch (error) {
                console.error('Error fetching GitHub profile data:', error);
                return res.status(500).json({ error: error.message || 'Failed to fetch GitHub profile data' });
            }
        }
        return res.status(200).json(cache.profileData);
    }
    else if (endpoint === 'readme') {
        if (!cache.readmeContent || isExpired) {
            try {
                cache.readmeContent = await fetchGitHubReadme();
                cache.lastFetch = now;
            } catch (error) {
                console.error('Error fetching GitHub README:', error);
                return res.status(500).json({ error: error.message || 'Failed to fetch GitHub README' });
            }
        }
        return res.status(200).json(cache.readmeContent);
    }
    else {
        // Fetch all data - for backward compatibility and convenience
        if ((isExpired || !cache.contributionData || !cache.profileData || !cache.readmeContent)) {
            try {
                console.log('Fetching all GitHub data from API.');
                const [contributionData, profileData, readmeData] = await Promise.all([
                    fetchGitHubContributionData(),
                    fetchGitHubProfileData(),
                    fetchGitHubReadme()
                ]);
                
                // Update cache
                cache.contributionData = contributionData;
                cache.profileData = profileData;
                cache.readmeContent = readmeData;
                cache.lastFetch = now;

                return res.status(200).json({
                    contributions: contributionData,
                    profile: profileData,
                    readme: readmeData
                });
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                return res.status(500).json({ error: error.message || 'Failed to fetch GitHub data' });
            }
        } else {
            console.log('Serving all GitHub data from cache.');
            return res.status(200).json({
                contributions: cache.contributionData,
                profile: cache.profileData,
                readme: cache.readmeContent
            });
        }
    }
}; 
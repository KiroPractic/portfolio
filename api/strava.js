export default async function handler(request, response) {
  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return response.status(500).json({ error: "Strava API credentials missing in environment variables." });
  }

  // --- 1. Refresh Access Token --- 
  const tokenUrl = "https://www.strava.com/oauth/token";
  const tokenParams = new URLSearchParams({
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  let accessToken;
  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Strava Token Refresh Error:", errorData);
      return response.status(tokenResponse.status).json({ error: "Failed to refresh Strava token", details: errorData });
    }

    const tokenData = await tokenResponse.json();
    accessToken = tokenData.access_token;
    // Note: Strava might send a new refresh token here (tokenData.refresh_token).
    // A production app might want to securely update the stored refresh token.

  } catch (error) {
    console.error("Error refreshing Strava token:", error);
    return response.status(500).json({ error: "Internal server error during token refresh." });
  }

  if (!accessToken) {
     return response.status(500).json({ error: "Failed to obtain Strava access token." });
  }

  // --- 2. Fetch SUMMARY Activities List --- 
  const activitiesListUrl = `https://www.strava.com/api/v3/athlete/activities?per_page=5`; 
  
  try {
    const listResponse = await fetch(activitiesListUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!listResponse.ok) {
        const errorData = await listResponse.json();
        console.error("Strava Activities List Fetch Error:", errorData);
        return response.status(listResponse.status).json({ error: "Failed to fetch Strava activities list", details: errorData });
    }

    const summaryActivities = await listResponse.json();

    if (!summaryActivities || summaryActivities.length === 0) {
         // Cache for a shorter time if no activities found, maybe 5 mins
        response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        return response.status(200).json([]); // Return empty array
    }

    // --- 3. Fetch DETAILED data for each activity concurrently ---
    const detailedActivityPromises = summaryActivities.map(activity => 
        fetch(`https://www.strava.com/api/v3/activities/${activity.id}`, {
             headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(res => {
            if (!res.ok) {
                console.warn(`Failed to fetch details for activity ${activity.id}: ${res.status}`);
                // Return null or a minimal object for failed fetches to avoid breaking Promise.all
                return null; 
            }
            return res.json();
        }).catch(err => {
            console.warn(`Error fetching details for activity ${activity.id}:`, err);
            return null; // Handle network errors for individual fetches
        })
    );

    const detailedActivitiesResults = await Promise.all(detailedActivityPromises);
    
    // Filter out any null results from failed fetches
    const detailedActivities = detailedActivitiesResults.filter(activity => activity !== null);

    // --- 4. Set Cache Headers and Respond ---
    // Cache for 15 minutes (900 seconds), serve stale for 1 hour (3600 seconds) while revalidating
    response.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
    response.status(200).json(detailedActivities);

  } catch (error) {
    console.error("Error in Strava API handler:", error);
    return response.status(500).json({ error: "Internal server error processing Strava data." });
  }
} 
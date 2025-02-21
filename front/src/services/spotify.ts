export const getUserProfile = async (accessToken: string) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    console.log(data);
  };
  const clientId = import.meta.env.VITE_CLIENT_ID;
	  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-recently-played`;

  export const fetchRecentlyPlayedTracks = async (accessToken: string) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 403) {
        window.location.href = AUTH_URL;
        return null;
      } else if (!response.ok) {
        console.error('Échec de la récupération des pistes récemment jouées:', response.statusText);
        return null;
      }
  
      const data = await response.json();
      return data.items.map(item => item.track);
    } catch (error) {
      console.error('Erreur lors de la requête des pistes récemment jouées:', error);
      return null;
    }
  };
  
  
  
<script>
	import { onMount } from 'svelte';
  import { accessToken, dailyMusic, userProfile } from '../store/stores';
  import {getUserProfile} from '../services/spotify';
	
	const exchangeCodeForToken = async (code) => {
	  const clientId = import.meta.env.VITE_CLIENT_ID;
	  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
	  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  
	  const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
		  grant_type: 'authorization_code',
		  code: code,
		  redirect_uri: redirectUri,
		  client_id: clientId,
		  client_secret: clientSecret,
		}),
	  });
  
	  if (!response.ok) {
		console.error('Failed to fetch access token:', response.statusText);
		return null;
	  }
  
	  const data = await response.json();
	  return data.access_token;
	};
  
	onMount(async () => {
	  const urlParams = new URLSearchParams(window.location.search);
	  const code = urlParams.get('code');
  
	  if (code) {
		const token = await exchangeCodeForToken(code);
		const user = getUserProfile(token);
		accessToken.set(token);
		userProfile.set(user);
	  } else {
		console.error('No code found in URL');
	  }
	});
	onMount(async () => {
		const response = await fetch('/me', { credentials: 'include' });

		if (response.ok) {
			const data = await response.json();
			userProfile.set(data);
		} else {
			userProfile.set(null);
		}
	});
	$: selectedMusic = $dailyMusic;
  </script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h2>Musique du Jour</h2>
{#if selectedMusic}
  <div>
    <img src="{selectedMusic.album.images[0]?.url}" alt="{selectedMusic.name}" width="100" />
    <p><strong>{selectedMusic.name}</strong> - {selectedMusic.artists[0]?.name}</p>

    {#if selectedMusic.preview_url}
      <audio controls>
        <source src="{selectedMusic.preview_url}" type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    {:else}
      <p>Aucun extrait disponible pour cette piste.</p>
    {/if}
  </div>
{:else}
  <p>Aucune musique sélectionnée pour aujourd'hui.</p>
{/if}
<div>
	<a href="/beat">Add my daily beat</a>
</div>

<style>

h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

div {
  background-color: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

img {
  border-radius: 8px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
}

p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

audio {
  width: 100%;
  margin-top: 10px;
}

a {
  display: inline-block;
  background-color: #1db954;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 20px;
  margin-top: 15px;
  font-weight: bold;
  transition: background-color 0.3s;
}

a:hover {
  background-color: #17a34a;
}

</style>

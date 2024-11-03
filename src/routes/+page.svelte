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
	$: selectedMusic = $dailyMusic;
  </script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Welcome to DailyBeat
	</h1>

</section>
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
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>

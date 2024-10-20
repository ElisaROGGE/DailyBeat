<script>
	import { onMount } from 'svelte';
	
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
		const accessToken = await exchangeCodeForToken(code);
		console.log('Access Token:', accessToken);
	  } else {
		console.error('No code found in URL');
	  }
	});
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

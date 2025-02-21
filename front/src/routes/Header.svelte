<script>

	const clientId = import.meta.env.VITE_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_REDIRECT_URI;
	console.log(clientId, 'clientId')
	console.log(redirectUri, 'redirect')
	const spotifyAuthorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private user-read-email`;


</script>

<header>
	<div class="corner">
		
	</div>

	<nav>
		<a href="/"><span>DailyBeat</span></a>
	</nav>

	<div class="corner">
		<a href={spotifyAuthorizeUrl}>
			Sign In
		</a>
	</div>
</header>

<style>
	header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181818;
  padding: 1rem 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

nav a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

nav a:hover {
  color: #1db954;
}

.corner {
  display: flex;
  align-items: center;
}

.corner a {
  background-color: #1db954;
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.corner a:hover {
  background-color: #17a34a;
}

</style>

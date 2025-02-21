<script>
  import { fetchRecentlyPlayedTracks } from '../../services/spotify';
  import { accessToken } from '../../store/stores.js';
    import { dailyMusic } from '../../store/stores.js';
    import { onMount } from 'svelte';
  
    let query = '';
    let searchResults = [];
    let recentlyPlayedTracks = [];
    $: token = $accessToken;
  
    const searchMusic = async () => {
      if (query.trim() === '') return;
  
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error('Erreur de recherche :', response.statusText);
        return;
      }
  
      const data = await response.json();
      searchResults = data.tracks.items;
    };
    const loadRecentlyPlayedTracks = async () => {
      recentlyPlayedTracks = await fetchRecentlyPlayedTracks(token);
    };
  
    const selectDailyMusic = (track) => {
      dailyMusic.set(track);
    };
    onMount(() => {
      loadRecentlyPlayedTracks();
    });
  </script>
  
  <h1>Ajouter la musique du jour</h1>
  
  <input type="text" bind:value={query} placeholder="Recherche de musique..." />
  <button on:click={searchMusic}>Rechercher</button>
  
  <ul>
    {#each searchResults as track}
      <li>
        <img src="{track.album.images[0]?.url}" alt="{track.name}" width="50" />
        <div>
          <strong>{track.name}</strong> - {track.artists[0]?.name}
          <button on:click={() => selectDailyMusic(track)}>Sélectionner comme musique du jour</button>
        </div>
      </li>
    {/each}
  </ul>
  <h2>Récemment Écoutés</h2>
<ul>
  {#each recentlyPlayedTracks as track}
    <li>
      <img src="{track.album.images[0]?.url}" alt="{track.name}" width="50" />
      <strong>{track.name}</strong> - {track.artists[0]?.name}
      {#if track.preview_url}
      <audio controls>
        <source src="{track.preview_url}" type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    {:else}
      <p>Aucun extrait disponible pour cette piste.</p>
    {/if}
    </li>
  {/each}
</ul>

<style>
  input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #222;
  color: white;
  margin-bottom: 10px;
}

button {
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #17a34a;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
}

li {
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

li img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
}

li div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

li strong {
  font-size: 1rem;
}

audio {
  width: 100%;
  margin-top: 5px;
}

p {
  font-size: 0.9rem;
  color: #ccc;
}
</style>
  
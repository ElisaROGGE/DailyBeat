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
  
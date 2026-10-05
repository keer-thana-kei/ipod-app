export async function searchTracks(query) {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=10&entity=song`
  )
  const data = await response.json()
  return data.results.map(track => ({
    id: track.trackId,
    name: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    artwork: track.artworkUrl100,
    preview: track.previewUrl,
  }))
}
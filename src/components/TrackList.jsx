import './TrackList.css'

export default function TrackList({ tracks, currentTrack, onSelect }) {
  if (tracks.length === 0) {
    return (
      <div className="tracklist-empty">
        Search for a song to get started
      </div>
    )
  }

  return (
    <div className="track-list">
      {tracks.map(track => (
        <div
          key={track.id}
          className={`track-item ${currentTrack?.id === track.id ? 'active' : ''}`}
          onClick={() => onSelect(track)}
        >
          <img
            className="track-artwork"
            src={track.artwork}
            alt={track.album}
          />
          <div className="track-info">
            <div className="track-name">{track.name}</div>
            <div className="track-artist">{track.artist}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
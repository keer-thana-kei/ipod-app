import { useEffect, useRef, useState } from 'react'
import TrackList from './TrackList'
import ColorWheel from './ColorWheel'
import './Player.css'

export default function Player({ track, color, tracks, onSelect, onSearch, query, setQuery, setColor }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (track?.preview && audioRef.current) {
      audioRef.current.src = track.preview
      audioRef.current.play()
      setPlaying(true)
    }
  }, [track])

  function togglePlay() {
    if (!audioRef.current) return
    playing ? audioRef.current.pause() : audioRef.current.play()
    setPlaying(!playing)
  }

  function nextTrack() {
    if (!tracks.length) return
    const idx = tracks.findIndex(t => t.id === track?.id)
    onSelect(tracks[(idx + 1) % tracks.length])
  }

  function prevTrack() {
    if (!tracks.length) return
    const idx = tracks.findIndex(t => t.id === track?.id)
    onSelect(tracks[(idx - 1 + tracks.length) % tracks.length])
  }

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (audio) setProgress((audio.currentTime / audio.duration) * 100)
  }

  return (
    <div className="ipod" style={{ background: color }}>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={nextTrack} />

      <div className="ipod-screen">
        <div className="screen-header">
          <span>iTunes</span>
          <span>{tracks.length} songs</span>
        </div>
        <form className="search-form" onSubmit={onSearch}>
          <input
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search songs..."
          />
        </form>
        <TrackList tracks={tracks} currentTrack={track} onSelect={onSelect} />
      </div>

      <div className="now-playing">
        <div className="now-playing-name">{track?.name ?? 'No track selected'}</div>
        <div className="now-playing-artist">{track?.artist ?? 'Search for a song above'}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%`, background: color }} />
        </div>
      </div>

      <div className="controls">
        {/* <span className="menu-label">Menu</span> */}
        <div
  className="click-wheel"
  style={{
    background: color,
    filter: 'brightness(1.15)'
  }}
>
          <button className="wheel-btn prev" onClick={prevTrack}>|◀◀</button>
          <button className="wheel-btn next" onClick={nextTrack}>▶▶|</button>
          {/* <button className="wheel-btn play-bottom">&#62;=</button> */}
          <button className="center-btn" onClick={togglePlay}>
            {playing ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      <div className="color-wheel-corner">
        <ColorWheel color={color} setColor={setColor} />
      </div>
    </div>
  )
}
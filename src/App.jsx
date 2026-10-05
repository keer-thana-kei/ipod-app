import { useState } from 'react'
import Player from './components/Player'
// import ColorWheel from './components/ColorWheel'
import { searchTracks } from './api/itunes'
import './App.css'

export default function App() {
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [query, setQuery] = useState('')
  const [color, setColor] = useState('#3a7abd')

  async function handleSearch(e) {
    e.preventDefault()
    const results = await searchTracks(query)
    setTracks(results)
    if (results.length > 0) setCurrentTrack(results[0])
  }

  return (
    <div className="app">
     <Player
  track={currentTrack}
  color={color}
  tracks={tracks}
  onSelect={setCurrentTrack}
  onSearch={handleSearch}
  query={query}
  setQuery={setQuery}
  setColor={setColor}
/>
      {/* <ColorWheel color={color} setColor={setColor} /> */}
    </div>
  )
}
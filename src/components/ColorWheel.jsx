import { useRef, useState } from 'react'
import './ColorWheel.css'

export default function ColorWheel({ setColor }) {
  const wheelRef = useRef(null)
  const [rotation, setRotation] = useState(0)

  function handleMove(e) {
    const rect = wheelRef.current.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 180

    setRotation(angle)

    const hue = Math.floor(angle)
    const color = `hsl(${hue}, 75%, 45%)`

    setColor(color)
  }

  return (
    <div
      ref={wheelRef}
      className="premium-wheel"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
    >
      <div
        className="wheel-ring"
        style={{ transform: `rotate(${rotation}deg)` }}
      ></div>

      <div className="wheel-center"></div>
    </div>
  )
}
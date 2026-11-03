import { useEffect, useRef, useState, type ReactNode } from "react"
import "./AdminFold.css"

const PANEL_WIDTH = 320
const CORNER_SIZE = 64
const CORNER_PEEK = 20

type Point = [number, number]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (k: number) => (k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2)
const polygon = (pts: Point[]) => `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(",")})`

/** Tweens toward `target` over `ms`, restarting from wherever it currently is. */
function useTween(target: number, ms: number) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const from = current.current
    if (ms <= 0) {
      current.current = target
      setValue(target)
      return
    }
    const start = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const k = Math.min(1, (now - start) / ms)
      current.current = lerp(from, target, easeInOut(k))
      setValue(current.current)
      if (k < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [target, ms])

  return value
}

function useViewport() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return size
}

type AdminFoldProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  children: ReactNode
}

/**
 * The page's top-right corner, folded over. Opening sweeps the fold line from the
 * corner diagonal to a vertical crease; the folded-over back of the page is the panel.
 *
 * The fold line is x = W - w + y * tan(phi). The strip to its right is what gets
 * folded away, and the flap is that strip reflected across the line.
 */
function AdminFold({ open, onOpen, onClose, children }: AdminFoldProps) {
  const { width: W, height: H } = useViewport()
  const [peeking, setPeeking] = useState(false)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const e = useTween(open ? 1 : 0, reduceMotion ? 0 : 650)
  const peek = useTween(peeking && !open ? 1 : 0, reduceMotion ? 0 : 180)

  useEffect(() => {
    if (!open) return
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const corner = CORNER_SIZE + CORNER_PEEK * peek
  const w = lerp(corner, PANEL_WIDTH, e)
  const phi = lerp(Math.PI / 4, 0, e)
  const s = Math.sin(phi)
  const c = Math.cos(phi)
  const tan = Math.tan(phi)

  // the strip right of the fold line, clipped to the viewport
  const yHit = tan > 1e-6 ? w / tan : Infinity
  const strip: Point[] =
    yHit <= H
      ? [[W - w, 0], [W, 0], [W, yHit]]
      : [[W - w, 0], [W, 0], [W, H], [W - w + H * tan, H]]

  // reflect a point across the fold line
  const p0x = W - w
  const reflect = ([x, y]: Point): Point => {
    const t = (x - p0x) * s + y * c
    return [2 * (p0x + t * s) - x, 2 * (t * c) - y]
  }
  const flap = strip.map(reflect)

  // The panel is the back of the strip: mirrored onto the strip, then reflected across the fold.
  const matrix = `matrix(${1 - 2 * s * s}, ${-2 * s * c}, ${2 * s * c}, ${2 * c * c - 1}, ${
    W * (2 * s * s - 1) + 2 * (W - w) * c * c
  }, ${2 * w * s * c})`

  const contentOpacity = Math.max(0, Math.min(1, (e - 0.5) * 2))
  const isOpen = e > 0.99

  return (
    <div className="admin-fold">
      <div
        className="admin-fold__under"
        style={{ clipPath: polygon(strip), pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      />
      <div className="admin-fold__shadow">
        <div
          className="admin-fold__flap"
          style={{ clipPath: polygon(flap), pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div
            className="admin-fold__crease"
            style={{ left: W - w - 90, transform: `rotate(${-phi}rad)` }}
          />
          <div
            className="admin-fold__content"
            style={{
              width: PANEL_WIDTH,
              height: H,
              transform: matrix,
              opacity: contentOpacity,
              visibility: e < 0.4 ? "hidden" : "visible",
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {!open && (
        <button
          type="button"
          className="admin-fold__corner"
          style={{ width: corner, height: corner }}
          onClick={onOpen}
          onMouseEnter={() => setPeeking(true)}
          onMouseLeave={() => setPeeking(false)}
          onFocus={() => setPeeking(true)}
          onBlur={() => setPeeking(false)}
          aria-label="Open admin panel"
        />
      )}
    </div>
  )
}

export default AdminFold

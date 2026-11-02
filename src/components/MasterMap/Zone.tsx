import type { ZoneProps } from "../../types"
import "./Zone.css"

function Zone({ config, students, isHovered, onHover, onLeave, onClick }: ZoneProps) {
  const count = students.length
  const [canvasWidth, canvasHeight] = config.canvas ?? [1920, 1080]

  return (
    <button
      type="button"
      className={`zone${isHovered ? " zone--hovered" : ""}`}
      style={{ gridArea: config.gridArea }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onClick}
      aria-label={`${config.label}, ${count} ${count === 1 ? "student" : "students"}`}
    >
      <svg className="zone__image" viewBox={config.viewBox} aria-hidden="true">
        <image href={config.asset} width={canvasWidth} height={canvasHeight} />
      </svg>
      <span className="zone__label">{config.label}</span>
      {count > 0 && <span className="zone__count">{count}</span>}
      {isHovered && count > 0 && (
        <ul className="zone__students">
          {students.map(s => (
            <li key={s.id}>
              {s.firstName} {s.lastName}
            </li>
          ))}
        </ul>
      )}
    </button>
  )
}

export default Zone

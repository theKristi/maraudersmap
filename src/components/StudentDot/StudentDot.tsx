import './StudentDot.css'
import { useEffect, useMemo, useState } from 'react'
import type { Path, StudentDotProps } from '../types'


export function StudentDot({ position, student, paths }: StudentDotProps) {
        const [currentPathIndex] = useState(() =>
            paths ? Math.floor(Math.random() * paths.length) : 0
        )
        const randomPathPoint = (path: Path) => {
            return {
                x: path.minX + Math.random() * (path.maxX - path.minX),
                y: path.minY + Math.random() * (path.maxY - path.minY)
            }
        }

        const behavior = useMemo(() => {
            const options = ["sitting", "standing", "wandering"]
            return options[Math.floor(Math.random() * options.length)]
        }, [])
        const [wanderOffset, setWanderOffset] = useState(() =>
            paths ? randomPathPoint(paths[currentPathIndex]) : { x: 0, y: 0 }
        )

        useEffect(() => {
            if (behavior !== "wandering") return

            let timeout: number;

            const step = () => {
                setWanderOffset(randomPathPoint(paths[currentPathIndex]))
                timeout = setTimeout(step, 10000 + Math.random() * 3000)
            }

            timeout = setTimeout(step, 1000 + Math.random() * 2000)
            return () => clearTimeout(timeout)
        }, [behavior])
        const left = behavior === "wandering"
            ? `${wanderOffset.x}%`
            : `${position.left}%`

        const top = behavior === "wandering"
            ? `${wanderOffset.y}%`
            : `${position.top}%`
        return (<div style={{ position: "absolute", left: left, top: top, transform: "translate(-50%, -50%)", transition: "left 10.5s ease-in-out, top 10.5s ease-in-out", textAlign: "center", fontSize: "1.5rem" }} className={behavior}>
            <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#1a0a4e",
                margin: "0 auto 2px"
            }}></div>
            <div className="student-name" style={{ textShadow: "0 0 4px #e8d5a3, 0 0 4px #e8d5a3" }}>{student.firstName} {student.lastName}</div>
        </div>)
    }

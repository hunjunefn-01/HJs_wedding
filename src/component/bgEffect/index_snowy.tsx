import { useEffect, useRef } from "react"

const Y_SPEED = 0.8
const Y_SPEED_VARIANCE = 1.0
const X_SWAY = 0.5 // 좌우 흔들림 강도

class Snowflake {
  x: number
  y: number
  radius: number = 0
  opacity: number = 0
  ySpeed: number = 0
  swayOffset: number = 0

  constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.initialize()
  }

  initialize() {
    this.radius = 1 + Math.random() * 3
    this.opacity = 0.4 + Math.random() * 0.5
    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE
    this.swayOffset = Math.random() * Math.PI * 2
  }

  draw() {
    if (this.y > this.canvas.height) {
      this.y = -10
      this.x = Math.random() * this.canvas.width
      this.initialize()
    }
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    this.ctx.fill()
  }

  animate(time: number) {
    this.y += this.ySpeed
    this.x += Math.sin(time / 1000 + this.swayOffset) * X_SWAY
    this.draw()
  }
}

export const BGSnowy = () => {
  const ref = useRef<HTMLCanvasElement>({} as HTMLCanvasElement)
  const flakesRef = useRef<Snowflake[]>([])
  const animationFrameIdRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const getSnowflakeNum = () => {
      return Math.floor((window.innerWidth * window.innerHeight) / 10000)
    }

    const initializeSnow = () => {
      updateSize()
      const count = getSnowflakeNum()
      const flakes = []
      for (let i = 0; i < count; i++) {
        flakes.push(new Snowflake(canvas, ctx))
      }
      flakesRef.current = flakes
    }

    initializeSnow()

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      flakesRef.current.forEach((flake) => flake.animate(time))
      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    animationFrameIdRef.current = requestAnimationFrame(render)

    const onResize = () => {
      updateSize()
      const newNum = getSnowflakeNum()
      if (newNum > flakesRef.current.length) {
        for (let i = flakesRef.current.length; i < newNum; i++) {
          flakesRef.current.push(new Snowflake(canvas, ctx))
        }
      } else {
        flakesRef.current.splice(newNum)
      }
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [])

  return (
    <div className="bg-effect">
      <canvas 
        ref={ref} 
        style={{ filter: 'blur(0.5px)' }} // 눈송이를 약간 부드럽게 처리
      />
    </div>
  )
}
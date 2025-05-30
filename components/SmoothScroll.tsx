import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isLowEndDevice =
      typeof window !== 'undefined' &&
      window.navigator.hardwareConcurrency &&
      window.navigator.hardwareConcurrency <= 4

    const lenis = new Lenis({
      duration: isLowEndDevice ? 0.7 : 1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic, plus rapide que easeOutQuad
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    })

    let animationFrame: number

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrame = requestAnimationFrame(raf)
    }

    animationFrame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
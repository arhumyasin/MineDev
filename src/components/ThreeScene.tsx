'use client'

import { useEffect, useRef } from 'react'

type Vector3 = { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
type Object3D = { rotation: Vector3; position: Vector3 }
type Group = Object3D & { add(object: object): void }
type Scene = { add(...objects: object[]): void }
type Camera = { aspect: number; position: Vector3; updateProjectionMatrix(): void }
type Renderer = { setPixelRatio(value: number): void; setSize(width: number, height: number, updateStyle?: boolean): void; render(scene: Scene, camera: Camera): void; dispose(): void }
type Geometry = { setAttribute(name: string, attribute: object): void }
type ThreeApi = {
  WebGLRenderer: new (options: { canvas: HTMLCanvasElement; alpha: boolean; antialias: boolean }) => Renderer
  Scene: new () => Scene
  PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => Camera
  Group: new () => Group
  TorusKnotGeometry: new (radius: number, tube: number, tubularSegments: number, radialSegments: number) => object
  MeshStandardMaterial: new (options: { color: number; metalness: number; roughness: number }) => object
  Mesh: new (geometry: object, material: object) => Object3D
  BufferGeometry: new () => Geometry
  BufferAttribute: new (array: Float32Array, itemSize: number) => object
  PointsMaterial: new (options: { color: number; size: number }) => object
  Points: new (geometry: Geometry, material: object) => Object3D
  AmbientLight: new (color: number, intensity: number) => object
  PointLight: new (color: number, intensity: number, distance: number) => { position: Vector3 }
}

function loadThree() {
  const existing = (window as unknown as { THREE?: ThreeApi }).THREE
  if (existing) return Promise.resolve(existing)

  return new Promise<ThreeApi>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>('script[data-three-scene]')
    const ready = () => {
      const three = (window as unknown as { THREE?: ThreeApi }).THREE
      if (three) resolve(three)
      else reject(new Error('Three.js did not initialize'))
    }
    if (!script) {
      script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
      script.async = true
      script.dataset.threeScene = 'true'
      script.onload = ready
      script.onerror = () => reject(new Error('Three.js could not be loaded'))
      document.head.appendChild(script)
    } else {
      script.addEventListener('load', ready, { once: true })
      script.addEventListener('error', () => reject(new Error('Three.js could not be loaded')), { once: true })
    }
  })
}

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let frame = 0
    let renderer: Renderer | undefined
    let observer: IntersectionObserver | undefined
    let resizeObserver: ResizeObserver | undefined
    let pointerX = 0
    let pointerY = 0
    let lastTime = 0
    // Cursor poori window me kahin bhi ho — shape us taraf move kare.
    // Canvas ke bahar ki position ko -0.5…0.5 par clamp kar do.
    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      const nx = (event.clientX - bounds.left) / bounds.width - 0.5
      const ny = (event.clientY - bounds.top) / bounds.height - 0.5
      pointerX = Math.max(-0.5, Math.min(0.5, nx))
      pointerY = Math.max(-0.5, Math.min(0.5, ny))
    }
    const onPointerLeaveWindow = () => { pointerX = 0; pointerY = 0 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    loadThree().then((T) => {
      if (disposed) return
      try {
        renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        const scene = new T.Scene()
        const camera = new T.PerspectiveCamera(45, 1, 0.1, 100)
        camera.position.z = 5.4
        const group = new T.Group()
        scene.add(group)

        const knot = new T.Mesh(
          new T.TorusKnotGeometry(1, 0.32, 160, 20),
          new T.MeshStandardMaterial({ color: 0x8efb03, metalness: 0.5, roughness: 0.28 }),
        )
        group.add(knot)

        const particles = new Float32Array(900 * 3)
        for (let i = 0; i < particles.length; i += 1) particles[i] = (Math.random() - 0.5) * 14
        const particleGeometry = new T.BufferGeometry()
        particleGeometry.setAttribute('position', new T.BufferAttribute(particles, 3))
        const points = new T.Points(particleGeometry, new T.PointsMaterial({ color: 0x8efb03, size: 0.035 }))
        scene.add(points, new T.AmbientLight(0xffffff, 0.6))
        const blueLight = new T.PointLight(0x5b57ff, 2.2, 30)
        blueLight.position.set(4, 3, 4)
        const limeLight = new T.PointLight(0x8efb03, 1.8, 30)
        limeLight.position.set(-4, -2, 3)
        scene.add(blueLight, limeLight)

        const resize = () => {
          const width = canvas.clientWidth
          const height = canvas.clientHeight
          if (!width || !height) return
          renderer?.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
        }
        const render = (time: number) => {
          if (disposed) return
          const now = time / 1000
          // Smooth fix: smoothing ab waqt (dt) se hoti hai, frame count se nahi.
          // Purana code har frame fixed 0.03 use karta tha — frame drop hote hi
          // speed badal jati thi aur movement atak-atak kar lagti thi (glitch).
          // Ab 60Hz, 120Hz ya frame drop — har haal me aik jesi smooth feel hai.
          const dt = lastTime ? Math.min(Math.max((time - lastTime) / 1000, 0), 0.05) : 0
          lastTime = time
          knot.rotation.x = now * 0.4
          knot.rotation.y = now * 0.55
          points.rotation.y = now * 0.03
          // 8/s = ~0.125s me target ki taraf 63% — cursor ke saath tight follow.
          // Aur slow chahiye to 8 ko 5 kar do, aur fast chahiye to 12.
          const k = 1 - Math.exp(-dt * 8)
          // Rotation: cursor jis taraf, shape us taraf murr jaye (range bhi zyada)
          group.rotation.y += (pointerX * 2.0 - group.rotation.y) * k
          group.rotation.x += (pointerY * 1.2 - group.rotation.x) * k
          // Position: shape asal me us taraf shift bhi ho (sirf tilt nahi)
          group.position.x += (pointerX * 1.2 - group.position.x) * k
          group.position.y += (-pointerY * 0.7 - group.position.y) * k
          renderer?.render(scene, camera)
          if (!reducedMotion) frame = window.requestAnimationFrame(render)
        }
        resize()
        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)
        observer = new IntersectionObserver(([entry]) => {
          window.cancelAnimationFrame(frame)
          if (entry.isIntersecting) {
            lastTime = 0
            render(performance.now())
          }
        })
        observer.observe(canvas)
        window.addEventListener('pointermove', onPointerMove)
        document.documentElement.addEventListener('mouseleave', onPointerLeaveWindow)
      } catch {
        canvas.setAttribute('aria-label', 'Interactive 3D scene is unavailable in this browser')
      }
    }).catch(() => {
      if (!disposed) canvas.setAttribute('aria-label', 'Interactive 3D scene is unavailable')
    })

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeaveWindow)
      observer?.disconnect()
      resizeObserver?.disconnect()
      renderer?.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} aria-label="Interactive 3D scene" />
}

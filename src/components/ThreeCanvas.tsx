import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  lang: "en" | "ar";
  color: string;
  wireframe: boolean;
  rotationSpeed: number;
  showParticles: boolean;
  activePreset: string;
}

export default function ThreeCanvas({
  lang,
  color,
  wireframe,
  rotationSpeed,
  showParticles,
  activePreset,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to update Three.js objects on prop changes without recreating the scene
  const rotationSpeedRef = useRef(rotationSpeed);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  const materialsRef = useRef<{
    outerMesh: THREE.MeshBasicMaterial | THREE.MeshPhysicalMaterial;
    outerWire: THREE.LineBasicMaterial;
    innerMesh: THREE.MeshBasicMaterial;
    innerWire: THREE.LineBasicMaterial;
    particles: THREE.PointsMaterial;
  } | null>(null);

  const sceneStateRef = useRef({
    targetRotationX: 0,
    targetRotationY: 0,
    currentRotationX: 0,
    currentRotationY: 0,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    hoverScale: 1.0,
  });

  // Dynamic props update effect
  useEffect(() => {
    if (!materialsRef.current) return;
    const threeColor = new THREE.Color(color);

    // Update outer box material
    const mat = materialsRef.current.outerMesh;
    mat.color.copy(threeColor);
    if ("wireframe" in mat) {
      mat.wireframe = wireframe;
    }

    // Update wires and inner box
    materialsRef.current.outerWire.color.copy(threeColor);
    materialsRef.current.innerMesh.color.copy(threeColor).multiplyScalar(0.7);
    materialsRef.current.innerWire.color.copy(threeColor).multiplyScalar(1.2);
    materialsRef.current.particles.color.copy(threeColor).multiplyScalar(1.5);
  }, [color, wireframe]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get parent dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    // Soft ambient fog to match Bold Typography pitch-black background
    scene.fog = new THREE.FogExp2(0x050505, 0.08);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Glowing Nested 3D Cube System
    const outerGeo = new THREE.BoxGeometry(2, 2, 2);
    const innerGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);

    // Color instances
    const baseColor = new THREE.Color(color);

    // Outer Mesh - Glassy translucent physical mesh
    const outerMeshMat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      transparent: true,
      opacity: wireframe ? 0.05 : 0.25,
      wireframe: wireframe,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      thickness: 1.2,
      side: THREE.DoubleSide,
    });

    const outerMesh = new THREE.Mesh(outerGeo, outerMeshMat);
    scene.add(outerMesh);

    // Outer Wireframe overlay - Bright crisp neon outline
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerWireMat = new THREE.LineBasicMaterial({
      color: baseColor,
      linewidth: 2,
    });
    const outerWireframe = new THREE.LineSegments(outerEdges, outerWireMat);
    outerMesh.add(outerWireframe);

    // Inner Mesh - Smaller core node representing core algorithmic processing
    const innerMeshMat = new THREE.MeshBasicMaterial({
      color: baseColor.clone().multiplyScalar(0.7),
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMeshMat);
    scene.add(innerMesh);

    // Inner Wireframe
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerWireMat = new THREE.LineBasicMaterial({
      color: baseColor.clone().multiplyScalar(1.2),
      linewidth: 1,
    });
    const innerWireframe = new THREE.LineSegments(innerEdges, innerWireMat);
    innerMesh.add(innerWireframe);

    // Store materials reference for reactive updates
    materialsRef.current = {
      outerMesh: outerMeshMat,
      outerWire: outerWireMat,
      innerMesh: innerMeshMat,
      innerWire: innerWireMat,
      particles: new THREE.PointsMaterial(), // initialized below
    };

    // 5. Surrounding Swirling Particle Field (Starfield Matrix)
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a spherical layout around the box
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const particleMat = new THREE.PointsMaterial({
      color: baseColor.clone().multiplyScalar(1.5),
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    materialsRef.current.particles = particleMat;

    const particles = new THREE.Points(particleGeo, particleMat);
    if (showParticles) {
      scene.add(particles);
    }

    // 6. Professional Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x3b82f6, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x22d3ee, 1.8);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(color, 2, 12);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 7. Interactive Controls & Mouse Handlers
    const state = sceneStateRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      state.isDragging = true;
      state.prevMouseX = e.clientX;
      state.prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (state.isDragging) {
        const deltaX = e.clientX - state.prevMouseX;
        const deltaY = e.clientY - state.prevMouseY;

        state.targetRotationY += deltaX * 0.007;
        state.targetRotationX += deltaY * 0.007;

        state.prevMouseX = e.clientX;
        state.prevMouseY = e.clientY;
      } else {
        // Soft tilt on normal mouse move over container
        const rect = canvas.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        state.targetRotationY = normX * 0.4;
        state.targetRotationX = -normY * 0.4;
      }
    };

    const handleMouseUp = () => {
      state.isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        state.isDragging = true;
        state.prevMouseX = e.touches[0].clientX;
        state.prevMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (state.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - state.prevMouseX;
        const deltaY = e.touches[0].clientY - state.prevMouseY;

        state.targetRotationY += deltaX * 0.009;
        state.targetRotationX += deltaY * 0.009;

        state.prevMouseX = e.touches[0].clientX;
        state.prevMouseY = e.touches[0].clientY;
      }
    };

    const handleMouseEnter = () => {
      state.hoverScale = 1.15;
    };

    const handleMouseLeave = () => {
      state.hoverScale = 1.0;
      state.isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleMouseUp);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth inertia physics interpolation
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.1;
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.1;

      // Base rotators combined with user inputs and speed parameters
      const baseSpeed = rotationSpeedRef.current * 0.08;

      // Rotate meshes
      outerMesh.rotation.x = state.currentRotationX + elapsedTime * baseSpeed;
      outerMesh.rotation.y = state.currentRotationY + elapsedTime * (baseSpeed * 0.8);

      // Rotate inner mesh in opposite direction for high-tech aesthetic
      innerMesh.rotation.x = -(state.currentRotationX + elapsedTime * (baseSpeed * 1.5));
      innerMesh.rotation.y = -(state.currentRotationY + elapsedTime * (baseSpeed * 1.2));

      // Scale meshes on hover
      const scaleSpeed = 6 * delta;
      const currentScale = outerMesh.scale.x;
      const scaleDiff = state.hoverScale - currentScale;
      if (Math.abs(scaleDiff) > 0.001) {
        const nextScale = currentScale + scaleDiff * scaleSpeed;
        outerMesh.scale.set(nextScale, nextScale, nextScale);
        innerMesh.scale.set(nextScale * 0.95, nextScale * 0.95, nextScale * 0.95);
      }

      // Rotate background particle field slowly
      if (showParticles) {
        particles.rotation.y = elapsedTime * 0.025;
        particles.rotation.x = elapsedTime * 0.01;
      }

      // Animate PointLight intensity like a pulsing digital engine
      pointLight.intensity = 2 + Math.sin(elapsedTime * 3) * 1.2;

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer (as requested by system guidelines)
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      window.requestAnimationFrame(() => {
        if (!containerRef.current || !canvasRef.current) return;
        const entry = entries[0];
        const newWidth = entry.contentRect.width || width;
        const newHeight = entry.contentRect.height || height;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    });

    resizeObserver.observe(container);

    // 10. Clean-Up on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleMouseUp);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);

      // Dispose Geometries and Materials
      outerGeo.dispose();
      innerGeo.dispose();
      outerEdges.dispose();
      innerEdges.dispose();
      particleGeo.dispose();

      outerMeshMat.dispose();
      outerWireMat.dispose();
      innerMeshMat.dispose();
      innerWireMat.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, [showParticles]);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      role="img"
      aria-label={lang === "ar" ? "رسم بياني تفاعلي ثلاثي الأبعاد لنظام العقد" : "Interactive 3D node diagram visualizer"}
      className="relative w-full h-full min-h-[300px] md:min-h-[420px] bg-slate-950/20 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/5 flex items-center justify-center shadow-inner"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full block" />
      
      {/* Decorative coordinate corners representing system logs */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-blue-400/40 select-none pointer-events-none tracking-widest uppercase">
        SYS_NODE_OK // POS_X: 0.00
      </div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-blue-400/40 select-none pointer-events-none tracking-widest uppercase">
        SYS_GRID // TYPE: {activePreset.toUpperCase()}
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-blue-400/40 select-none pointer-events-none tracking-widest uppercase">
        AXIS_Y: COORD_LOCK
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-blue-400/40 select-none pointer-events-none tracking-widest uppercase">
        3D_GL_RENDER_V2
      </div>
    </div>
  );
}

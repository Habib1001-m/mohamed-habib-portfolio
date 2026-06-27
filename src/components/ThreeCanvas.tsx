import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getArchitecturePreset } from "../data/architecturePresets";

interface ThreeCanvasProps {
  lang: "en" | "ar";
  color: string;
  wireframe: boolean;
  rotationSpeed: number;
  showParticles: boolean;
  activePreset: string;
}

const statusScale: Record<string, number> = {
  active: 1,
  guarded: 0.9,
  blocked: 0.82,
  review: 0.95,
};

function toVector(x: number, y: number, index: number) {
  return new THREE.Vector3((x - 50) / 10, (50 - y) / 10, ((index % 3) - 1) * 0.42);
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
  const speedRef = useRef(rotationSpeed);

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const architecture = getArchitecturePreset(activePreset);
    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth || 640;
    let height = container.clientHeight || 480;

    const accent = new THREE.Color(color || architecture.accent);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.06);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const root = new THREE.Group();
    root.rotation.x = -0.15;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const point = new THREE.PointLight(accent, 3.2, 18);
    point.position.set(0, 0, 3);
    scene.add(point);

    const grid = new THREE.GridHelper(9.5, 18, accent, 0x1f2937);
    grid.position.y = -3.5;
    grid.material.opacity = 0.18;
    grid.material.transparent = true;
    root.add(grid);

    const nodePosition = new Map<string, THREE.Vector3>();
    architecture.nodes.forEach((node, index) => {
      nodePosition.set(node.id, toVector(node.x, node.y, index));
    });

    const lineMaterial = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.5 });
    const packetMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.92 });
    const packetGeometry = new THREE.SphereGeometry(0.055, 16, 16);
    const packets: { mesh: THREE.Mesh; offset: number }[] = [];
    const lineGeometries: THREE.BufferGeometry[] = [];

    architecture.links.forEach((link, index) => {
      const from = nodePosition.get(link.from);
      const to = nodePosition.get(link.to);
      if (!from || !to) return;

      const curve = new THREE.CatmullRomCurve3([
        from,
        new THREE.Vector3((from.x + to.x) / 2, (from.y + to.y) / 2, Math.max(from.z, to.z) + 0.42),
        to,
      ]);
      const points = curve.getPoints(32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometries.push(geometry);
      const line = new THREE.Line(geometry, lineMaterial);
      root.add(line);

      const packet = new THREE.Mesh(packetGeometry, packetMaterial);
      packet.userData.curve = curve;
      packets.push({ mesh: packet, offset: index / Math.max(architecture.links.length, 1) });
      root.add(packet);
    });

    const nodeGeometry = new THREE.SphereGeometry(0.16, 28, 28);
    const haloGeometry = new THREE.SphereGeometry(0.3, 28, 28);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: accent, wireframe });
    const haloMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.11, depthWrite: false });
    const ringGeometry = new THREE.TorusGeometry(0.28, 0.006, 8, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.45 });

    architecture.nodes.forEach((node, index) => {
      const position = nodePosition.get(node.id);
      if (!position) return;

      const group = new THREE.Group();
      group.position.copy(position);
      const scale = statusScale[node.status] ?? 1;
      group.scale.setScalar(scale);

      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      const core = new THREE.Mesh(nodeGeometry, nodeMaterial);
      group.add(halo, core);

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      group.userData.index = index;
      root.add(group);
    });

    let stars: THREE.Points | null = null;
    let starGeometry: THREE.BufferGeometry | null = null;
    let starMaterial: THREE.PointsMaterial | null = null;
    if (showParticles) {
      const count = 520;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      }
      starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      starMaterial = new THREE.PointsMaterial({ color: accent, size: 0.025, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending });
      stars = new THREE.Points(starGeometry, starMaterial);
      root.add(stars);
    }

    const state = { dragging: false, px: 0, py: 0, tx: 0, ty: 0, rx: -0.15, ry: 0 };

    const onPointerDown = (event: PointerEvent) => {
      state.dragging = true;
      state.px = event.clientX;
      state.py = event.clientY;
      container.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!state.dragging) return;
      event.preventDefault();
      const dx = event.clientX - state.px;
      const dy = event.clientY - state.py;
      state.ty += dx * 0.008;
      state.tx += dy * 0.006;
      state.px = event.clientX;
      state.py = event.clientY;
    };

    const onPointerUp = (event: PointerEvent) => {
      state.dragging = false;
      if (container.hasPointerCapture?.(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    let frame = 0;
    const start = performance.now();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = (performance.now() - start) / 1000;
      const speed = Math.max(speedRef.current, 0);

      state.rx += (state.tx - state.rx) * 0.06;
      state.ry += (state.ty - state.ry) * 0.06;
      root.rotation.x = state.rx + Math.sin(elapsed * 0.28) * 0.05;
      root.rotation.y = state.ry + elapsed * speed * 0.045;

      packets.forEach((packet, index) => {
        const curve = packet.mesh.userData.curve as THREE.CatmullRomCurve3;
        const t = (elapsed * (0.13 + speed * 0.08) + packet.offset + index * 0.03) % 1;
        packet.mesh.position.copy(curve.getPoint(t));
        packet.mesh.scale.setScalar(1 + Math.sin((elapsed + index) * 3) * 0.18);
      });

      if (stars) {
        stars.rotation.y = elapsed * 0.018;
        stars.rotation.x = elapsed * 0.01;
      }
      point.intensity = 2.5 + Math.sin(elapsed * 2.2) * 0.7;
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width || width;
      height = entry.contentRect.height || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      lineGeometries.forEach((geometry) => geometry.dispose());
      packetGeometry.dispose();
      nodeGeometry.dispose();
      haloGeometry.dispose();
      ringGeometry.dispose();
      lineMaterial.dispose();
      packetMaterial.dispose();
      nodeMaterial.dispose();
      haloMaterial.dispose();
      ringMaterial.dispose();
      starGeometry?.dispose();
      starMaterial?.dispose();
      renderer.dispose();
    };
  }, [activePreset, color, wireframe, showParticles]);

  const architecture = getArchitecturePreset(activePreset);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      role="img"
      aria-label={lang === "ar" ? "مخطط WebGL تفاعلي لمعاينة معمارية الأنظمة" : "Interactive WebGL architecture graph"}
      className="relative w-full h-full min-h-[360px] md:min-h-[420px] bg-slate-950/30 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 flex items-center justify-center shadow-inner touch-none select-none"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full block" />
      <div className="absolute top-3 left-3 font-mono text-[9px] text-orange-300/45 select-none pointer-events-none tracking-widest uppercase">
        WEBGL_GRAPH // LIVE
      </div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-orange-300/45 select-none pointer-events-none tracking-widest uppercase">
        SCENARIO // {architecture.shortLabel.en.toUpperCase()}
      </div>
      <div className="hidden md:block absolute bottom-3 left-3 font-mono text-[9px] text-orange-300/40 select-none pointer-events-none tracking-widest uppercase">
        PACKET_FLOW: ACTIVE
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-orange-300/40 select-none pointer-events-none tracking-widest uppercase">
        NODES:{architecture.nodes.length} / LINKS:{architecture.links.length}
      </div>
    </div>
  );
}

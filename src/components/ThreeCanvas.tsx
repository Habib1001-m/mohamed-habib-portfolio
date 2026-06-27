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
  offsetX?: number;
  offsetY?: number;
}

const statusScale: Record<string, number> = {
  active: 0.82,
  guarded: 0.76,
  blocked: 0.7,
  review: 0.78,
};

function toVector(x: number, y: number, index: number) {
  return new THREE.Vector3((x - 50) / 10, (50 - y) / 10, ((index % 3) - 1) * 0.26);
}

export default function ThreeCanvas({
  lang,
  color,
  wireframe,
  rotationSpeed,
  showParticles,
  activePreset,
  offsetX = 0,
  offsetY = 0,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(rotationSpeed);
  const offsetRef = useRef({ x: offsetX, y: offsetY });

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    offsetRef.current = { x: offsetX, y: offsetY };
  }, [offsetX, offsetY]);

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
    root.rotation.x = -0.1;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.34);
    scene.add(ambient);

    const point = new THREE.PointLight(accent, 2.7, 16);
    point.position.set(0, 0, 3);
    scene.add(point);

    const grid = new THREE.GridHelper(9.5, 18, accent, 0x1f2937);
    grid.position.y = -3.5;
    grid.material.opacity = wireframe ? 0.28 : 0.055;
    grid.material.transparent = true;
    root.add(grid);

    const nodePosition = new Map<string, THREE.Vector3>();
    architecture.nodes.forEach((node, index) => {
      nodePosition.set(node.id, toVector(node.x, node.y, index));
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: showParticles ? 0.42 : 0.16,
    });
    const packetMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.88 });
    const packetGeometry = new THREE.SphereGeometry(0.042, 14, 14);
    const packets: { mesh: THREE.Mesh; offset: number }[] = [];
    const lineGeometries: THREE.BufferGeometry[] = [];

    architecture.links.forEach((link, index) => {
      const from = nodePosition.get(link.from);
      const to = nodePosition.get(link.to);
      if (!from || !to) return;

      const curve = new THREE.CatmullRomCurve3([
        from,
        new THREE.Vector3((from.x + to.x) / 2, (from.y + to.y) / 2, Math.max(from.z, to.z) + 0.34),
        to,
      ]);
      const points = curve.getPoints(32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometries.push(geometry);
      const line = new THREE.Line(geometry, lineMaterial);
      root.add(line);

      if (showParticles) {
        const packet = new THREE.Mesh(packetGeometry, packetMaterial);
        packet.userData.curve = curve;
        packets.push({ mesh: packet, offset: index / Math.max(architecture.links.length, 1) });
        root.add(packet);
      }
    });

    const nodeGeometry = new THREE.SphereGeometry(0.105, 24, 24);
    const haloGeometry = new THREE.SphereGeometry(0.22, 24, 24);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: accent, wireframe });
    const haloMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: wireframe ? 0.055 : 0.085, depthWrite: false });
    const ringGeometry = new THREE.TorusGeometry(0.2, 0.005, 8, 42);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: wireframe ? 0.68 : 0.22 });

    architecture.nodes.forEach((node, index) => {
      const position = nodePosition.get(node.id);
      if (!position) return;

      const group = new THREE.Group();
      group.position.copy(position);
      const scale = statusScale[node.status] ?? 0.8;
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
      const count = 460;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      }
      starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      starMaterial = new THREE.PointsMaterial({ color: accent, size: 0.022, transparent: true, opacity: 0.58, blending: THREE.AdditiveBlending });
      stars = new THREE.Points(starGeometry, starMaterial);
      root.add(stars);
    }

    let frame = 0;
    const start = performance.now();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = (performance.now() - start) / 1000;
      const speed = Math.max(speedRef.current, 0);

      root.position.x += (offsetRef.current.x / 72 - root.position.x) * 0.1;
      root.position.y += (-offsetRef.current.y / 72 - root.position.y) * 0.1;
      root.rotation.x = -0.1;
      root.rotation.y = 0;

      packets.forEach((packet, index) => {
        const curve = packet.mesh.userData.curve as THREE.CatmullRomCurve3;
        const t = (elapsed * (0.13 + speed * 0.08) + packet.offset + index * 0.03) % 1;
        packet.mesh.position.copy(curve.getPoint(t));
        packet.mesh.scale.setScalar(1 + Math.sin((elapsed + index) * 3) * 0.12);
      });

      if (stars) {
        stars.rotation.y = elapsed * 0.012;
        stars.rotation.x = elapsed * 0.006;
      }
      point.intensity = 2.3 + Math.sin(elapsed * 2.2) * 0.45;
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
      className="relative w-full h-full min-h-[360px] md:min-h-[420px] bg-slate-950/30 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-inner select-none"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full block" />
      <div className="absolute top-3 left-3 font-mono text-[9px] text-orange-300/45 select-none pointer-events-none tracking-widest uppercase">
        WEBGL_GRAPH // LIVE
      </div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-orange-300/45 select-none pointer-events-none tracking-widest uppercase">
        SCENARIO // {architecture.shortLabel.en.toUpperCase()}
      </div>
      <div className="hidden md:block absolute bottom-3 left-3 font-mono text-[9px] text-orange-300/40 select-none pointer-events-none tracking-widest uppercase">
        DATA_FLOW: {showParticles ? "ON" : "OFF"}
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-orange-300/40 select-none pointer-events-none tracking-widest uppercase">
        NODES:{architecture.nodes.length} / LINKS:{architecture.links.length}
      </div>
    </div>
  );
}

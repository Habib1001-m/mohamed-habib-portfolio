"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getArchitecturePreset, STATUS_COLORS, LINK_TYPE_COLORS, type ArchitectureNode } from "@/data/architecturePresets";

interface ThreeCanvasProps {
  color: string;
  wireframe: boolean;
  rotationSpeed: number;
  showParticles: boolean;
  activePreset: string;
  focusedNodeId: string | null;
  reducedMotion?: boolean;
}

/** Detect mobile for performance scaling. */
function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

interface NodeMesh {
  group: THREE.Group;
  core: THREE.Mesh;
  halo: THREE.Sprite;
  ring: THREE.Mesh;
  node: ArchitectureNode;
  basePosition: THREE.Vector3;
}

const statusScale: Record<string, number> = {
  active: 0.85,
  guarded: 0.78,
  blocked: 0.7,
  review: 0.8,
};

function toVector(x: number, y: number, index: number) {
  return new THREE.Vector3((x - 50) / 10, (50 - y) / 10, ((index % 3) - 1) * 0.3);
}

/** Create a soft radial-gradient sprite texture for halos. */
function createHaloTexture(color: string): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, color + "cc");
  gradient.addColorStop(0.3, color + "55");
  gradient.addColorStop(1, color + "00");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ThreeCanvas({
  color,
  wireframe,
  rotationSpeed,
  showParticles,
  activePreset,
  focusedNodeId,
  reducedMotion = false,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(rotationSpeed);
  const reducedRef = useRef(reducedMotion);
  const focusedRef = useRef(focusedNodeId);
  const rotationRef = useRef({ x: -0.1, y: 0, autoYaw: 0, targetYaw: 0 });
  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => { speedRef.current = rotationSpeed; }, [rotationSpeed]);
  useEffect(() => { reducedRef.current = reducedMotion; }, [reducedMotion]);
  useEffect(() => { focusedRef.current = focusedNodeId; }, [focusedNodeId]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const architecture = getArchitecturePreset(activePreset);
    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth || 640;
    let height = container.clientHeight || 480;

    const accent = new THREE.Color(color || architecture.accent);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b0e, 0.05);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 10.5);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    const mobile = isMobile();
    // Cap pixel ratio lower on mobile for performance (GPU-bound)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));

    const root = new THREE.Group();
    scene.add(root);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const point = new THREE.PointLight(accent, 2.5, 18);
    point.position.set(0, 1, 4);
    scene.add(point);
    const rim = new THREE.DirectionalLight(0xffffff, 0.3);
    rim.position.set(-5, 3, -5);
    scene.add(rim);

    // Ground grid — subtle
    const grid = new THREE.GridHelper(11, 22, accent, 0x1f2937);
    grid.position.y = -3.8;
    grid.material.opacity = wireframe ? 0.3 : 0.04;
    grid.material.transparent = true;
    root.add(grid);

    // Node positions map
    const nodePosition = new Map<string, THREE.Vector3>();
    architecture.nodes.forEach((node, index) => {
      nodePosition.set(node.id, toVector(node.x, node.y, index));
    });

    // === Links as tube geometries ===
    const linkMeshes: THREE.Mesh[] = [];
    const linkCurves: { curve: THREE.CatmullRomCurve3; type: string; from: string; to: string }[] = [];
    const linkMaterials: THREE.Material[] = [];

    architecture.links.forEach((link) => {
      const from = nodePosition.get(link.from);
      const to = nodePosition.get(link.to);
      if (!from || !to) return;
      const mid = new THREE.Vector3(
        (from.x + to.x) / 2,
        (from.y + to.y) / 2,
        Math.max(from.z, to.z) + 0.45,
      );
      const curve = new THREE.CatmullRomCurve3([from, mid, to]);
      linkCurves.push({ curve, type: link.type, from: link.from, to: link.to });

      const linkColor = new THREE.Color(LINK_TYPE_COLORS[link.type] || "#f97316");
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.012, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: linkColor,
        transparent: true,
        opacity: showParticles ? 0.5 : 0.22,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      linkMeshes.push(tube);
      linkMaterials.push(tubeMat);
      root.add(tube);
    });

    // === Nodes: faceted icosahedron + sprite halo + ring ===
    const nodeMeshes: NodeMesh[] = [];
    const nodeMaterials: THREE.Material[] = [];
    const haloTextures: THREE.Texture[] = [];

    const coreGeo = new THREE.IcosahedronGeometry(0.12, 0);
    const ringGeo = new THREE.TorusGeometry(0.22, 0.006, 8, 48);

    architecture.nodes.forEach((node) => {
      const position = nodePosition.get(node.id);
      if (!position) return;
      const statusColor = STATUS_COLORS[node.status] || "#f97316";
      const sColor = new THREE.Color(statusColor);

      const group = new THREE.Group();
      group.position.copy(position);
      group.scale.setScalar(statusScale[node.status] ?? 0.8);

      // Faceted core
      const coreMat = new THREE.MeshStandardMaterial({
        color: sColor,
        emissive: sColor,
        emissiveIntensity: 0.6,
        flatShading: true,
        wireframe,
        roughness: 0.3,
        metalness: 0.5,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
      nodeMaterials.push(coreMat);

      // Sprite halo (always faces camera)
      const haloTex = createHaloTexture(statusColor);
      haloTextures.push(haloTex);
      const haloMat = new THREE.SpriteMaterial({
        map: haloTex,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const halo = new THREE.Sprite(haloMat);
      halo.scale.set(0.7, 0.7, 1);
      group.add(halo);
      nodeMaterials.push(haloMat);

      // Orbiting ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: sColor,
        transparent: true,
        opacity: wireframe ? 0.7 : 0.3,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      nodeMaterials.push(ringMat);

      root.add(group);
      nodeMeshes.push({ group, core, halo, ring, node, basePosition: position.clone() });
    });

    // === Data packets: sphere + trail ===
    const packets: { mesh: THREE.Mesh; trail: THREE.Points; curve: THREE.CatmullRomCurve3; offset: number; color: THREE.Color }[] = [];
    const packetGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const packetMaterials: THREE.Material[] = [];
    const trailGeometries: THREE.BufferGeometry[] = [];

    if (showParticles && !reducedMotion) {
      linkCurves.forEach((lc, index) => {
        const pColor = new THREE.Color(LINK_TYPE_COLORS[lc.type as keyof typeof LINK_TYPE_COLORS] || "#f97316");
        const pMat = new THREE.MeshBasicMaterial({ color: pColor, transparent: true, opacity: 0.95 });
        const packet = new THREE.Mesh(packetGeo, pMat);
        packetMaterials.push(pMat);

        // Trail (10 points behind the packet) — each trail gets its own BufferGeometry
        const trailPositions = new Float32Array(10 * 3);
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
        trailGeometries.push(trailGeo);
        const trailMat = new THREE.PointsMaterial({
          color: pColor,
          size: 0.05,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const trail = new THREE.Points(trailGeo, trailMat);
        packetMaterials.push(trailMat);

        packets.push({
          mesh: packet,
          trail,
          curve: lc.curve,
          offset: index / Math.max(linkCurves.length, 1),
          color: pColor,
        });
        root.add(packet, trail);
      });
    }

    // === Ambient star field (reduced on mobile for performance) ===
    let stars: THREE.Points | null = null;
    let starGeo: THREE.BufferGeometry | null = null;
    let starMat: THREE.PointsMaterial | null = null;
    if (showParticles && !reducedMotion) {
      const count = mobile ? 120 : 320;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      starMat = new THREE.PointsMaterial({
        color: accent,
        size: 0.018,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      stars = new THREE.Points(starGeo, starMat);
      root.add(stars);
    }

    // === Pointer drag for camera orbit ===
    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      rotationRef.current.targetYaw += dx * 0.005;
      rotationRef.current.targetYaw = Math.max(-0.8, Math.min(0.8, rotationRef.current.targetYaw));
      rotationRef.current.x += dy * 0.003;
      rotationRef.current.x = Math.max(-0.4, Math.min(0.2, rotationRef.current.x));
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => { draggingRef.current = false; };
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let frame = 0;
    const start = performance.now();
    let idleTime = 0;

    const renderStatic = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = (performance.now() - start) / 1000;
      const speed = Math.max(speedRef.current, 0);
      const dt = 1 / 60;

      // Auto-orbit when idle (no drag for 2s) — disabled on mobile for battery/perf
      if (!draggingRef.current && !mobile) {
        idleTime += dt;
        if (idleTime > 2) {
          rotationRef.current.targetYaw = Math.sin(elapsed * 0.15) * 0.3;
        }
      } else {
        idleTime = 0;
      }

      // Smooth camera yaw
      rotationRef.current.autoYaw += (rotationRef.current.targetYaw - rotationRef.current.autoYaw) * 0.06;
      root.rotation.y = rotationRef.current.autoYaw;
      root.rotation.x += (rotationRef.current.x - root.rotation.x) * 0.08;

      // Animate packets + trails (throttle trail updates on mobile)
      packets.forEach((packet, index) => {
        const t = (elapsed * (0.13 + speed * 0.08) + packet.offset + index * 0.03) % 1;
        const pos = packet.curve.getPoint(t);
        packet.mesh.position.copy(pos);
        packet.mesh.scale.setScalar(1 + Math.sin((elapsed + index) * 3) * 0.15);

        // Trail: 10 points behind (update every frame on desktop, every 2nd on mobile)
        if (!mobile || frame % 2 === 0) {
          const trailPositions = packet.trail.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < 10; i++) {
            const tt = (t - i * 0.015 + 1) % 1;
            const p = packet.curve.getPoint(tt);
            trailPositions[i * 3] = p.x;
            trailPositions[i * 3 + 1] = p.y;
            trailPositions[i * 3 + 2] = p.z;
          }
          packet.trail.geometry.attributes.position.needsUpdate = true;
        }
        (packet.trail.material as THREE.PointsMaterial).opacity = 0.4 * (1 - t * 0.3);
      });

      // Node pulse + ring rotation (simplified on mobile — skip per-frame pulse)
      nodeMeshes.forEach((nm, i) => {
        const isFocused = focusedRef.current === nm.node.id;
        if (!mobile) {
          const pulse = 1 + Math.sin(elapsed * 1.5 + i) * 0.04;
          nm.group.scale.setScalar((statusScale[nm.node.status] ?? 0.8) * pulse * (isFocused ? 1.3 : 1));
          nm.ring.rotation.z = elapsed * 0.3 + i;
          nm.core.rotation.y = elapsed * 0.2 + i;
          nm.core.rotation.x = elapsed * 0.15;
          (nm.halo.material as THREE.SpriteMaterial).opacity = isFocused ? 0.95 : 0.6 + Math.sin(elapsed * 2 + i) * 0.1;
        } else {
          // Mobile: static scale (no per-frame pulse), only apply focus
          nm.group.scale.setScalar((statusScale[nm.node.status] ?? 0.8) * (isFocused ? 1.3 : 1));
          (nm.halo.material as THREE.SpriteMaterial).opacity = isFocused ? 0.95 : 0.6;
        }
      });

      if (stars) {
        stars.rotation.y = elapsed * 0.01;
      }
      point.intensity = 2.3 + Math.sin(elapsed * 2.2) * 0.4;

      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      renderStatic();
    } else {
      animate();
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width || width;
      height = entry.contentRect.height || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (reducedRef.current) renderStatic();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      // Dispose everything
      linkMeshes.forEach((m) => m.geometry.dispose());
      linkMaterials.forEach((m) => m.dispose());
      nodeMeshes.forEach((nm) => {
        nm.core.geometry.dispose();
        (nm.core.material as THREE.Material).dispose();
        (nm.halo.material as THREE.Material).dispose();
        nm.ring.geometry.dispose();
        (nm.ring.material as THREE.Material).dispose();
      });
      packets.forEach((p) => {
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
        p.trail.geometry.dispose();
        (p.trail.material as THREE.Material).dispose();
      });
      trailGeometries.forEach((g) => g.dispose());
      packetGeo.dispose();
      coreGeo.dispose();
      ringGeo.dispose();
      haloTextures.forEach((t) => t.dispose());
      starGeo?.dispose();
      starMat?.dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      nodeMaterials.forEach((m) => m.dispose());
      packetMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [activePreset, color, wireframe, showParticles, reducedMotion]);

  const architecture = getArchitecturePreset(activePreset);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive WebGL architecture graph"
      className="relative h-[300px] w-full overflow-hidden rounded-[var(--r-2xl)] border border-hairline bg-[#0a0b0e] sm:h-[420px]"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full cursor-grab active:cursor-grabbing" />
      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] uppercase tracking-widest text-[var(--accent-soft)] opacity-50">
        WEBGL_GRAPH // LIVE
      </div>
      <div className="pointer-events-none absolute right-3 top-3 font-mono text-[9px] uppercase tracking-widest text-[var(--accent-soft)] opacity-50">
        {architecture.shortLabel.en.toUpperCase()}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest text-[var(--accent-soft)] opacity-40">
        DRAG TO ORBIT
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest text-[var(--accent-soft)] opacity-40">
        N:{architecture.nodes.length} / L:{architecture.links.length}
      </div>
    </div>
  );
}

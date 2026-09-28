import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroThreeAC({
  temperature = 24,
  isCooling = true,
  fanSpeed = 'turbo', // eco, normal, turbo
  swing = true,
  onTempChange
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const acGroupRef = useRef(null);
  const flapRef = useRef(null);
  const particlesRef = useRef(null);
  const ledTextTextureRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update dynamic LED texture on temperature change
  const createLedTexture = (temp) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 256, 128);

    // Glowing digit
    ctx.font = 'bold 72px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38BDF8';
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 18;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${temp}°C`, 128, 64);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    const width = containerRef.current.clientWidth || 600;
    const height = containerRef.current.clientHeight || 450;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);
    cameraRef.current = camera;

    // RENDERER (Optimized)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    containerRef.current.replaceChildren(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const blueRimLight = new THREE.PointLight(0x38bdf8, 4.0, 10);
    blueRimLight.position.set(-3, -1, 2);
    scene.add(blueRimLight);

    const softFillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    softFillLight.position.set(0, -3, 3);
    scene.add(softFillLight);

    // AC UNIT MODEL GROUP
    const acGroup = new THREE.Group();
    acGroupRef.current = acGroup;

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.05,
    });

    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.85,
      roughness: 0.2,
    });

    const ventMeshMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.2,
    });

    // 1. Main AC Body
    const bodyGeo = new THREE.BoxGeometry(3.6, 1.1, 0.9);
    const bodyMesh = new THREE.Mesh(bodyGeo, chassisMat);
    acGroup.add(bodyMesh);

    // 2. Front Floating Fascia Plate
    const frontPlateGeo = new THREE.BoxGeometry(3.56, 0.95, 0.06);
    const frontPlate = new THREE.Mesh(frontPlateGeo, chassisMat);
    frontPlate.position.set(0, 0.04, 0.48);
    acGroup.add(frontPlate);

    // 3. Bottom Air Vent Recess
    const ventRecessGeo = new THREE.BoxGeometry(3.2, 0.2, 0.4);
    const ventRecess = new THREE.Mesh(ventRecessGeo, ventMeshMat);
    ventRecess.position.set(0, -0.42, 0.22);
    acGroup.add(ventRecess);

    // 4. Moving Airflow Louver / Flap
    const flapGeo = new THREE.BoxGeometry(3.18, 0.06, 0.3);
    const flapMesh = new THREE.Mesh(flapGeo, silverMat);
    flapMesh.position.set(0, -0.42, 0.4);
    flapMesh.rotation.x = 0.35;
    flapRef.current = flapMesh;
    acGroup.add(flapMesh);

    // 5. Digital Display Screen on Front Plate
    const ledTexture = createLedTexture(temperature);
    ledTextTextureRef.current = ledTexture;
    const displayGeo = new THREE.PlaneGeometry(0.55, 0.28);
    const displayMat = new THREE.MeshBasicMaterial({
      map: ledTexture,
      transparent: true,
      opacity: 0.95,
    });
    const displayMesh = new THREE.Mesh(displayGeo, displayMat);
    displayMesh.position.set(1.15, 0.05, 0.515);
    acGroup.add(displayMesh);

    // 6. Silver Chrome Accent Strip
    const trimGeo = new THREE.BoxGeometry(3.58, 0.03, 0.05);
    const trimMesh = new THREE.Mesh(trimGeo, silverMat);
    trimMesh.position.set(0, -0.32, 0.5);
    acGroup.add(trimMesh);

    // 7. Minimalist Brand Logo Badge
    const badgeGeo = new THREE.PlaneGeometry(0.35, 0.08);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.2,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-1.25, 0.3, 0.512);
    acGroup.add(badgeMesh);

    // Position the whole AC
    acGroup.position.set(0, 0.5, 0);
    scene.add(acGroup);

    // HIGH PERFORMANCE PARTICLES (Optimized to 220 with rich glow texture)
    const particleCount = 220;
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 3.0;
      const y = -0.42 + (Math.random() - 0.5) * 0.15 + 0.5;
      const z = 0.45 + Math.random() * 0.3;

      pPositions[i * 3] = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;

      pVelocities.push({
        vx: (Math.random() - 0.5) * 0.012,
        vy: -(0.015 + Math.random() * 0.025),
        vz: 0.025 + Math.random() * 0.045,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Canvas Glow Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.9)');
    grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.4)');
    grad.addColorStop(1, 'rgba(37, 99, 235, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      map: particleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x38bdf8,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = { system: particleSystem, velocities: pVelocities, geo: particleGeo, mat: particleMat };
    scene.add(particleSystem);

    // Floating Ice Crystals (Optimized to 8)
    const crystalsGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(0.06, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });

    const crystalMeshes = [];
    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(crystalGeo, crystalMat);
      mesh.position.set(
        (Math.random() - 0.5) * 4.0,
        (Math.random() - 0.5) * 2.0 - 0.3,
        Math.random() * 2.0 + 0.5
      );
      mesh.scale.setScalar(0.7 + Math.random() * 0.6);
      crystalsGroup.add(mesh);
      crystalMeshes.push({
        mesh,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        baseY: mesh.position.y,
        offset: Math.random() * Math.PI * 2,
      });
    }
    scene.add(crystalsGroup);

    // Mouse tilt handler
    const handleMouseMove = (e) => {
      if (!isVisible) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x * 0.3;
      mousePos.current.targetY = y * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // ANIMATION LOOP (Only runs when in viewport)
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      if (!isVisible) return; // Skip rendering when out of viewport

      const elapsedTime = clock.getElapsedTime();

      // Mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Float and tilt
      if (acGroupRef.current) {
        acGroupRef.current.position.y = 0.5 + Math.sin(elapsedTime * 1.4) * 0.05;
        acGroupRef.current.rotation.y = mousePos.current.x * 0.3 + Math.sin(elapsedTime * 0.8) * 0.015;
        acGroupRef.current.rotation.x = -mousePos.current.y * 0.2 + 0.03;
      }

      // Airflow flap oscillation
      if (flapRef.current && isCooling) {
        flapRef.current.rotation.x = 0.35 + Math.sin(elapsedTime * 2.2) * 0.12;
      }

      // Update particles
      if (particlesRef.current && isCooling) {
        const { velocities, geo } = particlesRef.current;
        const posAttr = geo.attributes.position;
        const positions = posAttr.array;
        const speedMultiplier = fanSpeed === 'turbo' ? 1.4 : fanSpeed === 'normal' ? 1.0 : 0.7;

        for (let i = 0; i < particleCount; i++) {
          const v = velocities[i];
          const idx = i * 3;

          positions[idx] += v.vx * speedMultiplier;
          positions[idx + 1] += v.vy * speedMultiplier;
          positions[idx + 2] += v.vz * speedMultiplier;

          if (positions[idx + 2] > 3.6 || positions[idx + 1] < -2.0) {
            positions[idx] = (Math.random() - 0.5) * 3.0;
            positions[idx + 1] = -0.42 + 0.5 + (Math.random() - 0.5) * 0.08;
            positions[idx + 2] = 0.48 + Math.random() * 0.1;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Animate crystals
      crystalMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed;
        item.mesh.rotation.y += item.rotSpeed;
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * 1.6 + item.offset) * 0.08;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update dynamic LED display when temp changes
  useEffect(() => {
    if (!acGroupRef.current) return;
    const displayMesh = acGroupRef.current.children.find(
      (c) => c.geometry && c.geometry.type === 'PlaneGeometry' && c.material?.map
    );
    if (displayMesh && displayMesh.material) {
      const newTexture = createLedTexture(temperature);
      displayMesh.material.map = newTexture;
      displayMesh.material.needsUpdate = true;
    }

    // Color gradient for particles based on temperature
    if (particlesRef.current?.mat) {
      if (temperature <= 18) {
        particlesRef.current.mat.color.setHex(0x0284c7); // deep ice cyan
      } else if (temperature <= 24) {
        particlesRef.current.mat.color.setHex(0x38bdf8); // sky ice blue
      } else {
        particlesRef.current.mat.color.setHex(0x67e8f9); // soft cool cyan
      }
    }
  }, [temperature]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center select-none">
      {/* 3D Canvas Host */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Decorative radial lighting halo */}
      <div className="absolute inset-0 pointer-events-none bg-radial-glow opacity-75" />
    </div>
  );
}

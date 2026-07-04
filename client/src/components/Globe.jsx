import { useEffect, useRef } from 'react';

// Simplified continent checker to simulate world map dots
function isLand(lat, lon) {
  const l = lat;
  const g = lon;

  // North America
  if (l > 15 && l < 70 && g > -160 && g < -50) {
    if (l > 50) return true;
    if (g < -75 && l > 25) return true;
    return g < -90;
  }
  // South America
  if (l > -55 && l <= 15 && g > -85 && g < -35) {
    return g < -40 || l > 0;
  }
  // Africa
  if (l > -35 && l < 35 && g > -20 && g < 50) {
    if (l < 10) return g > 10;
    return g < 40;
  }
  // Eurasia
  if (l >= 10 && l < 75 && g >= -10 && g < 180) {
    if (l > 60) return true;
    if (g > 30 && l > 30) return true;
    if (g > 60) return true;
    return l > 40 && g < 120;
  }
  // Australia
  if (l > -40 && l < -10 && g > 110 && g < 155) {
    return true;
  }
  // Greenland / Northern islands
  if (l > 60 && g > -70 && g < -10) return true;

  return false;
}

export function Globe() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, isDown: false });
  const rotationRef = useRef({ x: 0, y: 0 }); // angles in radians
  const targetRotationRef = useRef({ x: 0.5, y: 0.5 });
  const velocityRef = useRef({ x: 0.002, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = canvas.width;
    let height = canvas.height;

    // Generate globe dots once
    const dots = [];
    const radius = 160;

    // Distribute points evenly using Fibonacci sphere or standard grid
    const totalPoints = 900;
    for (let i = 0; i < totalPoints; i++) {
      // Golden spiral distribution
      const theta = Math.acos(1 - (2 * i) / totalPoints);
      const phi = Math.sqrt(totalPoints * Math.PI) * theta;

      // Extract latitude / longitude in degrees
      const lat = 90 - (theta * 180) / Math.PI;
      const lon = ((phi * 180) / Math.PI) % 360 - 180;

      const isLandPoint = isLand(lat, lon);

      // Cartesians coordinate of the point
      const cosLat = Math.cos(theta - Math.PI / 2);
      const sinLat = Math.sin(theta - Math.PI / 2);
      const cosLon = Math.cos(phi);
      const sinLon = Math.sin(phi);

      const x = radius * cosLat * cosLon;
      const y = radius * sinLat;
      const z = radius * cosLat * sinLon;

      dots.push({ x, y, z, isLand: isLandPoint });
    }

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      width = rect.width;
      height = rect.height;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Inertial rotation or drag response
      if (!pointerRef.current.isDown) {
        // Slow auto-rotate
        targetRotationRef.current.x += velocityRef.current.x;
        targetRotationRef.current.y += velocityRef.current.y;
        // Friction / slowdown
        velocityRef.current.x *= 0.98;
        velocityRef.current.y *= 0.98;
        // Constant minimum speed
        if (Math.abs(velocityRef.current.x) < 0.001) velocityRef.current.x = 0.001;
      }

      // Smooth interpolation to target rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const cx = width / 2;
      const cy = height / 2;

      // Draw glowing sphere background
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.2);
      glowGrad.addColorStop(0, 'rgba(110, 231, 249, 0.01)');
      glowGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Render dots
      const projectedDots = [];

      for (const dot of dots) {
        // Rotate around Y axis (longitude)
        let x1 = dot.x * cosX - dot.z * sinX;
        let z1 = dot.x * sinX + dot.z * cosX;

        // Rotate around X axis (latitude)
        let y2 = dot.y * cosY - z1 * sinY;
        let z2 = dot.y * sinY + z1 * cosY;

        // Perspective or Orthographic projection
        // If z2 > 0, it's on the front hemisphere
        if (z2 > -50) {
          projectedDots.push({
            px: cx + x1,
            py: cy + y2,
            pz: z2,
            isLand: dot.isLand,
          });
        }
      }

      // Sort by depth so backmost render first
      projectedDots.sort((a, b) => a.pz - b.pz);

      for (const dot of projectedDots) {
        const size = Math.max(1, ((dot.pz + radius) / (2 * radius)) * 2.8);
        const alpha = Math.max(0.08, ((dot.pz + radius) / (2 * radius)));

        // Different style for land vs ocean coordinates
        if (dot.isLand) {
          ctx.fillStyle = `rgba(110, 231, 249, ${alpha * 0.9})`; // Cyan
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.25})`; // Purple
        }

        ctx.beginPath();
        ctx.arc(dot.px, dot.py, dot.isLand ? size * 1.2 : size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle hover/glow aura to land dots on front surface
        if (dot.isLand && dot.pz > 80 && Math.random() > 0.995) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#6EE7F9';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(dot.px, dot.py, size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse/Touch Drag Handlers
    const onMouseDown = (e) => {
      pointerRef.current.isDown = true;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!pointerRef.current.isDown) return;
      const dx = e.clientX - pointerRef.current.x;
      const dy = e.clientY - pointerRef.current.y;

      targetRotationRef.current.x += dx * 0.005;
      targetRotationRef.current.y -= dy * 0.005;

      // Restrict latitude to avoid flip-over
      targetRotationRef.current.y = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationRef.current.y));

      velocityRef.current.x = dx * 0.005;
      velocityRef.current.y = -dy * 0.005;

      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };

    const onMouseUp = () => {
      pointerRef.current.isDown = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 0) return;
      pointerRef.current.isDown = true;
      pointerRef.current.x = e.touches[0].clientX;
      pointerRef.current.y = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!pointerRef.current.isDown || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - pointerRef.current.x;
      const dy = e.touches[0].clientY - pointerRef.current.y;

      targetRotationRef.current.x += dx * 0.008;
      targetRotationRef.current.y -= dy * 0.008;

      pointerRef.current.x = e.touches[0].clientX;
      pointerRef.current.y = e.touches[0].clientY;
    };

    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (canvas) {
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('touchstart', onTouchStart);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('touchend', onMouseUp);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <canvas
        ref={canvasRef}
        className="w-[380px] h-[380px] rounded-full outline-none"
      />
      {/* Decorative radial gradients inside the canvas bounding box */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#09090b]/10 to-[#09090b] pointer-events-none rounded-full" />
    </div>
  );
}

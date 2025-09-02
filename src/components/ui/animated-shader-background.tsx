
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for better performance
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance'
    });
    
    // Set pixel ratio for better mobile support
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 2 : 3));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Reduce complexity on mobile devices
    const numOctaves = isMobile ? 2 : 3;
    const maxIterations = isMobile ? 25 : 35;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMobile: { value: isMobile ? 1.0 : 0.0 }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform float iMobile;

        #define NUM_OCTAVES ${numOctaves}

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = iMobile > 0.5 ? 0.4 : 0.3; // Slightly more visible on mobile
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          // Reduce shake on mobile for smoother experience
          float shakeIntensity = iMobile > 0.5 ? 0.002 : 0.005;
          vec2 shake = vec2(sin(iTime * 1.2) * shakeIntensity, cos(iTime * 2.1) * shakeIntensity);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;
          float maxIter = iMobile > 0.5 ? ${maxIterations.toFixed(1)} : 35.0;

          for (float i = 0.0; i < maxIter; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / maxIter));
            
            // Enhanced colors for mobile visibility
            float mobileBoost = iMobile > 0.5 ? 1.3 : 1.0;
            vec4 auroraColors = vec4(
              0.0 + 0.4 * sin(i * 0.2 + iTime * 0.4),
              0.5 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.8 + 0.2 * sin(i * 0.4 + iTime * 0.3),
              0.8
            ) * mobileBoost;
            
            vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / maxIter) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 80.0, vec4(1.4)));
          // Slightly brighter output for mobile
          float finalBoost = iMobile > 0.5 ? 2.1 : 1.8;
          gl_FragColor = o * finalBoost;
        }
      `,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        material.uniforms.iTime.value += 0.016;
        renderer.render(scene, camera);
        lastTime = currentTime;
      }
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 2 : 3));
      material.uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'screen',
        // Ensure visibility on mobile with explicit styling
        opacity: 1,
        visibility: 'visible'
      }}
    />
  );
};

export default AnimatedShaderBackground;

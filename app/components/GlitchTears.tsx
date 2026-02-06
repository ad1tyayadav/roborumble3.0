"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

// Vertex Shader: Displaces vertices backward (negative Z) based on noise
const vertexShader = `
  varying vec2 vUv;
  varying float vNoise;
  uniform float uTime;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    
    // Generate noise for displacement
    float noiseVal = snoise(uv * 3.0 + vec2(0, uTime * 0.5));
    vNoise = noiseVal;
    
    vec3 pos = position;
    
    // Tear effect: If noise is below threshold, push backward
    // We smoothstep to create a "dip" or tear shape
    float tear = smoothstep(0.2, 0.5, noiseVal); 
    
    // Displace backward (negative Z)
    // Deeper tears for stronger effect
    pos.z -= tear * 2.0; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment Shader: Renders the tear with low contrast and transparency
const fragmentShader = `
  varying vec2 vUv;
  varying float vNoise;
  uniform float uTime;

  void main() {
    // Threshold for the "hole" of the tear
    // We want organic, smooth boundaries, so we use the interpolated varying noise
    
    float alpha = 0.0;
    vec3 color = vec3(0.0);
    
    // Define the tear area
    // If noise is high enough, it's a tear
    float tearIntensity = smoothstep(0.3, 0.6, vNoise);
    
    if (tearIntensity > 0.01) {
       // Low contrast, dark, slightly bluish/purple for neon vibe but subtle
       color = mix(vec3(0.1, 0.05, 0.2), vec3(0.0, 0.0, 0.0), tearIntensity);
       alpha = tearIntensity * 0.8; // Semi-transparent
    }
    
    // Add some random static/glitch lines inside the tear
    float staticNoise = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
    if (tearIntensity > 0.5 && staticNoise > 0.9) {
        color += vec3(0.2); // Subtle static
    }

    gl_FragColor = vec4(color, alpha);
  }
`;

const TearingPlane = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current && mesh.current.material) {
        const material = mesh.current.material as THREE.ShaderMaterial;
        if (material.uniforms && material.uniforms.uTime) {
             material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    }
  });

  return (
    <Plane args={[viewport.width, viewport.height, 64, 64]} ref={mesh}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </Plane>
  );
};

export const GlitchTears = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <TearingPlane />
      </Canvas>
    </div>
  );
};

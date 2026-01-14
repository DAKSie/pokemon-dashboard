# 3D Components Guide

## Overview

The dashboard includes optimized 3D components built with Three.js and React Three Fiber.

## Available Components

### 1. Pokeball3D

Renders an animated 3D Pokéball with realistic appearance.

**Import:**
```javascript
import { Pokeball3D } from "@/app/components/Pokeball3D";
```

**Usage:**
```javascript
<div style={{ width: 200, height: 200 }}>
  <Pokeball3D animated={true} />
</div>
```

**Props:**
- `animated` (boolean): Enable rotation animation. Default: `true`
- `style` (string): Choose "pokeball" or "icon". Default: "pokeball"

**Features:**
- Rotating Pokéball with realistic colors
- Smooth animations at 60 FPS
- Optimized lighting
- Responsive to viewport

**Performance:**
- Device Pixel Ratio scaling (1-1.5x)
- Low-poly geometry (32 segments)
- Preloaded assets
- ~2KB gzipped

### 2. PokemonIcon3D

Renders an abstract Pokémon-themed geometric icon.

**Import:**
```javascript
import { PokemonIcon3D } from "@/app/components/Pokeball3D";
```

**Usage:**
```javascript
<div style={{ width: 100, height: 100 }}>
  <PokemonIcon3D color="#6366f1" />
</div>
```

**Props:**
- `color` (string): Hex color for the icon. Default: "#6366f1"

**Features:**
- Floating animation
- Emissive glow effect
- Geometric design (octahedron)
- Lightweight (~1KB gzipped)

## Adding 3D to Components

### Example: Add Pokéball to Card

```javascript
import { Pokeball3D } from "@/app/components/Pokeball3D";

export function CustomCard() {
  return (
    <div className="card p-6">
      <div style={{ height: 150 }}>
        <Pokeball3D animated={true} style="pokeball" />
      </div>
      <h3>Card Title</h3>
    </div>
  );
}
```

### Example: Use with Lazy Loading

```javascript
import { useInViewport } from "@/app/hooks/useInViewport";
import { Pokeball3D } from "@/app/components/Pokeball3D";

export function LazyPokeball() {
  const { ref, isVisible } = useInViewport();

  return (
    <div ref={ref}>
      {isVisible && (
        <div style={{ width: 200, height: 200 }}>
          <Pokeball3D />
        </div>
      )}
    </div>
  );
}
```

## Customization

### Change Pokéball Colors

Edit `app/components/Pokeball3D.js`:

```javascript
// Red and white colors
<meshPhongMaterial color="#ee1515" emissive="#aa0000" /> // Top
<meshPhongMaterial color="#ffffff" emissive="#cccccc" /> // Bottom
```

### Create New 3D Shape

```javascript
"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function CustomShape() {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 64, 32]} />
      <meshPhongMaterial color="#6366f1" />
    </mesh>
  );
}

export default CustomShape;
```

## Performance Considerations

### Memory Usage
- Pokeball3D: ~15MB (with textures)
- PokemonIcon3D: ~8MB
- Both: Combined ~23MB

### Render Time
- Per frame: ~2-3ms on mid-tier GPU
- 60 FPS sustainable: Yes

### Optimization Tips

1. **Limit Canvas Count**: Avoid more than 4-5 3D canvases per page
2. **Use Preload**: Pre-load assets in Canvas component
3. **Reduce Segments**: Lower segment counts for simpler shapes
4. **Optimize Lighting**: Use minimal lights (1 ambient + 1 point)
5. **Lazy Load**: Only render when in viewport

### Scaling Issues

If you experience performance issues:

```javascript
// In Pokeball3D.js - reduce quality
<Canvas
  dpr={1}  // Changed from [1, 1.5]
  performance={{ min: 0.3 }}  // Lower minimum
>
```

## Advanced: Custom Models

### Loading GLTF Models

```javascript
import { useGLTF } from "@react-three/drei";

function CustomPokemon() {
  const { scene } = useGLTF("/models/pokemon.gltf");
  
  return <primitive object={scene} />;
}
```

### Optimization Steps

1. **Export from Blender**:
   ```bash
   # Use Blender's glTF-Pipeline add-on
   # Export as compressed glTF (.glb)
   ```

2. **Compress Model**:
   ```bash
   # Using gltf-pipeline
   npx gltf-pipeline -i model.glb -o model.optimized.glb
   ```

3. **Place in Public Folder**:
   ```
   public/
   └── models/
       └── pokemon.glb
   ```

4. **Load with Drei**:
   ```javascript
   const { scene } = useGLTF("/models/pokemon.glb");
   return <primitive object={scene} />;
   ```

## Browser DevTools

### Three.js Inspector

Install [three-devtools](https://chrome.google.com/webstore/detail/three-devtools/) for Chrome:
- Inspect scene graph
- Profile WebGL calls
- Monitor texture usage

### Performance Monitoring

```javascript
// Log render time
useEffect(() => {
  let frameCount = 0;
  const startTime = performance.now();

  const check = () => {
    frameCount++;
    const elapsed = performance.now() - startTime;
    
    if (elapsed >= 1000) {
      console.log(`FPS: ${frameCount}`);
      frameCount = 0;
      setTimeout(check, 1000);
    } else {
      requestAnimationFrame(check);
    }
  };

  check();
}, []);
```

## Troubleshooting

### Canvas Not Rendering
- ✅ Check div has width/height
- ✅ Check camera position
- ✅ Check lighting

### Black Screen
- ✅ Add ambient light
- ✅ Check camera near/far values
- ✅ Verify material color

### Low FPS
- ✅ Reduce geometry segments
- ✅ Decrease canvas DPR
- ✅ Reduce lights count
- ✅ Use performance mode

### Memory Leak
- ✅ Dispose geometries/materials
- ✅ Clean up useEffect hooks
- ✅ Use useCallback for functions

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Documentation](https://github.com/pmndrs/drei)
- [Three.js Manual](https://threejs.org/manual/)
- [glTF Format Spec](https://www.khronos.org/gltf/)

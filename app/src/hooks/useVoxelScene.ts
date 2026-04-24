import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useVoxelScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const sceneRef = useRef<{
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.InstancedMesh;
    scene: THREE.Scene;
    originalY: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 100;
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.InstancedMesh(geometry, material, 1000);
    scene.add(mesh);

    const dummy = new THREE.Object3D();
    const colors: THREE.Color[] = [];

    for (let i = 0; i < 1000; i++) {
      dummy.position.x = Math.random() * 100 - 50;
      dummy.position.y = Math.random() * 100 - 50;
      dummy.position.z = Math.random() * 100 - 50;
      dummy.rotation.x = Math.random() * 2 * Math.PI;
      dummy.rotation.y = Math.random() * 2 * Math.PI;
      dummy.rotation.z = Math.random() * 2 * Math.PI;
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const t = (dummy.position.z + 50) / 100;
      const color = new THREE.Color();
      color.r = 0.8 + t * 0.2;
      color.g = 0.1 + (1 - t) * 0.3;
      color.b = 0.2 + t * 0.6;
      colors.push(color);
    }

    mesh.userData.originalColors = colors;
    mesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(1000 * 3),
      3
    );
    for (let i = 0; i < 1000; i++) {
      mesh.instanceColor.setXYZ(i, colors[i].r, colors[i].g, colors[i].b);
    }
    mesh.instanceColor.needsUpdate = true;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2);
    };
    document.addEventListener('mousemove', onMouseMove);

    const originalY = camera.position.y;

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const easedProgress = gsap.parseEase('power2.inOut')(self.progress);
        camera.position.y = 50 - (easedProgress * 100);
      },
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const colorDummy = new THREE.Color();

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(mesh, false);

      if (intersects.length > 0) {
        const instanceId = intersects[0].instanceId!;
        const origColors: THREE.Color[] = mesh.userData.originalColors;

        for (let i = 0; i < 1000; i++) {
          if (mesh.instanceColor) {
            mesh.instanceColor.setXYZ(i, origColors[i].r, origColors[i].g, origColors[i].b);
          }
        }

        colorDummy.set(origColors[instanceId]);
        colorDummy.r *= 1.5;
        colorDummy.g *= 1.5;
        colorDummy.b *= 1.5;

        if (mesh.instanceColor) {
          mesh.instanceColor.setXYZ(instanceId, colorDummy.r, colorDummy.g, colorDummy.b);
          mesh.instanceColor.needsUpdate = true;
        }
      } else {
        const origColors: THREE.Color[] = mesh.userData.originalColors;
        for (let i = 0; i < 1000; i++) {
          if (mesh.instanceColor) {
            mesh.instanceColor.setXYZ(i, origColors[i].r, origColors[i].g, origColors[i].b);
          }
        }
        if (mesh.instanceColor) {
          mesh.instanceColor.needsUpdate = true;
        }
      }
    };
    document.addEventListener('pointermove', onPointerMove);

    gsap.ticker.add(() => {
      camera.position.x = 50 + (mouseX * 0.01);
      camera.position.z = 50 + (mouseY * 0.005);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    });

    const onResize = () => {
      const newAspect = window.innerWidth / window.innerHeight;
      camera.left = -frustumSize * newAspect / 2;
      camera.right = frustumSize * newAspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    sceneRef.current = { camera, renderer, mesh, scene, originalY };

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      scrollTrigger.kill();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [canvasRef]);

  return sceneRef;
}

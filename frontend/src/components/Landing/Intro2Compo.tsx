import { useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { theme } from "@/styles/theme";

export default function Intro2Compo({size} : {size: React.MutableRefObject<HTMLDivElement>}) {
  useEffect(() => {
    let scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(`${theme.colors.container}`);
    // scene.background.setAlpha(0);
    camera = new THREE.PerspectiveCamera(
      75,
      size.current.clientWidth / size.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.current.clientWidth,size.current.clientHeight);
    document.getElementById("container2").appendChild(renderer.domElement);

    let geometry, material, mesh;
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: `${theme.colors.secondary}` });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <Container id="container2"></Container>;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  `
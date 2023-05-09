import * as THREE from "three";
import { useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Intro1Compo({size} : {size: React.MutableRefObject<HTMLDivElement>}) {
  useEffect(() => {
    const loader = new GLTFLoader();

    // camera
    const camera = new THREE.PerspectiveCamera(
      70,
      size.current.clientWidth / size.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 100;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(`${theme.colors.container}`);
    // scene.background.setAlpha(0);

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.current.clientWidth,size.current.clientHeight);
    document.getElementById("container").appendChild(renderer.domElement);

    // set mesh
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: `${theme.colors.primary}` });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <Container id="container"></Container>;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  `
import * as THREE from "three";
import { useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GlbFile from "@/assets/3dmodel/factory.glb"

export default function Intro1Compo({size} : {size: React.MutableRefObject<HTMLDivElement>}) {

  useEffect(() => {
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
    
    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.current.clientWidth,size.current.clientHeight);
    document.getElementById("container").appendChild(renderer.domElement);
    
    // set mesh
    // const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    // const material = new THREE.MeshBasicMaterial({ color: `${theme.colors.primary}` });
    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    
    //Three.js에서 제공하는 카메라 컨트롤러 클래스
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0); // 카메라의 시선
    controls.update(); // 카메라 변화 업데이트

    // glTF 파일에서 압축된 데이터를 디코딩
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/'); // DRACO 디코더 파일의 경로
    
    // 에셋 추가
    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );
    loader.load(GlbFile, (gltf) => {
      const model = gltf.scene;

      // 로드된 모델의 위치, 크기, 회전 설정
      model.position.set(50, 0, 0);
      model.scale.set(7, 7, 7);
      model.rotation.set(0, 2, 0);
      
      // scene에 모델 추가
      scene.add(model)
    })

    function animate() {
      requestAnimationFrame(animate);
      // mesh.rotation.x += 0.01;
      // mesh.rotation.y += 0.01;
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
import * as THREE from "three";
import { useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GlbFile from "@/assets/3dmodel/scene_1.glb";

export default function Intro1Compo({
  size,
}: {
  size: React.MutableRefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    // camera
    const camera = new THREE.PerspectiveCamera(
      10, // 시야각
      size.current.clientWidth / size.current.clientHeight, // 비율
      0.1, // 카메라가 렌더링하는 공간에서의 가까운 클리핑 평면의 거리
      1000 // 카메라가 렌더링하는 공간에서의 먼 클리핑 평면의 거리
    );
    camera.position.z = 600;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(`${theme.colors.container}`);

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.current.clientWidth, size.current.clientHeight);
    document.getElementById("container").appendChild(renderer.domElement);

    //Three.js에서 제공하는 카메라 컨트롤러 클래스
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0); // 카메라의 시선
    controls.update(); // 카메라 변화 업데이트

    // color = materialColor * light.color * light.intensity;
    // 자연광 조명
    const ambienttLight = new THREE.HemisphereLight(0xffffff, 1);
    scene.add(ambienttLight);

    // 직사광,태양 조명
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(16, 25, 4);
    light1.target.position.set(0, 0, 0);

    scene.add(light1);
    scene.add(light1.target);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-4, 4, 8);
    light2.target.position.set(0, 0, 0);

    scene.add(light2);
    scene.add(light2.target);

    const light3 = new THREE.DirectionalLight(0xffffff, 1);
    light3.position.set(-40, 4, 8);
    light3.target.position.set(0, 0, 0);

    scene.add(light3);
    scene.add(light3.target);

    const sun1 = new THREE.DirectionalLight(0xffffff, 1);
    sun1.position.set(79, -19, 49);
    sun1.target.position.set(0, 0, 0);

    scene.add(sun1);
    scene.add(sun1.target);

    const sun2 = new THREE.DirectionalLight(0xffffff, 3);
    sun2.position.set(79, -19, 49);
    sun2.target.position.set(0, 0, 0);

    scene.add(sun2);
    scene.add(sun2.target);

    // glTF 파일에서 압축된 데이터를 디코딩
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/"); // DRACO 디코더 파일의 경로

    // 에셋 추가
    let mixer = null;
    const clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      GlbFile,
      function (gltf) {
        const model = gltf.scene;

        // 로드된 모델의 위치, 크기, 회전 설정
        model.position.set(0, 0, 0);
        model.scale.set(8.5, 8.5, 8.5);
        model.rotation.set(0.6, 1, 0);

        const bbox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        model.position.sub(center);

        // scene에 모델 추가
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        mixer.clipAction(gltf.animations[1]).play();
        mixer.clipAction(gltf.animations[2]).play();
        mixer.clipAction(gltf.animations[3]).play();
        mixer.clipAction(gltf.animations[4]).play();
        mixer.clipAction(gltf.animations[5]).play();
        mixer.clipAction(gltf.animations[6]).play();
        mixer.clipAction(gltf.animations[7]).play();
        mixer.clipAction(gltf.animations[8]).play();

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      renderer.render(scene, camera);
    }
  }, []);

  return <Container id="container"></Container>;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin-bottom: 1rem;
`;

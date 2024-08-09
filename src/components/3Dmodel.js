import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import stars from "../../public/images/stars.jpg";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Import 3D model blender file in below format as this type of file requires different bundling
const donutUrl = new URL("../../public/3D models/donutWithoutPlane.glb", import.meta.url);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);

document.getElementById("scene").appendChild(renderer.domElement);

camera.position.set(0, 2, 5);
orbit.update();

// Add a light
const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-100, 100, 20)

// Set background on all 6 faces of scene
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);

// Create an instance of GLTF loader for loading our 3D model
const assetLoader = new GLTFLoader();
assetLoader.load(
  donutUrl.href,
  (gltf) => {
    // Extract and add 3D blender model to the scene
    const model = gltf.scene;
    model.scale.set(20,20,20); // scale the blender model
    scene.add(model);
  },
  undefined,
  (error) => console.error(error)
);

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Add responsiveness
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})

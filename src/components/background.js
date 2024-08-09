import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import flower from '../../public/images/flower.png';
import background from '../../public/images/background.png';
import nebula from '../../public/images/nebula.jpg'
import stars from '../../public/images/stars.jpg'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
    );
    
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);

document.getElementById('scene').appendChild(renderer.domElement);

camera.position.set(0,2,5);
orbit.update();

/** 1. Add solid color in the background  */
// renderer.setClearColor(0xff36ae);

/** 2. Add 2D image in the background */
const textureLoader = new THREE.TextureLoader(); // create instance of texture loader
// scene.background = textureLoader.load(flower); // set path of the image as an argument that will create texture object out of the image

/** 3. Set background on all 6 faces of scene */
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars
])

/** 4. Set image on the faces of cube */
// const boxGeometry = new THREE.BoxGeometry();
// const boxMaterial = new THREE.MeshBasicMaterial({
//     map: textureLoader.load(nebula) // Set faces
// });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

/** 5. Set different images or color on all sides of the cube */
// const multiMeshMaterial = [
//     new THREE.MeshBasicMaterial({map: textureLoader.load(flower)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(flower)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(flower)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
// ];
const multiMeshMaterial = [
    new THREE.MeshBasicMaterial({color: 0xfcba03}),
    new THREE.MeshBasicMaterial({color: 0x5efc03}),
    new THREE.MeshBasicMaterial({color: 0xfcba03}),
    new THREE.MeshBasicMaterial({color: 0xa83250}),
    new THREE.MeshBasicMaterial({color: 0x03e3fc}),
    new THREE.MeshBasicMaterial({color: 0xbe03fc}),
];
const boxGeometry = new THREE.BoxGeometry();
const box = new THREE.Mesh(boxGeometry, multiMeshMaterial);
scene.add(box);

function animate() {
    renderer.render(scene, camera);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);



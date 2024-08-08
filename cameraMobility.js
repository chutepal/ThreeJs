import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
    );
    
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
    
// Create instance of orbitControls and pass camera and renderer.domElements as attributes
const orbit = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

camera.position.set(0,2,5);
orbit.update(); // Update orbit everytime on position change of camera

function animate() {
    renderer.render(scene, camera);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);



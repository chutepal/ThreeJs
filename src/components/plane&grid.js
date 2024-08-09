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
    
const orbit = new OrbitControls(camera, renderer.domElement);

document.getElementById('scene').appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Add plane
const planeGeometry = new THREE.PlaneGeometry(30, 30); // width and height of plane
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide // To make plane visible from both the sides top and bottom
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane); // Add plane to the scene
plane.rotation.x = -0.5 * Math.PI; // To rotate plane

// Add grid lines
const grid = new THREE.GridHelper(30); // 30 - grid numbers
scene.add(grid)

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

camera.position.set(0,2,5);
orbit.update();

function animate() {
    renderer.render(scene, camera);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);



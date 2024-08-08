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

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const grid = new THREE.GridHelper(30);
scene.add(grid)

// Create a sphere
const sphereGeometry = new THREE.SphereGeometry(3, 50, 50); // (radius, widthSegment, heighSegment) segments define the number of boxes in wireframe of sphere
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x000fff,
    wireframe: true // True: Shows wireframe; False: Shows solid material
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);

camera.position.set(0,2,5);
orbit.update();

function animate() {
    renderer.render(scene, camera);
    sphere.rotation.y += 0.002;
}
renderer.setAnimationLoop(animate);



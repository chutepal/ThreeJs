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
renderer.shadowMap.enabled = true; // Enable shadowmap to show shadows
    
const orbit = new OrbitControls(camera, renderer.domElement);

document.getElementById('scene').appendChild(renderer.domElement);

// Axes
const axesHelper = new THREE.AxesHelper(5);
axesHelper.setColors('red', 'green', 'blue')
scene.add(axesHelper);

// Plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ // Change Mesh material to see light effect
    color: 0xffffff,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true; // Allow place to receive shadow of the object

// Grid
const grid = new THREE.GridHelper(30);
scene.add(grid)

// Sphere
const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
const sphereMaterial = new THREE.MeshStandardMaterial({ // Change Mesh material to see light effect
    color: 0xffea00,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0)
sphere.castShadow = true; // Allow object to cast shadow

camera.position.set(9,3,5);
orbit.update();

// Bounce sphere
let step = 0
let speed = 0.01;


/** 1. Ambient light  */
const ambientLight = new THREE.AmbientLight(0x333333, 100);
scene.add(ambientLight)


function animate() {
    renderer.render(scene, camera);

    step += speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))
}
renderer.setAnimationLoop(animate);



import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as dat from 'dat.gui';

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

const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xffea00,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);

sphere.position.set(-10, 8, 5)
camera.position.set(9,3,5);
orbit.update();

// GUI implementation

const gui = new dat.GUI();

/** To add a color palette */

// Set interface options
const options = {
    sphereColor: '#ffea00', // default color value on palette
    wireframe: false, // default value of checkbox 
    speed: 0.01 // To control bounce speed
}

// Add color palette controller and event for color change
gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)
});

// Add checkbox controller to change wireframe status
gui.add(options, 'wireframe').onChange((e) => {
    console.log(e)
    sphere.material.wireframe = e;
});

// Add controller to change speed
gui.add(options, 'speed', 0, 0.1) // 0: Min speed, 0.1: Max speed

let step = 0

function animate() {
    renderer.render(scene, camera);

    // To add bouncing effect
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))
}
renderer.setAnimationLoop(animate);



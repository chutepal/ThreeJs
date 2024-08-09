import * as dat from 'dat.gui';
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
    color: 0x00ffa4,
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


/** 3. Spot light */
const spotLight = new THREE.SpotLight(0xFFFFFF, 100000);
spotLight.position.set(-100, 100, 0)// Change position of spot light
spotLight.castShadow = true; // Allow light to cast shadow. By default it will create pixalated shadow
spotLight.angle = 0.2 // Narrow down angle to make shadow smoother than default one
scene.add(spotLight); // By default it will focus on center co-ords

const sLighthelper = new THREE.SpotLightHelper(spotLight); // Make spot light and it's focus area visible
scene.add(sLighthelper);

// GUI for changing spot light properties
const gui = new dat.GUI();

const options = {
    sphereColor: '#00ffa4',
    wireframe: false,
    angle: 0.2,
    penumbra: 0, // Adds blur at the edges of light
    intensity: 100000
};

gui.addColor(options, 'sphereColor').onChange(e => {
    sphere.material.color.set(e)
});

gui.add(options, 'wireframe').onChange(e => {
    sphere.material.wireframe = e;
})

gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0, 1) // Adjust angle to see penumbra effect
gui.add(options, 'intensity', 10000, 200000)

function animate() {
    renderer.render(scene, camera);

    step += speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))

    // Update at each interval
    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLighthelper.update(); // Update helper everytime we change the light properties
}
renderer.setAnimationLoop(animate);



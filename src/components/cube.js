import * as THREE from 'three';

// Set the scene, camera and renderer. Refer README.md
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
    );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('scene').appendChild(renderer.domElement); // Add rendered to the DOM

// Add axeshelper to render axes(just for visual representation)
const axesHelper = new THREE.AxesHelper(5); // 5 - length of axes
scene.add(axesHelper);

// Create a cube
const boxGeometry = new THREE.BoxGeometry(); // Create a geometric object
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Add material(e.g. color) to it
const box = new THREE.Mesh(boxGeometry, boxMaterial); // Using Mesh, apply material on object

scene.add(box); // Add object to scene

camera.position.z = 5; // By default, all the things will be added at the same co-ordinates (0,0,0). That's why move camera a bit
//or
camera.position.set(0,2,5)

// Render the scene
function animate() {
    renderer.render(scene, camera);
    box.rotation.x += 0.01; // Add rotation along x-axis
    box.rotation.y += 0.01; // Add rotation along y-axis
}
renderer.setAnimationLoop(animate); // To set loop to call animate again and again



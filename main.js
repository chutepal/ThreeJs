import * as THREE from 'three';

// Set the scene, camera and renderer. Refer README.md
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement); // Add rendered to the DOM

// Create a cube
const geometry = new THREE.BoxGeometry(1,1,1); // Create a geometric object
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Add material(e.g. color) to it
const cube = new THREE.Mesh(geometry, material); // Using Mesh, apply material on object

scene.add(cube); // Add object to scene

camera.position.z = 5; // By default, all the things will be added at the same co-ordinates (0,0,0). That's why move camera a bit

// Render the scene
function animate() {
    renderer.render(scene, camera);
    cube.rotation.x += 0.01; // Add rotation along x-axis
    cube.rotation.y += 0.01; // Add rotation along y-axis
}
renderer.setAnimationLoop(animate); // To set loop to call animate again and again



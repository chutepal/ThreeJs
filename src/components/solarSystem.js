import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexture from '/images/stars.jpg';
import sunTexture from '/images/sun.jpg';
import mercuryTexture from '/images/mercury.jpg';
import saturnTexture from '/images/saturn.jpg';
import saturnRingTexture from '/images/saturn_ring.png';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('scene').appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);

orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Add stars on all faces of the scene
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

// Create texture loader for adding texture to spheres
const textureLoader = new THREE.TextureLoader();

// Create sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

/**
 * To rotate planets around sun, we can add planets to the sun object. But if we add all the planets to sun object, everything will rotate at the same speed which is incorrect as per our solar system. Each planet has it's own speed.
 * To do that, we will create dummy parent for each planets, which will be placed at the sun's position and append those planets to their respective parent. This way we can add the varying rotational speed for each planet.
 */

// Create dummy mercury parent object and append mercury to it
const mercuryDummyParent = new THREE.Object3D();
scene.add(mercuryDummyParent);

// Create mercury
const mercuryGeo = new THREE.SphereGeometry(5, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(mercuryTexture)
})
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
mercury.position.x = 38;

// Add mercury to it's dummy parent
mercuryDummyParent.add(mercury);

// Create dummy saturn parent object and append saturn to it
const saturnDummyParent = new THREE.Object3D();
scene.add(saturnDummyParent);
const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(saturnTexture)
})
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
saturn.position.x = 138;
saturnDummyParent.add(saturn);

// Create saturn rings
const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingTexture),
    side: THREE.DoubleSide
})
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnRing.position.x = 138;
saturnRing.rotation.x = -0.5 * Math.PI
saturnDummyParent.add(saturnRing);


// Add a point light to emit light in all directions from the center
const pointLight = new THREE.PointLight(0x333333, 100000, 300);
scene.add(pointLight);

function animate() {
    sun.rotateY(0.004);
    mercury.rotateY(0.003);
    mercuryDummyParent.rotateY(0.04)

    saturn.rotateY(0.038);
    saturnDummyParent.rotateY(0.0009)

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})


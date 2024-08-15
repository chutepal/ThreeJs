import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import starsTexture from "/images/stars.jpg";
import sunTexture from "/images/sun.jpg";
import mercuryTexture from "/images/mercury.jpg";
import venusTexture from "/images/venus.jpg";
import earthTexture from "/images/earth.jpg";
import marsTexture from "/images/mars.jpg";
import jupiterTexture from "/images/jupiter.jpg";
import saturnTexture from "/images/saturn.jpg";
import saturnRingTexture from "/images/saturn_ring.png";
import uranusTexture from "/images/uranus.jpg";
import uranusRingTexture from "/images/uranus_ring.png";
import neptuneTexture from "/images/neptune.jpg";
import plutoTexture from "/images/pluto.jpg";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("scene").appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);

orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// Add stars on all faces of the scene
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

// Create texture loader for adding texture to spheres
const textureLoader = new THREE.TextureLoader();

// Create sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanet(size, texture, position, ringParam) {
  const dummyParent = new THREE.Object3D();
  scene.add(dummyParent);
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const planet = new THREE.Mesh(geo, mat);
  dummyParent.add(planet);
  planet.position.x = position;

  // create ring
  if(ringParam) {
    const ringGeo = new THREE.RingGeometry(ringParam.innerRadius, ringParam.outerRadius);
    const ringMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(ringParam.texture),
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.x = position;
    ring.rotation.x = -0.5 * Math.PI;
    dummyParent.add(ring)
  }

  return {planet, dummyParent}
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

// Add a point light to emit light in all directions from the center
const pointLight = new THREE.PointLight(0x333333, 500000, 300);
scene.add(pointLight);

function animate() {
  //Self-rotation
  sun.rotateY(0.004);
  mercury.planet.rotateY(0.004);
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.04);
  saturn.planet.rotateY(0.038);
  uranus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);

  //Around-sun/dummyParent-rotation
  mercury.dummyParent.rotateY(0.04);
  venus.dummyParent.rotateY(0.015);
  earth.dummyParent.rotateY(0.01);
  mars.dummyParent.rotateY(0.008);
  jupiter.dummyParent.rotateY(0.002);
  saturn.dummyParent.rotateY(0.0009);
  uranus.dummyParent.rotateY(0.0004);
  neptune.dummyParent.rotateY(0.0001);
  pluto.dummyParent.rotateY(0.00007);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

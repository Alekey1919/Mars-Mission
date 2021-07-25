// import * as THREE from "../node_modules/three/src/Three.js";
import * as THREE from "https://cdn.skypack.dev/three@0.129";

// import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
// import * as dat from "./node_modules/dat.gui/build/dat.gui.min.js";

// import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

import { GLTFLoader } from "./GLTFLoader.js";

// CANVAS 0

// BASIC
const canvas = document.querySelector(".canvas0");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

// SIZES

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let canvas2Container = document.querySelector(".canvas2-container");

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // camera2.aspect = sizes.width / sizes.height;
  // camera2.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // renderer2.setSize(sizes.width, sizes.height);
  // renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // // canvas2.width = window.innerWidth;
  //
  camera2.aspect = canvas2Container.clientWidth / canvas2Container.clientHeight;
  camera2.updateProjectionMatrix();
  renderer2.setSize(
    canvas2Container.clientWidth,
    canvas2Container.clientHeight
  );
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // if (window.innerWidth <= 1000 - 20) {
  // rocket.position.set(1.5, 3.5, -6.5);
  // }
  if (window.innerWidth <= 1100) {
    rocket.position.set(0, 2.5, -6.5);
  } else if (window.innerWidth <= 1400) {
    rocket.position.set(3, 3.5, -6.5);
  } else {
    rocket.position.set(5, 3.5, -6.5);
  }
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.querySelector(".section-0-container").appendChild(renderer.domElement);

//LIGHT

const ambientLight = new THREE.AmbientLight(0xcccccc, 1.8);
scene.add(ambientLight);

camera.position.z = 6;

// MARS

const marsTexture = new THREE.TextureLoader().load("./mars-texture.png");
const marsNormalMap = new THREE.TextureLoader().load("./mars-map.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normal: marsNormalMap,
  })
);
mars.scale.set(0.6, 0.6, 0.6);
scene.add(mars);

// CANVAS 2

const canvas2 = document.querySelector(".canvas2");
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer2 = new THREE.WebGLRenderer({
  canvas: canvas2,
  alpha: true,
});

//ORBIT CONTROLS
// new OrbitControls(camera2, renderer2.domElement);

renderer2.setSize(innerWidth, innerHeight);
renderer2.setPixelRatio(devicePixelRatio);
document.querySelector(".canvas2-container").appendChild(renderer2.domElement);

//LIGHT

const loader = new GLTFLoader();
let rocket;

loader.load("./scene.gltf", function (gltf) {
  scene2.add(gltf.scene);
  rocket = gltf.scene;
  rocket.scale.set(0.0013, 0.0013, 0.0013);

  //Position
  if (window.innerWidth <= 1100) {
    rocket.position.set(0, 2.5, -6.5);
  } else if (window.innerWidth <= 1400) {
    rocket.position.set(3, 3.5, -6.5);
  } else {
    rocket.position.set(5, 3.5, -6.5);
  }
  rocket.onLoad(finished());
});

const ambientLight2 = new THREE.AmbientLight(0xcccccc, 1.8);
scene2.add(ambientLight2);

const light = new THREE.PointLight(0xffffff, 50, 100);
light.position.set(50, 50, 50);
scene2.add(light);

function animate() {
  mouse1.targetY = mouse1.y * 0.0001;

  mars.rotation.y += 0.005;
  rocket.rotation.y += 0.005;

  //Render
  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);

  //Call animate again on the next frame
  requestAnimationFrame(animate);
}

// Mouse Light & Mars Interaction

const directionalLight2 = new THREE.DirectionalLight(0xaaaaff, 1);
directionalLight2.position.set(-10, 0, 0);
scene2.add(directionalLight2);

document.addEventListener("mousemove", onMouseMove, false);

var mouse = {
  x: 0,
  y: 0,
};

var mouse1 = {
  y: 0,
  targetY: 0,
};

const windowY = window.innerHeight / 2;

function onMouseMove(event) {
  // STARSHIP

  //  // Update the mouse variable
  event.preventDefault();
  mouse.x = event.clientX - 1000;
  mouse.y = -event.clientY + 400;

  //  //Make the light follow the mouse
  directionalLight2.position.set(mouse.x, mouse.y, 900);

  // MARS

  mouse1.y = event.clientY - windowY;

  mars.rotation.x += 0.8 * (mouse1.targetY - mars.rotation.x);
}

// SCROLLING TO BOTTOM

function finished() {
  animate();
  window.scrollTo(0, document.body.scrollHeight);
  // // history.scrollRestoration = "manual";
  document.body.classList.remove("loading-active");
  document.querySelector(".loading-container").style.display = "none";
}

// RESPONSIVE STARSHIP INFO

const descriptionContainer = document.querySelector(".description-container");
document.querySelector("#icon-button").addEventListener("click", () => {
  descriptionContainer.classList.toggle("description-container-active");
});

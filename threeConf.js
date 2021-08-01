import * as THREE from "https://cdn.skypack.dev/three@0.129";
import { GLTFLoader } from "./GLTFLoader.js";

// CANVAS 0

// BASIC
const canvas = document.querySelector(".canvas0");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

let canvas2Container = document.querySelector(".canvas2-container");
let animateIsActive;
let animateMobileIsActive;
const vid = document.querySelector("#starship-video");

window.addEventListener("resize", () => {
  if (screen.height >= 800) {
    renderer.setSize(window.outerWidth, window.outerHeight);
    camera.aspect = window.outerWidth / window.outerHeight;
  } else {
    renderer.setSize(window.outerWidth, 800);
    camera.aspect = window.outerWidth / 800;
  }
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (renderer2 && animateIsActive) {
    if (window.outerHeight >= 800) {
      camera2.aspect =
        canvas2Container.clientWidth / canvas2Container.clientHeight;
      renderer2.setSize(
        canvas2Container.clientWidth,
        canvas2Container.clientHeight
      );
    } else {
      camera2.aspect = canvas2Container.clientWidth / 800;
      renderer2.setSize(canvas2Container.clientWidth, 800);
    }
    camera2.updateProjectionMatrix();
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  if (renderer2) {
    if (window.innerWidth <= 1400) {
      rocket.position.set(3, 3.5, -6.5);
    } else {
      rocket.position.set(5, 3.5, -6.5);
    }
  }

  if (window.innerWidth <= 1100) {
    if (animateIsActive) {
      canvas2.style.display = "none";
      cancelAnimationFrame(animationFrame);
      animateIsActive = false;
    }
    if (!animateMobileIsActive) {
      animationFrameMobile = requestAnimationFrame(animateMobile);
      animateMobileIsActive = true;
    }
    vid.style.display = "block";
    vid.style.height = window.innerHeight / 1.2 + "px";
    vid.height = window.innerHeight / 1.2;
    vid.autoplay = true;
    vid.loop = true;
    if (vid.height >= window.innerWidth * 1.3) {
      vid.style.width = window.outerWidth + "px";
      vid.style.height = window.outerheight / 2 + "px";
    }
  } else {
    if (!animateIsActive) {
      if (!renderer2) {
        canvas2Init();
      }
    }
    canvas2.style.display = "block";
    vid.style.display = "none";
    cancelAnimationFrame(animationFrameMobile);
    animateMobileIsActive = false;
    if (!animateIsActive) {
      animationFrame = requestAnimationFrame(animate);
      animateIsActive = true;
    }
  }
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.querySelector(".section-0-container").appendChild(renderer.domElement);

//LIGHT

const ambientLight = new THREE.AmbientLight(0xcccccc, 1.8);
scene.add(ambientLight);

camera.position.z = 6;

// MARS

const marsTexture = new THREE.TextureLoader().load("./images/mars-texture.png");
const marsNormalMap = new THREE.TextureLoader().load("./images/mars-map.jpg");

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

let canvas2;
let scene2;
let camera2;
let renderer2;
let loader;
let rocket;
let ambientLight2;
let light;
let directionalLight2;
let mouse;
let mouse1;

function canvas2Init() {
  canvas2 = document.querySelector(".canvas2");
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true,
  });

  renderer2.setSize(innerWidth, innerHeight);
  renderer2.setPixelRatio(devicePixelRatio);
  document
    .querySelector(".canvas2-container")
    .appendChild(renderer2.domElement);

  //LIGHT

  loader = new GLTFLoader();
  rocket;

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
    rocket.onLoad(finished(true));
  });

  ambientLight2 = new THREE.AmbientLight(0xcccccc, 1.8);
  scene2.add(ambientLight2);

  light = new THREE.PointLight(0xffffff, 50, 100);
  light.position.set(50, 50, 50);
  scene2.add(light);

  // Mouse Light & Mars Interaction

  directionalLight2 = new THREE.DirectionalLight(0xaaaaff, 1);
  directionalLight2.position.set(-10, 0, 0);
  scene2.add(directionalLight2);

  document.addEventListener("mousemove", onMouseMove, false);

  mouse = {
    x: 0,
    y: 0,
  };

  mouse1 = {
    y: 0,
    targetY: 0,
  };
  animateIsActive = true;
}

const windowY = window.innerHeight / 2;

// INTERACTIVE MOUSE

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

var animationFrame;
var animationFrameMobile;

// ANIMATE FUNCTIONS

function animate() {
  mouse1.targetY = mouse1.y * 0.0001;

  mars.rotation.y += 0.005;
  rocket.rotation.y += 0.005;

  //Render
  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);

  //Call animate again on the next frame
  animationFrame = requestAnimationFrame(animate);
}

function animateMobile() {
  // let animationFrameMobile;

  mars.rotation.y += 0.005;

  //Render
  renderer.render(scene, camera);

  //Call animate again on the next frame
  animationFrameMobile = requestAnimationFrame(animateMobile);
}

// SCROLLING TO BOTTOM

function finished(isOrNot) {
  if (isOrNot) {
    animate();
  } else {
    animateMobile();
  }
  window.scrollTo(0, document.body.scrollHeight);
  // history.scrollRestoration = "manual";
  document.body.classList.remove("loading-active");
  document.querySelector(".loading-container").style.display = "none";
}

// RESPONSIVE STARSHIP INFO

const descriptionContainer = document.querySelector(".description-container");
document.querySelector("#icon-button").addEventListener("click", () => {
  descriptionContainer.classList.toggle("description-container-active");
});

// INITIALIZATION

const videoResizer = () => {
  vid.style.height = window.innerHeight / 1.2 + "px";
  vid.style.height = window.innerHeight / 1.2 + "px";
  vid.style.height = window.innerHeight / 1.2 + "px";
  vid.style.height = window.innerHeight / 1.2 + "px";
  vid.style.height = window.innerHeight / 1.2 + "px";
  vid.style.height = window.innerHeight / 1.2 + "px";
};

if (window.innerWidth > 1100) {
  canvas2Init();
  vid.style.display = "none";
  vid.autoplay = false;
  vid.loop = false;
} else {
  document.querySelector(".canvas2").style.display = "none";
  videoResizer();
  finished(false);
  animateMobileIsActive = true;
}

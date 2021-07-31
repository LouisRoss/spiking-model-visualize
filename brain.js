import * as THREE from './js/three.module.js';
import {InputManager} from './src/inputManager.js';

import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

class Brain {
  constructor() {
    this.neurons = [];
    this.spread = 15;

    this.canvas = document.querySelector('#c');
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.physicallyCorrectLights = true;

    this.fov = 40;
    this.aspect = 2;   // the canvas default
    this.near = 0.1;
    this.far = 1000;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    this.camera.position.z = 120;
    //this.camera.position.set(0, 10, 20);
    
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, this.spread, 0);
    this.controls.update();
  
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xAAAAAA);

    this.inputManager = new InputManager();

    this.initializeVisualization();
  }

  addNeuron(x, y, z, neuron) {
    neuron.position.x = x * this.spread;
    neuron.position.y = y * this.spread;
    neuron.position.z = z * this.spread;

    this.scene.add(neuron);
    this.neurons.push(neuron);
  }

  initializeVisualization() {
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      this.scene.add(light);
    }
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(1, -2, -4);
      this.scene.add(light);
    }
  }

  startRendering() {
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
      
    var boundRender = (function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement;
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }

      this.neurons.forEach((obj, ndx) => {
        if (ndx == 9) {
          const speed = .1 + ndx * .05;
          const rot = time * speed;
          //obj.rotation.x = rot;
          obj.rotation.z = rot;
        }
      });

      if (this.inputManager.keys.ArrowUp.down) {
        this.camera.position.z -= 1;
      }
  
      if (this.inputManager.keys.ArrowDown.down) {
        this.camera.position.z += 1;
      }
  
      this.renderer.render(this.scene, this.camera);
      this.inputManager.update();
      this.controls.update();
  
      requestAnimationFrame(boundRender);
    }).bind(this);
    
    requestAnimationFrame(boundRender);
  }
}

export { Brain };
import * as THREE from './js/three.module.js';

const objects = [];
const spread = 15;

class Neuron {
    constructor(index) {
        this.index = index;
        this.bodyMaterial = this.createMaterial(0xB0F0F0);
        this.dendriteMaterial = this.createMaterial(0xC0F060);
    }

    createMaterial(color) {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
        });

        const hue = 1;
        const saturation = 1;
        const luminance = 1;
        material.color.setHSL(hue, saturation, luminance);
        material.color.set(color);

        return material;
    }

    Render() {
        const radius = 7;
        const neuron = new THREE.Object3D();
        const mesh1 = new THREE.Mesh(new THREE.TetrahedronGeometry(radius), this.bodyMaterial);
        mesh1.rotation.y = 2 * Math.PI / 8;
        mesh1.rotation.x = Math.atan(1 / Math.sqrt(2));
        neuron.add(mesh1);
        const mesh2 = new THREE.Mesh(new THREE.TetrahedronGeometry(radius), this.bodyMaterial);
        mesh2.rotation.y = -2 * Math.PI / 8;
        mesh2.rotation.x = -1 * Math.atan(1 / Math.sqrt(2));
        neuron.add(mesh2);
        const mesh3 = new THREE.Mesh(new THREE.CircleGeometry(radius/2, 12), this.dendriteMaterial);
        mesh3.position.z = 2.5;
        neuron.add(mesh3);

        /*
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2;  // after the grid
        axes.visible = true;
        mesh3.add(axes);
        */
        return neuron;
    }
}

export { Neuron };
/*
    Author(a): Kelly Daniella Marin Montealegre
    Date of creation: 15 de Febrero 2023
    Last modification: 15 de Febrero 2023 13:46
*/

var scene    = null,   // Is the place where webgl draw all elements in the screen 
    camera   = null,   // Is the element to allow see
    myCanvas = null,   // Is the Canvas ("lienzo")
    renderer = null,   // Is the process to represent the content
    controls = null;   // Is the controller that user have to move the mouse in the screen (Zoom in, z. Out, movement, drag)

// The elements create in the canvas
var cube      = null,
    cone      = null,
    cylinder  = null,
    sphere    = null,
    torusKnot = null,
    animateCube = false;


function initScene() {
    makeScene();
    createGrid(100,100);
    //draw3dShape();
    renderScreen();
    window.addEventListener( 'resize', onWindowResize, false ); // resize 
}
function makeScene() {
    // 1ER. Create a Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFF8F1);
    // 2DO. Create a 3D camera
    camera = new THREE.PerspectiveCamera( 75,  // FOV (Campo de vision)
                                        window.innerWidth / window.innerHeight, // aspect (tamaño de la pantalla)
                                        0.1, // Near (Cercano)
                                        1000 ); // Far (Lejano)

    scene.add(camera);
    // 3RO. To Render (Representar/visualizar algo)
    myCanvas = document.querySelector('.webgl'); 
    renderer = new THREE.WebGLRenderer({canvas: myCanvas});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );  

    // To Make Controls on Screen
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 0;
    controls.update();
}
function draw3dShape(object) {
    switch (object) {
        case 'Torus':
            // Create the three Object - Torus
            const geometryTorus = new THREE.TorusKnotGeometry( 1, 0.1, 5,3 );
            const materialTorus = new THREE.MeshBasicMaterial( { color: 0xF55268 } );
            torusKnot = new THREE.Mesh( geometryTorus, materialTorus );
            scene.add( torusKnot );
            torusKnot.position.x = 7;
          break;
        case 'Box':
            // Create the first Object - Cube
            const geometry = new THREE.BoxGeometry(
                                                    document.getElementById("box_width").value,
                                                    document.getElementById("box_height").value,
                                                    document.getElementById("box_depth").value );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,
                                                            wireframe: true  } );
            cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
          break;
        case 'Sphere':
            // Create the three Object - Sphere
            const geometryShere = new THREE.SphereGeometry( 
                                                            document.getElementById("sphere_radius").value,
                                                            document.getElementById("sphere_width").value,
                                                            document.getElementById("sphere_heigh").value 
                                                        );
            const materialShere = new THREE.MeshBasicMaterial( { color: 0x7971F5,
                                                                wireframe: false } );
            sphere = new THREE.Mesh( geometryShere, materialShere );
            scene.add( sphere );
            sphere.position.x = -7;

          break;
      }
}
function createGrid(data1_size,data2_division) {
    const size = data1_size;
    const divisions = data2_division;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );
}
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
function makeAnimationsObject() {
    animateCube = document.getElementById("animar_cube").checked;
}
function renderScreen() {
	requestAnimationFrame(renderScreen);
    controls.update();

	renderer.render(scene, camera);

    if(animateCube!=false){
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    /*
    cone.rotation.x -= 0.01;
    cone.rotation.y -= 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y -= 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;*/
}

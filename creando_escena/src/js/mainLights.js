/*
    Author(a): Kelly Daniella Marin Montealegre
    Date of creation: 15 de Marzo 2023
    Last modification: 15 de Marzo 2023 15:03
*/

var scene    = null,   // Is the place where webgl draw all elements in the screen 
    camera   = null,   // Is the element to allow see
    myCanvas = null,   // Is the Canvas ("lienzo")
    renderer = null,   // Is the process to represent the content
    controls = null;   // Is the controller that user have to move the mouse in the screen (Zoom in, z. Out, movement, drag)

function initScene() {
    makeScene();
    createGrid(10,10);
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

    // Objects
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.y = 0.5;

    // Plane
    const planeGeomery = new THREE.PlaneGeometry( 10, 10 );
    const materialplane = new THREE.MeshStandardMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( planeGeomery, materialplane );
    scene.add( plane );
    plane.rotation.x = Math.PI / 2;
}
function createLight(typeLight) {

    switch(typeLight) {
    case 'AmbientLight':
        // Ambient Light
        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( light );
        break;
    case 'directionalLight':
        // Direction Light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( directionalLight );

        const helper = new THREE.DirectionalLightHelper( directionalLight );
        scene.add( helper );
        break;
    case 'pointLight':
        const pointLight = new THREE.PointLight( 0xfffff0, 1, 100 );
        pointLight.position.set( 1, 1, 1 );
        scene.add( pointLight );

        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        scene.add( pointLightHelper );
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
function renderScreen() {
	requestAnimationFrame(renderScreen);
    controls.update();

	renderer.render(scene, camera);
}

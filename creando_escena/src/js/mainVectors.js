/*
    Author(a): Kelly Daniella Marin Montealegre
    Date of creation: 23 de Febrero 2023
    Last modification: 1 de Marzo 2023 14:53
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
}

function vectors(typeOrigin) {
    var a = null;
    var b = null;
    if(typeOrigin==0){
        a = new THREE.Vector3(document.getElementById("vectorEX").value, document.getElementById("vectorEY").value , document.getElementById("vectorEZ").value);
        b = new THREE.Vector3( 0, 0, 0);
    }else{
        // @change a value
        a = null;
        b = null;

        alert("under construction");
    }
    
    const d = a.distanceTo( b );
    
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const points = [];
            points.push( a );
            points.push( b );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );

    let g = new THREE.ConeGeometry( 0.1, 0.5);
        g.translate(0, d*1, 0); // base to 0
        g.rotateX(Math.PI * 0.5); // align along Z-axis
    let m = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // or any other material
    let o = new THREE.Mesh(g, m);
        o.position.copy(b);
        o.lookAt(a);
        scene.add(o);

    // Origin Point
    const geometryO = new THREE.SphereGeometry( 0.03, 16, 16 );
    const materialO = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( geometryO, materialO );
    scene.add( sphere );

    // Final Point
    const geometryF = new THREE.SphereGeometry( 0.03, 16, 16 );
    const materialF = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const sphereF = new THREE.Mesh( geometryF, materialF );

    sphereF.position.x = a.x;
    sphereF.position.y = a.y;
    sphereF.position.z = a.z;
    scene.add( sphereF );
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
}

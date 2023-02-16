var scene    = null,
    camera   = null,
    myCanvas = null,
    renderer = null,
    controls = null;

var cube      = null,
    cone      = null,
    cylinder  = null,
    sphere    = null,
    torusKnot = null;


function initScene() {
    makeScene();
    createGrid(100,100);
    draw3dShape();
    renderScreen();
    window.addEventListener( 'resize', onWindowResize, false );
}
function makeScene() {
    // 1ER. Create a Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);
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
    camera.position.z = 10;
    controls.update();
}
function draw3dShape() {
     
    // Create the first Object - Cube
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,
                                                    wireframe: true  } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // Create the second Object - Cone
    const geometryCone = new THREE.ConeGeometry( 1, 3, 10 );
    const materialCone = new THREE.MeshBasicMaterial( {color: 0xffff00,
                                                        wireframe: true } );
    cone = new THREE.Mesh( geometryCone, materialCone );
    scene.add( cone );

    // Create the three Object - Cylinder
    const geometryCylinder = new THREE.CylinderGeometry( 1, 1, 3, 5 );
    const materialCylinder = new THREE.MeshBasicMaterial( {color: 0xf0f0f0,
                                                           wireframe: true } );
    cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );
    scene.add( cylinder );

    // Create the three Object - Sphere
    const geometryShere = new THREE.SphereGeometry( 1, 10, 5 );
    const materialShere = new THREE.MeshBasicMaterial( { color: 0x7971F5,
                                                        wireframe: true } );
    sphere = new THREE.Mesh( geometryShere, materialShere );
    scene.add( sphere );


    // Create the three Object - Torus
    const geometryTorus = new THREE.TorusKnotGeometry( 1, 0.1, 5,3 );
    const materialTorus = new THREE.MeshBasicMaterial( { color: 0xF55268 } );
    torusKnot = new THREE.Mesh( geometryTorus, materialTorus );
    scene.add( torusKnot );

    cone.position.x = -3;
    cylinder.position.x = 3;

    sphere.position.x = -7;
    torusKnot.position.x = 7;
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

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cone.rotation.x -= 0.01;
    cone.rotation.y -= 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y -= 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
}

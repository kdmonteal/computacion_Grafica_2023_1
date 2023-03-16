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

    // Objects Material Standard
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( {color: 0x00ff00,
                                                        roughness: 0.3,
                                                        metalness: 0.5
                                                        } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.y = 0.5;

    // Objects Material Normal
    const geometryNormal = new THREE.BoxGeometry( 1, 1, 1 );
    const materialNormal = new THREE.MeshNormalMaterial( {color: 0x00ff00,
                                                            transparent: true,
                                                            opacity: 0.5,
                                                            wireframe: false} );
    const cubeNormal = new THREE.Mesh( geometryNormal, materialNormal );
    scene.add( cubeNormal );
    cubeNormal.position.y = 0.5;
    cubeNormal.position.x = -2;

    // Objects Material Phong
    const geometryPhong = new THREE.BoxGeometry( 1, 1, 1 );
    const materialPhong = new THREE.MeshPhongMaterial( {color: 0x00ff00,
                                                        specular: 0xff0000,
                                                        shininess: 1} );
    const cubePhong = new THREE.Mesh( geometryPhong, materialPhong );
    scene.add( cubePhong );
    cubePhong.position.y = 0.5;
    cubePhong.position.x = 2;

    // Objects Material Basic
    const geometryBasic = new THREE.BoxGeometry( 1, 1, 1 );
    const materialBasic = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cubeBasic = new THREE.Mesh( geometryBasic, materialBasic );
    scene.add( cubeBasic );
    cubeBasic.position.y = 0.5;
    cubeBasic.position.x = 2;
    cubeBasic.position.z = 2;

    // Objects Material Lambert
    const geometryLambert = new THREE.BoxGeometry( 1, 1, 1 );
    const materialLambert = new THREE.MeshLambertMaterial( {color: 0xffffff,
                                                            emissive: 0xffff00,
                                                            emissiveIntensity: 0.8} );
    const cubeLambert = new THREE.Mesh( geometryLambert, materialLambert );
    scene.add( cubeLambert );
    cubeLambert.position.y = 0.5;
    cubeLambert.position.x = 2;
    cubeLambert.position.z = 2;

    // Objects Material Depth
    const geometryDepth = new THREE.BoxGeometry( 1, 1, 1 );
    const materialDepth = new THREE.MeshDepthMaterial({transparent:false,
                                                        opacity: 0.5,
                                                        wireframe: true,
                                                        wireframeLinewidth: 0.1}
                                                        );
    const cubeDepth = new THREE.Mesh( geometryDepth, materialDepth );
    scene.add( cubeDepth );
    cubeDepth.position.y = 0.5;
    cubeDepth.position.z = 2;

    // Objects Material Texture
    const geometryTexture = new THREE.BoxGeometry( 1, 1, 1 );
    const materialTexture = new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            map: new THREE.TextureLoader().load('../img/uv_test_bw_1024.png'),
                                                            side: THREE.DoubleSide }
                                                        );
    const cubeTexture = new THREE.Mesh( geometryTexture, materialTexture );
    scene.add( cubeTexture );
    cubeTexture.position.y = 0.5;
    cubeTexture.position.z = 2;
    cubeTexture.position.x = -2;

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
    case 'SpotLight':
        // white spotlight shining from the side, modulated by a texture, casting a shadow
        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 0, 10, 0 );
        spotLight.map = new THREE.TextureLoader().load('../img/face2.png');

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );

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

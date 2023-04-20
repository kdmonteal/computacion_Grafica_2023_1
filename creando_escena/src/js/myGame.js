/*
    Author(a): Kelly Daniella Marin Montealegre
    Date of creation: 19 de abril 2023
    Last modification: 19 de abril 2023 13:52
*/

var scene = null,      // Is the place where webgl draw all elements in the screen 
    camera = null,     // Is the element to allow see
    myCanvas = null,   // Is the Canvas ("lienzo")
    renderer = null,   // Is the process to represent the content
    controls = null,   // Is the controller that user have to move the mouse in the screen (Zoom in, z. Out, movement, drag)
    pointLight = null,
    pointLightHelper = null;   

function initScene() {
    makeScene();
    //createGrid(10, 10);
    renderScreen();
    window.addEventListener('resize', onWindowResize, false); // resize 
    createLight('pointLight');
    document.getElementById("myAudio").play();

    collectible(5);
}


function makeScene() {
    // 1ER. Create a Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);
    // 2DO. Create a 3D camera
    camera = new THREE.PerspectiveCamera(75,  // FOV (Campo de vision)
        window.innerWidth / window.innerHeight, // aspect (tamaño de la pantalla)
        0.1, // Near (Cercano)
        1000); // Far (Lejano)

    scene.add(camera);
    // 3RO. To Render (Representar/visualizar algo)
    myCanvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // To Make Controls on Screen
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.x = -25;
    camera.position.y = 25;
    camera.position.z = 90;

    // controls.update();

    const helper = new THREE.CameraHelper( camera );
    scene.add( helper );

    // populate the scene
    var loader = new THREE.TextureLoader();
    var texture = loader.load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png", function (texture) {

        texture.anisotropy = 32;
        texture.repeat.set(100, 100);
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;

    });
    
    geo = new THREE.PlaneBufferGeometry(10000, 10000);
    mat = new THREE.MeshStandardMaterial({ map: texture });
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, -5, 0);
    mesh.rotation.set(Math.PI / -2, 0, 0);
    scene.add(mesh);
}

function startGame() {
    document.getElementById("blocker").style.display = "none";
}

function createLight(typeLight) {

    switch (typeLight) {
        case 'AmbientLight':   
            // Ambient Light
            const light = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
            scene.add(light);
            break;
        case 'directionalLight':
            // Direction Light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            scene.add(directionalLight);

            const helper = new THREE.DirectionalLightHelper(directionalLight);
            scene.add(helper);
            break;
        case 'pointLight':
            pointLight = new THREE.PointLight(0xfffff0, 1, 500);
            pointLight.position.set(-25, 25, 49);
            scene.add(pointLight);

            const sphereSize = 1;
            pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
            scene.add(pointLightHelper);
            break;
        case 'SpotLight':
            // white spotlight shining from the side, modulated by a texture, casting a shadow
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(0, 10, 0);
            spotLight.map = new THREE.TextureLoader().load('../img/face2.png');

            spotLight.castShadow = true;

            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            scene.add(spotLight);

            break;

    }
}
function createGrid(data1_size, data2_division) {
    const size = data1_size;
    const divisions = data2_division;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
function renderScreen() {
    requestAnimationFrame(renderScreen);
    // controls.update();
    renderer.render(scene, camera);
    movementPlayer();
}

function collectible(quanty) {

    for (let index = 0; index < quanty; index++) {
        var loader = new THREE.TextureLoader();
        var texture = loader.load("../img/cajaTexture.PNG", function (texture) {
            texture.anisotropy = 32;
        });

        let geo = new THREE.BoxBufferGeometry(30, 30, 30);
        let mat = new THREE.MeshLambertMaterial({
            color: "white",
            map: texture
        })
        let mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        mesh.position.y = 15;
        mesh.position.x = Math.floor((Math.random() * 500) + 1);
        mesh.position.z = Math.floor((Math.random() * 500) + 1);

    }
    
}
function movementPlayer() {
    window.addEventListener("keydown", function (myKey) {
        console.log(myKey.key);

        switch (myKey.key) {
            case 'w':
                camera.position.z -=0.01;
                pointLight.position.z -=0.01;
                pointLightHelper.position.z -=0.01;
            break;
            case 's':
                camera.position.z +=0.01;
                pointLight.position.z +=0.01;
                pointLightHelper.position.z +=0.01;
            break;
            case 'a':
                camera.position.x -=0.01;
                pointLight.position.x -=0.01;
                pointLightHelper.position.x -=0.01;
            break;
            case 'd':
                camera.position.x +=0.01;
                pointLight.position.x +=0.01;
                pointLightHelper.position.x +=0.01;
            break;
            case 'Escape':
                document.getElementById("blocker").style.display = "block";
            break;
        }
    });
}

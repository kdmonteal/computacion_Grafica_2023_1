/*  Author(a): Daniella Marin.
    Date of creation: Friday, January 7 2020
    Last update: Monday, January 11 . 2020 */

var scene    = null,
    camara   = null,
    render   = null,
    controls = null;

var cube = null;

function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xe0e0d1 );

    camera = new THREE.PerspectiveCamera( 
        75,                                     // Ángulo "grabación" - De abaja -> Arriba 
        window.innerWidth / window.innerHeight, // Relación de aspecto 16:9
        0.1,                                    // Mas cerca (no renderiza) 
        1000                                    // Mas lejos (no renderiza)
    );

    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 1, 2 );
    controls.update();

    // Grid Creation 
    var size = 50;
    var divisions = 50;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    var axesHelper = new THREE.AxesHelper( 1 );
    scene.add( axesHelper );
}

function drawElement(obj2draw,col,wire,param1,param2,param3) {
    
    switch(obj2draw) {
        case "Cube":
            // code block
            var geometry = new THREE.BoxGeometry( param1, param2, param3 );
            var material = new THREE.MeshBasicMaterial( {color: +('0x'+col),
                                                         wireframe: wire} );
            cube     = new THREE.Mesh( geometry, material );
            scene.add(cube);

            // wireframe
            var geo = new THREE.EdgesGeometry( cube.geometry ); // or WireframeGeometry
            var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
            var wireframe = new THREE.LineSegments( geo, mat );
            cube.add( wireframe );
            
          break;
        case "Torus":
          // code block
            var geometry = new THREE.TorusGeometry( 10, 3, 11, 30 );
            var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            var torus = new THREE.Mesh( geometry, material );
            scene.add( torus );
          break;
        case "Cone":
            // code block
            var geometry = new THREE.ConeGeometry( 5, 20, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            var cone = new THREE.Mesh( geometry, material );
            scene.add( cone );
            break;
        default:
          // code block
          alert("I don't understand you ...");
    }
}

function animate() {
    requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
    // cube.rotation.z += 0.01;
    
    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
}

function getInformationCube() {
    var message = 'Please enter data (width, height, depth) : ';
    var datas = prompt(message,"w,h,d");

    var values = cleanParamsUI(datas, ',');

    console.log("x: "+values[0]);
    console.log("y: "+values[1]);
    console.log("z: "+values[2]);

    drawElement("Cube","ff0000",false, values[0], values[1], values[2]);
}

function getInformationCone() {
    var message = 'Please enter data (radius, height, radialSegments ) : ';
    var datas = prompt(message,"r,h,r");
}

function getInformationTorus() {
    var message = 'Please enter data (radius, tube, radialSegments, tubularSegments) : ';
    var datas = prompt(message,"r,t,r,t");
}

function cleanParamsUI(datos, marker) {
    value = datos.split(marker);
    for(var i=0; i<value.length; i++){
        value[i] = parseFloat(value[i]);
    }
    return value;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
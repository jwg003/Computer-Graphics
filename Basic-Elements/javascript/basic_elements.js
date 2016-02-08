/**
 * Created by John on 2/8/2016.
 */

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 100, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    var ground = BABYLON.Mesh.CreateGround("ground", 30, 30, 2, scene);
    var ground2 = BABYLON.Mesh.CreateGround("ground2", 30, 30, 2, scene);

    //Creation of a box
    //(name of the box, size, scene)
    var box = BABYLON.Mesh.CreateBox("box", 6.0, scene);

    var box1 = BABYLON.Mesh.CreateBox("box1", 6.0, scene);
    var box2 = BABYLON.Mesh.CreateBox("box2", 6.0, scene);
    var box3 = BABYLON.Mesh.CreateBox("box3", 6.0, scene);
    var box4 = BABYLON.Mesh.CreateBox("Box4", 6.0, scene);
    var box5 = BABYLON.Mesh.CreateBox("Box5", 6.0, scene);
    var box6 = BABYLON.Mesh.CreateBox("Box6", 6.0, scene);
    var box7 = BABYLON.Mesh.CreateBox("Box7", 6.0, scene);



    //Creation of a sphere
    //(name of the sphere, segments, diameter, scene)
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);

    var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 12.0, 8.0, scene);

    //Creation of a plan
    //(name of the plane, size, scene)
    var plan = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);

    //Creation of a cylinder
    //(name, height, diameter, tessellation, scene, updatable)
    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene, false);

    // Creation of a torus
    // (name, diameter, thickness, tessellation, scene, updatable)
    var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);

    // Creation of a knot
    // (name, radius, tube, radialSegments, tubularSegments, p, q, scene, updatable)
    var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);

    // Creation of a lines mesh
    //var lines = BABYLON.Mesh.CreateLines("lines", [
    //    new BABYLON.Vector3(-10, 0, 0),
    //    new BABYLON.Vector3(10, 0, 0),
    //    new BABYLON.Vector3(0, 0, -10),
    //    new BABYLON.Vector3(0, 0, 10)
    //], scene);

    // Creation of a ribbon
    // let's first create many paths along a maths exponential function as an example
    var exponentialPath = function (p) {
        var path = [];
        for (var i = -10; i < 10; i++) {
            path.push(new BABYLON.Vector3(p, i, Math.sin(p / 3) * 5 * Math.exp(-(i - p) * (i - p) / 60) + i / 3));
        }
        return path;
    };

    // let's populate arrayOfPaths with all these different paths
    var arrayOfPaths = [];
    for (var p = 0; p < 20; p++) {
        arrayOfPaths[p] = exponentialPath(p);
    }

    // (name, array of paths, closeArray, closePath, offset, scene)
    var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", arrayOfPaths, false, false, 0, scene);


    // Moving elements
    box.position = new BABYLON.Vector3(-10, 0, 0);   // Using a vector
    sphere.position = new BABYLON.Vector3(0, 10, 0); // Using a vector
    plan.position.z = 10;                            // Using a single coordinate component
    cylinder.position.z = -10;
    torus.position.x = 10;
    knot.position.y = -10;
    ribbon.position = new BABYLON.Vector3(-10, -10, 20);
    ground.position.y = -20;



    box1.position = new BABYLON.Vector3(-30,0,0);
    box2.position.x = -20; // or box2.position = new BABYLON.Vector3(-10,0,0);
    box3.position.x = -10;
    box4.scaling.x = 2;
    box5.scaling.y = 2;
    box6.scaling.y = 2;

    //rotating boxes
    box1.rotation.x = Math.PI / 6;
    box2.rotation.y = Math.PI / 3;
    box3.parent = box2;
    box4.parent = box3;
    box4.position.x = -10;
    box5.parent = box7;
    box5.position.z = -10;
    box6.parent = box;
    box6.position.y = 10;
    box7.parent = box1;
    box7.position.z = -10;

    //creating floor
    ground2.parent = ground;
    ground2.position.z = -30;


    //material
    var materialGround = new BABYLON.StandardMaterial("textureGround", scene);
    materialGround.diffuseTexture = new BABYLON.Texture("../textures/grass.jpg", scene);
    materialGround.diffuseTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
    materialGround.diffuseTexture.vScale = 5.0;//Repeat 5 times on the Horizontal Axes
    materialGround.backFaceCulling = false;//Always show the front and the back of an element

    ground.material = materialGround;
    ground2.material = materialGround;

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
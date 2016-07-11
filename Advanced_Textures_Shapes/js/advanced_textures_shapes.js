
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    /*** Skybox ***/
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.checkCollisions = true;
    skybox.renderingGroupId = 0;
    skybox.infiniteDistance = true;

    /*** Camera ***/
    scene.activeCamera = new BABYLON.ArcRotateCamera("Camera", 3 *Math.PI / 2, Math.PI / 3, 50, BABYLON.Vector3.Zero(), scene);
    scene.activeCamera.attachControl(canvas);

    /*** Lighting ***/
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 3, 0), scene);
    light.groundColor = new BABYLON.Color3(0.2, 0.2, 0.5);
    light.intensity = 0.8;

    /*** Different Shapes ***/

    var faceColors = new Array(6);
    faceColors[4] = new BABYLON.Color4(1,1,1,1);
    // var faceColors = new BABYLON.Color4(1,1,1,1);

    // octahedron.diffuseColor = new BABYLON.Color4(0.5, 0.5, 1.0, 0);
    var octahedron = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 1, size: 3, faceColors: faceColors}, scene);
    octahedron.position = new BABYLON.Vector3(10, 0, 0);

    var icosphere = BABYLON.MeshBuilder.CreateIcoSphere("ico", {radius: 5, radiusY: 8, subdivisions: 6}, scene);
    icosphere.position = new BABYLON.Vector3(-10, 0, 0);

    var torus = BABYLON.MeshBuilder.CreateTorusKnot("tk", {}, scene);

    var torus2 = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.2}, scene);
    torus2.position = new BABYLON.Vector3(0, 0, 10);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, diameterX: 3}, scene);
    sphere.position = new BABYLON.Vector3(0, 0, -10);

    var disc = BABYLON.MeshBuilder.CreateDisc("disc", {radius: 3.5, tessellation: 8, sideOrientation: 2}, scene); // makes a triangle
    disc.position = new BABYLON.Vector3(0, 30, 0);

    var box = BABYLON.MeshBuilder.CreateBox("box", {width: 5, height: 5}, scene);
    box.position = new BABYLON.Vector3(20, 0, 0);


    var box2 = BABYLON.MeshBuilder.CreateBox("box", {size: 5}, scene);
    box2.position = new BABYLON.Vector3(-20, 0, 0);

    var box3 = BABYLON.MeshBuilder.CreateBox("box", {depth: 70, height: 20}, scene);
    box3.position = new BABYLON.Vector3(30, 0, 0);

    var box4 = BABYLON.MeshBuilder.CreateBox("box", {depth: 70, height: 20}, scene);
    box4.position = new BABYLON.Vector3(-30, 0, 0);

    var box5 = BABYLON.MeshBuilder.CreateBox("box", {width: 61, height: 20}, scene);
    box5.position = new BABYLON.Vector3(0, 0, -35.0);

    var box6 = BABYLON.MeshBuilder.CreateBox("box", {width: 61, height: 20}, scene);
    box6.position = new BABYLON.Vector3(0, 0, 35.0);

    // var lathe = BABYLON.MeshBuilder.Lathe("lathe", {shape: myShape}, scene);

    var plane = BABYLON.Mesh.CreatePlane("plane", 100, scene);
    plane.position.y = -10;
    plane.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);


    //Creation of a mirror material
    var mirrorMaterial = new BABYLON.StandardMaterial("texture4", scene);
    mirrorMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true); //Create a mirror texture
    mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
    mirrorMaterial.reflectionTexture.renderList = [octahedron, icosphere, torus, torus2, sphere, box, box2, disc];
    mirrorMaterial.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection

    //Creation of a mirror material
    var mirrorMaterial2 = new BABYLON.StandardMaterial("texture4", scene);
    mirrorMaterial2.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    mirrorMaterial2.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true); //Create a mirror texture
    mirrorMaterial2.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
    mirrorMaterial2.reflectionTexture.renderList = [octahedron, icosphere, torus, torus2, sphere, box, box2, disc];
    mirrorMaterial2.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection

    //Creation of a mirror material
    var mirrorMaterial3 = new BABYLON.StandardMaterial("texture4", scene);
    mirrorMaterial3.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    mirrorMaterial3.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true); //Create a mirror texture
    mirrorMaterial3.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
    mirrorMaterial3.reflectionTexture.renderList = [octahedron, icosphere, torus, torus2, sphere, box, box2, disc];
    mirrorMaterial3.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection

    //Creation of a mirror material
    var mirrorMaterial4 = new BABYLON.StandardMaterial("texture4", scene);
    mirrorMaterial4.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    mirrorMaterial4.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true); //Create a mirror texture
    mirrorMaterial4.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
    mirrorMaterial4.reflectionTexture.renderList = [octahedron, icosphere, torus, torus2, sphere, box, box2, disc];
    mirrorMaterial4.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection

    //Creation of a mirror material
    var mirrorMaterial5 = new BABYLON.StandardMaterial("texture4", scene);
    mirrorMaterial5.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    mirrorMaterial5.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true); //Create a mirror texture
    mirrorMaterial5.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
    mirrorMaterial5.reflectionTexture.renderList = [octahedron, icosphere, torus, torus2, sphere, box, box2, disc];
    mirrorMaterial5.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection

    plane.material = mirrorMaterial;
    box3.material = mirrorMaterial2;
    box4.material = mirrorMaterial3;
    box5.material = mirrorMaterial4;
    box6.material = mirrorMaterial5;


    /*** Begin Physics ***/
    scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());

    sphere.setPhysicsState({impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, friction: 1, restitution: 0.7});
    icosphere.setPhysicsState({impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, friction: 1, restitution: 0.7});
    torus2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, friction: 1, restitution: 0.7 });
    disc.setPhysicsState({impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 1, friction: 1, restitution: 0.7 });
    octahedron.setPhysicsState({impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, friction: 1, restitution: 0.7});
    torus.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, friction: 1, restitution: 0.7 });
    plane.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, friction: 0.5, restitution: 0.7 });
    box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, friction: 0.5, restitution: 0.7 });
    box3.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box4.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box5.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box6.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });


    CreateMaterials();
    addListeners();


    var meshesColliderList = [];

    for (var j = 1; j < scene.meshes.length; j++) {
        if (scene.meshes[j].checkCollisions && scene.meshes[j].isVisible === false) {
            scene.meshes[j].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0,
                friction: 0.5, restitution: 0.7 });
            meshesColliderList.push(scene.meshes[j]);
        }
    }

    function CreateMaterials() {
        materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
        materialAmiga.diffuseTexture = new BABYLON.Texture("textures/eye.png", scene);
        materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        materialAmiga.diffuseTexture.uScale = 5;
        materialAmiga.diffuseTexture.vScale = 5;
        materialWood = new BABYLON.StandardMaterial("wood", scene);
        materialWood.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
        materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    }
    function addListeners() {
        window.addEventListener("keydown", function (evt) {
            // s for sphere
            if (evt.keyCode == 83) {
                for (var index = 0; index < 5; index++) {
                    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, diameterX: 3}, scene);
                    sphere.position = new BABYLON.Vector3(0, index / 3, 5 + index / 10);
                    sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });
                }
            }
            // b for box
            if (evt.keyCode == 66) {
                for (var index2 = 0; index2 < 10; index2++) {
                    var box0 = BABYLON.Mesh.CreateBox("Box0", 6.5, scene);
                    box0.position = new BABYLON.Vector3(index2 / 5, 3, 5 + index2 / 5);
                    box0.material = materialWood;
                    box0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 4 });
                }
            }
            if(evt.keyCode == 79){
                for(var index3 = 0; index3 < 1; index3++){
                    var icosphere = BABYLON.MeshBuilder.CreateIcoSphere("ico", {radius: 5, radiusY: 8, subdivisions: 6}, scene);
                    icosphere.position = new BABYLON.Vector3(index3/5, 3, 5 + index3/5);
                    icosphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, {mass: 5})
                }

            }

            if(evt.keyCode == 68){
                for(var index4 = 0; index4 < 1; index4++){
                    var disc = BABYLON.MeshBuilder.CreateDisc("disc", {radius: 3.5, tessellation: 19, sideOrientation: 2}, scene); // makes a triangle
                    disc.setPhysicsState(BABYLON.PhysicsEngine.PlaneImpostor, {mass:1})

                }
            }
        });

        canvas.addEventListener("mousedown", function (evt) {
            var pickResult = scene.pick(evt.clientX, evt.clientY, function (mesh) {
                if (mesh.name.indexOf("Sphere0") !== -1 || mesh.name.indexOf("Box0") !== -1 || mesh.name.indexOf("sphere2") !== -1) {
                    return true;
                }
                return false;
            });
            if (pickResult.hit) {
                var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
                dir.normalize();
                pickResult.pickedMesh.applyImpulse(dir.scale(1), pickResult.pickedPoint);
            }
        });
    }
    /*** End Physics ***/





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
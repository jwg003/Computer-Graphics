var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);





var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

    /*** Skybox ***/
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/Space", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;


    /*** Camera ***/
    var camera = new BABYLON.ArcRotateCamera("Camera", 3 *Math.PI / 2, Math.PI / 2, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    /*** Lighting ***/
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.groundColor = new BABYLON.Color3(0.2, 0.2, 0.5);
    light.intensity = 0.6;


    /*** Beginning first Box ***/
    var mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat.backFaceCulling = false;
    mat.wireframe = false;
    mat.diffuseTexture = new BABYLON.Texture("textures/spriteAtlas.png", scene);
    mat.diffuseTexture.hasAlpha = true;

    var hSpriteNb =  6;  // 6 sprites per raw
    var vSpriteNb =  4;  // 4 sprite raws

    var faceUV = new Array(6);
    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i/hSpriteNb, i/vSpriteNb, (i+1)/hSpriteNb, (i+1)/vSpriteNb);
    }

    // var faceColors = new Array(6);
    //
    // faceColors[4] = new BABYLON.Color4(1,0,0,0.3);
    // faceColors[1] = new BABYLON.Color4(0,1,0,0.4);

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV: faceUV
        // faceColors : faceColors
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;
    box.position.y = -5;
    box.position.x = -10;
    /*** End of First Box ***/


    /*** Beginning Second Box ***/
    var mat2 = new BABYLON.StandardMaterial("mat1", scene);
    mat2.alpha = 1.0;
    mat2.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat2.backFaceCulling = false;
    mat2.wireframe = false;
    mat2.diffuseTexture = new BABYLON.Texture("textures/spriteAtlas.png", scene);
    mat2.diffuseTexture.hasAlpha = true;

    var hSpriteNb2 =  6;  // 6 sprites per raw
    var vSpriteNb2 =  4;  // 4 sprite raws

    var faceUV2 = new Array(6);
    for (var i2 = 0; i2 < 6; i2++) {
        faceUV[i2] = new BABYLON.Vector4(i2/hSpriteNb2, i2/vSpriteNb2, (i2+1)/hSpriteNb2, (i2+1)/vSpriteNb2);
    }

    // var faceColors = new Array(6);
    //
    // faceColors[4] = new BABYLON.Color4(1,0,0,0.3);
    // faceColors[1] = new BABYLON.Color4(0,1,0,0.4);

    var options2 = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV2: faceUV2
        // faceColors2 : faceColors2
    };

    var box2 = BABYLON.MeshBuilder.CreateBox('box2', options2, scene);
    box2.material = mat;
    box2.position.y = -5;
    box2.position.z = 5;
    /*** End of Second Box ***/

    /*** Beginning Third Box ***/
    var mat3 = new BABYLON.StandardMaterial("mat1", scene);
    mat3.alpha = 1.0;
    mat3.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat3.backFaceCulling = false;
    mat3.wireframe = false;
    mat3.diffuseTexture = new BABYLON.Texture("textures/spriteAtlas.png", scene);
    mat3.diffuseTexture.hasAlpha = true;

    var hSpriteNb3 =  6;  // 6 sprites per raw
    var vSpriteNb3 =  4;  // 4 sprite raws

    var faceUV3 = new Array(6);
    for (var i3 = 0; i3 < 6; i3++) {
        faceUV[i3] = new BABYLON.Vector4(i3/hSpriteNb3, i3/vSpriteNb3, (i3+1)/hSpriteNb3, (i3+1)/vSpriteNb3);
    }

    // var faceColors = new Array(6);
    //
    // faceColors[4] = new BABYLON.Color4(1,0,0,0.3);
    // faceColors[1] = new BABYLON.Color4(0,1,0,0.4);

    var options3= {
        width: 10,
        height: 3,
        depth: 5,
        faceUV3: faceUV3
        // faceColors2 : faceColors2
    };

    var box3 = BABYLON.MeshBuilder.CreateBox('box3', options3, scene);
    box3.material = mat;
    box3.position.y = -5;
    box3.position.z = -5;
    /*** End of Third Box ***/

    /*** Beginning Fourth Box ***/
    var mat4 = new BABYLON.StandardMaterial("mat1", scene);
    mat4.alpha = 1.0;
    mat4.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat4.backFaceCulling = false;
    mat4.wireframe = false;
    mat4.diffuseTexture = new BABYLON.Texture("textures/spriteAtlas.png", scene);
    mat4.diffuseTexture.hasAlpha = true;

    var hSpriteNb4 =  6;  // 6 sprites per raw
    var vSpriteNb4 =  4;  // 4 sprite raws

    var faceUV4 = new Array(6);
    for (var i4 = 0; i4 < 6; i4++) {
        faceUV[i4] = new BABYLON.Vector4(i4/hSpriteNb4, i4/vSpriteNb4, (i4+1)/hSpriteNb4, (i4+1)/vSpriteNb4);
    }

    // var faceColors = new Array(6);
    //
    // faceColors[4] = new BABYLON.Color4(1,0,0,0.3);
    // faceColors[1] = new BABYLON.Color4(0,1,0,0.4);

    var options4= {
        width: 10,
        height: 3,
        depth: 5,
        faceUV4: faceUV4
        // faceColors2 : faceColors2
    };

    var box4 = BABYLON.MeshBuilder.CreateBox('box4', options4, scene);
    box4.material = mat;
    box4.position.y = -5;
    box4.position.x = 10;
    /*** End of Fourth Box ***/


    /*** Create Ground & Texture ***/
    var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 2, scene);
    var materialGround = new BABYLON.StandardMaterial("textureGround", scene);
    ground.material = materialGround;
    materialGround.diffuseTexture = new BABYLON.Texture("textures/grass.jpg", scene);
    ground.position.y = -10;



    /*** Begin Physics ***/
    scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());

    var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 10.0, 10.0, scene);
    sphere2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1 });
    ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box3.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    box4.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });

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
                for (var index = 0; index < 25; index++) {
                    var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 10, 0.5, scene);
                    sphere.material = materialAmiga;
                    sphere.position = new BABYLON.Vector3(0 + index / 10, 3, 5 + index / 10);
                    sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });
                }
            }
            // b for box
            if (evt.keyCode == 66) {
                for (var index = 0; index < 10; index++) {
                    var box0 = BABYLON.Mesh.CreateBox("Box0", 0.5, scene);
                    box0.position = new BABYLON.Vector3(0 + index / 5, 3, 5 + index / 5);
                    box0.material = materialWood;
                    box0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 4 });
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
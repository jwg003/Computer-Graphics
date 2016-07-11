var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Setup environment
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 190, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 350;
    camera.attachControl(canvas, true);

    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/Space", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    //  light1
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.intensity = 0.5;

    var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere.position = light.position;
    lightSphere.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);


    //var light0 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero(), 0, 0, scene);
    //light0.position = new BABYLON.Vector3(0, 30, -10);
    //light0.direction = new BABYLON.Vector3(0, -1, 0);
    //light0.angle = 0.8;
    //light0.exponent = 2;
    //light0.intensity = 0.5;

    // light2
    var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20), new BABYLON.Vector3(0, -1, 0), 10.0, 16, scene);
    light2.intensity = 1.5;

    var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    //lightSphere2.position = light2.position;
    //light2.position = lightSphere2;
    lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/groundgrayscale.jpg", 300, 300, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -2.05;
    ground.material = groundMaterial;

    // Torus
    var torus = BABYLON.Mesh.CreateTorus("torus", 4, 2, 30, scene, false);

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.getShadowMap().renderList.push(torus);
    shadowGenerator.useVarianceShadowMap = true;

    var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator2.getShadowMap().renderList.push(torus, torus2);
    shadowGenerator2.usePoissonSampling = true;


    //var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 0, 0), scene);
    //light.intensity = 0.7;

    var lightImpostor =  BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    var lightImpostorMat = new BABYLON.StandardMaterial("mat", scene);
    lightImpostor.material = lightImpostorMat;
    lightImpostorMat.emissiveColor = BABYLON.Color3.Yellow();
    lightImpostorMat.linkEmissiveWithDiffuse = true;

    lightImpostor.parent = light;

    var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.2, 128, 64, 4, 1, scene);
    var torus2 = BABYLON.Mesh.CreateTorus("torus", 8, 1, 32, scene, false);

    var torusMat = new BABYLON.StandardMaterial("mat", scene);
    torus2.material = torusMat;
    torusMat.diffuseColor = BABYLON.Color3.Red();

    var knotMat = new BABYLON.StandardMaterial("mat", scene);
    knot.material = knotMat;
    knotMat.diffuseColor = BABYLON.Color3.White();

    // Shadow
    var shadowGenerator3 = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator3.getShadowMap().renderList.push(knot, torus);
    shadowGenerator3.setDarkness(0.5);
    shadowGenerator3.usePoissonSampling = true;

    //container.receiveShadows = true;
    torus.receiveShadows = true;
    torus2.receiveShadows = true;
    ground.receiveShadows = true;

    // Animations
    var alpha = 0;
    scene.registerBeforeRender(function () {


        knot.rotation.y += 0.01;
        knot.rotation.x += 0.01;

        torus2.rotation.y += 0.05;
        torus2.rotation.z += 0.03;

        knot.position = new BABYLON.Vector3(Math.cos(alpha) * 20, 20, Math.sin(alpha) * 20);
        alpha += 0.01;

        torus2.position = new BABYLON.Vector3(Math.cos(alpha) * 20, 20, Math.sin(alpha) * 20);
        alpha += 0.01;


        //torus.rotation.x += 0.01;
        torus.rotation.z += 0.04;


        torus.position = new BABYLON.Vector3(Math.cos(alpha) * 50, 20, Math.sin(alpha) * 50);
        alpha += 0.01;
        light2.position = new BABYLON.Vector3(Math.cos(alpha) * 50, 20, Math.sin(alpha) * 50);
        alpha += 0.01;


    });

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
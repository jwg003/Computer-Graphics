
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    /*** Skybox ***/
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/Space", scene);
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
    light.intensity = 2;

    /*** Shaders ***/
    var waveMaterial = new BABYLON.ShaderMaterial("wave", scene, {
        vertexElement : "vertexShaderCode3",
        fragmentElement : "fragmentShaderCode3",
    }, {
        attributes : ["position", "normal", "uv"],
        uniforms : ["world", "worldView", "worldViewProjection", "view", "projection"]
    });
    waveMaterial.setTexture("textureSampler", new BABYLON.Texture("textures/ref.jpg", scene));

    var cartoonMaterial = new BABYLON.ShaderMaterial("amiga", scene, {
        vertexElement : "vertexShaderCode2",
        fragmentElement : "fragmentShaderCode2",
    }, {
        attributes : ["position", "normal", "uv"],
        uniforms : ["world", "worldView", "worldViewProjection"]
    });
    cartoonMaterial.setTexture("textureSampler", new BABYLON.Texture("textures/crate.png", scene));

    var amigaMaterial = new BABYLON.ShaderMaterial("amiga", scene, {
        vertexElement : "vertexShaderCode",
        fragmentElement : "fragmentShaderCode",
    }, {
        attributes : ["position", "normal", "uv"],
        uniforms : ["world", "worldView", "worldViewProjection"]
    });
    amigaMaterial.setTexture("textureSampler", new BABYLON.Texture("textures/amiga.jpg", scene));

    /*** Creating 1000 Random wavy Spheres ***/
    for (var i = 0; i < 1000; i++) {
        var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 5, scene);
        sphere.material = waveMaterial;
        sphere.position.x = Math.random() * 100 - 50;
        sphere.position.z = Math.random() * 100 - 50;
        sphere.material = waveMaterial;
    }

    /*** Creating 50 Random Box ***/
    for(var j = 0; j < 50; j++){
        var box = BABYLON.Mesh.CreateBox("box", 2.5, scene);
        box.material = cartoonMaterial;
        box.position.x = Math.random() * 100 - 50;
        box.position.z = Math.random() * 100 - 50;
        box.position.y = 4;
    }
    
    /*** Creating 50 Random Box ***/
    for(var k = 0; k < 50; k++){
        var box2 = BABYLON.Mesh.CreateBox("box", 2.5, scene);
        box2.material = amigaMaterial;
        box2.position.x = Math.random() * 100 - 50;
        box2.position.z = Math.random() * 100 - 50;
        box2.position.y = 8;
    }
    
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere", 16, 5, scene);
    sphere2.material = waveMaterial;
    sphere2.position = new BABYLON.Vector3(0, 10.0, 0);

    var box3 = BABYLON.Mesh.CreateBox("box", 2.5, scene);
    box3.material = amigaMaterial;
    box3.position = new BABYLON.Vector3(6, 10.0, 0);

    var box4 = BABYLON.Mesh.CreateBox("box", 2.5, scene);
    box4.material = cartoonMaterial;
    box4.position = new BABYLON.Vector3(-6, 10.0, 0);
    
    scene.registerBeforeRender(function() {
        sphere2.rotation.y += .02;
        box3.rotation.y += .02;
        box4.rotation.y += .02;
    });

    return scene;
};

var scene = createScene();

var time = 0;
engine.runRenderLoop(function () {
    var shaderMaterial = scene.getMaterialByName("wave");
    shaderMaterial.setFloat("time", time);
    time += 0.05;
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
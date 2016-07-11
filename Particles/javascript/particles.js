/**
 * Created by John on 2/8/2016.
 */

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var counter = 0;



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

    /*** Lighting ***/
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    /*** Camera ***/
    // ArcCamera Parameters : name, alpha, beta, radius, target, scene
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, -50), scene);

    camera.attachControl(canvas, true);

    camera.keysUp = [87]; //W
    camera.keysDown = [83]; //S
    camera.keysLeft = [65]; //A
    camera.keysRight = [68]; //D


    /*** Box Material ***/
    var materialBox = new BABYLON.StandardMaterial("Mat", scene);
    materialBox.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
    materialBox.diffuseTexture.hasAlpha = true;

    /*** USED to Doubleside things ***/
    //var sd = BABYLON.Mesh.DOUBLESIDE;

    /*** Particles ***/

    for(var i=0; i<10; i++)
    {

        var emitter0 = BABYLON.Mesh.CreateBox("emitter0", 0.1, scene);

        emitter0.position.x = Math.random() * 100 - 50;
        emitter0.position.y = Math.random() * 100 - 50;
        emitter0.position.z = Math.random() * 100 - 50;

        emitter0.isVisible = false;

        // Custom shader for particles
        BABYLON.Effect.ShadersStore["myParticleFragmentShader"] =
            "#ifdef GL_ES\n" +
            "precision highp float;\n" +
            "#endif\n" +

            "varying vec2 vUV;\n" +                     // Provided by babylon.js
            "varying vec4 vColor;\n" +                  // Provided by babylon.js

            "uniform sampler2D diffuseSampler;\n" +     // Provided by babylon.js
            "uniform float time;\n" +                   // This one is custom so we need to declare it to the effect

            "void main(void) {\n" +
            "vec2 position = vUV;\n" +

            "float color = 0.0;\n" +
            "vec2 center = vec2(0.5, 0.5);\n" +

            "color = sin(distance(position, center) * 10.0+ time * vColor.g);\n" +

            "vec4 baseColor = texture2D(diffuseSampler, vUV);\n" +

            "gl_FragColor = baseColor * vColor * vec4( vec3(color, color, color), 1.0 );\n" +
            "}\n" +
            "";

        // Effect
        var effect = engine.createEffectForParticles("myParticle", ["time"]);

        // Particles
        var particleSystem = new BABYLON.ParticleSystem("particles", 4000, scene, effect);
        particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 1.0;
        particleSystem.minLifeTime = 0.5;
        particleSystem.maxLifeTime = 5.0;
        particleSystem.minEmitPower = 0.5;
        particleSystem.maxEmitPower = 3.0;
        particleSystem.emitter = emitter0;
        particleSystem.emitRate = 100;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        particleSystem.direction1 = new BABYLON.Vector3(-1, 1, -1);
        particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
        particleSystem.color1 = new BABYLON.Color4(1, 1, 0, 1);
        particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1);
        particleSystem.gravity = new BABYLON.Vector3(0, -1.0, 0);
        particleSystem.start();

        var time = 0;
        var order = 0.1;
        scene.registerBeforeRender(function () {
            fountain.rotation.x += 1.00;
            // Waiting for effect to be compiled
            if (!effect) {
                return;
            }

            effect.setFloat("time", time);

            time += order;

            if (time > 100 || time < 0) {
                order *= -1;
            }
        });


        var fountain = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        fountain.material = materialBox;
        fountain.position.y = 2;
        fountain.isVisible = false;

        fountain.position.x = Math.random() * 100 - 50;
        fountain.position.y = Math.random() * 100 - 50;
        fountain.position.z = Math.random() * 100 - 50;


        var particleSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);

        particleSystem2.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
        particleSystem2.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
        particleSystem2.emitter = fountain;

        particleSystem2.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all From
        particleSystem2.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

        // Colors of all particles (splited in 2 + specific color before dispose)
        particleSystem2.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem2.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem2.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...)
        particleSystem2.minSize = 0.1;
        particleSystem2.maxSize = 0.5;

        // Life time of each particle (random between...)
        particleSystem2.minLifeTime = 0.3;
        particleSystem2.maxLifeTime = 3.5;

        particleSystem2.emitRate = 1000;

        //Set the gravity of all particles (not necessarily down)
        particleSystem2.gravity = new BABYLON.Vector3(0, -9.81, 0);

        particleSystem2.direction1 = new BABYLON.Vector3(-7, 8, 3);
        particleSystem2.direction2 = new BABYLON.Vector3(7, 8, -3);


        particleSystem2.minAngularSpeed = 0;
        particleSystem2.maxAngularSpeed = Math.PI;
        particleSystem2.start();


    }


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
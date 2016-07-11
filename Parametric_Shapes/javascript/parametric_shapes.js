var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

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



    var camera = new BABYLON.ArcRotateCamera("Camera", 3 *Math.PI / 2, Math.PI / 2, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    // lights
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.groundColor = new BABYLON.Color3(0.2, 0.2, 0.5);
    light.intensity = 0.6;


    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-20, 0, -20), scene);
    light2.diffuse = BABYLON.Color3.White();
    light2.specular = BABYLON.Color3.Green();
    light2.intensity = 0.6;


    // material
    var mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat.backFaceCulling = false;
    //mat.wireframe = true;


    // cubic Bézier function
    // cubicBezier(vector3Origin, vector3Control1, vector3Control2, vector3Destination, segmentNumber)
    var cubicBezier = function(v0, v1, v2, v3, nb) {
        var bez = [];
        var step = 1 / nb;
        var equation = function(t, val0, val1, val2, val3) {
            var res = (1 -t)*(1-t)*(1-t) * val0 + 3 * t * (1-t)*(1-t) * val1 + 3 * t*t *(1-t) * val2 + t*t*t * val3;
            return res;
        };
        for(var i = 0; i <= 1; i += step) {
            bez.push( new BABYLON.Vector3(equation(i, v0.x, v1.x, v2.x, v3.x), equation(i, v0.y, v1.y, v2.y, v3.y), equation(i, v0.z, v1.z, v2.z, v3.z)) );
        }
        bez.push(v3);
        return bez;
    };

    var populatePath = function(p) {
        var pi2 = Math.PI * 2;
        var i = p / 25 ;
        var path = cubicBezier( new BABYLON.Vector3(3 * Math.cos(pi2 * i),-10, 3 * Math.sin(pi2 *i)),
            new BABYLON.Vector3(12 * Math.cos(pi2 * i), p/5 ,10 * Math.sin(pi2 * i)),
            new BABYLON.Vector3(15 * Math.cos(pi2 * i), p/2 ,8 * Math.sin(pi2 * i)),
            new BABYLON.Vector3(3 * Math.cos(pi2 * i), 10, 3 * Math.sin(pi2 * i)), 50);
        return path;
    };

    // path visualizer helper
    var showPath = function(path, scene) {
        var line = BABYLON.Mesh.CreateLines("line", path, scene )
    };

    var paths = [];
    for (var p = 0; p < 20; p++) {
        paths[p] = populatePath(p);
        //showPath(paths[p], scene);
    }

    var ribbon = new BABYLON.Mesh.CreateRibbon("ribbon", paths, true, true, null, scene);
    ribbon.material = mat;

    scene.registerBeforeRender(function(){
        light2.position = camera.position;
    });






    var mat2 = new BABYLON.StandardMaterial("mat1", scene);
    mat2.alpha = 1.0;
    mat2.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat2.backFaceCulling = false;
    mat2.wireframe = false;


    var curvePoints = function(l, t) {
        var path = [];
        var step = l / t;
        var a = 5;
        for (var i = -l/2; i < l/2; i += step ) {
            path.push( new BABYLON.Vector3(5 * Math.sin(i*t / 400), i, 5 * Math.cos(i*t / 400)) );
        }
        return path;
    };

    var curve = curvePoints(40, 100);

    var tube = BABYLON.Mesh.CreateTube("tube", curve, 2, 60, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
    tube.material = mat2;

    tube.position = new BABYLON.Vector3(18,0,0);




    var curvePoints2 = function(l, t) {
        var path2 = [];
        var step2 = l / t;
        var a2 = 5;
        for (var i = -l/2; i < l/2; i += step2 ) {
            path2.push( new BABYLON.Vector3(5 * Math.sin(i*t / 400), i, 5 * Math.cos(i*t / 400)) );
        }
        return path2;
    };

    var curve2 = curvePoints(40, 100);

    var tube2 = BABYLON.Mesh.CreateTube("tube2", curve2, 2, 60, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
    tube2.material = mat2;

    tube2.position = new BABYLON.Vector3(-18,0,0);




    // show axis
    var showAxis = function(size) {
        var makeTextPlane = function(text, color, size) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
            var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
            return plane;
        };

        var axisX = BABYLON.Mesh.CreateLines("axisX", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        var xChar = makeTextPlane("X", "red", size / 10);
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ], scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        var yChar = makeTextPlane("Y", "green", size / 10);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
        ], scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
        var zChar = makeTextPlane("Z", "blue", size / 10);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    };



    // shape
    var shape = [
        new BABYLON.Vector3(1, 1, 0),
        new BABYLON.Vector3(0.2, 1.3, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(-0.2, 1.3, 0),
        new BABYLON.Vector3(-1, 1, 0),
    ];


    //var shapeline = BABYLON.Mesh.CreateLines("sl", shape, scene);
    //shapeline.color = BABYLON.Color3.Yellow();


    var path3 = [];
    for(var i = 0; i < 100; i++) {
        var point = new BABYLON.Vector3(i / 5 - 10, i / 5 - 10, 0);
        path3.push(point);
    }

    //var pathline = BABYLON.Mesh.CreateLines("pl", path3, scene);
    //pathline.color = BABYLON.Color3.Magenta();

    var extruded = BABYLON.Mesh.ExtrudeShape("extruded", shape, path3, 0.5, Math.PI / 5 , 0, scene);
    extruded.material = mat;


    showAxis(5);

    ribbon.position = new BABYLON.Vector3(0,-18,0);

    scene.registerBeforeRender(function () {

        ribbon.rotation.y += 0.04;
        extruded.rotation.x += 0.04;
        extruded.rotation.y += 0.04;
        extruded.rotation.z += 0.04;
        tube.rotation.y += 0.04;
        tube2.rotation.y += 0.04;
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
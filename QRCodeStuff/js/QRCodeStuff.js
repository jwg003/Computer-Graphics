$(document).ready(function() {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var BLOCK_SIZE = 8;
    var QRCodeView = false;
    var freeCamera,
        canvas,
        engine,
        lovescene;
    var camPositionInLab,
        camRotationInLab;

    function createQRCodeMaze(ProfessorName) {

        // It needs a HTML element to work with
        var qrcode = new QRCode(document.createElement("div"), {
            width : 400,
            height : 400
        });

        qrcode.makeCode(ProfessorName + ", HELLO!!!!");

        // needed to set the proper size of the playground
        var mCount = qrcode._oQRCode.moduleCount;

        var scene = new BABYLON.Scene(engine);
        scene.gravity = new BABYLON.Vector3(0, -0.8, 0);
        scene.collisionsEnabled = true;
        scene.enablePhysics(new BABYLON.Vector3(0, 0, 0));

        freeCamera = new BABYLON.FreeCamera("free", new BABYLON.Vector3(0, 5, 0), scene);
        freeCamera.minZ = 1;
        freeCamera.checkCollisions = true;
        freeCamera.applyGravity = true;
        freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        freeCamera.attachControl(canvas);
        freeCamera.speed = .5;
        //Ellipsoid for contact w/ ground

        //Lights
        var light0 = new BABYLON.PointLight("pointlight0", new BABYLON.Vector3(28, 78, 385), scene);
        light0.diffuse = new BABYLON.Color3(0.5137254901960784, 0.2117647058823529, 0.0941176470588235);
        light0.intensity = 0.2;

        var light1 = new BABYLON.PointLight("pointlight1", new BABYLON.Vector3(382, 96, 4), scene);
        light1.diffuse = new BABYLON.Color3(1, 0.7333333333333333, 0.3568627450980392);
        light1.intensity = 0.2;

        // Ground
        var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.emissiveTexture = new BABYLON.Texture("textures/arroway.de_tiles-35_d100.jpg", scene);
        groundMaterial.emissiveTexture.uScale = mCount;
        groundMaterial.emissiveTexture.vScale = mCount;
        groundMaterial.bumpTexture = new BABYLON.Texture("textures/arroway.de_tiles-35_b010.jpg", scene);
        groundMaterial.bumpTexture.uScale = mCount;
        groundMaterial.bumpTexture.vScale = mCount;
        groundMaterial.specularTexture = new BABYLON.Texture("textures/arroway.de_tiles-35_s100-g100-r100.jpg", scene);
        groundMaterial.specularTexture.uScale = mCount;
        groundMaterial.specularTexture.vScale = mCount;

        //Use mCount + 2 so tehre is a white border around the qr code
        var ground = BABYLON.Mesh.CreateGround("ground", (mCount + 2) * BLOCK_SIZE, (mCount + 2) * BLOCK_SIZE, 1, scene, false);
        ground.material = groundMaterial;
        ground.checkCollisions = true;
        ground.setPhysicsState({
            impostor : BABYLON.PhysicsEngine.PlaneImpostor,
            mass : 0,
            friction : 0.5,
            restitution : 0.7
        });

        //Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        var row = 15;
        var col = 20;

        var cubeTopMaterial = new BABYLON.StandardMaterial("cubeTop", scene);
        cubeTopMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.15);

        var cubeWallMaterial = new BABYLON.StandardMaterial("cubeWalls", scene);
        cubeWallMaterial.emissiveTexture = new BABYLON.Texture("textures/masonry-wall-texture.jpg", scene);
        cubeWallMaterial.bumpTexture = new BABYLON.Texture("textures/masonry-wall-bump-map.jpg", scene);
        cubeWallMaterial.specularTexture = new BABYLON.Texture("textures/masonry-wall-normal-map.jpg", scene);

        var cubeMultiMat = new BABYLON.MultiMaterial("cubeMulti", scene);
        cubeMultiMat.subMaterials.push(cubeTopMaterial);
        cubeMultiMat.subMaterials.push(cubeWallMaterial);

        var soloCube = BABYLON.Mesh.CreateBox("mainCube", BLOCK_SIZE, scene);
        soloCube.subMeshes = [];
        soloCube.subMeshes.push(new BABYLON.SubMesh(0, 0, 4, 0, 6, soloCube));
        soloCube.subMeshes.push(new BABYLON.SubMesh(1, 4, 20, 6, 30, soloCube));
        soloCube.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, -Math.PI / 2, 0);
        soloCube.material = cubeMultiMat;
        soloCube.checkCollisions = true;
        soloCube.setEnabled(false);

        var topCube = BABYLON.Mesh.CreatePlane("ground", BLOCK_SIZE, scene, false);
        topCube.material = cubeTopMaterial;
        topCube.rotation.x = Math.PI / 2;
        topCube.setEnabled(false);

        var mainCube = BABYLON.Mesh.CreateBox("mainCube", BLOCK_SIZE, scene);
        mainCube.material = cubeWallMaterial;
        mainCube.checkCollisions = true;
        mainCube.setEnabled(false);

        var cube,
            top;
        var cubesCollection = [];
        var cubesTopCollection = [];
        var cubeOnLeft,
            cubeOnRight,
            cubeOnUp,
            cubeOnDown;

        for (var row = 0; row < mCount; row++) {
            for (var col = 0; col < mCount; col++) {
                if (qrcode._oQRCode.isDark(row, col)) {
                    var cubePosition = new BABYLON.Vector3(BLOCK_SIZE / 2 + (row - (mCount / 2)) * BLOCK_SIZE, BLOCK_SIZE / 2, BLOCK_SIZE / 2 + (col - (mCount / 2)) * BLOCK_SIZE);

                    cubeOnLeft = cubeOnRight = cubeOnUp = cubeOnDown = false;
                    if (col > 0) {
                        cubeOnLeft = qrcode._oQRCode.isDark(row, col - 1);
                    }
                    if (col < mCount - 1) {
                        cubeOnRight = qrcode._oQRCode.isDark(row, col + 1);
                    }
                    if (row > 0) {
                        cubeOnUp = qrcode._oQRCode.isDark(row - 1, col);
                    }
                    if (row < mCount - 1) {
                        cubeOnDown = qrcode._oQRCode.isDark(row + 1, col);
                    }

                    if (cubeOnLeft || cubeOnRight || cubeOnUp || cubeOnDown) {
                        cube = mainCube.clone("Cube" + row + col);
                        cube.position = cubePosition.clone();
                        top = topCube.clone("TopCube" + row + col);
                        top.position = cubePosition.clone();
                        top.position.y = BLOCK_SIZE + 0.05;
                        cubesCollection.push(cube);
                        cubesTopCollection.push(top);
                    } else {
                        cube = soloCube.clone("SoloCube" + row + col);
                        cube.position = cubePosition.clone();
                        cube.setPhysicsState({
                            impostor : BABYLON.PhysicsEngine.BoxImpostor,
                            mass : 2,
                            friction : 0.4,
                            restitution : 0.3
                        });
                    }
                }
            }
        }

        var maze = mergeMeshes("maze", cubesCollection, scene);
        maze.checkCollisions = true;
        maze.material = cubeWallMaterial;

        var mazeTop = mergeMeshes("mazeTop", cubesTopCollection, scene);
        mazeTop.material = cubeTopMaterial;

        var x = BLOCK_SIZE / 2 + (7 - (mCount / 2)) * BLOCK_SIZE;
        var y = BLOCK_SIZE / 2 + (1 - (mCount / 2)) * BLOCK_SIZE;
        freeCamera.position = new BABYLON.Vector3(x, 5, y);

        var animateCameraPositionAndRotation = function(freeCamera, fromPosition, toPosition, fromRotation, toRotation) {

            var animCamPosition = new BABYLON.Animation("animCam", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            var keysPosition = [];
            keysPosition.push({
                frame : 0,
                value : fromPosition
            });
            keysPosition.push({
                frame : 100,
                value : toPosition
            });

            animCamPosition.setKeys(keysPosition);

            var animCamRotation = new BABYLON.Animation("animCam", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            var keysRotation = [];
            keysRotation.push({
                frame : 0,
                value : fromRotation
            });
            keysRotation.push({
                frame : 100,
                value : toRotation
            });

            animCamRotation.setKeys(keysRotation);
            freeCamera.animations.push(animCamPosition);
            freeCamera.animations.push(animCamRotation);

            scene.beginAnimation(freeCamera, 0, 100, false);
        };

        window.addEventListener("keydown", function(event) {
            if (event.keyCode === 32) {
                if (!QRCodeView) {
                    QRCodeView = true;
                    // Saving current position & rotation in the maze
                    camPositionInLabyrinth = freeCamera.position;
                    camRotationInLabyrinth = freeCamera.rotation;
                    animateCameraPositionAndRotation(freeCamera, freeCamera.position, new BABYLON.Vector3(16, 400, 15), freeCamera.rotation, new BABYLON.Vector3(1.4912565104551518, -1.5709696842019767, freeCamera.rotation.z));
                } else {
                    QRCodeView = false;
                    animateCameraPositionAndRotation(freeCamera, freeCamera.position, camPositionInLabyrinth, freeCamera.rotation, camRotationInLabyrinth);
                }
                freeCamera.applyGravity = !QRCodeView;
            }
        }, false);

        canvas.addEventListener("mousedown", function(evt) {
            var pickResult = scene.pick(evt.clientX, evt.clientY);
            if (pickResult.hit) {
                var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
                dir.normalize();
                pickResult.pickedMesh.applyImpulse(dir.scale(50), pickResult.pickedPoint);
            }
        });

        return scene;

    }

    var mergeMeshes = function(meshName, arrayObj, scene) {
        var arrayPos = [];
        var arrayNormal = [];
        var arrayUv = [];
        var arrayUv2 = [];
        var arrayColor = [];
        var arrayMatricesIndices = [];
        var arrayMatricesWeights = [];
        var arrayIndice = [];
        var savedPosition = [];
        var savedNormal = [];
        var newMesh = new BABYLON.Mesh(meshName, scene);
        var UVKind = true;
        var UV2Kind = true;
        var ColorKind = true;
        var MatricesIndicesKind = true;
        var MatricesWeightsKind = true;

        for (var i = 0; i != arrayObj.length; i++) {
            if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.UVKind]))
                UVKind = false;
            if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.UV2Kind]))
                UV2Kind = false;
            if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.ColorKind]))
                ColorKind = false;
            if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.MatricesIndicesKind]))
                MatricesIndicesKind = false;
            if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.MatricesWeightsKind]))
                MatricesWeightsKind = false;
        }

        for ( i = 0; i != arrayObj.length; i++) {
            var ite = 0;
            var iter = 0;
            arrayPos[i] = arrayObj[i].getVerticesData(BABYLON.VertexBuffer.PositionKind);
            arrayNormal[i] = arrayObj[i].getVerticesData(BABYLON.VertexBuffer.NormalKind);
            if (UVKind)
                arrayUv = arrayUv.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.UVKind));
            if (UV2Kind)
                arrayUv2 = arrayUv2.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.UV2Kind));
            if (ColorKind)
                arrayColor = arrayColor.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.ColorKind));
            if (MatricesIndicesKind)
                arrayMatricesIndices = arrayMatricesIndices.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind));
            if (MatricesWeightsKind)
                arrayMatricesWeights = arrayMatricesWeights.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind));

            var maxValue = savedPosition.length / 3;

            arrayObj[i].computeWorldMatrix(true);
            var worldMatrix = arrayObj[i].getWorldMatrix();

            for (var ite = 0; ite != arrayPos[i].length; ite += 3) {
                var vertex = new BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(arrayPos[i][ite], arrayPos[i][ite + 1], arrayPos[i][ite + 2]), worldMatrix);
                savedPosition.push(vertex.x);
                savedPosition.push(vertex.y);
                savedPosition.push(vertex.z);
            }

            for (var iter = 0; iter != arrayNormal[i].length; iter += 3) {
                var vertex = new BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(arrayNormal[i][iter], arrayNormal[i][iter + 1], arrayNormal[i][iter + 2]), worldMatrix);
                savedNormal.push(vertex.x);
                savedNormal.push(vertex.y);
                savedNormal.push(vertex.z);
            }

            var tmp = arrayObj[i].getIndices();
            for ( it = 0; it != tmp.length; it++) {
                arrayIndice.push(tmp[it] + maxValue);
            }
            arrayIndice = arrayIndice.concat(tmp);

            arrayObj[i].dispose(false);
        }

        newMesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, savedPosition, false);
        newMesh.setVerticesData(BABYLON.VertexBuffer.NormalKind, savedNormal, false);
        if (arrayUv.length > 0)
            newMesh.setVerticesData(BABYLON.VertexBuffer.UVKind, arrayUv, false);
        if (arrayUv2.length > 0)
            newMesh.setVerticesData(BABYLON.VertexBuffer.UV2Kind, arrayUv, false);
        if (arrayColor.length > 0)
            newMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, arrayUv, false);
        if (arrayMatricesIndices.length > 0)
            newMesh.setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, arrayUv, false);
        if (arrayMatricesWeights.length > 0)
            newMesh.setVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind, arrayUv, false);

        newMesh.setIndices(arrayIndice);
        return newMesh;
    };

    var scene = createQRCodeMaze("McG");
    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });
});

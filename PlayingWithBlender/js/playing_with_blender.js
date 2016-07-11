if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    BABYLON.SceneLoader.Load("", "PlayingWithObjects.babylon", engine, function (scene) {
        // Wait for textures and shaders to be ready
        scene.executeWhenReady(function () {
            // Attach camera to canvas inputs

            /*** Camera ***/
            scene.activeCamera = new BABYLON.ArcRotateCamera("Camera", 3 *Math.PI / 2, Math.PI / 3, 30, BABYLON.Vector3.Zero(), scene);
            scene.activeCamera.attachControl(canvas);

            var plane = BABYLON.Mesh.CreatePlane("plane", 15, scene);
            plane.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

            var box = BABYLON.MeshBuilder.CreateBox("box", {width: 5, height: 0.3, depth: 5}, scene);
            box.position = new BABYLON.Vector3(-5.5, 4, 6);
            box.rotation = new BABYLON.Vector3(0, 0, -1);

            var materialBox = new BABYLON.StandardMaterial("texture1", scene);
            materialBox.diffuseColor = new BABYLON.Color3(0.800, 0.487, 0.030);
            box.material = materialBox;


            /*** Begin Physics ***/
            scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.OimoJSPlugin());

            plane.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
            box.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0, friction: 0.5, restitution: 0.7 });

            var meshesColliderList = [];

            for (var j = 1; j < scene.meshes.length; j++) {
                if (scene.meshes[j].checkCollisions && scene.meshes[j].isVisible === false) {
                    scene.meshes[j].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0,
                        friction: 0.5, restitution: 0.7 });
                    meshesColliderList.push(scene.meshes[j]);
                }
            }
            /*** End Physics ***/


            // Once the scene is loaded, just register a render loop to render it
            engine.runRenderLoop(function() {
                scene.render();
            });
        });
    }, function (progress) {
        // To do: give progress feedback to user
    });
}
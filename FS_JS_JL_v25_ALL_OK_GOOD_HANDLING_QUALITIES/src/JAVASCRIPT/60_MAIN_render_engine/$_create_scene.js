// External scene creation function
function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine)

  // Set the background color to light blue
  scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.9) // Light blue

  // Create a camera
  const camera = new BABYLON.ArcRotateCamera("Camera", -1.2, 1.6,100, new BABYLON.Vector3(170, 110, -70), scene)

            // Create a camera attached to the cube (cube's point of view)
            const pilotCamera = new BABYLON.UniversalCamera('pilotCamera', new BABYLON.Vector3(-15, 2, 0), scene)
            // Rotate the camera around the Y axis (yaw) by 90 degrees (π/2 radians)
            pilotCamera.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

            scene.activeCamera = camera;
  

  camera.fov = 0.647
  //camera.upVector = new BABYLON.Vector3(0, 0, 1)
  //camera.rotation.z = Math.PI / 2
  camera.attachControl(canvas, true)
  camera.upperBetaLimit = Math.PI
  camera.lowerBetaLimit = 0
  camera.lowerAlphaLimit = null
  camera.upperAlphaLimit = null
  camera.inertia = 0.9
  camera.lowerRadiusLimit = 0.2
  camera.upperRadiusLimit = 150
  camera.wheelPrecision = 40

  // Lights setup
  const lightDown = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene)
  lightDown.intensity = 0.4

  const lightUp = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 1), scene)
  lightUp.intensity = 0.2

  // Directional light for shadows
  const directionalLight = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(-1, -2, -1), scene)
  directionalLight.position = new BABYLON.Vector3(5, 10, 5)
  directionalLight.intensity = 0.7

  // Shadow generator
  const shadowGenerator = new BABYLON.ShadowGenerator(2048, directionalLight)
  shadowGenerator.useBlurExponentialShadowMap = true // Enable soft shadows
  shadowGenerator.blurKernel = 32 // Control shadow softness

  // Create ground plane and grid
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 2000, height: 2000 }, scene)
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene)
  groundMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.8) // Light green
  ground.material = groundMaterial
  ground.receiveShadows = true


  create_world_scenary(scene, shadowGenerator)  // create world scenary elements (grid, trees, etc...)

  // Create the manual aircraft model
  createAircraft(shadowGenerator)

  pilotCamera.parent = aircraft; // Make the camera follow the cube
          // Set the active camera initially to global view
  

  // Handle .OBJ file input
  document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0]
    if (file && file.name.endsWith(".obj")) {
      // Modify the following scale and rotation values as needed (values below tailored to business jet)
      const scaleFactor = 0.01 // Example scale factor
      const rotationX = -90 // Rotation in degrees around X-axis
      const rotationY = 90 // Rotation in degrees around Y-axis
      const rotationZ = 180 // Rotation in degrees around Z-axis

      loadObjFile(file, scaleFactor, rotationX, rotationY, rotationZ)
    } else {
      alert("Please select a valid .obj file")
    }
  })

  // Create velocity and force vector lines
  createVelocityLine()
  createForceLine()

  // Create GUI overlay
  createGUI()

  return scene
}

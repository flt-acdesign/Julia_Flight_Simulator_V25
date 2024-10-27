

// aggregate of all elements in scenary
function create_world_scenary(scene, shadowGenerator) {

    createGrid(scene) // Create grid on the ground
    create_reference_cube(scene, shadowGenerator) // Create a red cube for reference

    // Create random trees
    createRandomTrees(scene, shadowGenerator)
}



// Helper function to create a grid on the ground
function createGrid(scene) {
    const gridLines = []
    const gridSize = 2000
    const step = 10
  
    for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
      gridLines.push([new BABYLON.Vector3(i, 0, -gridSize / 2), new BABYLON.Vector3(i, 0, gridSize / 2)])
  
      gridLines.push([new BABYLON.Vector3(-gridSize / 2, 0, i), new BABYLON.Vector3(gridSize / 2, 0, i)])
    }
  
    gridLines.forEach(function (linePoints) {
      const gridLine = BABYLON.MeshBuilder.CreateLines("gridLine", { points: linePoints }, scene)
      gridLine.color = new BABYLON.Color3(0.5, 0.5, 0.7) // Dark grey for grid
    })
  }
  
  // Helper function to create random trees
  function createRandomTrees(scene, shadowGenerator) {
    const treeCount = 50 // Number of trees
    for (let i = 0; i < treeCount; i++) {
      const treeHeight = Math.random() * 4 + 2 // Random height between 2 and 6
      const treeBaseRadius = Math.random() * 1 + 1 // Random radius between 1 and 2
  
      const tree = BABYLON.MeshBuilder.CreateCylinder(
        "tree",
        {
          diameterTop: 0,
          diameterBottom: treeBaseRadius,
          height: treeHeight,
          tessellation: 8,
        },
        scene
      )
  
      const xPos = Math.random() * 180 - 90
      const zPos = Math.random() * 180 - 90
      tree.position = new BABYLON.Vector3(xPos, treeHeight / 2, zPos)
  
      const treeMaterial = new BABYLON.StandardMaterial("treeMaterial", scene)
      treeMaterial.diffuseColor = new BABYLON.Color3(0.13, 0.55, 0.13) // Forest green
      tree.material = treeMaterial
  
      shadowGenerator.addShadowCaster(tree)
    }
  }
  

  function create_reference_cube(scene, shadowGenerator) {
    // Create a red cube for reference
    const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 2 }, scene)
    cube.position = new BABYLON.Vector3(0, 1, 0) // Position above the ground
    const cubeMaterial = new BABYLON.StandardMaterial("cubeMaterial", scene)
    cubeMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0) // Red color
    cube.material = cubeMaterial
    shadowGenerator.addShadowCaster(cube)
  }

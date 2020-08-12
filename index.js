var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let scale = 1;
let material =1;
let shape = 1;
document.addEventListener("click", klik);
document.addEventListener("keydown", keyf);
function klik(e) {}

//https://burtonsmediagroup.com/blog/changing-the-skybox-and-ground-settings-in-babylon-js/
/******* Add the create scene function ******/
var createScene = function () 
{
var scene = new BABYLON.Scene(engine);
var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, 0), scene);
camera.speed = 0.1;
camera.minZ =0.1;
// Targets the camera to a particular position. In this case the scene origin
camera.setTarget(BABYLON.Vector3.Zero());
// Attach the camera to the canvas
camera.attachControl(canvas, true);
var light = new BABYLON.HemisphericLight("light",  new BABYLON.Vector3(0, 1, 0),  scene);

	// Sky material
	var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
        //skyboxMaterial._cachedDefines.FOG = true;
        skyboxMaterial.luminance = 0.01;
        skyboxMaterial.inclination = 0.2; // The solar inclination, related to the solar azimuth in interval [0, 1]
skyboxMaterial.azimuth = 0.2; // The solar azimuth in interval [0, 1]

	// Sky mesh (box)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;
	
return scene;
};
/******* End of the create scene function ******/



var scene = createScene(); //Call the createScene function

let meshes = [3];

meshes[0] = new M(scene);
meshes[1] = new M(scene);
meshes[2] = new M(scene);



meshes[0].addCursor(BABYLON.MeshBuilder.CreateBox("box", {height: 1, width:10,depth:10},scene));

//meshes[0].mCSG.position.y = -30;
addall();



let cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 0.5 },scene);


function keyf(e) {
        let p = scene.cameras[0].position;  
        let ray = scene.cameras[0].getForwardRay(200);
        let int = scene.pickWithRay(ray);


if (e.keyCode == 73)
        {
 material = material +1;
 material = material % 3;

        }


if (e.keyCode == 80)
{
        shape += 1;
        shape = shape % 3;
        if (shape == 0)
        {   
        scene.removeMesh(cursor);
        cursor = BABYLON.MeshBuilder.CreateBox("box", {height: scale/5, width: scale/5, depth:scale/5},scene);
        }

        if (shape == 1)
        {
        scene.removeMesh(cursor);   
        cursor = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: scale/5, radius: scale/5, subdivisions:1},scene);
        }

        if(shape ==2)
        {
        scene.removeMesh(cursor);
        cursor = BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:scale/5, subdivisions:1},scene);
        }


        addall();    
}

if (e.keyCode == 79)
        {
        scene.removeMesh(cursor);
        scale += 1;
        scale = scale % 7 +1;
 
        if (shape == 0)
        {   
        scene.removeMesh(cursor);
        cursor = BABYLON.MeshBuilder.CreateBox("box", {height: scale/5, width: scale/5, depth:scale/5},scene);
        }

        if (shape == 1)
        {
        scene.removeMesh(cursor);   
        cursor = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: scale/5, radius: scale/5, subdivisions:1},scene);
        }

        if(shape ==2)
        {
        scene.removeMesh(cursor);
        cursor = BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:scale/5, subdivisions:1},scene);
        }

        addall();
        }



if (e.keyCode == 76)
{
        meshes.forEach(function(m)
        {
        m.subCursor(cursor.clone());
        });
        addall();
       }
       
if (e.keyCode == 75)
{
        meshes.forEach(function(m)
        {
        m.subCursor(cursor.clone());
        });
 
      meshes[material].addCursor(cursor.clone());  
      addall();

}
     


}







// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        let ray = scene.cameras[0].getForwardRay(200);
      scene.removeMesh(cursor);
        let int = scene.pickWithRay(ray);
     scene.addMesh(cursor);
let rt =5;
       
        if (int.pickedPoint){
                cursor.position.x= Math.round(int.pickedPoint.x*rt)/rt;
                cursor.position.y= Math.round(int.pickedPoint.y*rt)/rt;
                cursor.position.z=Math.round(int.pickedPoint.z*rt)/rt;

        }
        else{
        let l = new BABYLON.Vector3(5,5,5);
        cursor.position= scene.cameras[0].position.add( ray.direction.multiply(l));
        cursor.position.x= Math.round(cursor.position.x*rt)/rt;
        cursor.position.y= Math.round(cursor.position.y*rt)/rt;
        cursor.position.z=Math.round(cursor.position.z*rt)/rt;

}


        scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});


function addall(){

     for (let i = 0; i < meshes.length;i++){
        if ( scene.meshes[i+1]){
        scene.meshes[i+1].dispose();}
        
        
        scene.meshes[i+1] =meshes[i].mCSG.toMesh();

        if (i == 0)
        {
        scene.meshes[i+1].material = new BABYLON.StandardMaterial("myMaterial", scene);
        scene.meshes[i+1].material.diffuseColor = new BABYLON.Color4(0.5, 0.8, 0.6, 0.8);
        }

        if (i == 1)
        {
        scene.meshes[i+1].material = new BABYLON.StandardMaterial("myMaterial", scene);
        scene.meshes[i+1].material.diffuseColor = new BABYLON.Color4(0.1, 0.8, 0.6, 0.8);
        }




     }

}
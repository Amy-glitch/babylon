var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
document.addEventListener("click", klik);
document.addEventListener("keydown", keyf);
function klik(e) {}


/******* Add the create scene function ******/
var createScene = function () 
{
var scene = new BABYLON.Scene(engine);
var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
camera.speed = 0.1;
camera.minZ =0.1;
// Targets the camera to a particular position. In this case the scene origin
camera.setTarget(BABYLON.Vector3.Zero());
// Attach the camera to the canvas
camera.attachControl(canvas, true);
var light = new BABYLON.HemisphericLight("light",  new BABYLON.Vector3(1, 1, 0),  scene);

	
return scene;
};
/******* End of the create scene function ******/



var scene = createScene(); //Call the createScene function

let meshes = [2];

meshes[0] = new M(scene);
meshes[1] = new M(scene);

meshes[1].mCSG = BABYLON.CSG.FromMesh(BABYLON.Mesh.CreateCylinder("cylinder", 0.6, 0.1, 0.2, 8, 1, scene, false));




let c = new M( scene);

addall();
//let cursor = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.2}, scene);

//let cursor =  BABYLON.Mesh.CreateCylinder("cylinder", 0.6, 0.1, 0.2, 8, 1, scene, false);

let cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 0.5 },scene);


function keyf(e) {
        let p = scene.cameras[0].position;  
        let ray = scene.cameras[0].getForwardRay(200);
        let int = scene.pickWithRay(ray);




      
if (int.pickedPoint){
            

 }


if (e.keyCode == 76)
{
     //   c.subCylinder({x:cursor.position.x,y:cursor.position.y,z:cursor.position.z,h:3,t:3,b:3});  c.final(); console.log('d'); 
     
     meshes.forEach(function(m){
        m.subCursor(cursor.clone());
        
             });
     
     c.subCursor(cursor.clone());
       }
       
if (e.keyCode == 75)
{
     //c.addCylinder({x:cursor.position.x,y:cursor.position.y,z:cursor.position.z,h:3,t:1,b:1}); 
      //c.addSphere({x:cursor.position.x,y:cursor.position.y,z:cursor.position.z,h:3,t:1,b:1}); 
      c.addCursor(cursor.clone());
  
      
      meshes.forEach(function(m){
        m.addCursor(cursor.clone());
      
      });
}
     

addall();
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

        if (i == 0){

  
	
scene.meshes[i+1].material = new BABYLON.StandardMaterial("myMaterial", scene);
scene.meshes[i+1].material.diffuseColor = new BABYLON.Color4(0.5, 0.8, 0.6, 0.8);


        }

     }

}
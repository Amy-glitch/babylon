var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let scale = 1;
let material =1;
let shape = 1;
let nearX=0,nearY=0,nearZ =0;
let mousestall=false;
let int;
let ray;
let curPos;
let position={};
position.x =0;
position.y =40;
position.z =0;

let lbl_pos = document.getElementById('lbl_pos');
let lbl_material = document.getElementById('lbl_material');


/******* Add the create scene function ******/
var createScene = function () 
{


var scene = new BABYLON.Scene();

scene.clearColor = new BABYLON.Color3(0/256, 234/256, 255/256);
var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, 0), scene);
camera.speed = 0.5;
camera.minZ =0.1;
// Targets the camera to a particular position. In this case the scene origin
camera.setTarget(BABYLON.Vector3.Zero());
// Attach the camera to the canvas
camera.attachControl(canvas, true);
var light = new BABYLON.HemisphericLight("light",  new BABYLON.Vector3(0, 1, 0),  scene);


return scene;
};
/******* End of the create scene function ******/



var scene = createScene(); //Call the createScene function

let material_reference = new Array(7);


material_reference[0] = new BABYLON.StandardMaterial("Grass", scene);
material_reference[0].diffuseColor = new BABYLON.Color4(0.2, 0.8, 0.2, 0.2);
material_reference[0].specularColor = new BABYLON.Color4(0, 0, 0, 0);
material_reference[0].diffuseTexture = new BABYLON.Texture("https://i.imgur.com/88YaeZI.jpg", scene);

material_reference[1] = new BABYLON.StandardMaterial("Ground", scene);
material_reference[1].diffuseColor = new BABYLON.Color4(77/255, 55/255, 37/255, 0.8);
material_reference[1].specularColor =new BABYLON.Color4(0, 0, 0, 0);

material_reference[2] = new BABYLON.StandardMaterial("Stone", scene);
material_reference[2].diffuseColor = new BABYLON.Color4(192/255, 194/255, 196/255, 0.8);
material_reference[2].specularColor =new BABYLON.Color4(0, 0, 0, 0);

material_reference[3] = new BABYLON.StandardMaterial("Sand", scene);
material_reference[3].diffuseColor = new BABYLON.Color4(236/255, 240/255, 137/255, 0.8);
material_reference[3].specularColor =new BABYLON.Color4(0, 0, 0, 0);

material_reference[4] = new BABYLON.StandardMaterial("r", scene);
material_reference[4].diffuseColor = new BABYLON.Color4(5/255, 240/255, 137/255, 0.8);
material_reference[4].specularColor =new BABYLON.Color4(0, 0, 0, 0);

material_reference[5] = new BABYLON.StandardMaterial("rr", scene);
material_reference[5].diffuseColor = new BABYLON.Color4(5/255, 0/255, 137/255, 0.8);
material_reference[5].specularColor =new BABYLON.Color4(0, 0, 0, 0);


material_reference[6] = new BABYLON.StandardMaterial("rrr", scene);
material_reference[6].diffuseColor = new BABYLON.Color4(5/255, 240/255, 255/255, 0.8);
material_reference[6].specularColor =new BABYLON.Color4(0, 0, 0, 0);



let cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 2 },scene);
cursor.position.x =0;
cursor.position.y =0;
cursor.position.z =0;
let lastgen = new BABYLON.Vector3(0,0,0);


let worldChunks ={};

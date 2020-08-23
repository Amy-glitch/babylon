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


/******* Add the create scene function ******/
var createScene = function () 
{


var scene = new BABYLON.Scene();

scene.clearColor = new BABYLON.Color3(150/256, 255/256, 255/256);
var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, 0), scene);
camera.speed = 0.1;
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

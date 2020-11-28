document.getElementById('renderCanvas').addEventListener("click", klik);
document.getElementById('renderCanvas').addEventListener("keydown", keyf);
function klik(){}




// *KEYPRESS
function keyf(e) 
{
if ( String.fromCharCode(e.keyCode) == 'H') {worldChunks["0:0:0"].container.removeAllFromScene();}
if ( String.fromCharCode(e.keyCode) == 'G') {genWorld();}

// *MOVEMENT
let stp = 0.1;
if ( String.fromCharCode(e.keyCode) == 'X'){

}
if ( String.fromCharCode(e.keyCode) == 'A'){position.x =position.x -stp;}
if ( String.fromCharCode(e.keyCode) == 'D' ){position.x = position.x +stp;}       
if ( String.fromCharCode(e.keyCode) == 'S') {position.y= position.y -stp; }
if ( String.fromCharCode(e.keyCode) == 'W' ){position.y =position.y +stp;}       
if ( String.fromCharCode(e.keyCode) == 'Q'){ position.z =position.z -stp;}
if ( String.fromCharCode(e.keyCode) == 'E'){position.z=position.z +stp;}
if ( String.fromCharCode(e.keyCode) == 'Z'){position.y=scene.cameras[0].position._y; alert('k');}
if ( e.keyCode == 32){scene.cameras[0].position._y += 2;}

 //*MATERIAL       
if (String.fromCharCode(e.keyCode) == 'I')
{
material = material +1;
material = material % 7;
cursor.material = material_reference[material];
}   

//*SHAPE
if (String.fromCharCode(e.keyCode) == 'P')
{
shape += 1;
shape = shape % 3; //maak seker dis in shp array
UpdateCursor();         
}

//*SCALE
if (String.fromCharCode(e.keyCode) == 'O')
{
scale += 1;
scale = scale % 50 +1;
UpdateCursor();  
}

//*SUBTRACT
if (String.fromCharCode(e.keyCode) == 'L')
{
let cx =Math.round(cursor.position.x/10);let cy =Math.round(cursor.position.y/10);let cz =Math.round(cursor.position.z/10); 
let chunk_key_string =  cx+':' + cy +':'+cz ;
          for (let x = -1; x <= 1; x++){
          for (let z = -1; z <= 1; z++){
          for (let y = -1; y <= 1; y++){ 
                let tcx = cx +x;let tcz = cz + z;let tcy = cy + y;
                chunk_key_string =  tcx+':' + tcy +':'+tcz ;
                if (worldChunks[chunk_key_string] == undefined)
                {worldChunks[chunk_key_string] = new Chunk(scene,Math.round(tcx)*10,Math.round(tcy)*10,Math.round(tcz)*10);     }
                worldChunks[chunk_key_string].substractCursor(cursor);}}}
}

//*ADDITION
if (String.fromCharCode(e.keyCode) == 'K')
{
let cx =Math.round(cursor.position.x/10);let cy =Math.round(cursor.position.y/10);let cz =Math.round(cursor.position.z/10); 
let chunk_key_string =  cx+':' + cy +':'+cz ;         
          for (let x = -1; x <= 1; x++){
          for (let z = -1; z <= 1; z++){
          for (let y = -1; y <= 1; y++){ 
        let tcx = cx +x;let tcz = cz + z;let tcy = cy + y;
                chunk_key_string =  tcx+':' + tcy +':'+tcz ;
                if (worldChunks[chunk_key_string] == undefined)
                {worldChunks[chunk_key_string] = new Chunk(scene,Math.round(tcx)*10,Math.round(tcy)*10,Math.round(tcz)*10);}
                worldChunks[chunk_key_string].substractCursor(cursor);}}}

                chunk_key_string = Math.round(cursor.position.x/10) +':' + Math.round(cursor.position.y/10) +':'+ Math.round(cursor.position.z/10);
                if (worldChunks[chunk_key_string] == undefined)
                { worldChunks[chunk_key_string] = new Chunk(scene,Math.round(cursor.position.x/10)*10,Math.round(cursor.position.y/10)*10,Math.round(cursor.position.z/10)*10); }  
                worldChunks[chunk_key_string].addCursor(cursor,material);
}

}


function UpdateCursor()
{
scene.removeMesh(cursor);
if (shape == 0){cursor = BABYLON.MeshBuilder.CreateBox("box", {height: scale/5, width: scale/5, depth:scale/5},scene);}
if (shape == 1){cursor = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: scale/5, radius: scale/5, subdivisions:1},scene);}
if(shape ==2){cursor = BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:scale/5, subdivisions:1},scene);} 
}

// *RENDERLOOP 
engine.runRenderLoop(function () 
{
      
    
        // cursor.enableEdgesRendering();    
        // cursor.edgesWidth = 4.0;
        // cursor.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    
        {
        if ( Math.abs(lastgen.subtract(scene.cameras[0].position).length())>8){
                genWorld();

            
          //      cursor =    BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:1, subdivisions:2},scene);
                lastgen.x = scene.cameras[0].position.x;
                lastgen.y = scene.cameras[0].position.y;
                lastgen.z = scene.cameras[0].position.z;
        }

        scene.removeMesh(cursor);
                if (mousestall == false)
                {
                ray = scene.cameras[0].getForwardRay(200);         
                int = scene.pickWithRay(ray);   
                }
                scene.addMesh(cursor);             
                }
 
                // scene.cameras[0].position.x= position.x;
                // scene.cameras[0].position.y= position.y;
                // scene.cameras[0].position.z= position.z;
                cursor.position.x= position.x;
                cursor.position.y= position.y;
                cursor.position.z=position.z;


        scene.render();
        lbl_pos.innerHTML = 'XYZ: '+Math.round(scene.cameras[0].position._x*100)/100 +',  ' +Math.round(scene.cameras[0].position._y*100)/100 +',  ' + Math.round(scene.cameras[0].position._z*100)/100;
        if (int.pickedMesh){
        lbl_material.innerHTML = int.pickedMesh.material.name;}

});





// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{
        engine.resize();
});


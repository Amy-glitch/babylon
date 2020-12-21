document.getElementById('renderCanvas').addEventListener("keydown", keyf);


function keyf(e) 
{
        if ( String.fromCharCode(e.keyCode) == 'H') 
        {
        world.worldChunks["0:0:0"].container.removeAllFromScene();
        }

        if ( String.fromCharCode(e.keyCode) == 'G') 
        {
        genWorld();
        }

        //MOVEMENT//
        let stp = 0.1;
        if ( String.fromCharCode(e.keyCode) == 'A'){position.x =position.x -stp;}
        if ( String.fromCharCode(e.keyCode) == 'D' ){position.x = position.x +stp;}       
        if ( String.fromCharCode(e.keyCode) == 'S') {position.y= position.y -stp; }
        if ( String.fromCharCode(e.keyCode) == 'W' ){position.y =position.y +stp;}       
        if ( String.fromCharCode(e.keyCode) == 'Q'){ position.z =position.z -stp;}
        if ( String.fromCharCode(e.keyCode) == 'E'){position.z=position.z +stp;}
        if ( String.fromCharCode(e.keyCode) == 'Z'){position.y=scene.cameras[0].position._y; alert('k');}
        if ( e.keyCode == 32){scene.cameras[0].position._y += 2;}


        //MATERIAL       
        if (String.fromCharCode(e.keyCode) == 'I')
        {
        material = material +1; material = material % 7; cursor.material = material_reference[material];
        }   

        //SHAPE
        if (String.fromCharCode(e.keyCode) == 'P')
        {
                shape += 1; shape = shape % 3; UpdateCursor();
        }

        //SCALE
        if (String.fromCharCode(e.keyCode) == 'O')
        {
        scale += 1; scale = scale % 200 +1; UpdateCursor();  
        }

        if (String.fromCharCode(e.keyCode) == 'C')
        {
        scale = 1;
        UpdateCursor();  
        }

        //SUBTRACT
        if (String.fromCharCode(e.keyCode) == 'L')
        {
        world.specsub(cursor.position.x,cursor.position.y,cursor.position.z);

        
        }

        //ADDITION bug:should multi add when neccesary
        if (String.fromCharCode(e.keyCode) == 'K')
        {
                world.add(material,cursor);
        }

        if (String.fromCharCode(e.keyCode) == 'V')
        {
                world.multiadd(material,2);
        }


}


//SCALE & SHAPE
function UpdateCursor()
{
scene.removeMesh(cursor);
if (shape == 0){cursor = BABYLON.MeshBuilder.CreateBox("box", {height: scale/5, width: scale/5, depth:scale/5},scene);}
if (shape == 1){cursor = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: scale/5, radius: scale/5, subdivisions:1},scene);}
if(shape ==2){cursor = BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:scale/5, subdivisions:1},scene);} 
}

genWorld();
UpdateCursor();

//RENDERLOOP 
engine.runRenderLoop(function () 
{
    
        // cursor.enableEdgesRendering();    
        // cursor.edgesWidth = 4.0;
        // cursor.edgesColor = new BABYLON.Color4(0, 0, 1, 1);


        scene.removeMesh(cursor);   
        ray = scene.cameras[0].getForwardRay(200);         
        int = scene.pickWithRay(ray);   
        scene.addMesh(cursor);             
                

        cursor.position.x= position.x;
        cursor.position.y= position.y;
        cursor.position.z=position.z;


        scene.render();


        lbl_pos.innerHTML = 'XYZ: '+Math.round(scene.cameras[0].position._x*100)/100 +',  ' +Math.round(scene.cameras[0].position._y*100)/100 +',  ' + Math.round(scene.cameras[0].position._z*100)/100;
        if (int.pickedMesh){lbl_material.innerHTML = int.pickedMesh.material.name;   } else {    lbl_material.innerHTML = 'Sky';  }
        lbl_scale.innerHTML = 'cursorScale: ' + scale;

});


// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{
        engine.resize();
});


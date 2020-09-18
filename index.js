
document.getElementById('renderCanvas').addEventListener("click", klik);
document.getElementById('renderCanvas').addEventListener("keydown", keyf);

let cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 2 },scene);
cursor.position.x =0;
cursor.position.y =0;
cursor.position.z =0;

let worldChunks ={};

//worldChunks["0,1,1"] =  new Chunk(scene,-1,0,1);

for (let i =-5; i <5; i++){
for (let j =-5; j <5; j++){

        worldChunks[i.toString() +',0,'+j.toString()  ] =  new Chunk(scene,i*10,0,j*10);


        }}



function genWorld()
{

        scene.removeMesh(cursor);
        cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 10, depth:10},scene);
     

        for (let i =-10; i <10; i++){
        for (let j =-10; j <10; j++){
        for (const key in worldChunks)
        {
                cursor.position.x = i*10;
                cursor.position.z = j*10;
                worldChunks[key].addCursor(cursor, Math.abs(i + j) % 3);
        }}}


}





//move mouse free mouse and reset offset
function klik()
{
mousestall = false;   
nearX=0;
nearY=0;
nearZ=0;
}

//keypress
function keyf(e) 
{
//[SHIFTS]//
let shft =0.1;

if ( String.fromCharCode(e.keyCode) == 'H')
{
        worldChunks["0,0,0"].container.removeAllFromScene();
      //  worldChunks["0,1,0"].container.removeAllFromScene();
       // worldChunks["0,1,1"].container.removeAllFromScene();
}

if ( String.fromCharCode(e.keyCode) == 'G')
{
       genWorld();
}


        //shiftX
        if ( String.fromCharCode(e.keyCode) == 'A')
        {
        nearX -=shft;
        mousestall = true;
        }
        //shiftX
        if ( String.fromCharCode(e.keyCode) == 'D')
        {
        nearX +=shft;
        mousestall = true;
        }
        //shiftY
        if ( String.fromCharCode(e.keyCode) == 'S')
        {
        nearY -=shft;
        mousestall = true;
        }
        //shiftY
        if ( String.fromCharCode(e.keyCode) == 'W')
        {
        nearY +=shft;
        mousestall = true;
    
        }
        //shiftZ
        if ( String.fromCharCode(e.keyCode) == 'Q')
        {
        nearZ -=shft;
        mousestall = true;
        }
        //shiftZ
        if ( String.fromCharCode(e.keyCode) == 'E')
        {
        nearZ +=shft;
        mousestall = true;
        }

     


        //change materiaal         
        if (String.fromCharCode(e.keyCode) == 'I')
        {
        material = material +1;
        material = material % 3;
        cursor.material = material_reference[material];
        }   



//[SET SHAPES OF CURSOR!!!]
        if (String.fromCharCode(e.keyCode) == 'P')
        {
        shape += 1;
        shape = shape % 3; //maak seker dis in shp array
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
                cursorlock = false;
                //addall();    
        }
//[CURSOR SCALE]
        if (String.fromCharCode(e.keyCode) == 'O')
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
        //addall();
        }

//vir elke submesh in die Meshobj subCursor
        if (String.fromCharCode(e.keyCode) == 'L')
        {
        //chnk.substractCursor(cursor);

                for (const key in worldChunks)
                {
                        worldChunks[key].substractCursor(cursor);
                }
        }

//vir elke submesh in die Meshobj subCursor   and ADD cursor dan!   
        if (String.fromCharCode(e.keyCode) == 'K')
        {
                for (const key in worldChunks)
                {
                        worldChunks[key].substractCursor(cursor);
                }
        for (const key in worldChunks)
                {
                        worldChunks[key].addCursor(cursor,material);
                }

        }
}


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () 
{
       {
        scene.removeMesh(cursor);
                if (mousestall == false)
                {
                ray = scene.cameras[0].getForwardRay(200);         
                int = scene.pickWithRay(ray);   
                }
                scene.addMesh(cursor);
   
        let rt =5;
       
                if (int.pickedPoint)    
                {
                cursor.position.x= Math.round(int.pickedPoint.x*rt)/rt + nearX;
                cursor.position.y= Math.round(int.pickedPoint.y*rt)/rt +nearY;
                cursor.position.z=Math.round(int.pickedPoint.z*rt)/rt +nearZ;
                }
                else
                {
                let l = new BABYLON.Vector3(5,5,5);

                        if (mousestall == false)
                        {
                        curPos= scene.cameras[0].position.add( ray.direction.multiply(l));
                        }
                        
                        cursor.position.x= Math.round(curPos.x*rt)/rt + nearX;
                        cursor.position.y= Math.round(curPos.y*rt)/rt +nearY;
                        cursor.position.z=Math.round(curPos.z*rt)/rt +nearZ;
                }
        }
        scene.render();


        lbl_pos.innerHTML = 'XYZ: '+Math.round(scene.cameras[0].position._x*100)/100 +',  ' +Math.round(scene.cameras[0].position._y*100)/100 +',  ' + Math.round(scene.cameras[0].position._z*100)/100;


});





// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{
        engine.resize();
});


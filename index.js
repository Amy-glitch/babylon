
document.getElementById('renderCanvas').addEventListener("click", klik);
document.getElementById('renderCanvas').addEventListener("keydown", keyf);

let cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 2 },scene);
cursor.position.x =0;
cursor.position.y =0;
cursor.position.z =0;
let lastgen = new BABYLON.Vector3(0,0,0);


let worldChunks ={};




function genWorld()
{

     
     

let xx = Math.round(scene.cameras[0].position.x/10);
let zz = Math.round(scene.cameras[0].position.z/10);
lastgen.x = xx;
lastgen.y = 0;
lastgen.z = zz;



         for (let i =-6; i <6; i++){
         for (let j =-6; j <6; j++){

                let ii =i + Math.round(scene.cameras[0].position.x/10);
                let jj=j+ Math.round(scene.cameras[0].position.z/10);
                scene.removeMesh(cursor);
                noise.seed(1);
            
            let n = (noise.simplex2(ii/20,jj/20)+1);
                let h = Math.round(n*10);

             
            
                cursor = BABYLON.MeshBuilder.CreateBox("box", {height: h, width: 10, depth:10},scene);


  
       
        let key = (ii).toString() +':'+(0).toString()+':'+(jj).toString();


      if (!worldChunks[key]) 
      {
        worldChunks[(ii).toString() +':'+(0).toString()+':'+(jj).toString()] =  new Chunk(scene,ii*10,0*10,jj*10);
        cursor.position.x = ii*10;
        cursor.position.z = jj*10;
        cursor.position.y = 0*10+(h/2);
        let m = 2;

    
        if (n < 1.3){m=0;}  
        if (n < 0.55){m=1;}  
        if (n < 0.45){m=3;}  
       


       // console.log(m);
        worldChunks[key].addCursor(cursor, m);
      }
            
      
      
      
        }}


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
        scale = scale % 50 +1;
 
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

                let cx =Math.round(cursor.position.x/10);
                let cy =Math.round(cursor.position.y/10);
                let cz =Math.round(cursor.position.z/10); 

                let chunk_key_string =  cx+':' + cy +':'+cz ;
     
          
          
          for (let x = -1; x <= 1; x++)
          {
          for (let z = -1; z <= 1; z++){
          for (let y = -1; y <= 1; y++)
          { 
        let tcx = cx +x;
        let tcz = cz + z;
        let tcy = cy + y;
                chunk_key_string =  tcx+':' + tcy +':'+tcz ;
                if (worldChunks[chunk_key_string] == undefined)
                {
                worldChunks[chunk_key_string] = new Chunk(scene,Math.round(tcx)*10,Math.round(tcy)*10,Math.round(tcz)*10);     
                }
                worldChunks[chunk_key_string].substractCursor(cursor);
                console.log(chunk_key_string);
          }}}



        }

//vir elke submesh in die Meshobj subCursor   and ADD cursor dan!   
        if (String.fromCharCode(e.keyCode) == 'K')
        {
               
               let chunk_key_string = Math.round(cursor.position.x/10) +':' + Math.round(cursor.position.y/10) +':'+ Math.round(cursor.position.z/10);
           //     console.log(chunk_key_string);
                if (worldChunks[chunk_key_string] == undefined)
                {
                 worldChunks[chunk_key_string] = new Chunk(scene,Math.round(cursor.position.x/10)*10,Math.round(cursor.position.y/10)*10,Math.round(cursor.position.z/10)*10); 
        
                }
             
                worldChunks[chunk_key_string].addCursor(cursor,material);
        }
}


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () 
{
       {


        if ( Math.abs(lastgen.subtract(scene.cameras[0].position).length())>8){
                genWorld();
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
        if (int.pickedMesh){
        lbl_material.innerHTML = int.pickedMesh.material.name;}

});





// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{
        engine.resize();
});


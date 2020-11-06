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
                let h = Math.round(n*5);

             
            
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

}

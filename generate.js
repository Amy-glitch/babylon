function genWorld()
{


     scene.removeMesh(cursor);                  
     cursor =BABYLON.MeshBuilder.CreateBox("box", {height: 50, width: 50, depth:50,scene});
       
     
     // cursor.position.x =0;
     // cursor.position.y =-20;
     // cursor.position.z =0;
     // world.multiadd(1,1);

    for (let k = -1; k<2;k++){
    for (let i = -1; i<2;i++){
 
          cursor.position.x =k*25;
          cursor.position.y =0;
          cursor.position.z =i*25;

          world.multiadd(2,1);
     }}


  
     
     
            
      }
            
      

      
    


   





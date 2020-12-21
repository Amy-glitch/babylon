function genWorld()
{


     scene.removeMesh(cursor);                  
     cursor =BABYLON.MeshBuilder.CreateBox("box", {height: 50, width: 50, depth:50,scene});
       
     
     cursor.position.x =0;
     cursor.position.y =-20;
     cursor.position.z =0;
     world.multiadd(1,1);


  
     
     
            
      }
            
      

      
    


   





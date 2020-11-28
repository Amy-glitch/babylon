function genWorld()
{

let xx = Math.round(scene.cameras[0].position.x/10);
let zz = Math.round(scene.cameras[0].position.z/10);
let yy = Math.round(scene.cameras[0].position.y/10);
lastgen.x = xx;
lastgen.y = yy;
lastgen.z = zz;



         for (let i =-3; i <3; i++){
         for (let j =-3; j <3; j++){
         for (let k =-3; k <0; k++){

                let ii =i + Math.round(scene.cameras[0].position.x/10);
                let jj=j+ Math.round(scene.cameras[0].position.z/10);
                let kk=k+ Math.round(scene.cameras[0].position.y/10);
                scene.removeMesh(cursor);
                noise.seed(1);
            let nn = noise.simplex2(ii/20,jj/20)+1;
            let n = nn * 2;
                let h = Math.round(n*n);

             
            
             cursor =BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:10, subdivisions:5},scene);

  
       
        let key = (ii).toString() +':'+(kk).toString()+':'+(jj).toString();


      if (!worldChunks[key]) 
      {
        worldChunks[(ii).toString() +':'+(kk).toString()+':'+(jj).toString()] =  new Chunk(scene,ii*10,kk*10,jj*10);
        cursor.position.x = ii*10;
        cursor.position.z = jj*10;
        cursor.position.y = kk*10;//+(h/2);
        let m = 2;

    
        if (nn < 1.3){m=0;}  
        if (nn < 0.5){m=1;}  
        if (nn < 0.45){m=3;}  
       


       // console.log(m);
     worldChunks[key].addCursor(cursor,m);



// if ( key == (0).toString() +':'+(49).toString()+':'+(0).toString()  )
// {
// //  cursor = BABYLON.MeshBuilder.CreateBox("box", {height: 10, width: 10, depth:10},scene);
//  //let cur =    BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:100, subdivisions:3},scene);
//  //let cur = BABYLON.MeshBuilder.CreateBox("box", {height: 10, width: 10, depth:10},scene);
//  //cur.position.x = ii*10;
//  alert('yet');
// //  cur.position.z = jj*10;
//  cur.position.y = 480;//+(h/2);
// worldChunks[key].addCursor(cur,m);  
// }



      }
            
      
      
      
         }}}

   



}

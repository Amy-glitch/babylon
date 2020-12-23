class World{


constructor (s){
this.worldChunks = {};

}



sub(x,y,z){

    let cx =Math.round(x/10);let cy =Math.round(y/10);let cz =Math.round(z/10); 


    let chunk_key_string =  cx+':' + cy +':'+cz ;
            //   for (let xx = 0; xx <= 1; xx++){
            //   for (let zz = 0; zz <= 1; zz++){
            //   for (let yy = 0; yy <= 1; yy++){ 
              let  xx=0;
              let  yy=0;
              let  zz=0;
                    let tcx = cx +xx;let tcz = cz + zz;let tcy = cy + yy;
                    chunk_key_string =  tcx+':' + tcy +':'+tcz ;
                    if (this.worldChunks[chunk_key_string] == undefined)
                    {this.worldChunks[chunk_key_string] = new Chunk(scene,Math.round(tcx)*10,Math.round(tcy)*10,Math.round(tcz)*10);     }
                    this.worldChunks[chunk_key_string].substractCursor(cursor);
              //  }}}    



}

specsub(x,y,z){

    let cx =Math.round(x/10);let cy =Math.round(y/10);let cz =Math.round(z/10); 


    let chunk_key_string =  cx+':' + cy +':'+cz ;
              for (let xx = -1; xx <= 1; xx++){
            for (let zz = -1; zz <= 1; zz++){
             for (let yy = -1; yy <= 1; yy++){ 
          
                    let tcx = cx +xx;let tcz = cz + zz;let tcy = cy + yy;
                    chunk_key_string =  tcx+':' + tcy +':'+tcz ;
                    if (this.worldChunks[chunk_key_string] == undefined)
                    {this.worldChunks[chunk_key_string] = new Chunk(scene,Math.round(tcx)*10,Math.round(tcy)*10,Math.round(tcz)*10);     }
                    this.worldChunks[chunk_key_string].substractCursor(cursor);
                }}}    



}


addHere(x,y,z,mat){
    cursor.position.x = x;
    cursor.position.y =y;
    cursor.position.z=z;
    this.add(mat,cursor);
}


add(mat,c){

    let cx =Math.round(c.position.x/10);let cy =Math.round(c.position.y/10);let cz =Math.round(c.position.z/10); 
    let chunk_key_string =  cx+':' + cy +':'+cz ;         

    
           
               
                    if (this.worldChunks[chunk_key_string] == undefined)
                    { 
                  
                        this.worldChunks[chunk_key_string] = new Chunk(scene,Math.round(c.position.x/10)*10,Math.round(c.position.y/10)*10,Math.round(c.position.z/10)*10);
                        this.worldChunks[chunk_key_string].addCursorG(c,mat);
                    }  else {    this.worldChunks[chunk_key_string].addCursorG(c,mat);}
                
           
}

addToChunk(x,y,z,mat,c){

    let cx =Math.round(x/10);let cy =Math.round(y/10);let cz =Math.round(z/10); 
    let chunk_key_string =  cx+':' + cy +':'+cz ;         

    
           
               
                    if (this.worldChunks[chunk_key_string] == undefined)
                    { 
                  
                        this.worldChunks[chunk_key_string] = new Chunk(scene,Math.round(x/10)*10,Math.round(y/10)*10,Math.round(z/10)*10);
                        this.worldChunks[chunk_key_string].addCursorG(c,mat);
                    }  else {    this.worldChunks[chunk_key_string].addCursorG(c,mat);}
                
           
}

multiadd(mat,i){
for (let xx = -i; xx<= i; xx++){
for (let zz = -i; zz<=i; zz++){
for (let yy = -i; yy<=i; yy++){
    this.addToChunk(cursor.position.x + xx*10,cursor.position.y + yy*10,cursor.position.z + zz*10,mat,cursor);
    }
}
}
}

genChunk(x,y,z)
{
    
let l = (noise.simplex3(x/10,y/10,z/10)+1)/2;
let n = (noise.simplex2(x/10,z/10)+1)/2;




if (y < 0){
 
   scene.removeMesh(cursor);                  
   cursor =BABYLON.MeshBuilder.CreateBox("box", {height: 10, width: 10, depth:10,scene});
  cursor.position.x =x*10; 
  cursor.position.y =y*10; 
  cursor.position.z =z*10; 

this.add(Math.abs(cursor.position.y % 3),cursor);

}


UpdateCursor();

}

subgenChunk(x,y,z)
{
    
let l = (noise.simplex3(x/10,y/10,z/10)+1)/2;
let n = (noise.simplex2(x/10,z/10)+1)/2;




if (n > 0.5){
 
   scene.removeMesh(cursor);                  
   cursor = BABYLON.MeshBuilder.CreateIcoSphere('icosphere',{radius:15, subdivisions:1},scene);
  cursor.position.x =x*10; 
  cursor.position.y =y*10; 
  cursor.position.z =z*10; 

this.specsub(x*10,y*10,z*10);

}

scene.render();
UpdateCursor();

}

}
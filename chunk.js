class Chunk 
{


    constructor(scene,x,y,z)
    {
    this.meshes = [3];
    this.meshes[0] = new M(scene);
    this.meshes[1] = new M(scene);
    this.meshes[2] = new M(scene);

    this.x = x;
    this.y = y;
    this.z =z;

    this.container = new BABYLON.AssetContainer(scene);
    }



    substractCursor(c)
    {
         this.meshes.forEach(function(m)
                 {
                 m.subCursor(c.clone());
                 });
        this.MoveCSGToMeshesInContainer();
    }


    addCursor(c,i)
    {

        console.log(Math.abs(c.position.x - this.x));

        if ((Math.abs(c.position.x - this.x)<10) && (Math.abs(c.position.y -this.y)<10) && (Math.abs(c.position.z - this.z)<10))
        {
        this.meshes.forEach(function(m)
        {
         
        m.subCursor(c.clone());
        });
        
        this.meshes[i].addCursor(c.clone());  
        this.MoveCSGToMeshesInContainer();
        }
    }




    MoveCSGToMeshesInContainer()
    {
        
        

        for (let i = 0; i < this.meshes.length;i++){
                    if ( this.container.meshes[i+1]){
                        this.container.meshes[i+1].dispose();}
                    
                    

                
                        this.container.meshes[i+1] =this.meshes[i].mCSG.toMesh();
                   
            
                    if (i == 0)
                    {
                        this.container.meshes[i+1].material = material_reference[0]; 
                    }
            
                    if (i == 1)
                    {
                        this.container.meshes[i+1].material = material_reference[1];
                    }
            
                    if (i == 2)
                    {
                        this.container.meshes[i+1].material = material_reference[2];
                    }
            
                  
            
                 }
            

                }


}
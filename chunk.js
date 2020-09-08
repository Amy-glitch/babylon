class Chunk 
{

    constructor(scene)
    {
    this.meshes = [3];
    this.meshes[0] = new M(scene);
    this.meshes[1] = new M(scene);
    this.meshes[2] = new M(scene);

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

        this.meshes.forEach(function(m)
        {
        m.subCursor(c.clone());
        });
        
        this.meshes[i].addCursor(c.clone());  
        this.MoveCSGToMeshesInContainer();
    }




    MoveCSGToMeshesInContainer()
    {
        
        console.log( material_reference[0]);
        console.log('ww');

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
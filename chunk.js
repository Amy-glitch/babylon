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
        
        for (let i = 0; i < this.meshes.length;i++){
                    if ( this.container.meshes[i+1]){
                        this.container.meshes[i+1].dispose();}
                    
                    
                        this.container.meshes[i+1] =this.meshes[i].mCSG.toMesh();
            
                    if (i == 0)
                    {
                        this.container.meshes[i+1].material = new BABYLON.StandardMaterial("myMaterial", scene);
                        this.container.meshes[i+1].material.diffuseColor = new BABYLON.Color4(0.5, 0.8, 0.6, 0.8);
                        this.container.meshes[i+1].material.specularColor =new BABYLON.Color4(0, 0, 0, 0);
                    }
            
                    if (i == 1)
                    {
                        this.container.meshes[i+1].material = new BABYLON.StandardMaterial("myMaterial", scene);
                        this.container.meshes[i+1].material.diffuseColor = new BABYLON.Color4(0.8, 0, 0.4, 0.8);
                        this.container.meshes[i+1].material.specularColor = new BABYLON.Color4(0, 0, 0, 0);
                    }
            
            
            
            
                 }
    

                }


}
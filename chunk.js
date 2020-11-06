class Chunk 
{


    constructor(scene,x,y,z)
    {
    this.meshes = [7];
    this.meshes[0] = new M(scene);
    this.meshes[1] = new M(scene);
    this.meshes[2] = new M(scene);
    this.meshes[3] = new M(scene);
    this.meshes[4] = new M(scene);
    this.meshes[5] = new M(scene);
    this.meshes[6] = new M(scene);

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

        

       // if ((Math.abs(c.position.x - this.x)<10) && (Math.abs(c.position.y -this.y)<10) && (Math.abs(c.position.z - this.z)<10))
    console.log('eeee');
    //    {
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
                        this.container.meshes[i+1] =  this.container.meshes[i+1].convertToFlatShadedMesh();
            
                    this.container.meshes[i+1].material = material_reference[i];
                   
                    this.container.meshes[i+1].renderOutline= true;
                 
                    this.container.meshes[i+1].outlineColor = new BABYLON.Color4(200/255, 0/255, 255/255, 0.8);
                 }
            
           
                }


}
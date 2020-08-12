class M {



    constructor(scene) 
    {
    this.scene = scene;
   // this.r = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.2}, scene);
    this.r = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width:1,depth:1},scene);
    this.r.position.y = -20;
    this.mCSG = BABYLON.CSG.FromMesh(this.r);  
    this.r.dispose();
    }


    addCursor(c)
    {
        this.cCSG =  BABYLON.CSG.FromMesh( c);  
        this.mCSG = this.mCSG.union(this.cCSG.clone());
     c.dispose();
        
    }

    subCursor(c)
    {
        this.cCSG =  BABYLON.CSG.FromMesh(c);  
        this.mCSG = this.mCSG.subtract(this.cCSG.clone());
        c.dispose();
    }
 

    final(){
       for(let i = 1; i < this.scene.meshes.length;i++){
           this.scene.meshes[i].dispose();
       }
        this.scene.meshes[1]=this.mCSG.toMesh();
    }






}
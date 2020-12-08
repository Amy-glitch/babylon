class M {

    constructor(scene) 
    {
    this.scene = scene;
    this.r = BABYLON.MeshBuilder.CreateBox("box", {height: 0, width:0,depth:0},scene);
    this.r.position.y = -20;
    this.mCSG = BABYLON.CSG.FromMesh(this.r); 
    scene.removeMesh(this.r); 
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
    this.mCSG = this.mCSG.union(this.cCSG.clone());
    this.mCSG = this.mCSG.subtract(this.cCSG.clone());
    c.dispose();
    }






}
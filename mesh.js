class M {

    constructor(scene) 
    {
    this.scene = scene;
    this.r = BABYLON.MeshBuilder.CreateBox("boxy", {height: 1, width:1,depth:1},this.scene); 
    this.mCSG = BABYLON.CSG.FromMesh( this.r); 
    this.mCSG = this.mCSG.subtract(this.mCSG.clone());  
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
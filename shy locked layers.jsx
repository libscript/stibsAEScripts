// @target AfterEffects
app.beginUndoGroup("Shy Locked Layers");
var theComp = app.project.activeItem;
if (theComp instanceof CompItem){
    for (i=1; i <= theComp.numLayers; i++){
        if (theComp.layer(i).locked){theComp.layer(i).shy = true;}
    }   
}
theComp.hideShyLayers = true;
app.endUndoGroup();
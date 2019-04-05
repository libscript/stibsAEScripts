// @target AfterEffects
app.beginUndoGroup("Locked Layers Shy");
var theComp = app.project.activeItem;
if (theComp){
    for (i=1; i <= theComp.numLayers; i++){
        if (theComp.layer(i).locked){theComp.layer(i).shy = true;}
    }   
}
theComp.hideShyLayers = true;
app.endUndoGroup();
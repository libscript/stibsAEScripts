// @target AfterEffects
app.beginUndoGroup("Shy layers locked");
var theComp = app.project.activeItem;
if (theComp instanceof CompItem){
    for (i=1; i <= theComp.numLayers; i++){
        if (theComp.layer(i).shy){theComp.layer(i).locked = true;}
    }   
}
// theComp.hideShyLayers = true;
app.endUndoGroup();
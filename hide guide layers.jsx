// @target AfterEffects
app.beginUndoGroup("Hide Guide layers");
var theComp = app.project.activeItem;
if (theComp instanceof CompItem){
    for (i=1; i <= theComp.numLayers; i++){
        if (theComp.layer(i).guideLayer){theComp.layer(i).enabled = false;
        }
    }   
}
app.endUndoGroup();
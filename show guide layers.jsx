// @target AfterEffects
app.beginUndoGroup("show Guide layers");
var theComp = app.project.activeItem;
if (theComp){
    for (i=1; i <= theComp.numLayers; i++){
        if (theComp.layer(i).guideLayer){theComp.layer(i).enabled = true;
        }
    }   
}
app.endUndoGroup();
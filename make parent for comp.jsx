// @target AfterEffects
// creates a null that acts as the parent for all selected layers
// or if nothing is selected, everything in the comp
app.beginUndoGroup("Add handle to comp");
var nullName = "Parent Null"; //change this to whatever

var theComp = app.project.activeItem;
if (theComp){
    var selected = theComp.selectedLayers;
    if (! selected.length){
        selected = [];
        for (var i = 1; i <= theComp.numLayers; i++){
            selected += theComp.layer(i);
        }
    }

    var averagePosition = [];
    var numChildren = 0;
    for (var layer = 0; layer < selected.length; layer++){
        var theLayer = selected[layer];
        if (! theLayer.parent){
            averagePosition += theLayer.position;
            numChildren++;
        }
    }
    averagePosition /= numChildren
    newParent = theComp.layers.addNull();
    newParent.name = nullName;
    newParent.position.setValue(averagePosition);
    for (var layer = 0; layer < selected.length; layer++){
        var theLayer = selected[layer];
        if (! theLayer.parent){
            theLayer.parent = newParent;
        }
    }
}
app.endUndoGroup();
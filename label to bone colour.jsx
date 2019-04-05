// @target AfterEffects
// this script automatically colourises the bones created by DUIK
// to match the label colour of the layer they're on

function asciiToRGB(str) {  
    var arr = [];  
    for (var i = 1, l = str.length; i < l; i ++) {  
    var hex = Number(str.charCodeAt(i)).toString(16);  
    arr.push(parseInt(hex, 16)/65533);  
    }  
    return arr;  
} 

var colours = [];
for (var i = 1; i <= 16; i++){
    var sect = "Label Preference Color Section 5";  
    var key = "Label Color ID 2 # " + i.toString();  
    var prefType = PREFType.PREF_Type_MACHINE_INDEPENDENT
    var thePref = app.preferences.getPrefAsString(sect,key, prefType);  
    colours[i-1] =  asciiToRGB(thePref);
 }

app.beginUndoGroup('Label colours to DUIK Bones');
var theComp = app.project.activeItem;
if (theComp){
    var theLayers = theComp.selectedLayers;
    for (var i =0; i < theLayers.length; i++){
        if(theLayers[i]("Effects")("Bone")){
            theLayers[i]("Effects")("Bone")("Color").setValue(colours[theLayers[i].label-1]);
        }
    }
}
app.endUndoGroup();

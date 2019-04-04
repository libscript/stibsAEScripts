//You should be able to get the label colours from app.settings
//I've tried app.settings.getSetting("Label Preference Color Section 5", "Label Color ID 2 # 1", PREFType.PREF_Type_MACHINE_INDEPENDENT)
//but it doesn't work. So the colours are hard coded
var colours = [[0.819607843137255, 0, 0],
 [1, 0.925490196078431, 0],
 [0.00392156862745098, 1, 0.901960784313726],
 [1, 0.615686274509804, 0.72156862745098],
 [0.764705882352941, 0.686274509803922, 1],
 [0.905882352941176, 0.631372549019608, 0.447058823529412],
 [0.56078431372549, 1, 0.807843137254902],
 [0, 0.188235294117647, 1],
 [0, 1, 0.133333333333333],
 [0.556862745098039, 0.172549019607843, 0.603921568627451],
 [0.909803921568627, 0.572549019607843, 0.0509803921568627],
 [0.498039215686275, 0.270588235294118, 0.164705882352941],
 [0.956862745098039, 0, 0.741176470588235],
 [0.23921568627451, 0.635294117647059, 0.647058823529412],
 [0.549019607843137, 0.376470588235294, 0.207843137254902],
 [0, 0.203921568627451, 0.0549019607843137]];

var theComp = app.project.activeItem;
if (theComp){
    var theLayers = theComp.selectedLayers;
    for (var i =0; i < theLayers.length; i++){
        if(theLayers[i]("Effects")("Bone")){
            theLayers[i]("Effects")("Bone")("Color").setValue(colours[theLayers[i].label-1]);
        }
    }
}

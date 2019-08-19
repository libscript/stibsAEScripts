var lyr1 = app.project.activeItem.selectedLayers[0];
var font = lyr1.property("Text").property("Source Text").value.font;
alert(font)
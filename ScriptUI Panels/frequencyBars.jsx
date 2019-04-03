function buildGUI(thisObj) {
    var theWindow = (thisObj instanceof Panel) ? thisObj
        : new Window('palette', thisObj.scriptTitle, undefined, {resizeable: true});
    theWindow.preferredSize = 'width: -1, height: -1';
    theWindow.alignChildren = ['left', 'top'];
    theWindow.margins = [10, 10, 10, 10];

    var mainGroup = theWindow.add("group{orientation:'column',alignment:['left','top'],alignChildren:['left','top']}");

    mainGroup.add('staticText', undefined, 'Number of bars');
    var numBarsGrp = mainGroup.add("group{orientation:'row'}");
    var numBarsSlider = numBarsGrp.add('slider', undefined, 5, 1, 64);
    numBarsSlider.size = 'width: 150, height: 10';
    var numBarsEdit = numBarsGrp.add("editText{alignment: ['right', 'center'], size: [25,20], justify: 'center'}");
    numBarsEdit.text = '' + Math.round(numBarsSlider.value);

    numBarsSlider.onChanging = function () {
        numBarsEdit.text = '' + Math.round(numBarsSlider.value);
    };

    numBarsEdit.onChange = function () {
        if (numBarsSlider.maxValue < parseInt(numBarsEdit.text, 10)) {
        numBarsSlider.maxValue = parseInt(numBarsEdit.text, 10);
        }
        numBarsSlider.value = parseInt(numBarsEdit.text, 10);
    };


    var buttonsGrp = mainGroup.add("group{orientation:'row'}");
    var orientationDD = buttonsGrp.add('dropdownlist', undefined, ['Horizontal', 'Vertical'])
    orientationDD.selection = 0;
    var doItButton = buttonsGrp.add("button{text:'Process'}");
    doItButton.onClick = function () {
        makeFrequencyBars(Math.round(numBarsSlider.value), orientationDD.value);
    };

    if (theWindow instanceof Window) {
        theWindow.center();
        theWindow.show();
    } else {
        theWindow.layout.layout(true);
    }
}

// buildGUI(this)

function makeFrequencyBars(numBars, orientation){
    app.beginUndoGroup("Make frequency bars");
    var theComp = app.project.activeItem;
    if (theComp){
        var theAudioLayers = theComp.selectedLayers;
        for (var i = 0; i < theAudioLayers.length; i++) {
            var theAudioLayer = theAudioLayers[i];
            if (theAudioLayer("Effects").canAddProperty("ADBE Aud HiLo")){
                var currentEffectCount  = theAudioLayer.property("Effects").numProperties;
                var hiPass = theAudioLayer("Effects").addProperty("ADBE Aud HiLo").propertyIndex;
                var loPass = theAudioLayer("Effects").addProperty("ADBE Aud HiLo").propertyIndex;
                var hiPassEffect = theAudioLayer("Effects")(hiPass);
                var loPassEffect = theAudioLayer("Effects")(loPass);
                for (var i=0; i < numBars ; i++) {
                    hiPassFreq = 16000 * Math.pow(i / (numBars), 2); //exponential freq bands
                    hiPassFreq = (hiPassFreq <= 0)? 1 : hiPassFreq;
                    loPassFreq = 16000 * Math.pow((i+1) / (numBars), 2);
                    loPassFreq = (loPassFreq <= 0)? 1 : loPassFreq;
                    hiPassEffect.property("Cutoff Frequency").setValue(hiPassFreq);
                    loPassEffect.property("Cutoff Frequency").setValue(loPassFreq);
                    app.executeCommand(5025);
                    kfLayer = theComp.layer(1);
                    kfLayer.name = ("" + Math.round(hiPassFreq) + "-" + Math.round(loPassFreq))
                };

        }
        //   var lowPF = theAudioLayer.
        };
    }
    app.endUndoGroup();
};
makeFrequencyBars(5, 1)
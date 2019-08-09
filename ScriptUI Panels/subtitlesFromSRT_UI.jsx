// @target AfterEffects
//JSON - from: https://github.com/douglascrockford/JSON-js

if(typeof JSON !=='object'){JSON={};}(function(){'use strict';function f(n){return n<10?'0'+n:n;}function this_value(){return this.valueOf();}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',\n')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',\n')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());

function parseSRTFile(srtFile){
    if (!srtFile){
        srtFile = File.openDialog (prompt= "Choose an srt file", filter = "*.srt", multiSelect = false);
    }
    var subtitles = [];
    srtFile.open("r");
    while (! srtFile.eof){
        var timecodeLine = srtFile.readln();
        // timecodes in SRT files look like:
        // 00:00:10,700 --> 00:00:13,460
        if (timecodeLine.match(/^[0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}\s-->\s[0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}$/)){
            var newSub = {};
            hmsi = timecodeLine.match(/^([0-9]{2}):([0-9]{2}):([0-9]{2}),([0-9]{3})\s-->/);
            var inPt = parseInt(hmsi[1]*3600) + parseInt(hmsi[2]*60) + parseInt(hmsi[3]) + parseInt(hmsi[4])/1000;
            newSub.inPoint = inPt;
            hmsi = timecodeLine.match(/-->\s([0-9]{2}):([0-9]{2}):([0-9]{2}),([0-9]{3})$/);
            var outPt = parseInt(hmsi[1]*3600) + parseInt(hmsi[2]*60) + parseInt(hmsi[3]) + parseInt(hmsi[4])/1000;
            newSub.outPoint = outPt;
            if (! srtFile.eof){
                // next comes the text payload. It is sometimes blank
                textPayload = srtFile.readln();
                if (textPayload){
                    if (! srtFile.eof){
                        // there can be more than one line of text
                        // this loop will finish when it hits a blank line
                        nextLine = srtFile.readln();
                        while (nextLine){
                            textPayload += "\n" + nextLine;
                            if (! srtFile.eof){
                                nextLine = srtFile.readln()
                            } else {
                                nextLine = false
                            };
                        }
                    }
                    
                }
                newSub.textPayload = textPayload;
            }
            subtitles.push(newSub);
        } 
    }
    srtFile.close();
    return subtitles
}

function writeJSONFile(subtitles, fileName){
    var theJSON = JSON.stringify(subtitles);
    jsonFile = File(fileName + ".json");
    theJSON = theJSON.replace(/"},{"/g, '"},\n{"'); // just to prettify it
    jsonFile.open("w");
    jsonFile.write(theJSON);
    jsonFile.close();
    return jsonFile;
}

function makeSubtitlesComp(compSettings, srtFile){
    var subtitles = parseSRTFile(srtFile);
    var subtitlesName = srtFile.displayName.replace(/.srt$/i, "");
    var compName = (compSettings.name)? compSettings.name: subtitlesName + " subtitles";
    var width = (compSettings.width)? compSettings.width: 1920;
    var height = (compSettings.height)? compSettings.height: 1080;
    var pixelAspect = (compSettings.pixelAspect)? compSettings.pixelAspect: 1;
    var lastSub = subtitles[subtitles.length -1].outPoint;
    var duration = (lastSub)? lastSub: 10;
    var frameRate = (compSettings.frameRate)? compSettings.frameRate: 25;
    // var sideMargin = (compSettings.sideMargins)? compSettings.sideMargins: 20; // percentage
    var font = (compSettings.font)? compSettings.font: "Source Sans Pro";
    var fontSize = (compSettings.fontSize)? compSettings.fontSize: 50 * width/1920;
    var hPos = (compSettings.hPos)? compSettings.hPos: width/2;
    var vPos = (compSettings.vPos)? compSettings.vPos: height - fontSize * 2.75;
    var dropShadow = (compSettings.dropShadow)? compSettings.dropShadow:false;
    var useExpressions = (compSettings.useExtensions)? true: false;
    
    var subtitlesComp = app.project.items.addComp(compName, width, height, pixelAspect, duration, frameRate);
    var subtitlesLayer = subtitlesComp.layers.addText("Subtitles");

    var subtitlesTextProp = subtitlesLayer.property("Source Text");
    subtitlesText = subtitlesTextProp.value;
    subtitlesText.font = font;
    subtitlesText.fontSize = fontSize;
    subtitlesTextProp.setValue(subtitlesText);
    subtitlesLayer.position.setValue([hPos, vPos]);
    // subtitlesLayer.position.expression = 'transform.position - [0, sourceRectAtTime().height]'; // anchors the text at the bottom
    
    if (useExpressions){
        fileName = subtitlesName + ".json";
        jsonFile = writeJSONFile(subtitles, fileName)
        app.project.importFile(new ImportOptions(jsonFile));
        subtitlesLayer.text.sourceText.expression = 'var subtitles = footage("' + jsonFile.displayName + '").sourceData;\nvar i= 0;\nwhile (i < subtitles.length ){\n	if (time > subtitles[i].inPoint && time < subtitles[i].outPoint ){ \n        subtitles[i].textPayload;\n        break;\n    } else {\n        i++;\n        "";\n    }\n}';
    } else {
            subtitlesLayer.text.sourceText.setValueAtTime(0, "")
        for (var i = 0; i < subtitles.length; i++){
            subtitlesTextProp.setValueAtTime(subtitles[i].inPoint, subtitles[i].textPayload);
            subtitlesTextProp.setValueAtTime(subtitles[i].outPoint, "");
        }
        // subtitlesComp.motionGraphicsTemplateName = compName;
        // subtitlesComp.openInEssentialGraphics();

    }

    if (dropShadow){
        var fx = subtitlesLayer.property("ADBE Effect Parade");
        dropShadowEffect = fx.addProperty("ADBE Drop Shadow");
        dropShadowEffect.property("Opacity").setValue(dropShadow.opacity * 2.55); //opacity seems to be 0-255, although the display is in percent
        dropShadowEffect.property("Softness").setValue(dropShadow.softness);
        dropShadowEffect.property("Distance").setValue(dropShadow.distance);
    }

    // subtitlesLayer.position.addToMotionGraphicsTemplate(subtitlesComp);
    return subtitlesComp;
}

// var compSettings = {"compName": null, "width": null, "height": null, "pixelAspect": null, "frameRate": null, "font": null, "fontSize": null, "hPos": null, "vPos": null, "dropShadow": null, "useExpressions": null};
// var srtFile = File.openDialog (prompt= "Choose an srt file", filter = "*.srt", multiSelect = false);
// subtitlesComp = makeSubtitlesComp({"dropShadow":{"opacity":50, "softness": 25, "distance": 0}}, srtFile);
// // subtitlesComp.exportAsMotionGraphicsTemplate(true);
// subtitlesComp.openInViewer();

buildGUI(this);

function buildGUI(thisObj) {
  if (thisObj instanceof Panel) {
    pal = thisObj;
  } else {
    pal = new Window('palette', scriptName, undefined, {resizeable: true});
  }

  if (pal !== null) {
    var btnGrp = pal.add('group{orientation: "column"}');
    var compGrp = btnGrp.add('group{orientation: "column"}');
    var compList = ["16:9 landscape 1920x1080", "9:16 portrait 1080x1920", "5:4 portrait 1080x1350", "5:4 portrait 864x1080", "1:1 square 1080x1080", "Other.."];
    var compSizeDD = compGrp.add('dropDownList', [undefined, undefined, 150, undefined], compList);
    var customCompGrp = compGrp.add('group{orientation: "column"}');
    var customCompPAST = customCompGrp.add('staticText', undefined, "width, height");
    var customCompDimensionsGrp = customCompGrp.add('group{orientation: "row"}');
    var customCompXET = customCompDimensionsGrp.add('editText', [undefined, undefined, 48, 28], "1920");
    var customCompYET = customCompDimensionsGrp.add('editText', [undefined, undefined, 48, 28], "1080");
    var customCompPAST = customCompGrp.add('staticText', undefined, "pixel aspect ratio");
    var customCompPAET = customCompGrp.add('editText', [undefined, undefined, 76, 28], "1:1");
    var customCompFRST = customCompGrp.add('staticText', undefined, "frames per second");
    var customCompFRET = customCompGrp.add('editText', [undefined, undefined, 76, 28], "25");
    
    var methdGrp = btnGrp.add('group{orientation: "column"}');
    var methodList = ["Expression", "Keyframes", "Layers"];
    var methodDD = methdGrp.add('dropDownList', [undefined, undefined, 150, undefined], methodList);
    var useMGTemplateChkbx = methdGrp.add('Checkbox',undefined, 'Create MG Template');
    var dropshadowGrp = btnGrp.add('group{orientation: "column"}');
    var doDropShadow = dropshadowGrp.add('Checkbox',undefined, 'Add soft drop shadow');
    var dropShadowOpacityST = dropshadowGrp.add('staticText', undefined, 'Drop shadow opacity')
    var dropShadowOpacitySlider = dropshadowGrp.add('slider', undefined, 100, 0, 100);
    var dropShadowSoftnessST = dropshadowGrp.add('staticText', undefined, 'Drop shadow softness')
    var dropShadowSoftnessSlider = dropshadowGrp.add('slider', undefined, 100, 0, 100);

    if (thisObj instanceof Window) {
        thisObj.center();
        thisObj.show();
    }  else {
        thisObj.layout.layout(true);
    }
  }
};


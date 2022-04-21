//colors
window.BlockColors = [];
BlockColors["control"] = "#f59f00";
BlockColors["operators"] = "#37b24d";
BlockColors["motion"] = "#339af0";
BlockColors["files"] = "#f76707";
BlockColors["game"] = "#364fc7";
BlockColors["audio"] = "#e64980";
//load blocks
gui.loadScript("blocks/control.js");
gui.loadScript("blocks/operators.js");
gui.loadScript("blocks/files.js");
gui.loadScript("blocks/game.js");
gui.loadScript("blocks/audio.js");
gui.loadScript("defaultGame.js");
function myUpdateFunction(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  vm.code = code;
}
workspace.addChangeListener(myUpdateFunction);
console.log("[gui]:blocks loaded.");
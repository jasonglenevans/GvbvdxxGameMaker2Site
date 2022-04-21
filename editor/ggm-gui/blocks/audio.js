Blockly.defineBlocksWithJsonArray([
{
  "type": "gvbvdxx_audio_playsfx",
  "message0": "Play Sound %1",
  "args0": [
    {
      "type": "input_value",
      "name": "datauri",
      "check": "DataURL"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["audio"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_audio_playbgm",
  "message0": "Play Background Music %1",
  "args0": [
    {
      "type": "input_value",
      "name": "datauri",
      "check": "DataURL"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["audio"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_audio_pausebgm",
  "message0": "Pause Background Music",
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["audio"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_audio_playbgmnosrc",
  "message0": "Play Background Music",
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["audio"],
  "tooltip": "",
  "helpUrl": ""
}
]);
Blockly.JavaScript['gvbvdxx_audio_playsfx'] = function(block) {
  var value_datauri = Blockly.JavaScript.valueToCode(block, 'datauri', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'audioEngine.sfx.play('+value_datauri+');\n';
  return code;
};
Blockly.JavaScript['gvbvdxx_audio_playbgm'] = function(block) {
  var value_datauri = Blockly.JavaScript.valueToCode(block, 'datauri', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'audioEngine.bgm.setSrc('+value_datauri+');audioEngine.bgm.isPlaying = true;\n';
  return code;
};
Blockly.JavaScript['gvbvdxx_audio_pausebgm'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'audioEngine.bgm.isPlaying = false;\n';
  return code;
};
Blockly.JavaScript['gvbvdxx_audio_playbgmnosrc'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'audioEngine.bgm.isPlaying = true;\n';
  return code;
};
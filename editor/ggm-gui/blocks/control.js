Blockly.defineBlocksWithJsonArray([
{
  "type": "gvbvdxx_control_if_then",
  "message0": "If  %1 then %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "if",
      "check": "Boolean"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "then"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["control"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_control_if_then_else",
  "message0": "If  %1 then %2 %3 else %4 %5",
  "args0": [
    {
      "type": "input_value",
      "name": "if",
      "check": "Boolean"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "then"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "else"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["control"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_control_while",
  "message0": "While %1 %2 do %3 %4",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_value",
      "name": "statement",
      "check": "Boolean",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "while",
      "align": "CENTRE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["control"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_control_repeat",
  "message0": "Repeat %1 %2 Times %3 %4",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_value",
      "name": "statement",
      "check": "Number",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "while",
      "align": "CENTRE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors["control"],
  "tooltip": "",
  "helpUrl": ""
}
]);
Blockly.JavaScript['gvbvdxx_control_if_then'] = function(block) {
  var value_if = Blockly.JavaScript.valueToCode(block, 'if', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  // TODO: Assemble JavaScript into code variable.
  if (value_if == "") {
	  value_if = "(false)";
  } else {
	  block.setWarningText(null);
  }
  var code = 'if '+value_if+' {\n'+statements_then+'\n}\n';
  return code;
};
Blockly.JavaScript['gvbvdxx_control_if_then_else'] = function(block) {
  var value_if = Blockly.JavaScript.valueToCode(block, 'if', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
  // TODO: Assemble JavaScript into code variable.
  if (value_if == "") {
	  value_if = "(false)";
  } else {
	  block.setWarningText(null);
  }
  var code = 'if '+value_if+' {\n'+statements_then+'\n} else {\n'+statements_else+'\n}\n';
  return code;
};
Blockly.JavaScript['gvbvdxx_control_while'] = function(block) {
  var value_statement = Blockly.JavaScript.valueToCode(block, 'statement', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_while = Blockly.JavaScript.statementToCode(block, 'while');
  if (value_statement == "") {
	  value_statement = "(false)";
  }
  // TODO: Assemble JavaScript into code variable.
  var code = 'var CRASHCHECK = 0;\nwhile '+value_statement+' {\n'+statements_while+'\nCRASHCHECK += 1;\nif (CRASHCHECK > 1000) {\n  break;\n};\n}';
  return code;
};
Blockly.JavaScript['gvbvdxx_control_repeat'] = function(block) {
  var value_statement = Blockly.JavaScript.valueToCode(block, 'statement', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_while = Blockly.JavaScript.statementToCode(block, 'while');
  if (value_statement == "") {
	  value_statement = "0";
  }
  // TODO: Assemble JavaScript into code variable.
  var code = 'var RepeatCount = 0;\nwhile(RepeatCount < '+value_statement+') {\nRepeatCount += 1;\n'+statements_while+'\n}\n';
  return code;
};
Blockly.defineBlocksWithJsonArray([
{
  "type": "gvbvdxx_operators_true_false",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "true",
          "true"
        ],
        [
          "false",
          "false"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_compare",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "1"
    },
    {
      "type": "field_dropdown",
      "name": "operator",
      "options": [
        [
          "=",
          "=="
        ],
        [
          ">",
          ">"
        ],
        [
          "<",
          "<"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "2"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_number",
  "message0": "%1",
  "args0": [
    {
      "type": "field_number",
      "name": "NAME",
      "value": 0
    }
  ],
  "output": null,
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_color",
  "message0": "Color %1",
  "args0": [
    {
      "type": "field_colour",
      "name": "NAME",
      "colour": "#33cc00"
    }
  ],
  "output": "color",
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_text",
  "message0": "\" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "text",
      "text": ""
    }
  ],
  "inputsInline": true,
  "output": "String",
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_random",
  "message0": "Random Number %1 From %2 To %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "from",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "to",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_math",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "first"
    },
    {
      "type": "field_dropdown",
      "name": "operator",
      "options": [
        [
          "+",
          "+"
        ],
        [
          "-",
          "-"
        ],
        [
          "*",
          "*"
        ],
        [
          "/",
          "/"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "last"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gvbvdxx_operators_maths",
  "message0": "%1 %2 of %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "maths",
      "options": [
        [
          "abs",
          "abs"
        ],
        [
          "sin",
          "sin"
        ],
        [
          "cos",
          "cos"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": BlockColors["operators"],
  "tooltip": "",
  "helpUrl": ""
}
]);
Blockly.JavaScript['gvbvdxx_operators_true_false'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_compare'] = function(block) {
  var value1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
  if (value1 == "" || value2 == "") {
	return ["false", Blockly.JavaScript.ORDER_NONE];
  } else {
  }
  // TODO: Assemble JavaScript into code variable.
  var code = value1 + ' ' + dropdown_operator + ' ' + value2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_number'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = number_name.toString();
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_color'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+colour_name.toString()+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_text'] = function(block) {
  var text = block.getFieldValue('text');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+text+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_random'] = function(block) {
  var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to = Blockly.JavaScript.valueToCode(block, 'to', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_from+'+Math.round(Math.random(1)*'+value_to+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_math'] = function(block) {
  var value_first = Blockly.JavaScript.valueToCode(block, 'first', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_last = Blockly.JavaScript.valueToCode(block, 'last', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_first + ' ' + dropdown_operator + ' ' + value_last;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['gvbvdxx_operators_maths'] = function(block) {
  var dropdown_maths = block.getFieldValue('maths');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  if (value_name == "") {
	  value_name = "(0)";
  }
  // TODO: Assemble JavaScript into code variable.
  var code = 'Math.'+dropdown_maths+value_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
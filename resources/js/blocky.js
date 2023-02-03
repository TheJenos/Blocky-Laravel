import 'blockly/php_compressed'
import blockData from './blocky-laravel'
import Blockly from 'blockly'
import axios from 'axios'

var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        ...blockData,
        {
            "kind": "SEP"
        },
        {
            "kind": "CATEGORY",
            "contents": [
                {
                    "kind": "BLOCK",
                    "type": "controls_if"
                },
                {
                    "kind": "BLOCK",
                    "type": "logic_compare"
                },
                {
                    "kind": "BLOCK",
                    "type": "logic_operation"
                },
                {
                    "kind": "BLOCK",
                    "type": "logic_negate"
                },
                {
                    "kind": "BLOCK",
                    "type": "logic_boolean"
                },
                {
                    "kind": "BLOCK",
                    "type": "logic_null"
                },
                {
                    "kind": "BLOCK",
                    "type": "logic_ternary"
                }
            ],
            "id": "catLogic",
            "colour": "210",
            "name": "Logic"
        },
        {
            "kind": "CATEGORY",
            "contents": [
                {
                    "kind": "BLOCK",
                    "type": "controls_repeat_ext"
                },
                {
                    "kind": "BLOCK",
                    "type": "controls_whileUntil"
                },
                {
                    "kind": "BLOCK",
                    "type": "controls_for"
                },
                {
                    "kind": "BLOCK",
                    "type": "controls_forEach"
                },
                {
                    "kind": "BLOCK",
                    "type": "controls_flow_statements"
                }
            ],
            "id": "catLoops",
            "colour": "120",
            "name": "Loops"
        },
        {
            "kind": "CATEGORY",
            "contents": [
                {
                    "kind": "BLOCK",
                    "type": "math_number"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_arithmetic"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_single"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_trig"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_constant"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_number_property"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_change"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_round"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_on_list"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_modulo"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_constrain"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_random_int"
                },
                {
                    "kind": "BLOCK",
                    "type": "math_random_float"
                }
            ],
            "id": "catMath",
            "colour": "230",
            "name": "Math"
        },
        {
            "kind": "CATEGORY",
            "contents": [
                {
                    "kind": "BLOCK",
                    "type": "text"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_join"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_append"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_length"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_isEmpty"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_indexOf"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_charAt"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_getSubstring"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_changeCase"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_trim"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_print"
                },
                {
                    "kind": "BLOCK",
                    "type": "text_prompt_ext"
                }
            ],
            "id": "catText",
            "colour": "160",
            "name": "Text"
        },
        {
            "kind": "CATEGORY",
            "contents": [
                {
                    "kind": "BLOCK",
                    "type": "lists_create_with"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_create_with"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_repeat"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_length"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_isEmpty"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_indexOf"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_getIndex"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_setIndex"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_getSublist"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_split"
                },
                {
                    "kind": "BLOCK",
                    "type": "lists_sort"
                }
            ],
            "id": "catLists",
            "colour": "260",
            "name": "Lists"
        },
        {
            "kind": "CATEGORY",
            "contents": [
                {
                    "kind": "BLOCK",
                    "type": "colour_picker"
                },
                {
                    "kind": "BLOCK",
                    "type": "colour_random"
                },
                {
                    "kind": "BLOCK",
                    "type": "colour_rgb"
                },
                {
                    "kind": "BLOCK",
                    "type": "colour_blend"
                }
            ],
            "id": "catColour",
            "colour": "20",
            "name": "Color"
        },
        {
            "kind": "SEP"
        },
        {
            "kind": "CATEGORY",
            "id": "catVariables",
            "colour": "330",
            "custom": "VARIABLE",
            "name": "Variables"
        },
        {
            "kind": "CATEGORY",
            "id": "catFunctions",
            "colour": "290",
            "custom": "PROCEDURE",
            "name": "Functions"
        }
    ],
}

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
var onresize = function (e) {
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

let textToDom = Blockly.Xml.textToDom(localStorage.getItem('routeData') || '<xml xmlns="https://developers.google.com/blockly/xml"></xml>');
Blockly.Xml.domToWorkspace(workspace, textToDom);

axios.get('/blocky/json').then((response) => {
    let textToDom = Blockly.Xml.textToDom(response.data.data);
    workspace.clear();
    Blockly.Xml.domToWorkspace(workspace, textToDom);
})

workspace.addChangeListener(async function (event) {
    const code = Blockly.PHP.workspaceToCode(workspace);
    document.getElementById('textarea').value = code;

    const xml = Blockly.Xml.workspaceToDom(workspace);
    let domToPretty = Blockly.Xml.domToPrettyText(xml);
    window.localStorage.setItem("routeData", domToPretty);

    await axios.post('/blocky/json', {
        data: domToPretty,
        code: code
    })
})
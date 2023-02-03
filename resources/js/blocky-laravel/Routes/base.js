import Blockly from 'blockly';
import documents from '../documents';
import { stringToColor } from '../helper';

const FIELDS = ["name"];

Blockly.Blocks['route_mutator'] = {
    init: function () {
        for (let i = 0; i < FIELDS.length; i++) {
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(FIELDS[i])
                .appendField(new Blockly.FieldCheckbox(false), FIELDS[i]);
        }
        this.setInputsInline(true);
        this.setColour(stringToColor('route_mutator'));
    },
};

Blockly.Extensions.registerMutator('route_mutator', {
    connections_: Array(FIELDS.length).fill(null),
    inputs_: Array(FIELDS.length).fill("FALSE"),
    mutationToDom: function () {
        var container = document.createElement('mutation');
        for (let i = 0; i < this.inputs_.length; i++) {
            if (this.inputs_[i] == "TRUE") {
                container.setAttribute(FIELDS[i], this.inputs_[i]);
            }
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        for (let i = 0; i < this.inputs_.length; i++) {
            this.inputs_[i] = xmlElement.getAttribute(FIELDS[i].toLowerCase());
        }
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('route_mutator');
        for (let i = 0; i < this.inputs_.length; i++) {
            containerBlock.setFieldValue(this.inputs_[i], FIELDS[i]);
        }
        containerBlock.initSvg();
        return containerBlock;
    },
    compose: function (containerBlock) {
        for (let i = 0; i < this.inputs_.length; i++) {
            this.inputs_[i] = containerBlock.getFieldValue(FIELDS[i]);
        }
        this.updateShape_();
        for (let i = 0; i < FIELDS.length; i++) {
            if (this.getInput(FIELDS[i])) {
                Blockly.Mutator.reconnect(this.connections_[i], this, FIELDS[i]);
            }
        }
    },
    saveConnections: function (containerBlock) {
        for (let i = 0; i < this.inputs_.length; i++) {
            var input = this.getInput(FIELDS[i]);
            if (input) {
                this.connections_[i] = input && input.connection.targetConnection;
            }
        }
    },
    updateShape_: function () {
        FIELDS.forEach(element => {
            if (this.getInput(element)) {
                this.removeInput(element);
            }
        });
        for (let i = 0; i < this.inputs_.length; i++) {
            if (this.inputs_[i] == "TRUE") {
                this.appendValueInput(FIELDS[i])
                    .setCheck('String')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(FIELDS[i]);
            }
        }
    }
}, null, [""]);

export default {
    name: "route_base",
    initFunction: function () {
        this.appendDummyInput()
            .appendField('Set a ')
            .appendField(new Blockly.FieldDropdown([
                ['All Route', 'all'],
                ['Get Route', 'get'],
                ['Post Route', 'post']
            ]), 'METHOD');
        this.appendValueInput('PATH')
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('to');
        this.appendValueInput('RESPONE')
            .setCheck(['String', 'route_closure', 'route_controller'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('for');
        this.setColour(stringToColor("route_base"));
        this.setHelpUrl(`${documents.helpUrl}/routing`);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.jsonInit({ "mutator": "route_mutator" });
    },
    code: function (block) {

        Blockly.PHP.definitions_['import_route'] = "use Illuminate\\Support\\Facades\\Route;"

        var method = block.getFieldValue('METHOD') || "all";
        var path = Blockly.PHP.valueToCode(block, 'PATH', Blockly.PHP.ORDER_FUNCTION_CALL) || "''";
        var response = Blockly.PHP.valueToCode(block, 'RESPONE', Blockly.PHP.ORDER_NONE) || "null";

        var name = Blockly.PHP.valueToCode(block, 'name', Blockly.PHP.ORDER_FUNCTION_CALL);
        var nameCode = name ? `->name(${name})` : '';

        var code = `Route::${method}(${path},${response})${nameCode};\n`;
        return code;
    }
}
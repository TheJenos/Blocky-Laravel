import Blockly from 'blockly';
import documents from '../documents';
import { stringToColor } from '../helper';

const FIELDS = ["variableTo", "name"];

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
    inputs_: {},
    mutationToDom: function () {
        var container = document.createElement('mutation');
        for (const key in this.inputs_) {
            container.setAttribute(key, JSON.stringify(this.inputs_[key]));
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        for (const fields of FIELDS) {
            this.inputs_[fields] = JSON.parse(xmlElement.getAttribute(fields.toLowerCase()));
        }
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('route_mutator');
        for (const fields of FIELDS) {
            containerBlock.setFieldValue(this.inputs_[fields], fields);
        }
        containerBlock.initSvg();
        return containerBlock;
    },
    compose: function (containerBlock) {
        for (const fields of FIELDS) {
            this.inputs_[fields] = containerBlock.getFieldValue(fields);
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
        if (this.inputs_["variableTo"] == "TRUE") {
            if (this.getInput('PATH_VARIABLE')) return
            const indexOfPathInput = this.inputList.findIndex(x => x.name == "PATH")
            this.appendDummyInput('PATH_VARIABLE')
                .appendField('to')
                .appendField(new Blockly.FieldTextInput(''), 'PATH_VARIABLE_INPUT')
                .setAlign(Blockly.ALIGN_RIGHT);
            const indexOfPathVariableInput = this.inputList.findIndex(x => x.name == "PATH_VARIABLE")
            const temp = this.inputList[indexOfPathInput]
            this.inputList[indexOfPathInput] = this.inputList[indexOfPathVariableInput]
            this.inputList[indexOfPathVariableInput] = temp
            this.removeInput('PATH');
        } else {
            if (this.getInput('PATH')) return
            const indexOfPathVariableInput = this.inputList.findIndex(x => x.name == "PATH_VARIABLE")

            this.appendValueInput('PATH')
                .setCheck('String')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('to');
            const indexOfPathInput = this.inputList.findIndex(x => x.name == "PATH")
            const temp = this.inputList[indexOfPathVariableInput]
            this.inputList[indexOfPathVariableInput] = this.inputList[indexOfPathInput]
            this.inputList[indexOfPathInput] = temp
            this.removeInput('PATH_VARIABLE');
        }

        // for (let i = 0; i < this.inputs_.length; i++) {
        //     if (this.inputs_[i] == "TRUE") {
        //         this.appendValueInput(FIELDS[i])
        //             .setCheck('String')
        //             .setAlign(Blockly.ALIGN_RIGHT)
        //             .appendField(FIELDS[i]);
        //     }
        // }

    }
}, null, [""]);

export default {
    name: "route_base",
    initFunction: function () {
        this.appendDummyInput()
            .appendField('Set a ')
            .appendField(new Blockly.FieldDropdown([
                ['Get Route', 'get'],
                ['Post Route', 'post']
            ]), 'METHOD');
        this.appendValueInput('PATH')
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('to');
        this.appendValueInput('RESPONE')
            .setCheck(['route_closure', 'route_controller'])
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

        var path = "''";
        if (block.getInput('PATH_VARIABLE')) {
            path = `'${block.getFieldValue('PATH_VARIABLE_INPUT')}'`;
        } else {
            path = Blockly.PHP.valueToCode(block, 'PATH', Blockly.PHP.ORDER_FUNCTION_CALL) || "''";
        }

        var response = Blockly.PHP.valueToCode(block, 'RESPONE', Blockly.PHP.ORDER_NONE) || "null";

        var name = Blockly.PHP.valueToCode(block, 'name', Blockly.PHP.ORDER_FUNCTION_CALL);
        var nameCode = name ? `->name(${name})` : '';

        var code = `Route::${method}(${path},${response})${nameCode};\n`;
        return code;
    }
}
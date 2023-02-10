import Blockly from 'blockly';
import _ from 'lodash';
import lodashInflection from 'lodash-inflection'
_.mixin(lodashInflection);

/** @type {Blockly.Block} */
export default {
    name: "model_base",
    initFunction: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(''), 'MODEL_NAME')
            .appendField('Model');
        this.appendStatementInput('COLUMNS')
            .appendField('Columns');
        this.setOutput(false)
    },
    code: function (block) {
        var modelName = _.snakeCase(_.pluralize(block.getFieldValue('MODEL_NAME') || "table"));
        var columns = Blockly.PHP.statementToCode(block, 'COLUMNS') || "";
        var code = `Schema::create('${modelName}', function (Blueprint $table) {\n${columns}});`;
        return code
    }
}
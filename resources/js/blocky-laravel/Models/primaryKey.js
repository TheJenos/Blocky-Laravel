import Blockly from 'blockly';
import _ from 'lodash';
import { switchInputs } from '../helper';
import { allAddons } from '.';

/** @type {Blockly.Block} */
export default {
    name: "model_primary_key",
    initFunction: function () {
        this.appendValueInput('BUILDER')
            .setCheck(allAddons.map(x => x.name))
            .appendField('Use')
            .appendField(new Blockly.FieldDropdown([
                ['id', 'id'],
                ['tinyIncrements', 'tinyIncrements'],
                ['smallIncrements', 'smallIncrements'],
                ['increments', 'increments'],
                ['mediumIncrements', 'mediumIncrements'],
                ['bigIncrements', 'bigIncrements'],
            ]), 'INCREMENT_TYPE_INPUT')
            .appendField('as primary key');
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setOnChange((changeEvent) => {
            const isNotId = this.getFieldValue('INCREMENT_TYPE_INPUT') != 'id'
            const builderInput = this.getInput('BUILDER')
            const haveColumnNameInput = builderInput.fieldRow.some(x => x.name == "COLUMN_NAME_INPUT")
            if (!isNotId && haveColumnNameInput) {
                builderInput.removeField('COLUMN_NAME_INPUT')
            }
            if (isNotId && !haveColumnNameInput) {
                builderInput.appendField(new Blockly.FieldTextInput('id'), 'COLUMN_NAME_INPUT');
            }
        });
    },
    code: function (
        /** @type {Blockly.Block} */
        block
    ) {
        const builder = Blockly.PHP.valueToCode(block, 'BUILDER', Blockly.PHP.ORDER_NONE) || "";
        const columnName = block.getFieldValue('COLUMN_NAME_INPUT')
        var code = `$table->${block.getFieldValue('INCREMENT_TYPE_INPUT')}(${columnName ? "'" + columnName + "'" : ''})${builder};\n`;
        return code
    }
}
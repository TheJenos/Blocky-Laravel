import Blockly from 'blockly';
import _ from 'lodash';
import { allAddons } from '.';


export default (columnType, withName = true) => ({
    name: "model_column_" + _.snakeCase(columnType),
    initFunction: function () {
        const input = this.appendValueInput('BUILDER')
            .setCheck(allAddons.map(x => x.name))
            .appendField(`Use ${columnType} column ${withName ? "as" : ""} `);

        if (withName) {
            input.appendField(new Blockly.FieldTextInput(), 'COLUMN_NAME_INPUT');
        }

        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
    code: function (
        /** @type {Blockly.Block} */
        block
    ) {
        var columnName = _.snakeCase(block.getFieldValue('COLUMN_NAME_INPUT') || "");
        const builder = Blockly.PHP.valueToCode(block, 'BUILDER', Blockly.PHP.ORDER_NONE) || "";
        var code = `$table->${columnType}(${withName ? `'${columnName}'` : ''})${builder}; \n`;
        return code
    }
})
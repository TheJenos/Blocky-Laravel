import Blockly from 'blockly';
import { allAddons } from '..';

const addonName = "model_column_addon_nullable"

/** @type {Blockly.Block} */
export default {
    name: addonName,
    initFunction: function () {
        this.appendValueInput('BUILDER')
            .setCheck(allAddons.map(x => x.name).filter(x => x != addonName))
            .appendField('nullable');
        this.setOutput(true, addonName)
    },
    code: function (
        /** @type {Blockly.Block} */
        block
    ) {
        const builder = Blockly.PHP.valueToCode(block, 'BUILDER', Blockly.PHP.ORDER_NONE) || "";
        return [`->nullable()${builder}`, Blockly.PHP.ORDER_NONE];
    }
}
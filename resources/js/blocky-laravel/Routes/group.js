import Blockly from 'blockly';

export default {
    name: "route_group",
    initFunction: function () {
        this.appendValueInput('PREFIX')
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Prefix');
        this.appendStatementInput('GROUP')
            .appendField('Group');
    },
    code: function (block) {
        Blockly.PHP.definitions_['import_route'] = "use Illuminate\\Support\\Facades\\Route;"

        var prefix = Blockly.PHP.valueToCode(block, 'PREFIX', Blockly.PHP.ORDER_FUNCTION_CALL) || "''";
        var closure = Blockly.PHP.statementToCode(block, 'GROUP') || "";
        var code = `Route::prefix(${prefix})->group(function () {\n${closure}});`;
        return code;
    }
}
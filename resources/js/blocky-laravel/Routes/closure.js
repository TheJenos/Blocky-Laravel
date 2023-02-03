import Blockly from 'blockly';

export default {
    name: "route_closure",
    initFunction: function () {
        this.appendStatementInput('CLOSURE')
            .appendField('Closure');
        this.setOutput(true, 'route_closure')
    },
    code: function (block) {
        Blockly.PHP.definitions_['import_request'] = "use Illuminate\\Http\\Request;"

        var closure = Blockly.PHP.statementToCode(block, 'CLOSURE') || "";
        var code = `function (Request \$request){\n${closure}}`;
        return [code, Blockly.PHP.ORDER_NONE];
    }
}
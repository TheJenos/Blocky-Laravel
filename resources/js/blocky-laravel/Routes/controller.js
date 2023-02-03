import Blockly from 'blockly';

export default {
    name: "route_controller",
    initFunction: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['User Controller', 'UserController::class'],
                ['Profile Controller', 'ProfileController::class'],
                ['Admin Controller', 'AdminController::class']
            ]), 'CONTROLLER')
            .appendField('Method')
            .appendField(new Blockly.FieldTextInput(''), 'METHOD');
        this.setOutput(true, 'route_controller')
    },
    code: function (block) {
        var controller = block.getFieldValue('CONTROLLER') || "null";
        var method = block.getFieldValue('METHOD') || "index";
        var code = `[${controller},'${method}']`;
        return [code, Blockly.PHP.ORDER_NONE];
    }
}
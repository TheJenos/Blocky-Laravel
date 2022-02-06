<html>
    <head>
        <title>Test</title>
        <script src="https://unpkg.com/blockly@7.20211209.2/blockly.min.js"></script>
    </head>
    <body>
        <h1>Laravel Blocky</h1>
        <div style="display:flex">
            <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
            <textarea id="textarea"></textarea>
        </div>
        <script src="/php_compressed.js"></script>
        <script>
            // Blockly.Extensions.registerMutator('test_extention', {
            //     haveClosure_: false,
            //     saveExtraState: function() {
            //         return {
            //             'haveClosure': this.haveClosure_,
            //         };
            //     },
            //     loadExtraState: function(state) {
            //         this.haveClosure_ = state['haveClosure'];
            //     },
            // },function() {
            //     this.appendDummyInput()
            //         .appendField('With a closure')
            //         .appendField(new Blockly.FieldCheckbox(false), 'CLOSURE');
            //     this.setOnChange(function(changeEvent) {
            //         this.haveClosure_ = this.getFieldValue('CLOSURE') == 'TRUE'
            //         if (this.haveClosure_) {
            //             this.appendStatementInput('DO').appendField('closure');
            //         }else{
            //             if (this.getInput('DO')) {
            //                 this.removeInput('DO');
            //             }
            //         }
            //     })
            // });

            Blockly.Blocks['route_base'] = {
                init: function() {
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
                        .setCheck(['String','route_clouse'])
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField('for');
                    this.setColour(160);
                    this.setTooltip('Returns number of letters in the provided text.');
                    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
                    this.setPreviousStatement(true);
                    this.setNextStatement(true);
                }
            };

            Blockly.PHP['route_base'] = function(block) {
                var method = block.getFieldValue('METHOD') || "all";
                var path = Blockly.PHP.valueToCode(block, 'PATH', Blockly.PHP.ORDER_FUNCTION_CALL) || "''";
                var reponse = Blockly.PHP.valueToCode(block, 'RESPONE') || "''";
                var code = `Route::${method}(${path},${reponse});`;
                return code;
            };

            Blockly.Blocks['route_clouse'] = {
                init: function() {
                    this.appendStatementInput('CLOSURE')
                        .appendField('Closure');
                    this.setOutput(true)
                }
            };

            Blockly.PHP['route_clouse'] = function(block) {
                var closure = Blockly.PHP.statementToCode(block, 'CLOSURE') || "";
                var code = `function (Request \$request){\n${closure}\n}`;
                return code;
            };

            var toolbox = {
                "kind": "categoryToolbox",
                "contents": [
                    {
                        "kind": "category",
                        "name": "Routes",
                        "colour": "210",
                        "contents": [
                            {
                                "kind": "block",
                                "type": "route_base"
                            },
                            {
                                "kind": "block",
                                "type": "route_clouse"
                            },
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "Control",
                        "colour": "210",
                        "contents": [
                            {
                                "kind": "block",
                                "type": "controls_if"
                            },
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "Logic",
                        "colour": "106",
                        "contents": [
                            {
                                "kind": "block",
                                "type": "logic_compare"
                            },
                            {
                                "kind": "block",
                                "type": "logic_operation"
                            },
                            {
                                "kind": "block",
                                "type": "logic_boolean"
                            },
                            {
                                "kind": "block",
                                "type": "text"
                            },
                            {
                                "kind": "block",
                                "type": "text_print"
                            },
                        ]
                    }
                ]
            }
            var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
            workspace.addChangeListener(function (event) {
                var code = Blockly.PHP.workspaceToCode(workspace);
                document.getElementById('textarea').value = code;
            })
        </script>
    </body>
</html>
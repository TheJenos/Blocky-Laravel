import Blockly from 'blockly';
import Models from './Models'
import Routes from './Routes'
import { stringToColor } from './helper';

const categories = {
    Models,
    Routes
}

const blocks = []

for (const category in categories) {
    const categoryData = categories[category]
    const blockData = {
        kind: "category",
        name: category,
        colour: categoryData.colour,
        contents: []
    }

    for (const component of categoryData.blocks) {
        Blockly.Blocks[component.name] = {
            secondInit: component.initFunction,
            init: function () {
                this.secondInit()
                this.setColour(stringToColor(component.name));
            }
        }

        Blockly.PHP[component.name] = component.code

        blockData.contents.push({
            kind: "block",
            type: component.name
        })
    }

    blocks.push(blockData)
}

export default blocks
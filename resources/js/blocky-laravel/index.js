import Blockly from 'blockly';
import Routes from './Routes'

const categories = {
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
            init: component.initFunction
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
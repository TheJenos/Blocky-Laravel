export const stringToColor = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

export const switchInputs = function (block, firstBlockName, secondBlockName) {
    const indexOfFirstBlock = block.inputList.findIndex(x => x.name == firstBlockName)
    const indexOfSecondBlock = block.inputList.findIndex(x => x.name == secondBlockName)
    const temp = block.inputList[indexOfSecondBlock]
    block.inputList[indexOfSecondBlock] = block.inputList[indexOfFirstBlock]
    block.inputList[indexOfFirstBlock] = temp
}
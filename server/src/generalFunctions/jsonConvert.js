const jsonConvert = (value) => {
    return JSON.parse(JSON.stringify(value))
}

module.exports = {
    jsonConvert
}
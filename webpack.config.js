var path = require('path');

module.exports = {
    mode: 'development',
    entry: './resources/javascript/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
};
let path = require('path');

module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname)
    },
    node: {
        // solution to `Error: Can't resolve 'fs'`
        fs: 'empty'
    }
}
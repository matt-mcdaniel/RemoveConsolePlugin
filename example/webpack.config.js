const RemoveConsolePlugin = require('..');

module.exports = () => {
    return {
        entry: './index.js',
        output: {
            path: './',
            filename: 'bundle.js'
        },
        plugins: [
            new RemoveConsolePlugin({
                keep: ['warn']
            })
        ]
    }
}
const fs = require('fs');
const path = require('path');
const recast = require('recast');
const estraverse = require('estraverse');

function RemoveConsolePlugin(options = {keep: []}) {
    this.options = options;
}

function removeLogs(source) {
    const {options} = this;

    const ast = recast.parse(source);

    const result = estraverse.replace(ast.program, {
        enter: function(node, parent) {
            if (node.type === 'CallExpression'
                && (node.callee.object && node.callee.object.name === 'console')
                && (node.callee.property && options.keep.indexOf(node.callee.property.name) === -1)) {
                this.remove();
            }
        }
    });

    return result;
}

RemoveConsolePlugin.prototype.apply = function(compiler) {
	compiler.plugin('emit', (compilation, callback) => {
        const javascript = Object.keys(compilation.assets).filter(asset => {
            return /\.(js|jsx)$/.test(asset);
        })

        javascript.forEach((filename, i) => {
            const logsRemoved = removeLogs.call(this, compilation.assets[filename].source());
            const code = recast.print(logsRemoved).code;

            compilation.assets[filename] = {
                source: () => code,
                size: () => code.length
            }
        })

        callback();
	})
}

module.exports = RemoveConsolePlugin;
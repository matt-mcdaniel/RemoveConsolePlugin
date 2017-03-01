const recast = require('recast');
const estraverse = require('estraverse');

const pluginName = '[RemoveConsolePlugin]';

function RemoveConsolePlugin(options = {keep: []}) {
    if (!options.remove && !options.keep && !options.shouldRemove) {
        throw new Error(pluginName + ' Must include options.keep or options.remove')
    }

    if (options.remove && options.keep) {
        throw new Error(pluginName + ' Include EITHER options.keep or options.remove')
    }

    if (options.remove) {
        options.shouldRemove = (name) => options.remove.indexOf(name) > -1;
    } else if (options.keep) {
        options.shouldRemove = (name) => !(options.keep.indexOf(name) > -1);
    }

    this.options = options;
}

RemoveConsolePlugin.prototype.apply = function(compiler) {
    const {shouldRemove} = this.options;

	compiler.plugin('emit', (compilation, callback) => {
        const javascriptAssets = Object.keys(compilation.assets).filter(asset => {
            return /\.(js|jsx)$/.test(asset);
        })

        javascriptAssets.forEach((filename, i) => {

            // Get asset source code
            const source = compilation.assets[filename].source();

            // Convert JavaScript to AST
            const ast = recast.parse(source);

            // Remove AST Nodes
            const logsRemoved = estraverse.replace(ast.program, {
                enter: function(node, parent) {
                    if (node.type === 'CallExpression'
                        && (node.callee.object && node.callee.object.name === 'console')
                        && (node.callee.property && shouldRemove(node.callee.property.name))) {

                        this.remove();
                    }
                }
            });

            // Convert AST to JavaScript Code
            const code = recast.print(logsRemoved).code;

            // Modify asset with updated code
            compilation.assets[filename] = {
                source: () => code,
                size: () => code.length
            }
        })

        callback();
	})
}

module.exports = RemoveConsolePlugin;
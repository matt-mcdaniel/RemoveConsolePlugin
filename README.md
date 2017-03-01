# RemoveConsolePlugin for Webpack

Remove `console.log` and other statements from your Webpack build. Configurable to keep certain statements in the build (like `console.warn`) and remove others (like `console.log`). Compatible with Webpack's [UglifyJsPlugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) .

## Usage

```js
// webpaack.config.js

const RemoveConsolePlugin = require('remove-console-plugin');

module.exports = {
    plugins: [
        // Remove all console statements
        new RemoveConsolePlugin()
    ]
}
```

## Examples

*Remove all console statements*
```js
new RemoveConsolePlugin()
```

*Keep everything except `console.log` statements*
```js
new RemoveConsolePlugin({
    // remove `console.log` statements
    // keep everything else
    remove: ['log']
})
```

*Alternatively, remove everything except `console.warn` statements*
```js
new RemoveConsolePlugin({
    // keep `console.warn` statements
    // remove everything else
    keep: ['warn']
})
```

### Use with UglifyJsPlugin

Use in conjunction with Webpack's [UglifyJsPlugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) keep certain console statements in the build.

```js
const webpack = require('webpack');
const RemoveConsolePlugin = require('remove-console-plugin');

module.exports = {
    plugins: [
        // Keep console statements in
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: false,
            }
        }),
        // Keep *only* `console.warn` statements
        new RemoveConsolePlugin({
            keep: ['warn']
        })
    ]
}
```

View a list of [allowable console statements in Chrome](https://developers.google.com/web/tools/chrome-devtools/console/console-write).
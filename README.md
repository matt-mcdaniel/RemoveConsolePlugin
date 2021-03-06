# RemoveConsolePlugin for Webpack

Remove `console.log` and other statements from your Webpack build. Configurable to keep certain statements in the build (like `console.warn`) and remove others (like `console.log`). Compatible with Webpack's [UglifyJsPlugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) .

## Install

```
npm install --save-dev remove-console-plugin
```

## Usage

```js
// webpack.config.js

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
// remove `console.log` statements
// keep everything else
new RemoveConsolePlugin({
    remove: ['log']
})
```

*Alternatively, remove everything except `console.warn` statements*
```js
// keep `console.warn` statements
// remove everything else
new RemoveConsolePlugin({
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
        // Perform JavaScript minification
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // keep console statements
                drop_console: false,
            }
        }),
        // Remove all console statements except `console.warn`
        new RemoveConsolePlugin({
            keep: ['warn']
        })
    ]
}
```

View a list of [allowable console statements in Chrome](https://developers.google.com/web/tools/chrome-devtools/console/console-write).
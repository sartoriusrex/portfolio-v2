const { extendDefaultPlugins } = require('svgo');

module.exports = {
    multipass: true,
    plugins: extendDefaultPlugins([
        {
            name: 'inlineStyles',
            active: false
        },
        {
            name: 'removeUselessDefs',
            active: false
        },
        {
            name: 'removeViewBox',
            active: false
        },
        {
            name: 'removeUselessStrokeAndFill',
            active: 'false'
        },
        {
            name: 'convertShapeToPath',
            active: 'false'
        },
        {
            name: 'convertTransform',
            active: 'false'
        },
        {
            name: 'cleanupIDs',
            active: false
        },
        {
            name: 'removeHiddenElems',
            active: false
        },
        {
            name: 'mergePaths',
            active: false
        }
    ])
}
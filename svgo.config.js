module.exports = {
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
            name: 'revmoveViewbox',
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
        }
    ])
}
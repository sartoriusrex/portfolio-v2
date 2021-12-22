module.exports = {
  multipass: true,
  plugins: {
    name: 'preset-default',
    overdies: {
      inlineStyles: false,
      removeUselessDefs: false,
      removeViewBox: false,
      removeUselessStrokeAndFill: false,
      convertShapeToPath: false,
      convertTransform: false,
      cleanupIDs: false,
      removeHiddenElems: false,
      mergePaths: false
    }
  }
}
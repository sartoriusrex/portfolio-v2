module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-preset-env'),
		require('cssnano'),
		require('autoprefixer'),
		require('postcss-pxtorem')
	]
}
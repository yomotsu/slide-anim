import babel from 'rollup-plugin-babel'

const license = `/*!
 * slide-anim
 * https://github.com/yomotsu/slide-anim
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */`

export default {
	input: 'src/slide-anim.js',
	output: [
		{
			format: 'umd',
			name: 'slideAnim',
			file: 'dist/slide-anim.js',
			banner: license
		},
		{
			format: 'es',
			file: 'dist/slide-anim.module.js',
			banner: license
		}
	],
	indent: '\t',
	sourceMap: false,
	plugins: [
		babel( {
			exclude: 'node_modules/**',
			presets: [
				[ 'env', {
					targets: {
						browsers: [
							'last 2 versions',
							'ie >= 11'
						]
					},
					loose: true,
					modules: false
				} ]
			]
		} )
	]
};

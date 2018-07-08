const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: { game: "./src/index.ts" },
	plugins: [
		new HtmlWebpackPlugin({
			title: "pacman - index",
			template: "src/index.html"
		})
	],
	output: {
		filename: "[name].[hash].js"
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "less-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.png$/,
				loader: "url-loader?mimetype=image/png"
			}
			// {
			// 	test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			// 	use: [
			// 		{
			// 			loader: "url-loader",
			// 			options: {
			// 				limit: 12000
			// 			}
			// 		}
			// 	]
			// }
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devServer: {
		host: "localhost", //default
		port: 8080, //default
		contentBase: "./dist",
		compress: true
		//hot: true
	}
};

import webpack from "webpack";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {
					presets: ['react'],
					cacheDirectory: true
				}
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      // no longer allowed to omit the '-loader' suffix when using loaders
      "fetch": "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),
    new webpack.DefinePlugin({
      CRM_ACCOUNT_NAME: JSON.stringify(process.env.CRM_ACCOUNT_NAME),
      CRM_API_KEY: JSON.stringify(process.env.CRM_API_KEY),
      MAP_KEY: JSON.stringify(process.env.MAP_KEY)
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    app: ["./js/app"],
		cms: ["./js/cms"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals:  [/^vendor\/.+\.js$/]
};

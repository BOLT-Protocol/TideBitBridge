const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

function getExternals() {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), "node_modules"));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {});
}

const frontend = {
  mode: "none",
  entry: path.resolve(__dirname, "src/frontend/main.js"),
  output: {
    path: path.resolve(__dirname, "build/frontend/assets"),
    filename: "main.js",
    chunkFilename: "[id].js",
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
    contentBase: path.join(__dirname, "build/frontend/"),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "image/[name].[ext]", // 修改生成路徑
              esModule: false,
              publicPath: "../",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : "css/[name].[contenthash].css",
      chunkFilename: devMode ? "css/[id].css" : "css/[id].[contenthash].css",
    }),
    devMode ? new webpack.HotModuleReplacementPlugin() : null,
  ],
};

const backend = {
  mode: "none",
  target: "node",
  entry: path.resolve(__dirname, "src/backend/main.js"),
  output: {
    path: path.resolve(__dirname, "build/backend"),
    filename: "main.js",
    chunkFilename: "[id].js",
  },
  externals: getExternals(),
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
    ],
    exprContextCritical: false,
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|scss|svg|png|jpe?g|png)$/),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};

module.exports = [frontend];

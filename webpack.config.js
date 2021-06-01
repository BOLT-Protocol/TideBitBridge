const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getExternals() {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), "node_modules"));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {});
}

const frontend = {
  mode: "none",
  entry: path.resolve(__dirname, "src/frontend/javascript/main.js"),
  output: {
    path: path.resolve(__dirname, "build/frontend/assets"),
    filename: "javascript/main.js",
    chunkFilename: "javascript/[id].js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "image/[name].[ext]", // 修改生成路徑
              publicPath: '../', // 修改公共路徑
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
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

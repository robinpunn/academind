const path = require("path");
// const DotenvWebpack = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  plugins: [new DotenvWebpack()],
};

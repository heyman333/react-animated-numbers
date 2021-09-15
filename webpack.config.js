const path = require("path");

module.exports = {
  mode: "production",
  target: ["web", "es6"],
  entry: "./index.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
};

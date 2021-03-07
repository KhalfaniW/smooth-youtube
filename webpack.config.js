const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.webpack.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      cheerio: "cheerio/lib/cheerio",
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
};

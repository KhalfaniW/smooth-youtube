const path = require("path");
const glob = require("glob");
module.exports = {
  webpack: {
      configure: {
        output: {
          // compile to one file
          filename: "onefile.js",
        },
        optimization: {
          runtimeChunk: false,
          splitChunks: {
            chunks(chunk) {
              return false;
            
          },
        },
      },
    },
  },
};

const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    "things-scene-slam-ie": ["./src/index.js"]
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js"
  },
  resolve: {
    modules: ["./node_modules"]
  },
  resolveLoader: {
    modules: ["./node_modules"]
  },
  externals: {
    "@hatiolab/things-scene": "scene"
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      ie: 11
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: "url-loader?limit=25000",
        query: {
          limit: 10000,
          name: "[path][name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(obj|mtl|tga|3ds|max|dae)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map"
};

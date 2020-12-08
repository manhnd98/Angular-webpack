"use strict";

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const purgecss = require('@fullhuman/postcss-purgecss');
const helpers = require("./helpers");
const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    vendor: "./src/vendor.ts",
    polyfills: "./src/polyfills.ts",
    main: isDev ? "./src/main.ts" : "./src/main.aot.ts",
  },

  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "to-string-loader",
          { loader: "css-loader", options: { sourceMap: isDev, importLoaders: 2} },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                syntax: "postcss-scss",
                plugins: ["postcss-import", "tailwindcss", "autoprefixer", purgecss({
                  content: ['./**/*.html']
                })],
              },
            },
          },
          "sass-loader"
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(helpers.root("dist"), {
      root: helpers.root(),
      verbose: true,
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};

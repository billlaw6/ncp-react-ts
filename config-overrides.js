/* config-overrides.js */
const path = require("path");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");
const copyWebpackPlugin = require("copy-webpack-plugin");


module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addLessLoader({
    javascriptEnable: true,
    // modifyVars: { "@primary-color": "#7398FF" }, // 不注释掉不能修改主题色
  }),
  addWebpackPlugin(
    new copyWebpackPlugin([
      { from: "src/assets/styles/qrcode.css", to: "static/css/[name].[ext]" },
    ]),
  ),
);

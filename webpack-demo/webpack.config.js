module.exports = {
  devtool: 'eval-source-map',  // source maps需要配置devtool
  entry: __dirname + "/app/main.js",  // 唯一入口文件
  output: {
    path: __dirname + "/public", // 打包后的文件存放的地方
    filename: "bundle.js"  // 打包后输出文件的文件名
  }
}

export default {
  entry: "src/entry/*.js",
  outputPath: "./dist",
  publicPath: "/",
  // 'multiPage': true,
  theme: "theme.config.js",
  // "proxy": {
  //     "/api": {
  //         "target": "http://jsonplaceholder.typicode.com/",
  //         "changeOrigin": true,
  //         "pathRewrite": { "^/api" : "" }
  //     }
  // },
  //针对特定的环境进行配置。dev 的环境变量是?development，build 的环境变量是?production。 比如：
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        ["import", { libraryName: "antd", style: true }],
      ],
    },
    production: {
      //定义额外需要做 babel 转换的文件匹配列表，格式为数组。
      extraBabelIncludes: ["node_modules/dom7/"],
      extraBabelPlugins: [
        "transform-runtime",
        ["import", { libraryName: "antd", style: true }],
      ],
    },
  },
};

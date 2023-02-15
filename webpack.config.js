const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

let entry = {
  main: "./src/app.js",
  sub: "./src/sub.js",
  sub2: "./src/sub2.js",
};

let multiplesHtmlWebpackPlugins = Object.entries(entry).map(([key, value]) => {
  let templatePage = "./src/views/template/sub.hbs";
  if (key === "main") templatePage = "./src/views/template/main.hbs";
  return new HtmlWebpackPlugin({
    filename: key + ".html",
    //hash: true,
    inject: true,
    template: templatePage, // template file name
    //excludeChunks: ["main"], // entry에서 해당 리스트를 제외한 나머지
    minify: false, //압축 설정
    chunks: [key], //어떤 js 번들을 script에 넣을지 결정
  });
});

module.exports = {
  entry: entry,
  devtool: "inline-source-map",
  devServer: {
    port: 8890,
    static: "./dist",
    proxy: {
      "/api/": {
        // /api/로 시작하는 url은 아래의 전체 도메인을 추가하고, 옵션을 적용
        target: "http://localhost:3095", // 클라이언트에서 api로 보내는 요청은 주소를 3095로 바꿔서 보내겠다 라는 뜻
        pathRewrite: { "^/api": "/agent" }, // /api로 시작하는 문자를 /agent 로 변경
        changeOrigin: true, // cross origin 허용 설정
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ].concat(multiplesHtmlWebpackPlugins),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

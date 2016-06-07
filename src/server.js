import express from "express";
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from './../webpack.config.client.js';

const app = express();
const compiler = webpack(config);

console.log(compiler);

function getApp() {
  return require("./app").default;
}

if (module.hot) {
  module.hot.accept("./app", function () {
    console.log("🔁  HMR Reloading `./app`...");
  });

  console.info("✅  Server-side HMR Enabled!");
} else {
  console.info("❌  Server-side HMR Not Supported.");
}

export default express()
  .use((req, res) => getApp().handle(req, res))
  .use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  .use(webpackHotMiddleware(compiler))
  .listen(3000, function (err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Listening at http://localhost:3000");
  })
;

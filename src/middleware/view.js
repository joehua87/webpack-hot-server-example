import express from "express";
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { renderToString } from 'react-dom/server';

export default express.Router()
  .get("/", (req, res) => {
    function Root() {
      return (
        <div>
          Hello from React
        </div>
      )
    };

    const html = renderToString(
      <AppContainer>
        <Root />
      </AppContainer>
    )

    res.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta content="IE=edge" http-equiv="X-UA-Compatible">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <title>Webpack Hot Server Example</title>
        </head>
        <body>
          <div>${html}</div>
          <div id="app">
            Waiting for <code>/api</code>&hellip;
          </div>

          <script>
            function render(markup) {
              document.getElementById("app").innerHTML = markup;
            }

            function update() {
              fetch("/api")
                .then(function(response) {
                  return response.text();
                })
                .then(function(text) {
                  render(text);
                  setTimeout(update, 1000);
                })
                .catch(function(err) {
                  render("❌  " + err.message + " at <strong>" + new Date() + "</storng>");
                  setTimeout(update, 1000);
                })
              ;
            }

            update();
          </script>
        </body>
      </html>
    `);
  })
;

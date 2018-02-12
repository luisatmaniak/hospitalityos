const fs = require("fs");
const path = require("path");
const express = require("express");
const { createBundleRenderer } = require("vue-server-renderer");

const isProd = process.env.NODE_ENV === "production";
const template = fs.readFileSync("./src/template.html", "utf-8");
const app = express();

let renderer = null;
const createAndSetRenderer = ({ serverBundle, clientManifest }) => {
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
  });
};

if (isProd) {
  const serverBundle = path.resolve(__dirname, "dist/.server/vue-ssr-server-bundle.json");
  const clientManifest = require("./dist/vue-ssr-client-manifest.json");

  createAndSetRenderer({ clientManifest, serverBundle });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  const setupDevServer = require("./build/dev-server");

  setupDevServer(app).on("update", createAndSetRenderer);
}

const serve = file => express.static(path.join(__dirname, file));

app.use("/dist", serve("./dist"));
app.use("/service-worker.js", serve("./dist/service-worker.js"));

app.get("*", (req, res) => {
  if (!renderer) {
    return res.end("waiting for compilation... refresh in a moment.");
  }

  const s = !isProd && Date.now();

  res.setHeader("Content-Type", "text/html");

  const handleError = err => {
    if (err && err.code === 404) {
      res.status(404).end("404 | Page Not Found");
    } else {
      // Render Error Page or Redirect
      res.status(500).end("500 | Internal Server Error");
      console.error(`error during render : ${req.url}`);
      console.error(err);
    }
  };

  const context = { url: req.url };

  renderer
    .renderToString(context)
    .then(html => {
      res.send(html);

      if (!isProd) console.log(`whole request: ${Date.now() - s}ms`);
    })
    .catch(handleError);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

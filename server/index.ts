import express from "express";
import fetch from "node-fetch";
require("dotenv").config();
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );

  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.get("/hc", (_req, res) => {
  res.send("ok");
});

app.get("/colleges", (req, res) => {
  (async () => {
    try {
      const url = `http://webservice.recruit.co.jp/shingaku/school/v1/?key=${process.env.API_KEY}&format=json&name=${req.query.name}`;
      const result = await fetch(encodeURI(url)).then(res => res.json());

      res.json(result);
    } catch (e) {
      res.status(500).send(e);
    }
  })();
});

app.listen(18001);

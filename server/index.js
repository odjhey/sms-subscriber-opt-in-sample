const redis = require("redis");
const client = redis.createClient();
const express = require("express");
const app = express();

client.on("connect", () => {
  console.log("you are now connected");
});

app.get("/", (req, res) => {
  console.log(req.query);
  const { access_token, subscriber_number } = req.query;
  if (access_token && subscriber_number) {
    client.set(subscriber_number, access_token);
    console.log("saved", subscriber_number);
  }
  res.end();
});

app.get("/read/:subscriber_number", (req, res) => {
  const subscriber_number = req.params.subscriber_number;
  client.get(subscriber_number, (err, val) => {
    console.log("getAsync", subscriber_number, val);
    res.send(val);
  });
});

app.listen("3000", () => {
  console.log("app is online");
});

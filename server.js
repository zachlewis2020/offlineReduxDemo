const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//app.use((_req, _res, next) => setTimeout(next, 400));

app.use(bodyParser.json());

app.post('/postTest', (_req, res) => {
  console.log("PostAction Body:" + JSON.stringify(_req.body));
  res.status(200).json({ response: 'post response data' });
});

app.get('/getTest', (_req, res) => {
  console.log("GetAction Query:" + JSON.stringify(_req.query));
  console.log("GetAction params:" + JSON.stringify(_req.query));
  res.status(200).json({ response: 'get response data' });
});

console.log("Listening on Port: 7778");
app.listen(7778);

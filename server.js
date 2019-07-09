const express = require('express')
var fetchTile = require(__dirname + '/tile.js').fetchTile;

const app = express()
const port = 8888

app.get('/:layer/:z/:x/:y', function(req, res) {
  p = req.params;
  fetchTile(p.layer, parseInt(p.z), parseInt(p.x), parseInt(p.y.replace('.png', '')), function(img) {
    res.send(img);
  });
});

var server = app.listen(port, 'localhost', function() {
  console.log("Listening on http://%s:%s", server.address().address, server.address().port);
});

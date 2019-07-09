var fs = require("fs");
var mapnik = require("mapnik");
var mkdirp = require('mkdirp');
var path = require('path');
var util = require('util');
var mercator = new(require('@mapbox/sphericalmercator'));

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();
mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins, 'shape.input'));

const TILE_SIZE = 256;

function getCachedTile(tileFilePath) {
  if (!fs.existsSync(tileFilePath)) {
    return false;
  } else {
    return fs.readFileSync(tileFilePath);
  }
}

function fetchTile(layer, z, x, y, callback) {
  var map = new mapnik.Map(TILE_SIZE, TILE_SIZE);
  var layerPath = util.format('%s/layers/%s.xml', __dirname, layer);
  var tileFilePath = util.format('%s/tiles/%s/%d/%d/%d.png', __dirname, layer, z, x, y)

  var cachedTile = getCachedTile(tileFilePath);
  if (cachedTile) {
    callback(cachedTile);
  } else {
    var filePath = util.format('%s/tiles/%s/%d/%d/', __dirname, layer, z, x);
    mkdirp.sync(filePath);

    map.loadSync(layerPath);

    map.zoomToBox(mercator.bbox(x, y, z, false, '900913'));
    var im = new mapnik.Image(TILE_SIZE, TILE_SIZE);
    map.render(im, function(err, im) {
      if (err) console.log('error', err);
      file = im.saveSync(tileFilePath, 'png');
      callback(fs.readFileSync(tileFilePath));
    });
  }
}

module.exports = { fetchTile: fetchTile };
var mapnik = require('mapnik');
var fs = require('fs');
const path = require('path');
var mercator = new(require('@mapbox/sphericalmercator'));

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();
mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins, 'shape.input'));

const TILE_SIZE = 256;

function createFullMap() {
  var map = new mapnik.Map(TILE_SIZE, TILE_SIZE);
  map.loadSync("./layers/admin0.xml");
  map.loadSync("./layers/admin1.xml");
  map.zoomAll();
  var im = new mapnik.Image(TILE_SIZE, TILE_SIZE);
  map.render(im, function(err, im) {
      im.encode("png", function(err, buffer) {
          fs.writeFile("map.png", buffer, function(err, result) {
            if(err) console.log('error', err);
          });
       });
  });
}

function createImageTile(z, x, y) {
  var map = new mapnik.Map(TILE_SIZE, TILE_SIZE);
  map.loadSync("./layers/admin0.xml");
  // map.loadSync("./layers/admin1.xml");

  map.zoomToBox(mercator.bbox(x, y, z, false, '900913'));
  var im = new mapnik.Image(TILE_SIZE, TILE_SIZE);
  map.render(im, function(err, im) {
      im.encode("png", function(err, buffer) {
          fs.writeFile("map.png", buffer, function(err, result) {
            if(err) console.log('error', err);
          });
       });
  });
}

createImageTile(2, 1, 1);
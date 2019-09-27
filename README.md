# Mapnik Node Tile Server

Basic map tile web server using express.js and node-mapnik bindings

## Pre-requisites

### Mapnik
This service depends on [mapnik](https://mapnik.org/) being available on your system. On MacOSX, use this [homebrew formula](https://github.com/mapnik/mapnik/wiki/MacInstallation_Homebrew)

### Git Large File Storage
This repo uses [Github LFS](https://git-lfs.github.com/), so that must be installed in order to pull down the large `.shp` files. Then run `git lfs install` in the repository. Run `git lfs pull` to pull down the large files.

## Installation & Usage

- To install, run `npm install`. 

- To test, run `npm mapnik-example` which will create a .png file.

- To run the server, run `npm start`
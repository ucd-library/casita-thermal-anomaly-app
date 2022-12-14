const path = require('path');
const fs = require('fs');
const spaMiddleware = require('@ucd-lib/spa-router-middleware');
const config = require('../lib/config');

module.exports = (app) => {
  // path to your spa assets dir
  let assetsDir = path.join(__dirname, '..', 'client', config.client.dir);
  console.log('Serving client env ('+config.client.env+') code from: '+assetsDir);

  /**
   * Setup SPA app routes
   */
  spaMiddleware({
    // pass the express app
    app, 
    
    // pass the file you want to use
    htmlFile : path.join(assetsDir, 'index.html'), 
    
    // are we serving from host root (/)?
    isRoot : true, 
    
    // array of root paths.  ie appRoutes = ['foo', 'bar'] to server /foo/* /bar/*
    appRoutes : config.appRoutes, 
    
    // options for express.static(dir, opts)
    static : {
      dir : assetsDir,
      // opts : {}  // additional opts for express.static
    },

    // do you want to manually handle 404 for requests to unknown resources
    // this lets you render your own 404 page using the index.html
    enable404 : false,

    getConfig : async (req, res, next) => {
      next({
        appRoutes : config.appRoutes,
        publicVapidKey : config.publicVapidKey,
        dataHost : config.dataHost,
        image : config.image
      });
    },
    
    template : (req, res, next) => {
      next({title: config.title});
    }
  });

}
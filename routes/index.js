var express = require('express');
var router = express.Router();

var allRoutes = ['one', 'two'];
var bower = require('../bower.json');

// Get home page
getRoute();

allRoutes.forEach(function(route) {
  getRoute(route);
});

function getRoute(route) {
  var path = '/' + ((route !== undefined) ? route : '');
  router.get(path, function(req, res) {
    if (route === null) {
      route = allRoutes[0];
    }

    res.render('index', {
      route: route,
      appName: bower.name,
      appTitle: bower.title
    });
  });
}

module.exports = router;

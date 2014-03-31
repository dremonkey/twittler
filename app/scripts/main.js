'use strict';

//the require library is configuring paths
require.config({
  paths: {
    // Loads jQuery from Google's CDN first and falls back to local
    jquery: [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
      'components/jquery/jquery'
    ],
    underscore: '../components/underscore/underscore',
    backbone: '../components/backbone/backbone',
    moment: '../components/momentjs/min/moment.min',

    // Require.js plugins
    text: '../components/requirejs-text/text',

    // Shortcut to put html outside the js dir
    templates: '../templates'
  },

  shim: {
    'backbone': {
      // Loads dependencies first
      deps: ['jquery', 'underscore'],
      // Custom export name, this would be lowercase otherwise
      exports: 'Backbone'
    }
  },

  // Duration it tries to load a script before giving up, the default is 7
  waitSeconds: 10
});


// Kick off the application
require([
  'views/app',
  'router',
  'vm'
], function (AppView, Router, Vm){
  var appView = Vm.create({}, 'AppView', AppView);
  appView.render();

  // pass the main appView to the router
  Router.initialize({appView: appView});
});
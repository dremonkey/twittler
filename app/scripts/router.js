'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function ($, _, Backbone, Vm) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '*actions': 'default'
    }
  });
  
  var initialize = function (options) {
    var appView = options.appView;
    var router = new AppRouter(options);

    router.on('route:default', function (actions) {
      require(['views/stream', 'collections/stream'], function (StreamView, Stream) {
        console.log('router default');
        var stream = new Stream();
        var options = {
          collection: stream
        };
        var page = Vm.create(appView, 'Stream', StreamView, options);
        page.render();
      });
    });

    // Backbone.history needed for bookmarkable URLs
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
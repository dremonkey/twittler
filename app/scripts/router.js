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
    
    var router = new AppRouter(options)
      , appView = options.appView;

    // Save users and stream instance...
    // this is necessary because we don't have a database and we need to be sure
    // that the users and stream returned is the same everywhere
    var users = null
      , stream = null;

    router.on('route:default', function (actions) {
      
      require([
        'collections/users',
        'collections/stream',
        'views/stream',
        'views/welcome',
        'views/new-tweet'
      ],
      function (Users, Stream, StreamView, WelcomeView, NewTweetView) {
        
        users = new Users();
        stream = new Stream(null, {users: users.models});

        var streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream, users: users})
          , welcomeView = Vm.create(appView, 'WelcomeView', WelcomeView, {users: users})
          , newTweetView = Vm.create(appView, 'NewTweetView', NewTweetView, {collection: stream, users: users});

        streamView.render();
        welcomeView.render();
        newTweetView.render();
      });

      require([
        'views/welcome',
        'views/new-tweet',
        'collections/users'
      ], function (WelcomeView, NewTweetView, Users) {
        
        
      });
    });

    // Backbone.history needed for bookmarkable URLs
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
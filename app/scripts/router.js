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
      '': 'home',
      'stream': 'stream',
      'stream/:username': 'stream'
      // '*actions': 'default'
    }
  });
  
  var initialize = function (options) {

    require([
      'collections/users',
      'collections/stream',
      'views/home',
      'views/stream',
      'views/login',
      'views/compose',
      'events'
    ],
    function (Users, Stream, HomeView, StreamView, LoginView, ComposeView, vents) {

      var router = new AppRouter(options)
        , appView = options.appView;

      // Save users and stream instance...
      // this is necessary because we don't have a database and we need to be sure
      // that the users and stream returned is the same everywhere
      var users = new Users()
        , stream = new Stream(null, {users: users.models});

      // ## Gloabl Event Listeners
      vents.on('user:selected', function (user) {
        router.navigate('stream/' + user.get('username'), {trigger: true});
      });

      vents.on('user:login', function () {
        var loginView = Vm.create(appView, 'LoginView', LoginView);
        $('body').append(loginView.render().el);
      });

      // vents.on('user:loggedin', function (user) {
      //   // add the new user to the collection...
      //   // we need to do this here because login serves as a 'join+login' action
      //   users.add(user);
      // });

      vents.on('tweet:compose', function () {
        var composeView = Vm.create(appView, 'ComposeView', ComposeView, {collection: stream, users: users});
        $('body').append(composeView.render().el);
      });

      router.on('route:home', function () {

        var homeView = Vm.create(appView, 'HomeView', HomeView)
          , streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream, limit: 10});

        $('#main').html(homeView.render().el);
        $('#stream-wrapper').append(streamView.render().el);
      });

      router.on('route:stream', function (username) {
        var tweets = null
          , streamView = null;

        if (username) {
          var user = users.findWhere({username: username});
          tweets = user.get('tweets');

          streamView = Vm.create(appView, 'Stream', StreamView, {collection: tweets});
        }
        else {
          streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream});
        }
      });

      // Backbone.history needed for bookmarkable URLs
      Backbone.history.start();
    });
  };

  return {
    initialize: initialize
  };
});
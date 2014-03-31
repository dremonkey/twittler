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
      'views/page-home',
      'views/page-stream',
      'views/stream',
      'views/login',
      'views/compose',
      'events'
    ],
    function (Users, Stream, PageHomeView, PageStreamView, StreamView, LoginView, ComposeView, vents) {

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

      vents.on('tweet:compose', function () {
        var composeView = Vm.create(appView, 'ComposeView', ComposeView, {collection: stream, users: users});
        $('body').append(composeView.render().el);
      });

      router.on('route:home', function () {

        var pageView = Vm.create(appView, 'PageHomeView', PageHomeView)
          , streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream, limit: 10});

        $('#main').html(pageView.render().el);
        $('#stream-wrapper').append(streamView.render().el);
      });

      router.on('route:stream', function (username) {
        var tweets = null
          , user = null
          , streamView = null;

        if (username) {
          user = users.findWhere({username: username});
          
          // User exists
          if (user) {
            tweets = user.get('tweets');
            streamView = Vm.create(appView, 'Stream', StreamView, {collection: tweets});
          }
          // User doesn't dxist so just show all streams
          else {
            streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream});
          }
        }
        else {
          streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream});
        }

        var pageView = Vm.create(appView, 'PageStreamView', PageStreamView, {user: user});
        $('#main').html(pageView.render().el);
        $('#stream-wrapper').append(streamView.render().el);
      });

      // Backbone.history needed for bookmarkable URLs
      Backbone.history.start();
    });
  };

  return {
    initialize: initialize
  };
});
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
      'views/join',
      'views/new-tweet'
    ],
    function (Users, Stream, HomeView, StreamView, JoinView, NewTweetView) {
    
      var router = new AppRouter(options)
        , appView = options.appView
        , vents = _.extend({}, Backbone.Events);

      // Save users and stream instance...
      // this is necessary because we don't have a database and we need to be sure
      // that the users and stream returned is the same everywhere
      var users = new Users(null, {vents: vents})
        , stream = new Stream(null, {users: users.models});

      vents.on('user:selected', function (user) {
        router.navigate('stream/' + user.get('username'), {trigger: true});
      });

      vents.on('open:setUsername', function () {
        console.log('test');
        var joinView = Vm.create(appView, 'JoinView', JoinView, {users: users});
        $('body').append(joinView.render().el);
      });

      router.on('route:home', function () {

        var homeView = Vm.create(appView, 'HomeView', HomeView, {vents: vents})
          , streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream, limit: 10});

        $('#main').html(homeView.render().el);
        $('#stream-wrapper').append(streamView.render().el);
      });

      router.on('route:stream', function (username) {
        var tweets = null
          , streamView = null;

        var joinView = Vm.create(appView, 'JoinView', JoinView, {users: users})
          , newTweetView = Vm.create(appView, 'NewTweetView', NewTweetView, {collection: stream, users: users});

        if (username) {
          var user = users.findWhere({username: username});
          tweets = user.get('tweets');

          streamView = Vm.create(appView, 'Stream', StreamView, {collection: tweets});
        }
        else {
          streamView = Vm.create(appView, 'Stream', StreamView, {collection: stream});
        }

        // streamView.render();
        // $('.chatty-list').html(streamView.render().el);
      });

      // Backbone.history needed for bookmarkable URLs
      Backbone.history.start();
    });
  };

  return {
    initialize: initialize
  };
});
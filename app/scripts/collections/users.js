'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  '../models/user'
], function ($, _, Backbone, User) {
  return Backbone.Collection.extend({
    currentUser: null,
    
    model: User,
    
    initialize: function () {
      console.info('UsersCollection Init');

      this.add([
        {username:'shawndrost'},
        {username:'sharksforcheap'},
        {username:'mracus'},
        {username:'douglascalhoun'}
      ]);
    },

    setCurrentUser: function (user) {
      this.currentUser = user;
      this.trigger('updated:currentUser', user);
    },

    getCurrentUser: function () {
      return this.currentUser;
    }
  });
});
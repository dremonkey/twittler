'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  '../models/user'
], function ($, _, Backbone, User) {
  return Backbone.Collection.extend({
    currentUser: null, // basically logged in user
    selectedUser: null, // user being viewed
    
    model: User,
    
    initialize: function (models, options) {
      console.info('UsersCollection Init');

      this._vents = options.vents;

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
    },

    setSelectedUser: function (user) {
      this._vents.trigger('user:selected', user);
    },

    getSelectedUser: function () {

    }
  });
});
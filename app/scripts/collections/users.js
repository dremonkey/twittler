'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  '../models/user',
  '../events'
], function ($, _, Backbone, User, vents) {
  return Backbone.Collection.extend({
    
    currentUser: null, // basically serves to store the logged in user
    
    selectedUser: null, // user being viewed
    
    model: User,
    
    initialize: function (models, options) {
      console.info('UsersCollection Init');

      vents.on('user:loggedin', this.setCurrentUser, this);

      this.add([
        {username:'shawndrost'},
        {username:'sharksforcheap'},
        {username:'mracus'},
        {username:'douglascalhoun'}
      ]);
    },

    setCurrentUser: function (user) {
      this.currentUser = user;
      this.add(user);
    },

    getCurrentUser: function () {
      return this.currentUser;
    },

    setSelectedUser: function (user) {
      this.selectedUser = user;
      vents.trigger('users:selected', user);
    },

    getSelectedUser: function () {
      return this.selectedUser;
    }
  });
});
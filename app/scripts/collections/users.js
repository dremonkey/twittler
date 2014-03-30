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
      if (0 === this.models.length) {
        this.models = [
          new this.model({username:'shawndrost'}),
          new this.model({username:'sharksforcheap'}),
          new this.model({username:'mracus'}),
          new this.model({username:'douglascalhoun'})
        ];
      }
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
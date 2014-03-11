'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  '../models/user'
], function ($, _, Backbone, User) {

  return Backbone.Collection.extend({
    model: User,
    initialize: function () {
      this.models = [
        new this.model({username:'shawndrost'}),
        new this.model({username:'sharksforcheap'}),
        new this.model({username:'mracus'}),
        new this.model({username:'douglascalhoun'})
      ];
    }
  });
});
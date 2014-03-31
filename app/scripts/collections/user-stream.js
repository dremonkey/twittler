'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
], function ($, _, Backbone) {
  return Backbone.Collection.extend({
    initialize: function () {
      console.info('UserStream Init');
    }
  });
});
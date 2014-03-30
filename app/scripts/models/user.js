'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  return Backbone.Model.extend({
    defaults: {
      username: ''
    }
  });
});
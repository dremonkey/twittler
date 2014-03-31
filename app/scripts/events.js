'use strict';

// ## Global Event Listener/Dispatcher
// Include this anywhere you want access to global events

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return _.extend({}, Backbone.Events);
});
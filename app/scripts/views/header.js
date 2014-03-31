'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return Backbone.View.extend({
    el: '.site-header',
    
    initialize: function () {},
    
    render: function () {
      return this;
    }
  });
});
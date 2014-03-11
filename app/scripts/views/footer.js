'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return Backbone.View.extend({
    el: '.site-footer',
    initialize: function () {},
    render: function () {
      var _this = this;
      $(this.el).html('<div>Footer Here</div>');
    }
  });
});
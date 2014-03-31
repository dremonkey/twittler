'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home.html'
], function ($, _, Backbone, homeTemplate) {
  return Backbone.View.extend({
    
    template: _.template(homeTemplate),

    events: {
      'click .open-set-username': 'setUsername'
    },

    initialize: function (options) {
      this.vents = options.vents;
    },
    
    render: function () {
      var compiled = this.template();
      this.$el.html(compiled);
      return this;
    },

    setUsername: function (event) {
      event.preventDefault();
      this.vents.trigger('open:setUsername');
    }
  });
});
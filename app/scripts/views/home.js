'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  '../events',
  'text!templates/home.html',
  'text!templates/home/welcome.html'
], function ($, _, Backbone, vents, homeTemplate, homeWelcomeTemplate) {
  return Backbone.View.extend({
    
    template: _.template(homeTemplate),

    events: {
      'click .open-login': 'login',
      'click .open-compose': 'compose'
    },

    initialize: function () {
      vents.on('user:loggedin', this.afterLogin, this);
    },
    
    render: function () {
      var compiled = this.template();
      this.$el.html(compiled);
      return this;
    },

    // --------------------------------------------------------
    // ## Global Event Handlers

    afterLogin: function (user) {
      var msg = _.template(homeWelcomeTemplate)(user.toJSON());
      this.$el.find('.lead-wrapper').html(msg);
    },

    // --------------------------------------------------------
    // ## DOM Event Handlers

    login: function (event) {
      event.preventDefault();
      vents.trigger('user:login');
    },

    compose: function (event) {
      event.preventDefault();
      vents.trigger('tweet:compose');
    }
  });
});
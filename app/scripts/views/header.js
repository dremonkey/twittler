'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'events'
], function ($, _, Backbone, vents) {
  return Backbone.View.extend({
    el: '.site-header',

    events: {
      'click .login': 'login',
      'click .compose': 'compose'
    },
    
    initialize: function () {
      vents.on('user:loggedin', this.afterLogin, this);
    },
    
    render: function () {
      return this;
    },

    // --------------------------------------------------------
    // ## Global Event Handlers

    afterLogin: function (user) {
      this.$el.find('.login').removeClass('login').addClass('compose').text('Compose');
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
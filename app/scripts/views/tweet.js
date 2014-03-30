'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tweet.html'
], function ($, _, Backbone, tweetTemplate) {
  return Backbone.View.extend({
    el: '.stream',

    events: {
      'click .username': 'reply'
    },

    template: _.template(tweetTemplate),

    render: function () {
      var compiled = this.template(this.model.toJSON());
      this.$el.prepend(compiled);
      
      return this;
    },

    reply: function (event) {
      event.preventDefault();
      var username = $(event.currentTarget).data().username;
      var input = this.$el.parent().siblings('.new-tweet').find('input');
      input.val('@' + username + ' ').focus();
    }
  });
});
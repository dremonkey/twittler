'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'text!templates/tweet.html'
], function ($, _, Backbone, moment, tweetTemplate) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'tweet message animated fadeInDown',

    events: {
      'click .username': 'reply'
    },

    template: _.template(tweetTemplate),

    initialize: function () {
      this.listenTo(this.model, 'change:formattedTime', this.updateDisplayedTime);
      setInterval(this.updateFormattedTime, 30000, this);
    },

    render: function () {
      var compiled = this.template(this.model.toJSON());
      this.$el.html(compiled);
      return this;
    },

    reply: function (event) {
      event.preventDefault();
      var username = $(event.currentTarget).data().username;
      var input = this.$el.parent().siblings('.new-tweet').find('input');
      input.val('@' + username + ' ').focus();
    },

    updateFormattedTime: function (view) {
      var timestamp = view.model.get('timestamp')
        , formatted = moment(timestamp).fromNow();

      view.model.set('formattedTime', formatted); // update model
    },

    updateDisplayedTime: function (model, attr) {
      this.$el.find('.time').html(attr);
    }
  });
});
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
    template: _.template(tweetTemplate),
    render: function () {
      var t = this.template(this.model.toJSON());
      this.$el.append(t);
    }
  });
});
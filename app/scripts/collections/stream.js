'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/tweet'
], function ($, _, Backbone, Tweet) {

  return Backbone.Collection.extend({
    model: Tweet,
    initialize: function () {
      // initalize with some random tweets
      for (var i = 0; i < 10; i++) {
        var tweet = new this.model();
        this.unshift(tweet);
      }

      this.scheduleNextTweet();
    },

    scheduleNextTweet: function (context) {
      var _this = context || this;
      var tweet = new _this.model();
      _this.unshift(tweet);
      
      // schedule the next tweet
      setTimeout(function () {
        _this.scheduleNextTweet(_this);
      }, Math.floor(Math.random() * 5000) + 1000);
    }
  });
});
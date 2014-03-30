'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  './tweet'
], function ($, _, Backbone, Vm, TweetView) {
  return Backbone.View.extend({
    el: '.stream',
    initialize: function () {
      this.listenTo(this.collection, 'add', this.addTweet);
    },

    render: function () {
      var _this = this;
      this.collection.each(function (model) {
        var tweetView = Vm.create(_this, 'TweetView', TweetView, {model: model});
        tweetView.render();
      });
      
      return this;
    },

    addTweet: function (tweet) {
      var tweetView = Vm.create(this, 'TweetView', TweetView, {model: tweet});
      tweetView.render();
    }
  });
});
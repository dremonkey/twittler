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
      var _this = this
        , collection = this.collection;

      collection.each(function (model) {
        var options = {
          model: model,
          collection: collection
        };

        var tweetView = Vm.create(_this, 'TweetView', TweetView, options);
        tweetView.render();
      });
      
      return this;
    },

    addTweet: function (tweet) {
      
      var options = {
        model: tweet,
        collection: this.collection
      };

      var tweetView = Vm.create(this, 'TweetView', TweetView, options);
      tweetView.render();
    }
  });
});
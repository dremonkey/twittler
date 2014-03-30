'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function ($, _, Backbone, Vm) {
  return Backbone.View.extend({
    el: '.stream',
    initialize: function () {
      this.listenTo(this.collection, 'add', this.addTweet)
    },

    render: function () {
      var _this = this
        , collection = this.collection;

      require(['views/tweet'], function (TweetView) {
        collection.each(function (model) {
          var options = {
            model: model,
            collection: collection
          };

          var tweetView = Vm.create(_this, 'TweetView', TweetView, options);
          tweetView.render();
        });
      });

      return this;
    },

    addTweet: function () {
      console.log('@TODO add tweet to top of the list');
    }
  });
});
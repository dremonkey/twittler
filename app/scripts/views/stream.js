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

    },
    render: function () {
      var _this = this;
      var collection = this.collection;

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
    }
  });
});
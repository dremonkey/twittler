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
    
    tagName: 'ul',

    className: 'stream row',

    limit: false,

    initialize: function (options) {
      this.listenTo(this.collection, 'add', this.addTweet);
      this.limit = options.limit;
    },

    render: function () {
      var _this = this;

      this.collection.each(function (model, key) {
        if (key < _this.limit) {
          var tweetView = Vm.create(_this, 'TweetView', TweetView, {model: model});
          _this.$el.prepend(tweetView.render().el);
        }
      });
      
      return this;
    },

    addTweet: function (tweet) {
      var length = this.$el.children().length;
      if (this.limit && length >= this.limit) {
        var $last = this.$el.children().last();
        $last.removeClass('fadeInDown');
        $last.addClass('fadeOutDown');

        $last.bind('oanimationend animationend webkitAnimationEnd', function () {
          $last.remove();
        });
      }

      var tweetView = Vm.create(this, 'TweetView', TweetView, {model: tweet});
      this.$el.prepend(tweetView.render().el);
    },

    // Automatically called by 'vm'
    clear: function () {
      this.remove();
    }
  });
});
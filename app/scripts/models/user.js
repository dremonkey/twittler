'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  '../collections/user-stream'
], function ($, _, Backbone, UserStream) {

  return Backbone.Model.extend({
    defaults: {
      username: '',
      tweets: null
    },

    initialize: function (attrs) {
      if (!attrs || !attrs.tweets) {
        this.set('tweets', new UserStream());
      }
    },

    addTweet: function (tweet) {
      var tweets = this.get('tweets');
      tweets.add(tweet);
    },

    select: function () {
      this.collection.setSelectedUser(this);
    }
  });
});
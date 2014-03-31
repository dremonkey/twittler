'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/tweet',
  'text!templates/new-tweet.html'
], function ($, _, Backbone, Tweet, newTweetTemplate) {
  return Backbone.View.extend({
    el: '.new-tweet',
    
    events: {
      'submit': 'newTweet'
    },

    template: _.template(newTweetTemplate),
    
    initialize: function (options) {
      this.users = options.users;
      this.listenTo(this.users, 'updated:currentUser', this.updateUsername);
    },

    render: function () {
      var _this = this
        , currentUser = this.users.getCurrentUser() || new this.users.model();

      var compiled = this.template(currentUser.toJSON());
      this.$el.html(compiled);
      
      return this;
    },

    updateUsername: function (user) {
      var compiled = this.template(user.toJSON());
      this.$el.html(compiled);
    },

    newTweet: function (event) {
      event.preventDefault();

      var $input = $(event.currentTarget).find('input')
        , user = this.users.getCurrentUser()
        , msg = $input.val();
      
      // create a new tweet
      var tweet = new Tweet({
        username: user.get('username'),
        message: msg
      });

      // add tweet to the stream
      this.collection.add(tweet);

      // add tweet to user tweets
      user.addTweet(tweet);

      // clear the input box
      $input.val('');
    }
  });
});
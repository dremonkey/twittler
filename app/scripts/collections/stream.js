'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/tweet'
], function ($, _, Backbone, Tweet) {

  // utility function
  function randomElement (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function scheduleNextTweet (collection) {
    console.log('scheduleNextTweet');
    
    var randomUser = randomElement(collection._users);
    collection.add({user: randomUser}); // add tweet to stream

    // schedule the next tweet
    setTimeout(function () {
      scheduleNextTweet(collection);
    }, Math.floor(Math.random() * 5000) + 3000);
  }

  return Backbone.Collection.extend({

    model: Tweet,

    _users: null,
    _usernames: null,
    
    initialize: function (models, options) {
      console.info('StreamCollection Init');

      // Event Listeners
      this.on('add', this.saveUserTweet);

      // Set Collection Properties
      this._users = _.clone(options.users);

      // Prepare Next Tweet
      scheduleNextTweet(this);
    },

    saveUserTweet: function (tweet) {
      var user = tweet.get('user');
      user.addTweet(tweet);
    }
  });
});
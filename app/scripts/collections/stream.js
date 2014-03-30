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

    var randomUser = randomElement(collection.users);
    collection.add({username: randomUser.get('username')}); // add tweet to stream
    
    // schedule the next tweet
    setTimeout(function () {
      scheduleNextTweet(collection);
    }, Math.floor(Math.random() * 5000) + 3000);
  }

  return Backbone.Collection.extend({

    model: Tweet,

    users: null,
    
    initialize: function (models, options) {
      console.info('StreamCollection Init');
      
      // clone original so that currentUser doesn't get randomly used
      this.users = _.clone(options.users);

      // output random tweets
      scheduleNextTweet(this);
    }
  });
});
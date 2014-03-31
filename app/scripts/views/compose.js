'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/tweet',
  'text!templates/compose.html'
], function ($, _, Backbone, Tweet, composeTemplate) {
  return Backbone.View.extend({
    tagName: 'div',

    currentUser: null,
    
    className: 'compose-prompt overlay animated fadeInDown',
    
    template: _.template(composeTemplate),
    
    events: {
      'click .send': 'newTweet',
      'submit': 'newTweet'
    },
    
    initialize: function (options) {
      this.users = options.users;
    },

    render: function () {
      this.currentUser = this.users.getCurrentUser();
      
      var compiled = this.template(this.currentUser.toJSON());
      this.$el.html(compiled);
      
      console.log(this.currentUser);
      return this;
    },

    newTweet: function (event) {
      event.preventDefault();

      var $input = this.$el.find('input')
        , msg = $input.val();
      
      // create a new tweet
      var tweet = new Tweet({
        user: this.currentUser,
        message: msg
      });

      // add tweet to the stream
      this.collection.add(tweet);

      // hide the tweet box...
      this.$el.removeClass('fadeInDown');
      this.$el.addClass('fadeOutUp');

      var _this = this;
      this.$el.bind('oanimationend animationend webkitAnimationEnd', function () {
        _this.$el.remove();
      });
    }
  });
});
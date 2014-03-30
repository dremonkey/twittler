'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/new-tweet.html'
], function ($, _, Backbone, newTweetTemplate) {
  return Backbone.View.extend({
    el: '.new-tweet',
    
    template: _.template(newTweetTemplate),
    
    initialize: function () {
      this.listenTo(this.collection, 'updated:currentUser', this.updateUsername);
    },

    render: function () {

      var _this = this
        , currentUser = this.collection.getCurrentUser() || new this.collection.model;
        // , tplVars = {username: ''};
      
      // if (currentUser) {
      //   tplVars = currentUser;
      // }

      var compiled = this.template(currentUser.toJSON());
      this.$el.html(compiled);
      
      return this;  
    },

    updateUsername: function (user) {
      var compiled = this.template(user.toJSON());
      this.$el.html(compiled);
    }
  });
});
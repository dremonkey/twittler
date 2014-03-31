'use strict';

/*jshint unused:false */

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  'text!templates/join.html'
], function ($, _, Backbone, joinTemplate) {
  return Backbone.View.extend({
    tagName: 'div',
    
    className: 'join overlay animated',
    
    template: _.template(joinTemplate),

    events: {
      'click .set-username': 'setUsername'
    },

    initialize: function (options) {
      this.users = options.users;
    },

    render: function () {
      var compiled = this.template();
      this.$el.html(compiled);
      return this;
    },

    setUsername: function (event) {
      event.preventDefault();

      var $input = this.$el.find('input[name="username"]');
        
      var User = this.users.model
        , username = $input.val();
      
      // create a new user
      if (username && !this.users.getCurrentUser()) {
        
        var currentUser = new User({username: username});
        this.users.add(currentUser);
        this.users.setCurrentUser(currentUser);
        
        // hide the welcome box...
        // also sets display to 'none' when the animation is completed
        this.$el.addClass('fadeOutDown');

        var _this = this;
        this.$el.bind('oanimationend animationend webkitAnimationEnd', function () {
          _this.$el.css({display: 'none'});
        });
      }
    }
  });
});
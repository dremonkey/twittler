'use strict';

/*jshint unused:false */

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  '../models/user',
  '../events',
  'text!templates/login.html'
], function ($, _, Backbone, User, vents, loginTemplate) {
  return Backbone.View.extend({
    tagName: 'div',
    
    className: 'login-prompt overlay animated fadeInDown',
    
    template: _.template(loginTemplate),

    events: {
      'click .login': 'login'
    },

    initialize: function () {},

    render: function () {
      var compiled = this.template();
      this.$el.html(compiled);
      return this;
    },

    login: function (event) {
      event.preventDefault();

      console.log(event);

      var username = this.$el.find('input[name="username"]').val();
      
      // create a new user
      if (username) {
        
        var currentUser = new User({username: username});
        currentUser.setCurrentUser();
        vents.trigger('user:loggedin', currentUser);
        
        // hide the welcome box...
        // also removes when the animation is completed
        this.$el.removeClass('fadeInDown');
        this.$el.addClass('fadeOutUp');

        var _this = this;
        this.$el.bind('oanimationend animationend webkitAnimationEnd', function () {
          _this.$el.remove();
        });
      }
    }
  });
});
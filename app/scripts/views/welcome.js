'use strict';

/*jshint unused:false */

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return Backbone.View.extend({
    el: '.welcome',

    initialize: function (options) {
      this.users = options.users;
    },

    render: function () {
      var _this = this
        , $input = this.$el.find('input[name="username"]')
        , $btn = this.$el.find('.setusername');

      $btn.click(function (event) {
        event.preventDefault();
        
        var User = _this.users.model
          , username = $input.val();
        
        // create a new user
        if (username && !_this.users.getCurrentUser()) {
          
          var currentUser = new User({username: username});
          _this.users.add(currentUser);
          _this.users.setCurrentUser(currentUser);
          
          // hide the welcome box...
          // also sets display to 'none' when the animation is completed
          _this.$el.addClass('fadeOutDown');
          _this.$el.bind('oanimationend animationend webkitAnimationEnd', function () {
            _this.$el.css({display: 'none'});
          });
        }
      });
      return this;
    }
  });
});
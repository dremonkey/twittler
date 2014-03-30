'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/layout.html'
], function ($, _, Backbone, Vm, layoutTemplate) {
  return Backbone.View.extend({
    el: '.container',
    initialize: function () {},
    render: function () {
      var _this = this;
      $(this.el).html(layoutTemplate);

      require(['views/header'], function (HeaderView) {
        var headerView = Vm.create(_this, 'HeaderView', HeaderView);
        headerView.render();
      });

      require([
        'views/welcome',
        'views/new-tweet',
        'collections/users'
      ], function (WelcomeView, NewTweetView, Users) {
        
        var users = new Users();
        var options = {
          collection: users
        };

        var welcomeView = Vm.create(_this, 'WelcomeView', WelcomeView, options)
          , newTweetView = Vm.create(_this, 'NewTweetView', NewTweetView, options);

        welcomeView.render();
        newTweetView.render();
      });

      require(['views/footer'], function (FooterView) {
        // Pass the appView down into the footer so we can render the visualisation
        var footerView = Vm.create(_this, 'FooterView', FooterView, {appView: _this});
        footerView.render();
      });

      return this;
    }
  });
});
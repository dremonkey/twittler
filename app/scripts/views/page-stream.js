'use strict';

/*jshint unused:false */

define([
  'jquery',
  'underscore',
  'backbone',
  '../events',
  'text!templates/page-stream.html',
], function ($, _, Backbone, vents, pageTemplate) {
  return Backbone.View.extend({

    user: null,
    
    template: _.template(pageTemplate),

    initialize: function (options) {
      this.user = options && options.user || null;
    },
    
    render: function () {
      console.log(this.user);

      var tplVars = {};
      tplVars.username = this.user ? this.user.get('username') : 'all';

      var compiled = this.template(tplVars);
      this.$el.html(compiled);

      return this;
    }
  });
});
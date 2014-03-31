'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'events'
], function ($, _, Backbone, vents) {
  
  var views = {};

  var create = function (context, name, View, options) {
    
    // View clean up isn't actually implemented yet 
    // but will simply call .remove and .unbind
    if(typeof views[name] !== 'undefined') {
      if(typeof views[name].clean === 'function') {
        views[name].clean();
      }
    }

    var view = new View(options);
    views[name] = view;

    if(typeof context.children === 'undefined'){
      context.children = {};
      context.children[name] = view;
    } else {
      context.children[name] = view;
    }

    vents.trigger('vm:created');
    return view;
  };
  
  return {
    create: create
  };
});
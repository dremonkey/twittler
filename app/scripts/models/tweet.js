'use strict';

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  'moment',
], function ($, _, Backbone, moment) {

  // utility function
  var randomElement = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  // random tweet generator
  var opening = ['just', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
  var verbs = ['drank', 'drunk', 'deployed', 'got', 'developed', 'built', 'invented', 'experienced', 'fought off', 'hardened', 'enjoyed', 'developed', 'consumed', 'debunked', 'drugged', 'doped', 'made', 'wrote', 'saw'];
  var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
  var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
  var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

  var randomMessage = function(){
    return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
  };

  return Backbone.Model.extend({
    
    defaults: {
      user: null,
      username: '',
      message: '',
      timestamp: '',
      formattedTime: ''
    },

    initialize: function (attrs) {

      if (attrs && attrs.user) {
        var date = new Date();
        this.set('user', attrs.user);
        this.set('username', attrs.user.get('username'));
        this.set('message', (attrs.message || randomMessage()));
        this.set('timestamp', date);
        this.set('formattedTime', moment(date).fromNow());
      }
    }
  });
});
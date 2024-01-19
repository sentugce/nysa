// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links, block, structure, decoration, piece, notification, birlestigiBlok} from '../links.js';
Meteor.publish('birlestigiBlok.all', function(query) {
  var res;
  if(query){
    res=birlestigiBlok.find(query);
  }else{
    res=birlestigiBlok.find();
  }
  return res;
});

Meteor.publish('links.all', function () {
  return Links.find();
});
Meteor.publish('singleUser', function (query) {
  return Meteor.users.find(query);
});
Meteor.publish('notification.all', function (query) {
  return notification.find(query);
});
Meteor.publish('users.all', function (query) {
  console.log(res, 'users.all');
  var res;
  if(query){
    res=Meteor.users.find(query);
  }else{
    res=Meteor.users.find();
  }
  return res;
});
Meteor.publish('blocks.all', function (query) {
  var res;
  if(query){
    res=block.find(query);
  }else {
    res=block.find();
  }
  return res;
});
Meteor.publish('structure.all', function (query) {
  var res;
  if(query){
    res=structure.find(query);
  }else {
    res=structure.find();
  }
  return res;
});
Meteor.publish('decoration.all', function () {
  return decoration.find();
});
Meteor.publish('piece.all', function (query) {
  var res;
  if(query){
    res=piece.find(query);
  }else {
    res=piece.find();
  }
  return res;
});

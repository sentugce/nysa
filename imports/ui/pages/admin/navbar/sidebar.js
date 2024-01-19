import './sidebar.html';
import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';
Template.sidebar.helpers({
  isAdmin(){
    if(Meteor.user()){
      var res;
      var user=Meteor.user();
      if(user.profile.roles=='admin'){
        res=true;
      }
      return res;
    }
  }
});

import './navbar.html';
import {notification} from '/imports/api/links/links.js';

Template.navbar.helpers({
allNotification(){
  var query= {
    view:"0"
  };
  Meteor.subscribe('notification.all', query);
  return notification.find(query).count();
},
loggedUserName(){
  if(Meteor.user()){
    return Meteor.user().emails[0].address;
  }

},
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
Template.navbar.events({
'click #loggedUser'(){
return Meteor.logout(function(){
  FlowRouter.go('/');
});
}
});

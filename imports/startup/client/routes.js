import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app

function loggedUser(){
  var res;
  if(Meteor.user()){
    var userRole=Meteor.user().profile.roles;
    if(userRole){
      res=userRole;
    }
  } else{
    res=false;

  }
  return res;
}

var adminRoutes=FlowRouter.group({
  prefix:"/admin",
  triggersEnter:[function(context, redirect){
    console.log(loggedUser()+'......');
    if(loggedUser()=="admin"){
      return true;
    }else{
      return FlowRouter.go('/dashboard');
    }
  }
]
});

var userRoutes=FlowRouter.group({
  prefix:"/user",
  triggersEnter:[function(context, redirect){
    if(loggedUser()=="user"){
      return true;
    }
  }
]
});

var loggedUserRoute=FlowRouter.group({
  triggersEnter:[function(context, redirect){
    if(loggedUser()){
      return true;
    }else{
      return FlowRouter.go('/');
    }
  }
]
});

loggedUserRoute.route('/dashboard', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'dashboard'});
  },
});

adminRoutes.route('/userList/:_id?', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'userList'});
  },
});

adminRoutes.route('/trash', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'trash'});
  },
});


loggedUserRoute.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { header:'navbar' , main: 'login' });
  },
});

loggedUserRoute.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

loggedUserRoute.route('/structure', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'structure'});
  },
});

loggedUserRoute.route('/block', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'block'});
  },
});

loggedUserRoute.route('/decoration', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'decoration'});
  },
});

loggedUserRoute.route('/pieceList', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'pieceList'});
  },
});

adminRoutes.route('/notificationList', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'notificationList'});
  },
});

loggedUserRoute.route('/pieceDetails/:_id?', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'pieceDetails'});
  },
});

loggedUserRoute.route('/piece/:_id?', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {navbar:'navbar', sidebar:'sidebar', main: 'piece'});
  },
});

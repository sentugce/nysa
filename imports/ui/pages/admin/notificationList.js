import './notificationList.html';
import {notification} from '/imports/api/links/links.js';

Template.notificationList.helpers({
  allNotification(){
    var query={
      view:"0"
    };
    Meteor.subscribe('notification.all', query);
    return notification.find(query);
  },
  dateFormat(date) {
    return moment(date).format('MM-DD-YYYY')
  },
  userFormat(userId) {
    var res;
    var query={
      _id:userId
    };
    Meteor.subscribe('singleUser', query);
    var curentUser=Meteor.users.find(query).fetch();
    if(curentUser[0]){
      res=curentUser[0].emails[0].address;
    }
    return res;
  }
});

Template.notificationList.events({
  'click #send-remove'(e, t){
    console.log(this.type);
    if(this.type=='/admin/userList'){
      var data={
        verified:true
      };
      Meteor.call('userVerified.update', this.getId, data, function(err){
        if(err){
          alert(err.reason);
        }else{
          alert('Kayıt Kabul Edildi');
          FlowRouter.go('/admin/userList');
        }
      });
      console.log(data);
      return false;
    }
    if(this.type=='/pieceDetails'){
      var data={
        status:"0",
        _id:this._id
      };
      Meteor.call('pieceStatus.update',this.getId, data, function(err){
        if(err){
          alert(err.reason);
        }else{
          alert('Kaydınız Silindi');
        }
      });
    }

    //return false;

  },
  'click #refuse'(e, t){
    if(this.type=='/pieceDetails'){
      var data={
        status:"1"
      };
      console.log(this.getId);
      Meteor.call('pieceStatus.update',this.getId, data, function(err){
        if(err){
          alert(err.reason);
        }else{
          alert('Talep Reddedildi');
        }
      });
    }
    if(this.type=='/admin/userList'){
      var data={
        status:"0",
        verified:false
      };
      var optype={
        type:'notification',
        _id:this._id,
        view:"1"
      };

      Meteor.call('userRemove.update',this.getId, data, optype, function(err){
        if(err){
          alert(err.reason);
        }else{
          alert('Talep Reddedildi');
        }
      });
    }
  }
});

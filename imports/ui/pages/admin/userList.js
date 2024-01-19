import './userList.html';
import { Meteor } from 'meteor/meteor';

Template.userList.helpers({
  allUsers(){
    var query={
      "profile.verified" :true
    }
    Meteor.subscribe('users.all', query);
    return Meteor.users.find(query);
  },
  myRecord(_id){
    var res;

    if(_id!==Meteor.userId()){
      res=true;
    }
    return res;

  },
  isChecked(perm){
    var res;
    if(perm==1){
      res='checked';
    }
    return res;
  },
  isAdmin(){
    if(this.profile.roles=='admin'){
      return true;
    }
  },
  userVerified(){
    var roles=this.profile.roles;
    var verified=this.profile.verified;
    if(roles!="admin"){
      if(!verified){
        return true;
      }
    }
  }
});

Template.userList.events({
  'click #send-remove'(e, t){
    var data={
      status:0,
      verified:false
    };
    Meteor.call('userRemove.update',this._id, data, function(err){
      if(err){
        alert(err.reason);
      }else{
        alert('Kullanıcı Kaydı Silindi');
      }
    });
  },
  'click #send-ok'(e, t){
    console.log(this);
    var data={
      verified:true
    }
    Meteor.call('userVerified.update',this._id, data, function(err){
      if(err){
        alert(err.reason);
      }else{
        alert('Kayıt Onaylandı');
      }
    });
  },
  'click input'(e, t){
    var getInput=$(e.target).attr('id');
    var getValue=$(e.target).is(':checked') ? 1:0;
    var data={res:getValue};

    Meteor.call('userPermision.update',this._id, data, getInput, function(err){
      if(err){
        alert(err.reason);
      }else{
        alert('İşleminiz Gerçekleşti');
      }
    });
  },
  'click #change-role'(e, t) {
    if(confirm('Kullanıcı Rolü Değiştirilecek')){
      var res='admin';
      if(this.profile.roles=='admin'){
        res='user';
      }

      Meteor.call('userRole.update',this._id, res, function(err){
        if(err){
          alert(err.reason);
        }else{
          alert('İşleminiz Gerçekleşti');
        }
      });
    }
  },

});

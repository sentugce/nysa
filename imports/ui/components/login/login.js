import './login.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
function loginEvent(e,t){
  var email = t.find('#email').value || t.find('#email-create').value ,
      pass = t.find('#password').value || t.find('#password-create').value;

  Meteor.loginWithPassword(email, pass, function(err){
    if (err){
      console.log('Kullanıcı adı veya şifre hatası');
    } else{

      var userRole=Meteor.user().profile.roles;
      var verified=Meteor.user().profile.verified;
      if(userRole==="admin"){
        FlowRouter.go('/dashboard');
      }
      if(userRole==="user") {
        if(verified){
          FlowRouter.go('/dashboard');
        }else{
          FlowRouter.go('/');
          alert('Hesap Doğrulanmadı Lütfen Daha Sonra Tekrar Deneyiniz');
        }
      }
    }
  });
}
Template.login.events({
  'click #login-send'(e, t){
    loginEvent(e, t);
  },
  'click #new-user-add'(e, t){
    var email=t.find('#email-create').value,
        pass=t.find('#password-create').value;

    if(pass.length<4){
      var alertDiv='<div style="color:white">şifre en az 4 karakterden oluşmalıdır</div>';
      $('#pass-length-info').attr('style','color.white').html(alertDiv);
      return false;0
    }
    var getData={
      email:email,
      password:pass
    };
    Meteor.call('user.insert',getData,function(err,a){
      if(err){
        alert(err.reason);
      }else{
        //console.log(a);
        //$("#modal1").modal("close");
        loginEvent(e, t);

        //alert("kayıt yapıldı");
      }
    });
  },
  'keypress #password-repeat'(){
    $('#pass-info').attr('style',"display:none;")
    $('#new-user-add').attr('style', "display:block");
  },
  'keypress #password-create'(){
    $('#pass-length-info').empty();
  },
  'keypress input#password'(e,t){
    if(e.which===13){
      loginEvent(e, t);
    }

  }
});

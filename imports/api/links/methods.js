// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Links, structure, block, decoration, piece, notification} from './links.js';

Meteor.methods({
  'links.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
  'structure.insert'(data) {
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.create!=1 ){
      throw  new Meteor.Error(606, 'Yetkiniz Yoktur');
    }
    return structure.insert(data);

  },
  'decoration.insert'(data) {
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.create!=1 ){
      throw  new Meteor.Error(606, 'Yetkiniz Yoktur');
    }
    if(!data.decoration){
      throw  new Meteor.Error(606, ' Bezeme Adı Girilmedi');
    }
    return decoration.insert(data);
  },
  'piece.insert'(data) {
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.create!=1 ){
      throw  new Meteor.Error(606, 'Yetkiniz Yoktur');
    }
    if(!data.structureId || data.structureId=="-1"){
      throw  new Meteor.Error(606, ' Yapı Seçilmedi');
    }
    if(!data.blockId || data.blockId=="-1"){
      throw  new Meteor.Error(606, ' Blok Cinsi Seçilmedi');
    }
    if(!data.envanterNo || data.envanterNo=="-1"){
      throw  new Meteor.Error(606, ' Envanter No Girilmedi');
    }
    if(!data.bulunmaTarih || data.bulunmaTarih=="-1"){
      throw  new Meteor.Error(606, 'Bulunma Tarihi Girilmedi');
    }
    /*if(!data.kaydeden || data.kaydeden=="-1"){
      throw  new Meteor.Error(606, 'Kaydeden Kişi İsmi Girilmedi');
    }*/
    if(!data.buluntuYeri || data.buluntuYeri=="-1"){
      throw  new Meteor.Error(606, 'Buluntu Yeri ve Şimdiki Yeri Girilmedi');
    }
    /*if(!data.description || data.description=="-1"){
      throw  new Meteor.Error(606, 'Tanım Girilmedi');
    }*/
    /*if(!data.decorationId || data.decorationId=="-1"){
      throw  new Meteor.Error(606, 'Bezeme Adı Seçilmedi');
    }*/
    return piece.insert(data);
  },

  'block.insert'(data) {
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.create!=1 ){
      throw  new Meteor.Error(606, 'Yetkiniz Yoktur');

    }
    if(!data.block){
      throw  new Meteor.Error(606, ' Blok Cinsi Girilmedi');
    }
    return block.insert(data);
  },

  'user.insert'(data){
    //check(data.email, String);
    //check(data.password, String);
    if(!data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    if(!data.email){
      throw  new Meteor.Error(606, '  Mail Adresi Belirtilmedi');
    }
    if(!data.password){
      throw  new Meteor.Error(606, '  Parola Belirtilmedi');
    }
    data.profile={
      verified:false,
      roles:"user",
      status:1
    };
    var _id = Accounts.createUser(data);

    if(_id){
      var notificationData= {
        getId:_id,
        description:'Yeni Kullanıcı Kaydı Oluşturuldu',
        operation:data,
        userId:_id,
        createdAt:new Date(),
        view:"0",
        type:'/admin/userList'
      };
      notification.insert(notificationData);
    }

  },
  'userRole.update'(_id, res){
    if(!_id || !res){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var data;
    if(res=="user"){
      data={
        "profile.roles":res,
        "create" : 0,
	"update" : 0,
	"remove" : 0
      };
    }

    if(res=="admin"){
      data={
        "profile.roles":res,
        "create" :1,
	"update" :1,
	"remove" :1
      };
    }

    Meteor.users.update({ _id:_id}, { $set:data},{upsert:1});

    //console.log(_id, res);
  },
  'userPermision.update'(_id, data, getInput){
    if(!_id || !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    //console.log(_id, data);
    var setData={};
    if(getInput=="create"){
      setData={
        create:data.res
      };
    }
    if(getInput=="update"){
      setData={
        update:data.res
      };
    }
    if(getInput=="remove"){
      setData={
        remove:data.res
      };
    }
    Meteor.users.update({ _id:_id}, { $set:setData},{upsert:1});
  },
  'pieceStatus.update'(_id, data){
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    if(!data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }

    //console.log(_id, data);
    //throw  new Meteor.Error(606, '  işlemi devam edemedi.');
    piece.update({_id:_id}, {$set:{status:data.status}}, {upsert:true});
    var notificationData;
    if(data.status=="2"){
      notificationData= {
        getId:_id,
        description:'Kayıt Durumu Sil Olarak İşaretlendi',
        operation:data,
        userId:Meteor.userId(),
        createdAt:new Date(),
        view:"0",
        type:'/pieceDetails'
      };
      notification.insert(notificationData);
    }else{
      notificationData={
        getId:_id,
        description:'Silme İşlemi Reddedildi',
        operation:data,
        userId:Meteor.userId(),
        createdAt:new Date(),
        view:"1",
        type:'/pieceDetails'
      };
      console.log(notificationData);
      notification.update({getId:notificationData.getId},{$set:notificationData});
    }


  },
  'piece.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    piece.update({_id:_id},{$set:data});

  },
  'userVerified.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    Meteor.users.update({_id:_id}, {$set:{'profile.verified':data.verified}}, {upsert:true});
    var  notificationData= {
      view:"1",
    };

    notification.update({getId:_id},{$set:{view:1}});
  },
  'userRemove.update'(_id,data, optype){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    Meteor.users.update({_id:_id}, {$set:{'profile.verified':data.verified, 'profile.status':data.status}});

    if(optype.type=='notification'){
      notification.update({_id:optype._id},{$set:{view:optype.view}})
    }

  },
  'userStatus.update'(_id, data){
    //console.log(_id,data);
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    Meteor.users.update({_id:_id}, {$set:{'profile.status':data.status}}, {upsert:true});
    notification.update({getId:_id},{$set:{view:1}});
  },
  'structureStatus.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    structure.update({_id:_id}, {$set:{'status':data.status}}, {upsert:true});

  },
  'blockStatus.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    block.update({_id:_id}, {$set:{'status':data.status}}, {upsert:true});
  },
  'decorationStatus.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    decoration.update({_id:_id}, {$set:{'status':data.status}}, {upsert:true});
  },
  'structureModal.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    structure.update({_id:_id}, {$set:data}, {upsert:true});
  },
  'blockModal.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    block.update({_id:_id}, {$set:data}, {upsert:true});
  },
  'decorationModal.update'(_id, data){
    if(!_id && !data){
      throw  new Meteor.Error(606, '  İşlem Devam Edemedi.');
    }
    var curentUser=Meteor.users.findOne({_id:Meteor.userId()});
    if(curentUser.update!=1 ){
      throw  new Meteor.Error(606, 'Değişiklik Yapma Yetkiniz Yoktur');
    }
    decoration.update({_id:_id}, {$set:data}, {upsert:true});
  }
});

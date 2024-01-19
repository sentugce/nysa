import './piece.html';
import {piece, structure, block, decoration} from '/imports/api/links/links.js';
import {ReactiveVar} from 'meteor/reactive-var';

Template.piece.onCreated(function pieceOnCreated() {
    this.counter = new ReactiveVar(0);
    this.selectedStructure= new ReactiveVar(false);
    this.selectedBlock= new ReactiveVar(false);
    this.selectedDecoration= new ReactiveVar(false);
});

Template.piece.events({
'change #structureId'(e, instance){
  return instance.selectedStructure.set(instance.find('#structureId').value);
},
'change #blockId'(e, instance){
  return instance.selectedBlock.set(instance.find('#blockId').value);
},
'change #decorationId'(e, instance){
  return instance.selectedDecoration.set(instance.find('#decorationId').value);
},
'click #addPiece'(e, t){
var structureId=t.find('#structureId').value,
blockId=t.find('#blockId').value,
decorationId=t.find('#decorationId').value,
buluntuYeri=t.find('#buluntuYeri').value.trim(),
description=t.find('#description').value,
envanterNo=t.find('#envanterNo').value.trim(),
bulunmaTarih=t.find('#bulunmaTarih').value,
kaydeden=t.find('#kaydeden').value.trim(),
yapıdakiYeri=t.find('#yapıdakiYeri').value.trim(),
birlestigiBlok=$("#birlestigiBlok").val()//selected").map(function(i, el) {
tasKesimi=t.find('#tasKesimi').value,
yapısalKurulusu=t.find('#yapısalKurulusu').value.trim(),
blokOzellik=t.find('#blokOzellik').value,
mermerinCinsi=t.find('#mermerinCinsi').value,
frontFace=t.find('#frontFace').value.trim(),
upperFace=t.find('#upperFace').value.trim(),
rightFace=t.find('#rightFace').value.trim(),
leftFace=t.find('#leftFace').value.trim(),
under=t.find('#under').value.trim(),
back=t.find('#back').value.trim(),
size=t.find('#size').value,
length=t.find('#length').value,
width=t.find('#width').value,
diameter=t.find('#diameter').value;
var data={
 media:Session.get('pieceImg'),
 structureId:structureId,
 blockId:blockId,
 decorationId:decorationId,
 buluntuYeri:buluntuYeri,
 description:description,
 envanterNo:envanterNo,
 bulunmaTarih:bulunmaTarih,
 kaydeden:kaydeden,
 yapıdakiYeri:yapıdakiYeri,
 birlestigiBlok:birlestigiBlok,
 tasKesimi:tasKesimi,
 yapısalKurulusu:yapısalKurulusu,
 blokOzellik:blokOzellik,
 mermerinCinsi:mermerinCinsi,
 frontFace:frontFace,
 upperFace:upperFace,
 rightFace:rightFace,
 leftFace:leftFace,
 under:under,
 back:under,
 size:size,
 length:length,
 width:width,
 diameter:diameter,
 status:"1"
};
if(FlowRouter.getParam('_id')){
  Meteor.call('piece.update', FlowRouter.getParam('_id'), data, function(err){
   if(err){
     alert(err.reason);
   }else{
     Session.set('pieceImg', null);
     alert('Mimari Eser Kaydedildi');
   }
  });
}else{
  Meteor.call('piece.insert', data, function(err){
   if(err){
     alert(err.reason);
   }else{
     Session.set('pieceImg', null);
     alert('Mimari Eser Kaydedildi');
   }
  });
}

}

});

Template.piece.helpers({
  selectedSt(){
    var query={
      status:"1",
      structureId:Template.instance().selectedStructure.get()

    };
    if(Template.instance().selectedBlock.get()){
      query.blockId=Template.instance().selectedBlock.get();
    }
    if(Template.instance().selectedDecoration.get()){
      query.decorationId=Template.instance().selectedDecoration.get();
    }

    Meteor.subscribe('piece.all', query);
    return piece.find(query);

  },
  getPiece(){
    var getId=FlowRouter.getParam("_id");
    //console.log(getId);
    var query={
      _id:getId
    };
    Meteor.subscribe('piece.all', query);
    return piece.find(query);

  },
  selectedFormat(_id, sub){
    console.log(sub);
    var res;
    //console.log(_id);
    if(_id && FlowRouter.getParam('_id')){
      var getId=FlowRouter.getParam("_id");
      //console.log(getId);
      var query={
        _id:getId
      };
      Meteor.subscribe('piece.all', query);
    var getPiece=piece.find(query).fetch();
    //console.log(getPiece[0]);
    if(getPiece[0]){
      if(sub=='structure'){
        if(getPiece[0].structureId===_id){
          res="selected";

        }
      }
      if(sub=='block'){
        if(getPiece[0].blockId===_id){
          res="selected";

        }
      }
      if(sub=='decoration'){
        if(getPiece[0].decorationId===_id){
          res="selected";

        }
      }
    }
    }
    return res;
  },
  curentStructure(_id){
    var query={
      _id:_id
    };
    Meteor.subscribe('structure.all', query);
    var curStructure=structure.find(query).fetch();
    var res;
    if(curStructure[0]){
      res=curStructure[0].structure;
    }
    return res;
  },
  curentBlock(_id){
    var query={
      _id:_id
    };
    Meteor.subscribe('blocks.all', query);
    var curBlock=block.find(query).fetch();
    var res;
    if(curBlock[0]){
      res=curBlock[0].block;
    }
    return res;
  },
  allBlocks(){
    Meteor.subscribe('blocks.all');
    return block.find();
  },
  allStructure(){
    Meteor.subscribe('structure.all');
    return structure.find();
  },
  allPiece(){
    Meteor.subscribe('piece.all');
    return piece.find();
  },
  allDecoration(){
    Meteor.subscribe('decoration.all');
    return decoration.find();
  },

  uploadCallbacksPages(e, instance){
    var fileArr=[];
    return {
      finished(index, fileInfo){

        var media={url:fileInfo.baseUrl+fileInfo.name};
        fileArr.push(media);
        Session.set('pieceImg', fileArr);
        $("#imgField").empty().append('<img src="'+fileInfo.baseUrl+""+fileInfo.name+'">');

      }

    }
    instance.counter.set(instance.counter.get() + 1);
    //console.log(fileArr);
  },
});

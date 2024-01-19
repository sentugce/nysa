import './pieceList.html';
import {piece, structure, block, decoration} from '/imports/api/links/links.js';
Template.pieceList.onRendered(function plOnRendered(){
  $(document).ready( function () {
    setTimeout(function(){
        $('#piece-list').DataTable( {"language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Turkish.json"
          }
        });

    },1000);

});
});


Template.pieceList.helpers({
  selectedFormat(_id, sub){

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
  statusFormat(status) {
var res;
if(status=="2"){
  res=true;

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
  curentDecoration(_id){
    var query={
      _id:_id
    };
    Meteor.subscribe('decoration.all', query);
    var curDecoration=decoration.find(query).fetch();
    var res;
    if(curDecoration[0]){
      res=curDecoration[0].decoration;
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
    var query={
      status:{$ne:"0"}
    };
    Meteor.subscribe('piece.all', query);
    return piece.find(query);
  },
  allDecoration(){
    Meteor.subscribe('decoration.all');
    return decoration.find();
  },

});

Template.pieceList.events({
  'click #send-remove'(e, t){
  var data={
    status:"2"
  };
  Meteor.call('pieceStatus.update',this._id, data, function(err){
   if(err){
     alert(err.reason);
   }else{
     alert('Onaya Gönderilmiştir');
   }
  });
}
});

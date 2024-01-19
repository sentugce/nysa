import './block.html';
import {block} from '/imports/api/links/links.js';
Template.block.onRendered(function blOnRendered(){
  $(document).ready( function () {
    setTimeout(function(){
        $('#block-list').DataTable( {"language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Turkish.json"
          }
        });

    },1000);

});
});

Template.block.events({
'click #addBlock'(e, t){
var block=t.find('#block').value,
description=t.find('#description').value;
var data={
 //media:Session.get('blockImg'),
 block:block,
 description:description,
 status:"1"
};
Meteor.call('block.insert', data, function(err){
 if(err){
   alert(err.reason);
 }else{
   alert('Blok Cinsi Kaydedildi');
 }
});
},
'click #blockUpdate'(e, t){
  console.log(this);
  Session.set('curentBlock', this);
},
'click #blockRemove'(e, t){
  var data={
    status:"0"
  };
  Meteor.call('blockStatus.update',this._id, data, function(err){
    if(err){
      alert(err.reason);
    }else{
      alert('Mimari Eleman Silindi');
    }
});
},
'click #block-modal-update'(e, t){
  var blockName=t.find('#block-name').value,
  descriptionText=t.find('#description-text').value;
  var data={
    block:blockName,
    description:descriptionText,
    status:"1"
  };
  Meteor.call('blockModal.update',this._id, data, function(err){
    if(err){
      alert(err.reason);
    }else{
      $('#blockModal').modal('hide');
      alert('Mimari Eleman Güncellendi');
    }
});
}

});

Template.block.helpers({
curentImg(){
  return Session.get('blockImg');
},
allBlocks(){
  var query={
    status:"1"
  };
  Meteor.subscribe('blocks.all');
  return block.find(query);
},
selectedBlock(){
  return Session.get('curentBlock');
},
  /*uploadCallbacksPages(e, instance){
    return {
      finished(index, fileInfo){
      //console.log(fileInfo);
      Session.set('blockImg', fileInfo);
      console.log(Session.get('blockImg'));
      $("#imgField").empty().append('<img src="'+fileInfo.baseUrl+""+fileInfo.name+'">');


    }
  };

},*/

});

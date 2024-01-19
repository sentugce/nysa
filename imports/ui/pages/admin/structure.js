import './structure.html';
import {structure} from '/imports/api/links/links.js';
Template.structure.onRendered(function slOnRendered(){
  $(document).ready( function () {
    setTimeout(function(){
        $('#structure-list').DataTable( {"language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Turkish.json"
          }
        });

    },1000);

});
});

 Template.structure.events({
 'click #addStructure'(e, t){
var structure=t.find('#structure').value,
description=t.find('#description').value;
console.log(structure, description);
var data={
  structure:structure,
  description:description,
  status:"1"
};
Meteor.call('structure.insert', data, function(err){
  if(err){
    alert(err.reason);
  }else{
    alert('yapı kaydedildi');
  }
});
 },
 'click #structureUpdate'(e, t){
   console.log(this);
   Session.set('curentStructure', this);
 },
 'click #structureRemove'(e, t){
   var data={
     status:"0"
   };
   Meteor.call('structureStatus.update',this._id, data, function(err){
     if(err){
       alert(err.reason);
     }else{
       alert('Yapı Silindi');
     }
 });
},
'click #structure-modal-update'(e, t){
  var structureName=t.find('#structure-name').value,
  descriptionText=t.find('#description-text').value;
  var data={
    structure:structureName,
    description:descriptionText,
    status:"1"
  };
  Meteor.call('structureModal.update',this._id, data, function(err){
    if(err){
      alert(err.reason);
    }else{
      $('#structureModal').modal('hide');
      alert('Yapı Güncellendi');
    }
});
}
});
 Template.structure.helpers({
  allStructure(){
    var query={
      status:"1"
    };
    Meteor.subscribe('structure.all');
    return structure.find(query);
  },
  selectedStructure(){
    return Session.get('curentStructure');
  },
});

import './decoration.html';
import {decoration} from '/imports/api/links/links.js';
Template.decoration.onRendered(function dlOnRendered(){
  $(document).ready( function () {
    setTimeout(function(){
      $('#decoration-list').DataTable( {"language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Turkish.json"
      }
    });

  },1000);

});
});

Template.decoration.events({
  'click #addDecoration'(e, t){
    var decoration=t.find('#decoration').value,
    description=t.find('#description').value;
    size=t.find('#size').value,
    length=t.find('#length').value,
    width=t.find('#width').value;
    var data={
      //media:Session.get('decorationImg'),
      decoration:decoration,
      description:description,
      size:size,
      length:length,
      width:width,
      status:"1"
    };
    Meteor.call('decoration.insert', data, function(err){
      if(err){
        alert(err.reason);
      }else{
        alert('bezeme kaydedildi');
      }
    });
  },
  'click #decorationUpdate'(e, t){
    console.log(this);
    Session.set('curentDecoration', this);
  },
  'click #decorationRemove'(e, t){
    var data={
      status:"0"
    };
    Meteor.call('decorationStatus.update',this._id, data, function(err){
      if(err){
        alert(err.reason);
      }else{
        alert('Bezeme Silindi');
      }
    });
  },
  'click #decoration-modal-update'(e, t){
    var decorationName=t.find('#decoration-name').value,
    descriptionText=t.find('#description-text').value;
    var data={
      decoration:decorationName,
      description:descriptionText,
      status:"1"
    };
    Meteor.call('decorationModal.update',this._id, data, function(err){
      if(err){
        alert(err.reason);
      }else{
        $('#decorationModal').modal('hide');
        alert('Bezeme Güncellendi');
      }
    });
  }

});

Template.decoration.helpers({
  allDecoration(){
    var query={
      status:"1"
    };
    Meteor.subscribe('decoration.all');
    return decoration.find(query);
  },
  selectedDecoration(){
    return Session.get('curentDecoration');
  },
  /*uploadCallbacksPages(e, instance){
  return {
  finished(index, fileInfo){
  //console.log(fileInfo);
  Session.set('decorationImg', fileInfo);
  //console.log(Session.get('blockImg'));
  $("#imgField").empty().append('<img src="'+fileInfo.baseUrl+""+fileInfo.name+'">');


}
}
},*/
});

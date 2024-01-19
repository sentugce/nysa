import './trash.html';
import {block, structure, decoration, piece} from '/imports/api/links/links.js';

Template.trash.helpers({
  trashedBlock(){
    var query={
      status:"0"
    };
    Meteor.subscribe('blocks.all', query);
    return block.find(query);
  },
  trashedStructure(){
    var query={
      status:"0"
    };
    Meteor.subscribe('structure.all', query);
    return structure.find(query);
  },
  trashedDecoration(){
    var query={
      status:"0"
    };
    Meteor.subscribe('decoration.all', query);
    return decoration.find(query);
  },
  trashedPiece(){
    var query={
      status:"0"
    };
    Meteor.subscribe('piece.all', query);
    return piece.find(query);
  },
});

Template.trash.events({
  'click #takeBack'(e,t){
    var data={
    status:"1"
  };
  Meteor.call('blockStatus.update',this._id, data, function(err){
    if(err){
      alert(err.reason);
    }else{
      alert('İşleminiz Geri Alındı');
    }
});
},
  'click #takeBack'(e,t){
    var data={
    status:"1"
  };
  Meteor.call('structureStatus.update',this._id, data, function(err){
    if(err){
      alert(err.reason);
    }else{
      alert('İşleminiz Geri Alındı');
    }
});
},
  'click #takeBack'(e,t){
    var data={
    status:"1"
  };
  Meteor.call('structureStatus.update',this._id, data, function(err){
    if(err){
      alert(err.reason);
    }else{
      alert('İşleminiz Geri Alındı');
    }
});
},
'click #takeBack'(e,t){
  var data={
  status:"1"
};
Meteor.call('decorationStatus.update',this._id, data, function(err){
  if(err){
    alert(err.reason);
  }else{
    alert('İşleminiz Geri Alındı');
  }
});
},
'click #takeBack'(e,t){
  var data={
  status:"1"
};
Meteor.call('pieceStatus.update',this._id, data, function(err){
  if(err){
    alert(err.reason);
  }else{
    alert('İşleminiz Geri Alındı');
  }
});
},
});

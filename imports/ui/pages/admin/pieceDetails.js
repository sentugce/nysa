import './pieceDetails.html';
import {piece, structure, block, decoration, birlestigiBlok} from '/imports/api/links/links.js';

Template.pieceDetails.onRendered( function pdOnRendered(){
  $(document).ready(function() {
    setTimeout(function(){
      $(".fancybox").fancybox({
        beforeShow : function(){
          this.title =  $(this.element).data("caption");
        }
      });
    },1000);
  });
});

Template.pieceDetails.helpers({
  birlestigiBlokDetails(_id){
    if(_id){
      var query={
        birlesen:{$in:[_id]}
      };
      Meteor.subscribe('birlestigiBlok.all', query);
      return birlestigiBlok.find(query);
    }

  },
  birlestigiBlokMedia(_id){
    if(_id){
      var query={
        birlesen:{$in:[_id]}
      };
      Meteor.subscribe('birlestigiBlok.all', query);
      return birlestigiBlok.find(query);
    }
  },
  birlesenMedia(birlesen){
    var query={
      _id:{$in:birlesen}
    };
    //console.log(query);
    Meteor.subscribe('piece.all', query);
    //console.log(piece.find(query).fetch());
    return piece.find(query);

  },

  birlesenLink(arr){
    res="";

    _.each(arr, function(key){
      console.log(key);
      if(key!==FlowRouter.getParam("_id")){
        res+='<a href="/pieceDetails/'+key+'" class="btn btn-primary" id="other-piece-details"> Detaylı İncele</a>';
      }
    });
    //$('.link-field').empty().append(res);
    return res;
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

});

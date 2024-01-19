import './dashboard.html';
import {block} from '/imports/api/links/links.js';
import {structure} from '/imports/api/links/links.js';
import {decoration} from '/imports/api/links/links.js';
import {piece} from '/imports/api/links/links.js';

Template.dashboard.helpers({
  blockCounter(){
    Meteor.subscribe('blocks.all');
    return block.find().count();
  },
  structureCounter(){
    Meteor.subscribe('structure.all');
    return structure.find().count();
  },
  decorationCounter(){
  Meteor.subscribe('decoration.all');
  return decoration.find().count();
 },
  pieceCounter(){
    var query={
      status:"1"
    };
    Meteor.subscribe('piece.all', query);
    return piece.find(query).count();
  }

});

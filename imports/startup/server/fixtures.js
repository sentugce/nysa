// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links, piece, birlestigiBlok} from '../../api/links/links.js';

Meteor.startup(() => {
/*
  var pieceData=piece.find().fetch();
  //console.log(pieceData);
  _.each(pieceData, function(key){
    if(key.birlestigiBlok){
      console.log(key._id,'...',key.birlestigiBlok);
      var query={
        envanterNo:{$in:key.birlestigiBlok}
      };
      var getPiece=piece.find(query).fetch();
      //console.log(getPiece);
      var birlesenBlokData=[];
      birlesenBlokData.push(key._id);
      _.each(getPiece, function(p){
        //console.log(p._id);
        birlesenBlokData.push(p._id);
      });
      //console.log(birlesenBlokData);
      birlestigiBlok.insert({birlesen:birlesenBlokData});
    }


  });
*/
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    // tmpDir:  '/opt/uploads/.uploads/tmp',
    // uploadDir:  '/opt/uploads/.uploads/',

    checkCreateDirectories: true,
    accessControl: {
      allowOrigin: '*',
      allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
      allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    },
    cacheTime:8640000,
    minFileSize:1000,
    maxFileSize:100000000000,
    crop:false,

    getFileName: function(fileInfo) {

      var outType;
      switch(fileInfo.type){
        case 'image/png': outType='png';
        break;
        case 'image/jpeg': outType='jpg';
        break;
        case 'image/gif': outType='gif';
        break;
        case 'image/bmp': outType='bmp';
        break;
      };

      if (fileInfo) {

        //console.log(this);
        function  randomString(len, bits) {
          bits = bits || 36;
          var outStr = "", newStr;
          while (outStr.length < len) {
            newStr = Math.random().toString(bits).slice(2);
            outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
          }
          return outStr.toUpperCase();
        };
        fileInfo.name=randomString(11,12)+'.'+outType;
        return fileInfo.name;

      }

    },

  });

  // if the Links collection is empty
  if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];

    data.forEach(link => Links.insert(link));
  }
});

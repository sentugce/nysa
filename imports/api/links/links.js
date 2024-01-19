// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');
export const block = new Mongo.Collection('block');
export const structure = new Mongo.Collection('structure');
export const decoration = new Mongo.Collection('decoration');
export const piece = new Mongo.Collection('piece');
export const notification = new Mongo.Collection('notification');
export const birlestigiBlok = new Mongo.Collection('birlestigiBlok');

"use strict";
import * as Firebase from 'firebase';

var fbConst = require('../constants/firebase.json');

export class FirebaseRepository{
  private static _instance: FirebaseRepository;
  public firebaseApp : Firebase.app.App;
  public firebaseDb : Firebase.database.Database;

  constructor() {
    this.firebaseApp = Firebase.initializeApp(fbConst);
    this.firebaseDb = Firebase.database();
  }

  static getInstance(): FirebaseRepository{
    if(!FirebaseRepository._instance){
      FirebaseRepository._instance = new FirebaseRepository();
      return FirebaseRepository._instance;
    }
    else
      return FirebaseRepository._instance;
  }
}

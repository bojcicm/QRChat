import Firebase = require("firebase");
import fs = require("fs");
import * as path from "path";

import * as FileHelpers from "..\\services\\common\\fileHelpers";
/// <reference path="../services/common/fileHelpers.ts" />

export class FirebaseRepository{
    private static _instance: FirebaseRepository;
    
    public firebaseApp: firebase.app.App;
    public firebaseDb: firebase.database.Database;
    private config: any;

    private constructor(data) {
        this.config = data;
        this.firebaseApp = Firebase.initializeApp(this.config);
        this.firebaseDb = Firebase.database();
    }              

    static getInstance(){
        if(!FirebaseRepository._instance){
            let config = await FileHelpers.readJson(path.join(__dirname, "..\\config\\dev.json" ));
            FirebaseRepository._instance = new FirebaseRepository(config);
            return FirebaseRepository._instance;
        }
        else{
            return FirebaseRepository._instance;
        }
    }
}
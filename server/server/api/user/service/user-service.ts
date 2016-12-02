import {FirebaseRepository} from "../../../repository/firebaseRepository";
import {User} from "../model/user-model";
import {Token} from "../model/token-model";

export class UserService {
    public static getUserData(userId:string) : Promise<any>{
        return new Promise((resolve:Function, reject:Function) => {
            let db = FirebaseRepository.getInstance().firebaseDb;
            db.ref('users').child(userId).once('value')
            .then(function(data){
                var result = data.val();
                var userResult = new User(result.userId, result.token);
                resolve(userResult);
            }, function(error){
                var errorData = {
                    description : "Error has occured!",
                    message: error.message,
                    stack: error.stack
                }
                reject(errorData);
            });   
        });
    }

    public static createUser() : Promise<User>{
        return new Promise((resolve:Function, reject:Function) => {
            let db = FirebaseRepository.getInstance().firebaseDb;
            let newUserKey = db.ref('users').push().key;
            
            db.ref('users/' + newUserKey).set({
                userId: newUserKey
            }).then(function(data){
                var createdUser = new User(newUserKey);
                return resolve(createdUser);
            }).catch(function(error){
                return reject(error);
            });
        });
    }

    public static assignTokenToUser(userId: string, tokenValue: Token): Promise<any>{
        return new Promise<User>((resolve:Function, reject:Function) => {
            let db = FirebaseRepository.getInstance().firebaseDb;
            
            let tokenArray: Token[] = [tokenValue];
            let createdUser = new User(userId, tokenArray);

            let updates = {};
            updates['users/' + userId + '/token/' + tokenValue.Name] = tokenValue.TokenValue;
            
            db.ref().update(updates)
            .then(function(data){
                resolve(createdUser);    
            })
            .catch(function(error){
                reject();
            });
        });
    }

    public static isUserPresent(userId : string): Promise<boolean> {
        let db = FirebaseRepository.getInstance().firebaseDb;
        var dbKey = db.ref('users').child(userId).key;

        return new Promise((resolve:Function, reject:Function) => {
            resolve(dbKey == userId);
        });
    }
}
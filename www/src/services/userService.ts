export interface IUserService{
    getUserData(userId: string): string;
    createUser(): string;
    isUserPresent(userId: string): boolean;
}

export class UserService implements IUserService{
    
    getUserData(userId:string){
        return "";
    }
    createUser(){
        return "";
    }

    isUserPresent(userId : string):boolean {
        return true;
    }

    assignTokenToUser(userId: string, token: string){

    }
}
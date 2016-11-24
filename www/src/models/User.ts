import {IToken} from "./Token" 

export interface IUser {
  UID: string;
  tokenArray?: IToken[];
}

export class User implements IUser{
    UID: string;
    tokenArray?: IToken[];

    constructor(Id: string, userTokens? : IToken[]) {
        this.UID = Id;
        if(userTokens)
        {
            this.tokenArray = userTokens;
        }        
    }
}
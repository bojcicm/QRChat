export interface IToken {
    tokenId: string;
    tokenDescription?: string;
}

export class Token implements IToken{
    tokenId: string;
    tokenDescription?: string;
}


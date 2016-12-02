import * as path from "path";
import fs = require("fs");

export async function readJson(fileName: string) : any{
    try{
        let data = await readFile(fileName);
        return JSON.parse(data);
    } catch(err){
        console.log("fileReader error");
        return {name: "error"};
    }
}

export function readFile(filename: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
        fs.readFile(filename, (err, res) => {
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}
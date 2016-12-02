'use strict';

import * as express from "express";
import * as bodyParser from "body-parser";

export class AppConfig {
    static init(application: express.Application):void{
        application.use(bodyParser.json());
        application.use(bodyParser.urlencoded({
            extended: true
        }));
    }
}
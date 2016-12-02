"use strict";

import * as express from 'express';
import {UserController} from '../controller/user-controller';

export class UserRoutes {
    static init(router: express.Router) {
        router
        .route('/api/is-user-present/:id')
        .get(UserController.isUserPresent);

        router
        .route('/api/user/:id')
        .get(UserController.getUserData)
        .post(UserController.assignTokenToUser);

        router
        .route('/api/create-user/')
        .get(UserController.createUser);

    }
}

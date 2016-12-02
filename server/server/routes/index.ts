import * as express from 'express';
import {UserRoutes} from '../api/user/routes/user-routes';

import {StaticDispatcher} from '../commons/static/index';


export class Routes {
   static init(app: express.Application, router: express.Router) {
     
     UserRoutes.init(router);
     router.route('*').get(StaticDispatcher.sendIndex);

     app.use('/', router);
   }
}

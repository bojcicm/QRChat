import * as express from 'express';
import {UserService} from '../service/user-service';
import {User} from '../model/user-model';
import {Token} from '../model/token-model';

export class UserController {
  static getUserData(req: express.Request, res: express.Response): void {
      var userId = req.params.id;
      UserService.getUserData(userId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json(error));
  }

  static isUserPresent(req: express.Request, res: express.Response): void{
    var userId = req.params.id;
    UserService.isUserPresent(userId)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  }

  static createUser(req: express.Request, res: express.Response): void{
    UserService.createUser()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  }

  static assignTokenToUser(req: express.Request, res: express.Response): void{
    let userData = req.body;
    UserService.assignTokenToUser(userData['UID'], userData['token'])
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  }
}

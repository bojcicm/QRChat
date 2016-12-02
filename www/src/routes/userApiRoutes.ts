import { NextFunction, Request, Response, Router } from "express";
import { IUserService, UserService} from "../services/userService";

export class UserApiRoute{
  userService : IUserService;

  public static CreateRoutes(router: Router) {
    console.log("[UserApiRoute::create] Creating User route.");
  
    router.get("/api/getUser/:userId?", (req: Request, res: Response, next: NextFunction) => {
      new UserApiRoute().getUser(req,res,next);
    })
    .get("/api/doesUserExists/:userId", (req: Request, res: Response, next: NextFunction) => {
      new UserApiRoute().doesUserExists(req,res,next);
    });

    router.post("/api/createUser", (req: Request, res: Response, next: NextFunction) => {
      new UserApiRoute().getUser(req,res,next);
    })
    .post("/api/removeUser", (req: Request, res: Response, next: NextFunction) => {
      new UserApiRoute().getUser(req,res,next);
    })
    .post("/api/removeUser", (req: Request, res: Response, next: NextFunction) => {
      new UserApiRoute().getUser(req,res,next);
    })
    .post("/api/assignTokenToUser", (req: Request, res: Response, next: NextFunction) => {
      new UserApiRoute().getUser(req,res,next);
    });
  }

  constructor() {
    this.userService = new UserService();
  }


  public getUser(req: Request, res: Response, next: NextFunction) {
    let maybeUserId: string = req.params.userId;    
    if(!this.checkIfUserIdIsGiven(maybeUserId)){
      next("userId is not provided");
      return;
    }
    
    var result = this.userService.isUserPresent(maybeUserId);
    res.send({
      guid: maybeUserId
    });
    }

  public doesUserExists(req: Request, res: Response, next: NextFunction){
    let maybeUserId: string = req.params.userId;    
    if(!this.checkIfUserIdIsGiven(maybeUserId)){
      next("userId is not provided");
      return;
    }

    var result = this.userService.isUserPresent(maybeUserId);
    res.send({result});
  }

  private checkIfUserIdIsGiven(userId: string): boolean{
    if(userId != undefined && userId.length != 0){
      return true;      
    }
    return false;
  }
}
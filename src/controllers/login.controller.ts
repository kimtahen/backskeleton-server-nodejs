import { NextFunction, Request, Response } from 'express';
import {LoginDto} from '../dtos/login.dto';
const passport = require('../libs/passport');

export class LoginController {
  public login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: object, info: object) => {
      if (err) { return next(err); }
      if(!user){
        return res.status(401).json({message: `unauthorized`, payload: info});
      }
      req.login(user, (erro: any) => {
        if (erro) { return next(erro); }
        return res.status(200).json({data: user, message: `authorized`});
      });
    })(req,res,next);
  }

  public loginPage = (req: Request, res: Response, next: NextFunction) => {
    if(req.user){
      return res.redirect('/login/info');
    }
    return res.sendFile(`D:\\workspace\\reactStudy\\react-study-back\\src\\static\\login.html`);
  }

  public loginInfo = (req: Request, res: Response, next: NextFunction) => {
    return res.json({'req.user': req.user, 'req.session': req.session});
  }

  public logout = (req: Request,res: Response) => {
    req.logout();
    return res.status(200).json({message: 'logout success'});
  }
}

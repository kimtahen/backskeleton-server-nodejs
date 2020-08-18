import { Router } from 'express';
import {LoginController} from '../controllers/login.controller';
import {LoginDto} from '../dtos/login.dto';
import Route from '../interfaces/routes.interface';
import validation from '../middlewares/validation.middleware';

const passport = require('../libs/passport');

export class LoginRoute implements Route{
  public path = '/login';
  public router = Router();
  public controller = new LoginController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validation(LoginDto), this.controller.login);
    this.router.get(`${this.path}`, this.controller.loginPage);
    this.router.get(`/logout`,this.controller.logout);
    this.router.get(`${this.path}/info`,this.controller.loginInfo);
  }

}

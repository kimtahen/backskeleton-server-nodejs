import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { CreateUserDto } from '../dtos/user.dto';
import Route from '../interfaces/routes.interface';
import validation from '../middlewares/validation.middleware';

export class UserRoute implements Route {
  public path = '/user';
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getUsers);
    this.router.get(`${this.path}/:email`, this.controller.getUserByEmail);
    this.router.post(`${this.path}`, validation(CreateUserDto), this.controller.createUser);
    this.router.put(`${this.path}/:userId`, validation(CreateUserDto), this.controller.updateUser);
    this.router.delete(`${this.path}/:userId`, this.controller.destroyUser);
  }
}

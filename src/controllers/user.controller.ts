import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/user.dto';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

export class UserController {
  public service = new UserService();

  /* CRUD */
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: IUser[] = await this.service.getAllUsers();
      res.status(200).json({ data: users, message: 'ok' });
    } catch (err) {
      next(err);
    }
  };

  public getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.params.email;
    try {
      const user: IUser = await this.service.getUserByEmail(email);
      res.status(200).json({ data: user, message: 'ok' });
    } catch (err) {
      next(err);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    try {
      const createNewUser: IUser = await this.service.createUser(userData);
      res.status(201).json({ data: createNewUser, message: '회원가입 되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const userData: IUser = req.body;
    try {
      const updatedUser: IUser = await this.service.updateUser(userId, userData);
      res.status(200).json({ data: updatedUser, message: '회원정보가 수정 되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  public destroyUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    try {
      const user: IUser = await this.service.destroyUser(userId);
      res.status(203).json({ data: user, message: '회원탈퇴 되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
}

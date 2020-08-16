import { CreateUserDto } from '../dtos/user.dto';
import HttpException from '../exceptions/HttpException';
import { Users } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { isEmptyObject } from '../utils/util';
import { Cryptor } from '../libs/cryptor';

export class UserService {
  public users = Users;
  public cryptor = new Cryptor();

  /* CRUD */
  public async getAllUsers(): Promise<IUser[]> {
    const users: IUser[] = await this.users.find();
    return users;
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    const user: IUser = await this.users.findOne({ email: email });
    if (!user) throw new HttpException(404, '해당 이메일로 된 회원을 찾을 수 없습니다.');
    return user;
  }

  public async createUser(data: CreateUserDto): Promise<IUser> {
    if (isEmptyObject(data)) throw new HttpException(400, '등록할 회원정보를 입력해야 합니다.');

    const alreadyExistUser: IUser = await this.users.findOne({ email: data.email });
    if (alreadyExistUser) throw new HttpException(409, `${data.email}은 이미 등록된 이메일입니다.`);

    const hashedPassword: string = await this.cryptor.encrypt(data.password);
    const newUser: IUser = await this.users.createUser(data.email, data.name, hashedPassword);
    return newUser;
  }

  public async updateUser(userId: string, data: IUser): Promise<IUser> {
    if (isEmptyObject(data)) throw new HttpException(400, '수정할 회원정보를 입력해야 합니다.');
    const updatedUser: IUser = await this.users.findOneAndUpdate({ _id: userId }, data, { new: true });
    return updatedUser;
  }

  public async destroyUser(userId: string): Promise<IUser> {
    const user: IUser = await this.users.findOneAndDelete({ _id: userId });
    return user;
  }
}

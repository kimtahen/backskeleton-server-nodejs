const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import {Cryptor} from '../libs/cryptor';
const cryptor = new Cryptor();
import {Users} from '../models/user.model';
import {IUser} from '../interfaces/user.interface';
import {stringify} from 'querystring';

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
}, async (username: string, password: string, done: any): Promise<IUser> => {
  const user: IUser = await Users.findOne({email: username});
  const encryptedPassword = await cryptor.encrypt(password);
  console.log(user);
  console.log(encryptedPassword);
  if (!user || user.password !== encryptedPassword) {
    return done(null, false, {message: `check your id & pw`});
  }
  user.password = undefined;
  return done(null, user, {message: `login success`});
}));

passport.serializeUser((user: IUser, done: any) => {
  done(null, user.email);
});

passport.deserializeUser(async (user_email: any, done: any) => {
  console.log('deserialize user : ',user_email);
  const user: IUser = await Users.findOne({email: user_email})
  let err;
  if (!user) {
    err = {message: "user doesn't exist"};
  }
  user.password = undefined;
  done(err, user);
});

module.exports = passport;

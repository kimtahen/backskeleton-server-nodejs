const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import {Users} from '../models/user.model';
import {IUser} from '../interfaces/user.interface';
import {stringify} from 'querystring';

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
}, async (username: string, password: string, done: any): Promise<IUser> => {
  const user: IUser = await Users.findOne({email: username});
  if (!user) {
    return done(null, false, {message: `User doesn't exist`});
  }
  if (user.password !== password ){
    return done(null, false, {message: `Password is wrong`});
  }
  return done(null, user);
}));

passport.serializeUser((user: IUser, done: any) => {
  done(null, user.email);
});

passport.deserializeUser(async (user_email: any, done: any) => {
  console.log('deserialize user : ',user_email);
  const user: IUser = await Users.findOne({email: user_email});
  let err;
  if (!user) {
    err = {message: "user doesn't exist"};
  }
  done(err, user);
});

module.exports = passport;

import 'dotenv/config';
import App from './app';
import { IndexRoute } from './routes/index.route';
import { UserRoute } from './routes/user.route';
import { PhotoRoute } from './routes/photo.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UserRoute(), new PhotoRoute()]);

app.listen();

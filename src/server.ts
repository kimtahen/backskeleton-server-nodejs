import 'dotenv/config';
import App from './app';
import { IndexRoute } from './routes/index.route';
import { UserRoute } from './routes/user.route';
import { LoginRoute } from './routes/login.route';
import { ProjectRoute } from './routes/project.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UserRoute(), new LoginRoute(), new ProjectRoute()]);

app.listen();

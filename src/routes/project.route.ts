import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { CreateProjectDto } from '../dtos/project.dto';
import Route from '../interfaces/routes.interface';
import validation from '../middlewares/validation.middleware';

export class ProjectRoute implements Route{
  public path = '/project';
  public router = Router();
  public controller = new ProjectController();
  constructor(){
    this.initializeRoutes();
  }
  private initializeRoutes(){
    this.router.get(`${this.path}/`, this.controller.getProjects);
    this.router.get(`${this.path}/find/:projectId`, this.controller.getProjectById);

    this.router.get(`${this.path}/write`, this.controller.createProjectPage);
    this.router.post(`${this.path}/write`, validation(CreateProjectDto),this.controller.createProject);

    this.router.get(`${this.path}/update/:projectId`, this.controller.updateProjectPage);
    this.router.put(`${this.path}/update/:projectId`,validation(CreateProjectDto), this.controller.updateProject);

    this.router.delete(`${this.path}/:projectId`, this.controller.deleteProject);
  }
}

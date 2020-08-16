import { CreateProjectDto } from '../dtos/project.dto';
import { Iproject } from '../interfaces/project.interface';

export class ProjectController {


  public getProjects() {
    console.log('getProjects');
  }
  public getProjectByID(id : number) {
    console.log('getProjectsByID: ',id);
  }
  public createProject(project : Iproject) {
    console.log('createProjects');
  }
  public deleteProject(id: number) {
    console.log('deleteProjects');
  }

}

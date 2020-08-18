import HttpException from '../exceptions/HttpException';
import { Projects } from '../models/project.model';
import {CreateProjectDto} from '../dtos/project.dto';
import {Iproject} from '../interfaces/project.interface';

export class ProjectService {
  public project = Projects;

  public getProjects = async () => {
    const projects = await this.project.find({}).populate('author').sort({date: 1});
    return projects;
  }
  public getProjectById = async (id:string) => {
    const project = await this.project.findOne({_id:id}).populate('author');
    return project;
  }
  public createProject = async (clientData: CreateProjectDto)=>{
    const project  = await this.project.createProject(clientData);
    return project;
  }
  public checkAuthority = async (userId: string, projectId: string) => {
    const project = await this.getProjectById(projectId);
    // @ts-ignore
    console.log(String(userId));
    // @ts-ignore
    console.log(String(project.author._id));
    // @ts-ignore
    console.log(String(userId) === String(project.author._id));
    // @ts-ignore
    return String(userId) === String(project.author._id);
  }
  public updateProject = async (id: string, clientData: CreateProjectDto)=>{
    const project = await this.project.findOneAndUpdate({_id: id}, clientData, {new: true});
    return project;
  }
  public deleteProject = async (id: string) => {
    const project: Iproject = await this.project.findOneAndDelete({_id: id});
    return project;
  }

}

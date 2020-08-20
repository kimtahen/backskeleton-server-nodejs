import HttpException from '../exceptions/HttpException';
import { Projects } from '../models/project.model';
import {CreateProjectDto} from '../dtos/project.dto';
import {Iproject} from '../interfaces/project.interface';

export class ProjectService {
  public project = Projects;

  public getProjects = async () => {
    const projects = await this.project.find({})
      .populate('author')
      .populate('comments')
      .populate({path:'comments',populate:{path:'userId'}})
      .populate({path:'comments',populate:{path:'comments'}})
      .populate({path:'comments',populate:{path:'comments',populate:{path:'userId'}}})
      .sort({date: 1});
    return projects;
  }
  public getProjectById = async (id:string) => {
    const project = await this.project.findOne({_id:id}).populate('author')
      .populate('author')
      .populate('comments')
      .populate({path:'comments',populate:{path:'userId'}})
      .populate({path:'comments',populate:{path:'lowerCommentId'}})
      .populate({path:'comments',populate:{path:'lowerCommentId',populate:{path:'userId'}}})
      .sort({date: 1});
    return project;
  }
  public createProject = async (clientData: CreateProjectDto)=>{
    const project  = await this.project.createProject(clientData);
    return project;
  }
  public checkAuthority = async (userId: string, projectId: string) => {
    const project = await this.getProjectById(projectId);
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

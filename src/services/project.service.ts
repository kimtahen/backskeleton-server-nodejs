import HttpException from '../exceptions/HttpException';
import { Projects } from '../models/project.model';
import { Users } from '../models/user.model';
import { CommentService } from './comment.service';
import {CreateProjectDto} from '../dtos/project.dto';
import {Iproject} from '../interfaces/project.interface';

export class ProjectService {
  public project = Projects;
  public user = Users;
  public commentService = new CommentService();

  public getProjects = async () => {
    let projects;
    try{
      projects = await this.project.find({})
        .populate('author')
        .populate('comments')
        .populate({path: 'comments', populate: {path: 'userId'}})
        .populate({path: 'comments', populate: {path: 'comments'}})
        .populate({path: 'comments', populate: {path: 'comments', populate: {path: 'userId'}}})
        .sort({date: 1});
    } catch (err) {
      throw new HttpException(500,'db 오류 입니다.');
    }
    if (!projects) throw new HttpException(404, '프로젝트를 찾을 수 없습니다.');
    return projects;


  }
  public getProjectById = async (projectId:string) => {
    let project;
    try {
      project = await this.project.findOne({_id: projectId}).populate('author')
        .populate('author')
        .populate('comments')
        .populate({path: 'comments', populate: {path: 'userId'}})
        .populate({path: 'comments', populate: {path: 'lowerCommentId'}})
        .populate({path: 'comments', populate: {path: 'lowerCommentId', populate: {path: 'userId'}}})
        .sort({date: 1});
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    };
    if (!project) throw new HttpException(404, '프로젝트를 찾을 수 없습니다.');
    return project;
  }
  public createProject = async (clientData: CreateProjectDto)=>{
    let project;
    try {
      project = await this.project.createProject(clientData);
    } catch (err) {
      throw new HttpException(500,'db 오류 입니다.');
    };
    if(!project) throw new HttpException(400, '프로젝트가 생성되지 않았습니다.');
    return project;
  }
  public checkAuthority = async (userId: string, projectId: string) => {
    let project;
    try {
      project = await this.getProjectById(projectId);
    } catch (err) {
      throw new HttpException(500,'db 오류 입니다.');
    }
    if (!project) throw new HttpException(404, '프로젝트를 찾을 수 없습니다.');
    // @ts-ignore
    return String(userId) === String(project.author._id);
  }
  public updateProject = async (id: string, clientData: CreateProjectDto)=>{
    let project;
    try {
      project = await this.project.findOneAndUpdate({_id: id}, clientData, {new: true});
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    };
    if(!project) throw new HttpException(404, '프로젝트를 찾을 수 없습니다.');
    return project;
  }


  public deleteProject = async (userId: string, id: string) => {
    let project;
    try {
      project = await this.project.findOneAndDelete({_id: id});
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }
    if(!project) throw new HttpException(404,'프로젝트를 찾을 수 없습니다.');
    try {
      project.comments.map(async (value) => {
        await this.commentService.deleteComment(value, 'project');
      });
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }
    return project;
  }

}

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
        .populate('userId')
        .populate('commentIds')
        .populate({path: 'commentIds', populate: {path: 'userId'}})
        .populate({path: 'commentIds', populate: {path: 'commentIds'}})
        .populate({path: 'commentIds', populate: {path: 'commentIds', populate: {path: 'userId'}}})
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
      project = await this.project.findOne({_id: projectId}).populate('userId')
        .populate('userId')
        .populate('commentIds')
        .populate({path: 'commentIds', populate: {path: 'userId'}})
        .populate({path: 'commentIds', populate: {path: 'lowerCommentId'}})
        .populate({path: 'commentIds', populate: {path: 'lowerCommentId', populate: {path: 'userId'}}})
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
    return String(userId) === String(project.userId._id);
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

  public likeProject = async(userId: string, projectId: string) => {
    let result;
    if (await this.user.findOne({_id: userId, likeProjects: {$in: [projectId]}})) {
      await this.user.findOneAndUpdate({_id: userId}, {$pull: {likeProjects: projectId}});
      await this.project.findOneAndUpdate({_id: projectId}, {$pull: {likeUserIds: userId}});
      try {
        result = await this.project.findOneAndUpdate({_id: projectId}, {$inc: {likes: -1}}, {new: true});
      } catch (err) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$push: {likeProjects: projectId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
      if (!result) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$push: {likeProjects: projectId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
    } else {
      await this.user.findOneAndUpdate({_id: userId}, {$push: {likeProjects: projectId}});
      await this.project.findOneAndUpdate({_id: projectId},{$push: {likeUserIds: userId}});
      try {
        result = await this.project.findOneAndUpdate({_id: projectId}, {$inc: {likes: 1}}, {new: true});
      } catch (err) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$pull: {likeProjects: projectId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
      if (!result) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$pull: {likeProjects: projectId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
    }
    return result;
  }

  public deleteProject = async (userId: string, id: string) => {
    // @ts-ignore
    let project;
    try {
      project = await this.project.findOneAndDelete({_id: id});
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }
    if(!project) throw new HttpException(404,'프로젝트를 찾을 수 없습니다.');

    try {
      project.commentIds.map(async (value) => {
        await this.commentService.deleteComment(value, 'project');
      });
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }

    try {
      project.likeUserIds.map(async (userId) => {
        // @ts-ignore
        await this.user.findOneAndUpdate({_id: userId}, {$pull:{likeProjects: project._id}});
      });
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }

    return project;
  }

}

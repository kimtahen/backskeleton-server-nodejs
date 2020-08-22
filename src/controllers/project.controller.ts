import { CreateProjectDto } from '../dtos/project.dto';
import { NextFunction, Request, Response } from 'express';
import { Iproject } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';
import HttpException from '../exceptions/HttpException';

export class ProjectController {
  public service = new ProjectService();

  public getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects : Iproject[] = await this.service.getProjects();
      res.status(200).json({data:projects,message:'ok'});
    } catch (err) {
      return next(err);
    }
  }

  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    const projectId: string = req.params.projectId;
    try {
      const project: Iproject = await this.service.getProjectById(projectId);
      return res.status(200).json({data: project});
    } catch (err) {
      return next(err);
    }
  }

  public createProjectPage = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
      return next(new HttpException(401, '로그인 하세요!'));
    }
    return res.status(200).sendFile('D:\\workspace\\reactStudy\\react-study-back\\src\\static\\project.html');
  }

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
      return next(new HttpException(401, '로그인 하세요!'));
    }
    let projectData: CreateProjectDto = {
      // @ts-ignore()
      author: req.user._id,
      title : req.body.title,
      titleImage: req.body.titleImage,
      additionalInfo: {
        spaceType: req.body.spaceType,
        roomSize: req.body.roomSize,
        workType: req.body.workType,
        category: req.body.category,
        familyType: req.body.familyType,
        region: req.body.region,
        style: req.body.style,
        period: req.body.period,
        budget: req.body.budget,
        entireTone: req.body.entireTone,
        wallColor: req.body.wallColor,
        floorColor: req.body.floorColor,
        details: req.body.details,
        link: req.body.link,
        copyright: req.body.copyright,
      },
      content: req.body.content,
    };

    try {
      const newProject: Iproject = await this.service.createProject(projectData);
      res.status(200).json({data: newProject, message:'새로운 프로젝트가 생성되었습니다'});
    } catch (err) {
      return next(err);
    }
  }

  public updateProjectPage = async (req: Request, res: Response, next: NextFunction) => {
    const projectId: string = req.params.projectId;
    if (!req.user){
      return next(new HttpException(401, '로그인 하세요!'));
    }
    let authority;
    try {
      // @ts-ignore
      authority = await this.service.checkAuthority(req.user._id, projectId);
    } catch (err) {
      return next(err);
    }
    if (!authority) return next(new HttpException(401, '권한이 없습니다.'));

    return res.status(200).sendFile('D:\\workspace\\reactStudy\\react-study-back\\src\\static\\update.html');
  }

  public updateProject = async (req: Request, res: Response, next: NextFunction) => {
    const projectId: string = req.params.projectId;
    if (!req.user){
      return next(new HttpException(401, '로그인 하세요!'));
    }
    let authority;
    try {
      // @ts-ignore
      authority = await this.service.checkAuthority(req.user._id, projectId);
    } catch (err) {
      return next(err);
    }
    if (!authority) return next(new HttpException(401, '권한이 없습니다.'));

    let projectData: CreateProjectDto = {
      // @ts-ignore()
      author: req.user._id,
      title : req.body.title,
      titleImage : req.body.titleImage,
      additionalInfo: {
        spaceType: req.body.spaceType,
        roomSize: req.body.roomSize,
        workType: req.body.workType,
        category: req.body.category,
        familyType: req.body.familyType,
        region: req.body.region,
        style: req.body.style,
        period: req.body.period,
        budget: req.body.budget,
        entireTone: req.body.entireTone,
        wallColor: req.body.wallColor,
        floorColor: req.body.floorColor,
        details: req.body.details,
        link: req.body.link,
        copyright: req.body.copyright,
      },
      content: req.body.content,
    };

    try {
      const project: Iproject = await this.service.updateProject(projectId, projectData);
      return res.status(200).json({data: project});
    } catch (err) {
      return next(err);
    }
  }
  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;
    if (!req.user){
      return next(new HttpException(401, '로그인 하세요!'));
    }
    let authority;
    try {
      // @ts-ignore
      authority = await this.service.checkAuthority(req.user._id, projectId);
    } catch (err) {
      return next(err);
    }
    if (!authority) return next(new HttpException(401, '권한이 없습니다.'));

    try {
      // @ts-ignore
      const deletedProject: Iproject = await this.service.deleteProject(req.user._id, projectId);
      return res.status(200).json({data: deletedProject, message: `project ${projectId} deleted`});
    } catch (err) {
      return next(err);
    }
  }

}

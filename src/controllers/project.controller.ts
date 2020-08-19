import { CreateProjectDto } from '../dtos/project.dto';
import { NextFunction, Request, Response } from 'express';
import { Iproject } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';

export class ProjectController {
  public service = new ProjectService();
  public getProjects = async (req: Request, res: Response, next: NextFunction) => {
    const projects : Iproject[] = await this.service.getProjects();
    if(!projects){
      return res.status(404).json({message: 'projects not found'});
    }
    res.status(200).json({data: projects});
  }
  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.projectId;
    const project : Iproject = await this.service.getProjectById(id);
    if(!project){
      return res.status(404).json({message: 'project not found'});
    }
    return res.status(200).json({data: project});
  }

  public createProjectPage = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
      return res.redirect(`/api/login`);
    }
    return res.sendFile('D:\\workspace\\reactStudy\\react-study-back\\src\\static\\project.html');
  }
  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
      return res.status(401).send({message: 'unautorized'});
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
      res.redirect(`/api/project`);
    } catch (err) {
      next(err);
    }
  }

  public updateProjectPage = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.projectId;
    if(!req.user){
      return res.redirect(`/api/login`);
    }
    // @ts-ignore
    if(!await this.service.checkAuthority(req.user._id,id)){
      return res.status(401).json({message: `your account don't have access to it`});
    }
    return res.sendFile('D:\\workspace\\reactStudy\\react-study-back\\src\\static\\update.html');
  }

  public updateProject= async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.projectId;
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
    const project: Iproject = await this.service.updateProject(id, projectData);
  }
  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.projectId;
    if(!req.user){
      return res.redirect(`/api/login`);
    }
    // @ts-ignore
    if(!await this.service.checkAuthority(req.user._id,id)){
      return res.status(401).json({message: `your account don't have access to it`});
    }
    const deletedProject: Iproject = await this.service.deleteProject(id);
    if(!deletedProject){
      return res.status(404).json({message: 'project not found'});
    }
    return res.status(200).json({data: deletedProject, message: `project ${id} deleted`});
  }

}

import {Schema, Model, model} from 'mongoose';
import {Iproject} from '../interfaces/project.interface';
import {CreateProjectDto} from '../dtos/project.dto';
import {IUser} from '../interfaces/user.interface';

export interface Project extends Iproject {

}

export interface ProjectModel extends Model<Project> {
  createProject(clientData: CreateProjectDto): Promise<Iproject>;
}

const ProjectSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  titleImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  likeUserIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  additionalInfo: {
    spaceType: {
      type: Number,
      required: true,
    },
    roomSize: {
      type: Number,
      required: true,
    },
    workType: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    familyType: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      default: '',
    },
    style: {
      type: String,
      default: '',
    },
    period: {
      type: String,
      default: '',
    },
    budget: {
      type: Number,
      default: '',
    },
    entireTone: {
      type: String,
      default: '',
    },
    wallColor: {
      type: String,
      default: '',
    },
    floorColor: {
      type: String,
      default: '',
    },
    details: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    copyright: {
      type: String,
      default: '',
    },
  },
  content: {
    type: String,
    required: true,
  },
  commentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});

ProjectSchema.statics.createProject = async (clientData: CreateProjectDto): Promise<Iproject> => {
  const project: Iproject = new Projects({
    userId: clientData.userId,
    title: clientData.title,
    titleImage: clientData.titleImage,
    additionalInfo: {
      spaceType: clientData.additionalInfo.spaceType,
      roomSize: clientData.additionalInfo.roomSize,
      workType: clientData.additionalInfo.workType,
      category: clientData.additionalInfo.category,
      familyType: clientData.additionalInfo.familyType,
      region: clientData.additionalInfo.region,
      style: clientData.additionalInfo.style,
      period: clientData.additionalInfo.period,
      budget: clientData.additionalInfo.budget,
      entireTone: clientData.additionalInfo.entireTone,
      wallColor: clientData.additionalInfo.wallColor,
      floorColor: clientData.additionalInfo.floorColor,
      details: clientData.additionalInfo.details,
      link: clientData.additionalInfo.link,
      copyright: clientData.additionalInfo.copyright,
    },
    content: clientData.content,
  });
  return await project.save();
};

export const Projects = model<Project, ProjectModel>('project', ProjectSchema);

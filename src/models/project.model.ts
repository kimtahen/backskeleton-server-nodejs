import { Schema, Model, model } from 'mongoose';
import { Iproject } from '../interfaces/project.interface';

export interface Project extends Iproject {

}

export interface ProjectModel extends Model<Project> {

}

const ProjectSchema : Schema = new Schema({
  projectID:{
    type: Number,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  additionalInfo: {
    spaceType:{
      type: Number,
      required: true,
    },
    roomSize:{
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
    },
    style: {
      type: String,
    },
    period: {
      type: String,
    },
    budget: {
      type: Number,
    },
    entireTone: {
      type: String,
    },
    wallColor: {
      type: String,
    },
    floorColor: {
      type: String,
    },
    details: {
      type: String,
    },
    link: {
      type: String,
    },
    copyright: {
      type: String,
    },
  },
  data: {
    type: String,
  },
});

export const Project = model('project', ProjectSchema);


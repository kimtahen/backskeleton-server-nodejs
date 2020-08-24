import { Document } from 'mongoose';

export interface Iproject extends Document{
  userId: string;
  title: string;
  titleImage: string;
  date?: string;
  like?: number;
  additionalInfo: DetailedInformation;
  content: string;
  commentIds: string[];
}
export interface DetailedInformation {
  spaceType: number;
  roomSize: number;
  workType: number;
  category: number;
  familyType: number;
  region?: string;
  style?: string;
  period?: string;
  budget?: number;
  entireTone?: string;
  wallColor?: string;
  floorColor?: string;
  details?: string;
  link?: string;
  copyright?: string;
}

const spaceType : object = {
  0: '원룸&오피스텔',
  1: '아파트',
  2: '빌라&연립',
  3: '단독주택',
  4: '사무공간',
  5: '상업공간',
  6: '기타',
};
const workType : object = {
  0: '셀프&DIY',
  1: '반셀프',
  2: '전문가',
};
const category : object = {
  0: '리모델링',
  1: '홈스타일링',
  2: '부분공사',
  3: '건축',
};
const familyType : object = {
  0: '싱글라이프',
  1: '신혼부부',
  2: '아기가 있는 집',
  3: '취학 자녀가 있는 집',
  4: '부모님과 함께 사는 집',
  5: '기타',
};

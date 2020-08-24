import { Document } from 'mongoose';

export interface IPhoto extends Document {
  // 작성자
  userId: string;
  // 제목
  title: string;
  // 내용
  content: string;
  // 해시태그
  tags: string[];
  // 인스타 아이디
  instagramId: string;
  // 타이틀 이미지 파일 이름
  titleImageName: string;
  // 디테일 이미지 파일 이름
  detailImageNames: string[];
  // 좋아요 개수
  likes: number;
  // 북마크 개수
  bookmarks: number;
  // 댓글
  commentIds: string[];
}

## react-study-back

## REFERENCE
- [typescript-express-starter](https://www.npmjs.com/package/typescript-express-starter)
- 레포지토리 세팅에 위 npm 모듈을 사용하였습니다. 문서 한번 읽어보시면 좋을 것 같아요. 기존에 첫 세팅을 하면 이것저것 파일이 많이 생기는데 불필요하거나, 우리가 구현해야 할 부분은 처음부터 구현하는게 좋을 것 같아서 삭제했어요.
- 코드 스타일이나 레포지토리 구조 등은 앞으로 맞추어야 하니 기존 세팅이 어떻게 되어있든 구애받지 마시고 편하게 말씀해주세요.
- 기존에 세팅해두셨던 `README.md`파일을 부득이 삭제하게 됐습니다.. :(

## HOW TO START
- `$ npm install` to install dependencies
- `$ npm run dev` to start server in development mode
- `$ npm run start` to start server in production mode
- `$ npm run test` to run all unit-tests
- `$ npm run lint` to check for linting errors

## TODOs
- [ ] 회원가입, 로그인, Auth인증

## Entities
- reference: [SQL vs NOSQL](https://siyoon210.tistory.com/130)
- Entity의 필드 중 `type: Schema.Types.ObjectId, ref: 'Collection'` 형식으로 되어있는 필드는 MongoDB자체의 고유 아이디입니다.
  - ObjectId의 형식은 String이고`5ee8c5d738d4dc5431ced49a`와 같이 24자리 입니다.
  - 아래 Entity처럼 Photo라는 게시글이 있고, 그 글의 작성자가 특정 유저인 경우,
  - Photo: { title: "blah", content: "something", userId: "5ee8c5d738d4dc5431ced49a" }와 같이 들어갈 수 있어요.
  - 이때 이 문서를 꺼내는 방식에 따라 _id만 표시할지, 아래에 있는 Document를 그대로 가져올 지 선택할 수 있어요.
  ```Javascript
  // 그냥 꺼낼때
  const post = await Photo.findOne({ title: "blah" });
  /* expected output: 
  {
    title: "blah",
    content: "blah",
    userId: "5ee8c5d738d4dc5431ced49a"
  }
  */

  // populate해서 꺼낼 때
  const post = await Photo.findOne({ title: "blah" }).populate('userId');
  
  /* expected output:
  {
    title: "blah",
    content: "blah",
    userId: {
      name: "chunghwan",
      email: "chunghwanyoon@kakao.com",
      password: "asldfjadslkfjdalsfdaskf"
    }
  }
  */
  ```


```Javascript
/* UserEntitiy */
UserEntity: {
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hash with 'sha1' algorithm
  status: { type: String, default: 0 }, // inactive: 0, active : 1
  _type: { type: String, default: 0 } // common:0, admin: 1, superAdmin: 2
}

/* PhotoEntity: 상단 "사진" 탭 */
PhotoEntity: {
  userId: { type: Schema.Types.ObjectId, ref: 'user' }, // user 모델 외래키
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }], // 해스태그 array
  instagramId: { type: String }, // 인스타그램 아이디
  titleImageName: { type: String }, // 메인 이미지 이름
  detailImageNames: [{ type: String }], // 세부 이미지 이름 array
  likes: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 }, 
  commentIds: [{ type: Schema.Types.ObjectId, ref: 'comment' }] // comment 모델 외래키
}

/* CommentEntity: 댓글 */
CommentEntity: {
  photoId: { type: Schema.Types.ObjectId, ref: 'photo' },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 }
}
```

## Endpoints
- 이 프로젝트의 루트 디렉토리에서 `npm run dev`로 프로젝트를 실행시킨 이후,
- baseURL: `http://localhost:3000/api`
- 아래는 `http method / endpoint / description => return entity` 형식이에요.
- User API
  - GET `baseURL/user` 전체 회원목록 조회 => UserEntity[] 
  - GET `baseURL/user/:email` 이메일로 특정회원 조회 => UserEntity
  - POST `baseURL/user` 회원가입 => UserEntity
  - PUT `baseURL/user/:userId` 회원정보 수정 => UserEntity 
  - DELETE `baseURL/user/:userId` 회원탈퇴 => UserEnttiy

- Photo API
  - GET `baseURL/photo` 전체 사진 게시글 조회 => PhotoEntity[]
  - GET `baseURL/photo/:photoId` 사진 고유아이디로 하나의 게시글 조회 => PhotoEntity 
  - POST `baseURL/photo/` 사진 게시글 등록 => PhotoEntity
  - PUT `baseURL/photo/:photoId` 사진 게시글 수정 => PhotoEntity
  - DELETE `baseURL/photo/:photoId` 사진 게시글 삭제 => PhotoEntity

- Comment API

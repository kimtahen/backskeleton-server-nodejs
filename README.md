## react-study-back

## REFERENCE

- [typescript-express-starter](https://www.npmjs.com/package/typescript-express-starter)
- 레포지토리 세팅에 위 npm 모듈을 사용하였습니다. 문서 한번 읽어보시면 좋을 것 같아요. 기존에 첫 세팅을 하면 이것저것 파일이 많이 생기는데 불필요하거나, 우리가 구현해야 할 부분은 처음부터 구현하는게 좋을 것 같아서 삭제했어요.
- 코드 스타일이나 레포지토리 구조 등은 앞으로 맞추어야 하니 기존 세팅이 어떻게 되어있든 구애받지 마시고 편하게 말씀해주세요.
- 기존에 세팅해두셨던 `README.md`파일을 부득이 삭제하게 됐습니다.. :(

## Commands

- `$ npm install` to install dependencies
- `$ npm run dev` to start server in development mode
- `$ npm run start` to start server in production mode
- `$ npm run test` to run all unit-tests
- `$ npm run lint` to check for linting errors

## TODOs

- [x] 회원가입, 로그인, Auth인증
- [x] Photo, User, Project API
- [ ] Comment 모델, API 구현

## HOW TO USE THIS API

- 이 프로젝트를 clone해주세요.
- `npm run install`로 dependencies를 설치해주세요.
- `npm run dev`로 개발환경에서 실행시켜주세요.
- `포스트맨`같은 툴이나, 개발하신 프론트엔드 환경에서 API를 호출해주세요.
- 참고사항
  - Photo, Comment 등 다른 모델에 포함되어있거나, POST 생성 요청시 `userId`와 같은 다른 모델의 고유값이 필요한 경우 User를 먼저 생성 후, 응답된 `_id`필드를 사용해주세요.
  - .env 파일은 git과 같은곳에 올라가면 좋지 않지만 스터디 목적이고 private 레포지토리여서 그냥 같이 올려두었습니다.
  - 궁금하신 점이 있으면 단톡방에서 공유해주세요 :)

## Entities

- reference: [SQL vs NOSQL](https://siyoon210.tistory.com/130)
- Entity의 필드 중 `type: Schema.Types.ObjectId, ref: 'Collection'` 형식으로 되어있는 필드는 MongoDB자체의 고유 아이디입니다.
  - ObjectId의 형식은 String이고`5ee8c5d738d4dc5431ced49a`와 같이 24자리 입니다.
  - 아래 Entity처럼 Photo라는 게시글이 있고, 그 글의 작성자가 특정 유저인 경우,
  - Photo: { title: "blah", content: "something", userId: "5ee8c5d738d4dc5431ced49a" }와 같이 들어갈 수 있어요.
  - 이때 이 문서를 꺼내는 방식에 따라 \_id만 표시할지, 아래에 있는 Document를 그대로 가져올 지 선택할 수 있어요.
- 필드가 exampleField: [{ type: String }] 와 같이 []로 감싸진 경우, 해당 필드는 Array 타입이라고 생각하시면 됩니다!

  - example

  ```Javascript
    example1: { type: String } // example: "Example String"
    example2: [{ type: String }] // example: ["example", "strings", "in", "array"]
  ```

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
      _id: "5ee8c5d738d4dc5431ced49a",
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

/* ProjectEntity: 상단 "집들이" 탭 */
ProjectEntity: {
  author:{ type: Schema.Types.ObjectId, ref: 'user', },
  title:{ type: String, required: true, },
  titleImage: { type: String, required: true, },
  date: { type: Date, required: true, default: Date.now(), },
  like: { type: Number, default: 0, },
  additionalInfo: {
    spaceType:{ type: Number, required: true, },
    roomSize:{ type: Number, required: true, },
    workType: { type: Number, required: true, },
    category: { type: Number, required: true, },
    familyType: { type: Number, required: true, },
    region: { type: String, default: '', },
    style: { type: String, default: '', },
    period: { type: String, default: '', },
    budget: { type: Number, default: '', },
    entireTone: { type: String, default: '', },
    wallColor: { type: String, default: '', },
    floorColor: { type: String, default: '', },
    details: { type: String, default: '', },
    link: { type: String, default: '', },
    copyright: { type: String, default: '', },
  },
  content: { type: String, required: true, },
  comment: [ { type: Schema.Types.ObjectId, ref: 'comment', }, ],
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

- Project API

  - GET `baseURL/project` 전체 집들이 게시글 조회 => ProjectEntity[]
  - GET `baseURL/project/find/:projectId` 집들이 고유 아이디로 하나의 게시글 조회 => ProjectEntity
  - POST `baseURL/project/write` 집들이 게시글 등록 => ProjectEntity
  - PUT `baseURL/project/update/:projectId` 집들이 게시글 수정 => ProjectEntity
  - DELETE `baseURL/project/:projectId` 집들이 게시글 삭제 => ProjectEntity
  - 게시글 등록은 로그인 세션이 있어야 가능합니다
  - 게시글 수정 및 삭제는 그 게시글의 로그인 세션을 가지고 있어야 가능합니다.

- Comment API

# GameLog-Server

<div align="center">
 <img alt="node" src ="https://img.shields.io/badge/node-12.18.3-339933?logo=nodedotjs">
 <img alt="npmVersion" src ="https://img.shields.io/badge/npm package-7.11.1-CB3837?logo=npm">
 <img alt="Jest" src ="https://img.shields.io/badge/Jest-27.2.4-C21325?logo=jest">
</div>

<div align="center" style="margin: 10px">
  <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/>
  <img alt="nodeJS" src ="https://img.shields.io/badge/nodeJS-339933.svg?&style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
  <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white"/>
  <img alt="Passport" src ="https://img.shields.io/badge/Passport-34E27A.svg?&style=for-the-badge&logo=Passport&logoColor=white"/>
  <img alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>
</div>

## GameLog url

GameLog-Web : http://gamelog.kro.kr (svelte 라이브러리를 활용하여 구현 중)

GameLog-API : http://api.gamelog.kro.kr


# 개요
GameLog 프로젝트는 게임 평가, 기록하며 사용자 기반으로 게임을 추천하는 서비스를 제공하는 Native iOS 어플리케이션이다. TabBar를 기준으로 홈, 라이브러리, 위시리스트, 검색의 기능을 제공하며, 추천서비스는 user-based 기반의 추천 서비스를 제공한다.

해당 Repository는 Native iOS 어플리케이션 개발을 위한 backend server 이며 nodejs Express 프레임워크를 사용하였다. 앞 단에는 nginx를 구축하여 api와 web서버를 구분하여 serve 하도록 했으며 database는 noSQL인 mongoDB 를 사용하여 데이터베이스를 구축하고, CRUD 및 서비스를 구현하였습니다.

# 프로젝트 구조
<p align="center"><img src="https://user-images.githubusercontent.com/49264688/140362061-557ee8ed-f2c2-45ed-997d-f932a4dd9bad.png">
</p>
Client측에서 API의 주소에 요청을 보내게되면 nginx를 통해 server_name에 따라 api인지 웹 서버인지 다르게 요청을 받는다. Applcation server로 요청을 진행하게 된 경우 router를 통해 요청에 대한 응답을 전송하며 해당 요청은 control에 존재하는 module을 활용하여 Model 단에서 쿼리를 사용하여 Database에 요청을하고 응답에 대한 데이터를 다시 Controll과 Router로 전송하여 Client에게 요청을 응답하는 아키텍처로 구성되어 있다. 
<br>

![image](https://user-images.githubusercontent.com/49264688/140356513-bd0808f0-276e-4de3-b8d7-66152b0f0388.png)
GameLog 시스템은 MVC 패턴을 사용하고 있으며, Model 에서는 데이터 저장, Controller에서 받아온 query를 통하여 데이터를 전송, 응답하며 Controller에서는 view에서 응답을 받을 수 있으며 받은 응답을 통해 model에 전달하는 query를 제어하며 model을 변경하는 역할을 맡고 있다.
View에서는 유저가 전송하고자 하는 데이터, 데이터 표현, 데이터 전송등을 맡고 있다. 


# Database Schema
Database는 noSQL인 mongoDB를 사용하였으며 npm 라이브러리 중에 mongoose를 사용하여 ODM(Object Document Mapping), MongoDB의 Document를 자바스크립트 객체로 변환하여 구현하였습니다.


## User Schema
![image](https://user-images.githubusercontent.com/49264688/140353058-75b8582e-f32d-438d-be73-c0c8fd8d3ba0.png)

User Table은 User의 정보를 나타내는 스키마이다. email은 email 형식 ex)temp@gmail.com을 갖춰야한다. nickname과 email은 중복 추가가 불가능하다. password는 암호화되어 저장한다. signDate 는 가입한 날 기준으로 UNIX Time을 저장한다. profileImage는 유저의 프로필 사진을 말하며 image의 url 정보가 들어있다.

## game Schema
![image](https://user-images.githubusercontent.com/49264688/140353929-35ca6dc5-04e2-4f32-b490-3082a5a2fc40.png)

Game Tabel은 Game 정보를 나타내며 IGDB 게임 데이터를 받아와서 저장한다. id는 IGDB에서 사용하는 게임 id 숫자로 표기한다. name은 게임의 이름, aggregated_name과 aggregated_count는 각각 기관이 게임을 평가한 점수 5점 만점이며 평가한 기관의 수를 나타낸다. alternate_names는 게임이름 뿐만 아니라 일본어, 한국어 등 다양한 언어로 게임을 표기하며 gernes, themes 는 게임의 category, platforms는 실행하는 게임의 플랫폼을 표기한다.
cover는 게임의 포스터 사진을 나타내며 각각 Width, height, url 정보가 들어가 있다. screenshots는 인 게임 사진을 나타내며 Width, height, url의 속성을 갖고 있다.

## Library & Wishlist Schema
![image](https://user-images.githubusercontent.com/49264688/140352955-d8e4184a-6c70-4bc7-a537-cbac650e039a.png)

User_libraryies 테이블은 유저의 라이브러리, 위시리스트 기능을 사용하기 위한 테이블이다. userid는 user테이블의 id를, gameId는 game 테이블의 id를 참조키로 사용하고 있으며 두 키의 중복은 불가능하다. gameName은 game 테이블의 name을 사용한다.
userGameRating은 유저가 해당 게임을 평가한 수치이며 5점 만점을 사용한다. userGameMemo는 유저가 해당 게임의 메모 및 리뷰를 사용하기 위한 속성이다. userGameStatus는 {todo, doing, done, wish}의 값을 가지며 각각 할 게임, 하고 있는 게임, 끝낸 게임, 사고 싶은 게임을 의미하며 wish 값은 wishlist를 표기할 때만 사용하며 library에서는 사용하지 않는다.


# GameLog user

1. Signup

![회원가입 시퀀스](https://user-images.githubusercontent.com/49264688/140359396-a3121ddf-d7ee-48b9-a079-cb4a8ac72fca.png)

회원가입 시퀀스 다이어그램은 위 그림과 같으며 유저가 Server를 통해 email, nickname, password를 요청하면 서버에서 컨트롤러로 회원가입을 요청 한 뒤 모델에서 이메일유효성과 닉네임 중복검사가 이루어진 뒤 회원 가입이 완료된다는 메세지와 함께 응답 메시지가 전송된다.

2. User Login

![로그인 시퀀스](https://user-images.githubusercontent.com/49264688/140359321-ff098c43-b67e-41d0-9648-510793703853.png)

회원가입이 완료된 유저는 Server에 id와 password를 전송 후 모델에서 bcrypt 라이브러리를 통해 저장된 암호화된 비밀번호를 비교하여 일치하면 로그인이 성공하며, 이후 로그인된 회원정보는 session을 통해 연결이 유지된다.

3. User Logout

![로그아웃 시퀀스](https://user-images.githubusercontent.com/49264688/140359356-7687e6aa-6792-4253-8a13-d271b7454b62.png)

로그인 된 세션의 유저는 Server에 로그아웃 시도를 Post하면  Controller를 거쳐 Model에 존재하는 해당 유저의 세션값을 삭제하여 로그아웃이 이루어진다.

# GameLog Service
<p align="center"><img src="https://user-images.githubusercontent.com/49264688/140372931-750af816-3737-47a9-899a-ca40b08981c7.png" width=156px height=340px>
</p>
GameLog 프로젝트는 Home, Library, wishlist, search탭바로 나누어 서비스를 제공한다. Home은 인기 게임 가장 높은 기관의 수와 평점을 가진 게임을 나타내며 추천 게임은 해당 유저의 데이터를 통한 게임을 추천한다. 카테고리별 게임은 유저가 회원가입시에 기입한 선호하는 장르의 게임들을 나타낸다.
Library는 유저가 하고 있는 게임, 끝낸 게임 등 유저의 게임 기록을 남길 수 있는 곳이며 게임 평가, 리뷰, 상태 저장, 정렬 등의 기능을 제공한다.
Wishlist는 사고 싶은 게임을 저장하며, 이름순, 출시일 순, 점수 순, 담은 순으로 정렬하는 서비스를 제공한다.
Search는 게임을 검색하는 기능을 제공하며 영어, 일본어, 한국 등 여러 언어로 검색하여 유저에게 제공한다.


## 유저 기반 추천 
![image](https://user-images.githubusercontent.com/49264688/140360851-4d56d64f-3903-4110-baae-bec526ee9708.png)

추천시스템은 기본적으로 콘텐츠 기반 필터링(content based filtering)방식과 협업 필터링(collaborative filtering)방식이 있습니다. GameLog 프로젝트에서는 User-based collaborative filtering 시스템을 이용하고 있습니다. 해당 알고리즘은 아이템 자체의 정보 없이 추천이 가능하며 알고리즘이 간단합니다. 하지만 유저-아이템의 양이 많아질수록 연산이 복잡해지며, 컴퓨팅 자원 소모가 증가하는 단점이 존재하며, 신규 가입자의 경우 아이템이 없어 유저간 유사도를 구할 수 없는 Cold start 단점이 존재합니다. 
User-based CF(Collaborative Filtering)의 예시로 위 의 그림과 같이 세명의 유저가 있다고 가정한다. 1번 유저는 1번 게임에 4점의 평가를 주고 2 번 유저는 3번 게임에 4점, 3번 유저는 1번 게임에 5점을 부여했다고 가정합니다. 
이후 연산을 통해 유사도를 구하여 2번 유저에게 1번 3번이 고점을 준 게임 아이템 기반으로 특정 유저에게 추천을 해주는 서비스입니다. 
초기 Cold start문제로 인해 해당 IGDB 데이터를 이용하여 몇몇의 카테고리별 랜덤 데이터를 활용하여 평점 데이터를 활용합니다. 이후 서버 데이터베이스에 저장하여 해당 평점 데이터를 활용하여 유저 라이브러리의 평점을 이용하여 해당 유저에게 추천을 하게 됩니다.

# GameLog Install

### 1. init server install
```console
npm -i 
```

### 2. IGDB auth
https://api-docs.igdb.com/#about 사이트 참조.
twitch application 등록 및 인증

IGDB 인증 후 IGDB config 파일 형식에 맞춰서 저장


### 3. config file generate
/config/IGDBconfig.json 파일 생성
```console
mkdif config
cd config
vi IGDBconfig.json
```
### 4. json file
```json
{
  "IGDB": {
    "Accept": "application/json",
    "Client_ID": "YOUR_Client_ID",
    "Authorization": "Bearer YOUR_AUTHORIZATION"
  },
  "IDAndSecret": {
    "clinet_id":"YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials"
  }
}
```


### 5. mongoDB setting
```console
mongo
show dbs
use admin
db.createUser({user:"root", pwd:"root", roels:["root"]});
```


### 6. IGDB game save
```console
cd models/util
node initSaveDB.js
```

### 7. server 실행
```console
node main.js
```
![image](https://user-images.githubusercontent.com/49264688/140351717-e76e7305-4ebe-4825-ab1d-b23f878e0431.png)

http://localhost:3000 으로 접속



# 참고 링크
IGDB API docs : https://api-docs.igdb.com/

twitch Developer : https://dev.twitch.tv/

express : https://expressjs.com/ko/

passport URL : http://www.passportjs.org/

MongoDB URL：https://www.mongodb.com/

Mongoose URL : https://mongoosejs.com/docs/queries.html

추천 nodeml URL : https://www.npmjs.com/package/nodeml

<div align="center" style="margin: 10px">
 <img alt="Git" src ="https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=white"/>
 <img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white"/>
 <img alt="Notion" src ="https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white"/>
 </div>

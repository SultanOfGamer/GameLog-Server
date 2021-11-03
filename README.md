# GameLog-Server

GameLog는 콘솔 및 PC 게임 평가 및 추천 어플리케이션 시스템 입니다.

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
</div>
# GameLog url

api.gamelog.kro.kr

# 목차

1. GameLog Install (#GameLog-Install)

1.1 init server install

1.2 IGDB auth

1.3 config file generate

1.4 json file

1.5 IGDB game save

1.6 server

**2. GameLog user**

2.1 Signup

2.2 Signup select category

2.3 Signup Validation

2.4 User Login

2.5 User Logout

2.6 Modify User Profile Image 

**3. GameLog Tabbar**

3.1 Home

3.2 Library

3.3 Wishlist

3.4 Search


# 1. GameLog Install

### 1.1 init server install
```console
npm -i 
```

### 1.2 IGDB auth
https://api-docs.igdb.com/#about 사이트 참조.
twitch application 등록 및 인증

IGDB 인증 후 IGDB config 파일 형식에 맞춰서 저장


### 1.3 config file generate
/config/IGDBconfig.json 파일 생성
```console
mkdif config
cd config
vi IGDBconfig.json
```
### 1.4 json file
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

### 1.5 IGDB game save
```console
cd models/util
node initSaveDB.js
```

### 1.6 server
```console
node main.js
```

### 1.7 recommand game save

추천 게임을 위한 카테고리별 랜덤 데이터 저장
1.5의 IGDB game save 후 실행 추천!

```console
cd models/util
node scriptRecommand.js
```

### 1.8 mongoDB setting
```console
mongo
show dbs
use admin
db.createUser({user:"root", pwd:"root", roels:["root"]});
```




 <img alt="Git" src ="https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=white"/>
 <img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white"/>
 <img alt="Notion" src ="https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white"/>
 

# GameLog-Server

GameLog는 콘솔 및 PC 게임 평가 및 추천 어플리케이션 시스템 입니다.

<div align="center">
 <img alt="node" src ="https://img.shields.io/badge/node-12.18.3-yellowgreen">
 <img alt="npmVersion" src ="https://img.shields.io/badge/npm package-7.11.1-brightgreen">
</div>





<div align="center" style="margin: 10px">
  <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/>
  <img alt="nodeJS" src ="https://img.shields.io/badge/nodeJS-339933.svg?&style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
  <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white"/>
  <img alt="Passport" src ="https://img.shields.io/badge/Passport-34E27A.svg?&style=for-the-badge&logo=Passport&logoColor=white"/>
</div>

### init server install
```console
npm -i install
```
### config 파일 생성
/config/IGDBconfig.json 파일 생성
```console
mkdif config
cd config
vi IGDBconfig.json
```
### json 파일 
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

### IGDB 게임 데이터 저장
```console
cd models/util
node initSaveDB.js
```

### server 실행
```console
node main.js
```





 <img alt="Git" src ="https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=white"/>
 <img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white"/>
 <img alt="Notion" src ="https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white"/>
 

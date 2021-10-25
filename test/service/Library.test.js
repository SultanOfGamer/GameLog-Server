const APP = require('../../main')

const user = require('../models/user').users;
const userGame = require('../models/userGame');
const testGame = require('../models/game');

const createGame = require('../../models/gamesDB').createGameSample
const deleteGame = require('../../models/gamesDB').deleteGameSample

const request = require('supertest')
const session = require('supertest-session')
let testSession = null;

describe("/game/library 라이브러리 라우팅",() => {
    beforeAll(async () => {
        testSession = session(APP);
        // 테스트 회원가입
        await request(APP)
            .post('/auth/signup')
            .send({
                email:user[0].email,
                nickname:user[0].nickname,
                password:user[0].password,
                passwordConfirm:user[0].password,
            })

        // 테스트 로그인
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })

        // 테스트 game create
        await createGame(testGame[0])
        await createGame(testGame[1])

        // 테스트 library create
        await testSession
            .post('/game/library')
            .send({
                gameId:testGame[0].id,
                userGameRating:4,
                userGameMemo:'testing',
                userGameStatus:'doing',
            })
    })
    afterAll(async ()=>{
        // 테스트 유저 library 삭제,
        await testSession
            .delete('/game/library/reset')

        // 테스트 game delete
        await deleteGame(testGame[0])

        // 테스트 user 회원 탈퇴
        await testSession
            .delete('/profile/user')
    })

    test.skip("로그인 X ", async () => {
        await request(APP)
            .get('/game/library')
            .expect(401)
    })

    test("GET 500 /game/251asdf 이상 경로", async() => {
        await testSession
            .get("/game/251asdf")
            .expect(500)
    })

    describe("GET /game/library", () => {
        test("GET 200 / 성공", () => {
            return testSession
                .get('/game/library')
                .expect(200)
        })
        test("GET 200 /?page=1&sort=aggregated_rating&sorttype=desc 성공 sort", () => {
            return testSession
                .get('/game/library/?page=1&sort=aggregated_rating&sorttype=desc')
                .expect(200)
        })
        test("GET 400 / sort 에러", () => {
            return testSession
                .get('/game/library/?page=1&sort=aggregating_rating_22&sorrtype=desc')
                .expect(400)
        })
    })

    describe("POST /game/library",() => {
        test("POST 201 / 데이터 생성 성공", async () => {
            await testSession
                .post('/game/library')
                .send({
                    gameId:testGame[1].id,
                    userGameRating:4,
                    userGameMemo:'testing',
                    userGameStatus:'doing',
                })
                .expect(201)
        })
        test("POST 500 / 데이터 생성 중복 실패", async() => {
            await testSession
                .post('/game/library')
                .send({
                    gameId:testGame[0].id,
                    userGameRating:4,
                    userGameMemo:'testing',
                    userGameStatus:'doing',
                })
                .expect(500)
        })
    })

    describe("PUT /game/library",() => {
        test("Library", () => {

        })
    })

    describe("DELETE /game/library",() => {
        test("Library", () => {

        })
    })
})


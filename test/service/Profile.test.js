const APP = require('../../main')
const user = require('../models/user').users;
const prefer = require('../models/userPrefer');

const request = require('supertest')
const session = require('supertest-session')
let testSession = null;


describe("/profile 유저 프로필", () => {
    beforeAll(async () => {
        testSession = session(APP);
        await request(APP)
            .post('/auth/signup')
            .send({
                email:user[0].email,
                nickname:user[0].nickname,
                password:user[0].password,
                passwordConfirm:user[0].password,
            })
    })
    afterAll(async ()=>{
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })

        await testSession
            .delete('/profile/user')
    })
    test("GET 401 / 로그인 X", () => {
        return testSession
            .get('/profile')
            .expect(401)
    })

    describe("GET /", () => {
        beforeEach(async () => {
            await testSession
                .post('/auth/login')
                .send({
                    email:user[0].email,
                    password:user[0].password
                })
        })
        afterEach(async() => {
            await testSession
                .post('/auth/logout')
        })
        describe("GET / 현재 유저 정보 받아오기", () => {
            test("GET 200 / 성공", () => {
                return testSession
                    .get('/profile')
                    .expect(200)
            })
            test("GET 404 / 실패", () => {
                return testSession
                    .get('/profile/eee')
                    .expect(404)
            })
        })
        describe("PUT /image 유저 프로필 사진 변경", () => {
            test("PUT 200 / 200 성공",() => {

                return testSession
                    .put('/profile/image')
                    .field('Content-Type', 'multipart/form-data')
                    .attach('image', 'test_image.jpg')
                    .expect(200)
            })
            test("PUT 200 /default default 이미지로 변경",() => {
                return testSession
                    .put('/profile/image/default')
                    .expect(200)
            })

            test("PUT 404 / 404 이미지 파일 없음",() => {
                return testSession
                    .put('/profile/image')
                    .field('Content-Type', 'multipart/form-data')
                    .attach('image', undefined)
                    .expect(404)
            })
            test("PUT 400 / 업로드 txt 파일 실패",() => {
                return testSession
                    .put('/profile/image')
                    .field('Content-Type', 'multipart/form-data')
                    .attach('image', 'test_file.txt')
                    .expect(200)
            })
        })
        describe("PUT /category 현재 유저 선호 카테고리 변경", () =>{
            test("PUT 200 / 5개",() => {
                return testSession
                    .put('/profile/category')
                    .send({
                        prefer:prefer.prefer
                    })
                    .expect(200)
            })
            test("PUT 400 / 5개 미만",() => {
                return testSession
                    .put('/profile/category')
                    .send({
                        prefer:prefer.preferOne
                    })
                    .expect(400)
            })
            test("PUT 500 / 에러전송",() => {
                return testSession
                    .put('/profile/category')
                    .send({})
                    .expect(500)
            })
        })

    })
})

const APP = require('../../main')
const user = require('../models/user').users;
const errUser = require('../models/user').signUpErrUser;

const request = require('supertest')
const session = require('supertest-session')
let testSession = null;

describe("POST /auth/login 로그인", () => {
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
            .delete('/profile/user')
    })

    test('POST 200 / 로그인 성공', async () => {
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })
            .expect(200)
    })
    test('POST 403 / 이메일 에러', async () => {
        await testSession
            .post('/auth/login')
            .send({
                email:errUser[0].email,
                password:user[0].password
            })
            .expect(403)
    })
    test('POST 403 / 비밀번호 에러', async () => {
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:errUser[0].password
            })
            .expect(403)
    })
})

describe("GET /auth/validation 이메일, 닉네임 검사", () => {
    beforeAll(async () => {
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
        testSession = session(APP);
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })

        await testSession
            .delete('/profile/user')
    })

    test('GET 200 /email 이메일 성공', () => {
        return request(APP)
            .get('/auth/validation/email?value=testUserUnique@gmail.com')
            .expect(200)
    })

    test('GET 403 /email 이메일 중복', () => {
        return request(APP)
            .get(`/auth/validation/email?value=${user[0].email}`)
            .expect(403)
    })

    test('GET 403 /email 이메일 형식 실패', () => {
        return request(APP)
            .get(`/auth/validation/email?value=${errUser[0].email}`)
            .expect(403)
    })

    test('GET 200 /nickname 닉네임 성공', () => {
        return request(APP)
            .get(`/auth/validation/nickname?value=nicknameTestUnique`)
            .expect(200)
    })

    test('GET 403 /nickname 닉네임 중복 실패', () => {
        return request(APP)
            .get(`/auth/validation/nickname?value=${user[0].nickname}`)
            .expect(403)
    })

    test('GET 403 /ddasf 경로에러 ', () => {
        return request(APP)
            .get('/auth/validation/ddasf')
            .expect(404)
    })
})

describe("POST /auth/signup 회원가입", () => {
    afterAll(async ()=>{
        testSession = session(APP);

        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })

        await testSession
            .delete('/profile/user')
        testSession = null;
    })

    test('POST 200 / 회원가입 성공', async () => {
        await request(APP)
            .post('/auth/signup')
            .send({
                email:user[0].email,
                nickname:user[0].nickname,
                password:user[0].password,
                passwordConfirm:user[0].password,
            })
            .expect(200)
    })

    test('POST 403 / 회원가입 실패', async() => {
        await request(APP)
            .post('/auth/signup')
            .send({
                email:user[0].email,
                nickname:user[0].nickname,
                password:user[0].password,
                passwordConfirm:user[0].password,
            })
            .expect(403)
    })
})


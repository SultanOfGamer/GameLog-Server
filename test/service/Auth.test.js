const APP = require('../../main')
const user = require('../models/user').users;
const errUser = require('../models/user').signUpErrUser;

const request = require('supertest')
const session = require('supertest-session')
let testSession = null;

describe("POST /auth/login", () => {
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

    test('200 로그인 성공', async () => {
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })
            .expect(200)
    })
    test('403 이메일 에러', async () => {
        await testSession
            .post('/auth/login')
            .send({
                email:errUser[0].email,
                password:user[0].password
            })
            .expect(403)
    })
    test('403 비밀번호 에러', async () => {
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:errUser[0].password
            })
            .expect(403)
    })
})

describe("GET /auth/validation", () => {
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

    test('200 이메일 성공', () => {
        return request(APP)
            .get('/auth/validation/email?value=testUserUnique@gmail.com')
            .expect(200)
    })

    test('403 이메일 중복', () => {
        return request(APP)
            .get(`/auth/validation/email?value=${user[0].email}`)
            .expect(403)
    })

    test('403 이메일 형식 실패', () => {
        return request(APP)
            .get(`/auth/validation/email?value=${errUser[0].email}`)
            .expect(403)
    })

    test('200 닉네임 성공', () => {
        return request(APP)
            .get(`/auth/validation/nickname?value=nicknameTestUnique`)
            .expect(200)
    })

    test('403 닉네임 중복 실패', () => {
        return request(APP)
            .get(`/auth/validation/nickname?value=${user[0].nickname}`)
            .expect(403)
    })

    test('403 경로에러 /auth/validation/ddasf', () => {
        return request(APP)
            .get('/auth/validation/ddasf')
            .expect(404)
    })
})

describe("POST /auth/signup", () => {
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

    test('200 회원가입 성공', async () => {
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

    test('403 회원가입 실패', async() => {
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


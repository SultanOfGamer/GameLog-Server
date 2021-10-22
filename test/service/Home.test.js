const APP = require('../../main')
const user = require('../models/user').users;
const prefer = require('../models/userPrefer');

const request = require('supertest')
const session = require('supertest-session')
let testSession = null;


describe("GET /",() => {
    test("Login X",  () => {
        return request(APP)
            .get('/')
            .expect(200)
    })
})

describe("GET / Login User", () => {
    beforeEach(async ()=>{
        testSession = session(APP);

        await request(APP)
            .post('/auth/signup')
            .send({
                email:user[0].email,
                nickname:user[0].nickname,
                password:user[0].password,
                passwordConfirm:user[0].password,
            })
        await testSession
            .post('/auth/login')
            .send({
                email:user[0].email,
                password:user[0].password
            })
    })
    afterEach(async() => {
        await testSession
            .delete('/profile/user')
    })

    // test("Login O", async () =>{
    //     await testSession
    //         .put('/profile/category')
    //         .send({prefer})
    //
    //     await testSession
    //         .get('/')
    //         .expect(200)
    // })

    test("login don't exist prefer", () => {
        return testSession
            .get('/')
            .expect(500)
    })
})

describe('GET /initdata', function () {
    test("GET /initdata/genres", () => {
        return request(APP)
            .get('/initdata/genres')
            .expect(200)
    })

    test("GET /initdata/themes", () => {
        return request(APP)
            .get('/initdata/genres')
            .expect(200)
    })

    test("GET /initdata/error", () => {
        return request(APP)
            .get('/initdata/error')
            .expect(404)
    })
});
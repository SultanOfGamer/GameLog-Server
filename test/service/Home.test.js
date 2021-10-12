const APP = require('../../main')
const request = require('supertest')



describe("home test",() => {
    let app = APP;

    beforeEach(() => {

    })
    afterEach(() => {

    })

    it("Home", async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
    })

    it("login Home", async() =>{
        await request(app)
            .post('/auth/login')
            .send({email:"test@gmail.com",password:123456})

        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
    })

    it("login don't exist prefer", async() => {

    })

})
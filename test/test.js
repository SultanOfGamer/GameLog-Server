const request = require('supertest')
const APP = require('../main')

describe("application 실행",() => {
    let app = APP;
    it("application", async () => {
        // beforeAll(async() => {
        //     APP.cre
        // })
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
    })
})

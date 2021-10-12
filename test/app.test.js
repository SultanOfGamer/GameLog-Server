const request = require('supertest')
const APP = require('../main')

describe("GameLog",() => {
    let app = APP;
    it("GameLog", async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
    })

    it("GameLog 404", async() => {
         const res = await request(app)
            .get('/51251')
        expect(res.statusCode).toEqual(404)
    })
})

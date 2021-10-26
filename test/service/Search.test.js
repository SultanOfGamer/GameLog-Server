const APP = require('../../main')
const request = require('supertest')


describe("GET /search",() => {
    test("search", async () => {
        const name = 'the'
        return request(APP)
            .get('/search')
            .query({
                name:name
            })
            .expect(200)
    })
})

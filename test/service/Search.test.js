// const APP = require('../../main')
const request = require('supertest')

const gameSearch = require('../../controll/index').gameSearch


describe("GET /search",() => {
    it("search", async () => {
        let name = 'the'
        const gameName = await gameSearch.getSearchResult(name)
        const alterName = await gameSearch.getAlterSearch(name)

    })
})

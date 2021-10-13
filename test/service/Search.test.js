// const APP = require('../../main')
const request = require('supertest')

const gameSearch = require('../controll/index').gameSearch


describe("Search TABBAR",() => {
    it("search", async () => {
        const gameName = await gameSearch.getSearchResult(name)
        const alterName = await gameSearch.getAlterSearch(name)

    })
})

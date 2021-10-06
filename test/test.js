
const search = require('../controll/index').gameSearch

// test('테스트 코드명', () => {
//   expect(실행값).toBe(기댓값);
// })

test("search test", ()=>{
    // search.getSearchResult('the').
    expect(()=>
        {
            console.log(search.getSearchResult('ㅎㅎ').toThrow())
        }
    )
    // expect("0").toBeTruthy();
})

test ('1+1은 2', ()=>{
    expect(1+1).toEqual(2);
})
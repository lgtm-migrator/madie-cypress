
describe('Create Measure', () => {

    let measureName = 'testMeasure' + Date.now()
    let CQLLibraryName = 'TestCql' + Date.now()
    let model = 'QI-Core'

    it('POST Success 201 created', () => {
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"measureName":measureName,"description":"TEST MEASURE " + measureName, "cqlLibraryName": CQLLibraryName, "model": model}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })
})



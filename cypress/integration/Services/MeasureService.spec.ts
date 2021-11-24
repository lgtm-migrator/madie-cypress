
describe('Create Measure', () => {

    let measureName = 'testMeasure' + Date.now()
    it('POST Success 201 created', () => {
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"name":measureName,"description":"TEST MEASURE " + measureName}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })
})



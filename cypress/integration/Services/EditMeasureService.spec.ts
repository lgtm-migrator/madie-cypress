describe('Edit Measure', () => {

    let measureName = 'APITestMeasure' + Date.now()
    it('PUT Success 200 created', () => {
        cy.request({
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "619bb4b9f71fdd2f6e71378b","measureName": measureName}
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
})
export {}

describe('Create Test Case', () => {

    before('Create Measure', () => {

        cy.setAccessTokenCookie()

        //Create New Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                method: 'POST',
                body: {
                    'measureName': 'TestMeasure' + Date.now(),
                    'cqlLibraryName': 'TestCql' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Cohort'
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/downloads/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()

    })

    it('Add Test Case', () => {

        //Add Test Case to the Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                        url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': "WhenBP<120",
                        'description': "DENOME pass Test HB <120"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.id).to.be.exist
                })
            })
        })
    })

    it('Get All Test Cases', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'GET',

                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.be.exist
                })
            })
        })
    })
})








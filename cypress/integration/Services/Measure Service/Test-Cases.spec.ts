//import {describe} from "mocha"

export {}

describe('Measure Service: Test Case Endpoints', () => {

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

    it('Create Test Case', () => {

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
                        'title': "test case title",
                        'description': "DENOME pass Test HB <120",
                        'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.id).to.be.exist
                    expect(response.body.series).to.eql("WhenBP<120")
                    expect(response.body.title).to.eql('test case title')
                    expect(response.body.description).to.eql("DENOME pass Test HB <120")
                    expect(response.body.json).to.be.exist
                    cy.writeFile('cypress/downloads/testCaseId', response.body.id)
                })
            })
        })
    })

    it('Edit Test Case', () => {

        //Edit created Test Case
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((measureId) => {
                cy.readFile('cypress/downloads/testCaseId').should('exist').then((testCaseId) => {
                    cy.request({
                        url: '/api/measures/' + measureId + '/test-cases/' + testCaseId,
                        headers: {
                            authorization: 'Bearer ' + accessToken.value
                        },
                        method: 'PUT',
                        body: {
                            'id': testCaseId,
                            'name': "IPPPass",
                            'series': "WhenBP<120",
                            'title': "test case title edited",
                            'description': "IPP Pass Test BP <120",
                            'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                        }
                    }).then((response) => {
                        expect(response.status).to.eql(200)
                        expect(response.body.id).to.eql(testCaseId)
                        expect(response.body.json).to.be.exist
                        expect(response.body.series).to.eql("WhenBP<120")
                        expect(response.body.title).to.eql('test case title edited')
                        expect(response.body.description).to.eql("IPP Pass Test BP <120")
                        expect(response.body.json).to.be.exist
                        cy.writeFile('cypress/downloads/testCaseId', response.body.id)
                    })
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
    it('Get a specific test case', () => {
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.readFile('cypress/downloads/testCaseId').should('exist').then((testCaseId) => {
                    cy.request({
                        url: '/api/measures/' + id + '/test-cases/' + testCaseId,
                        headers: {
                            authorization: 'Bearer ' + accessToken.value
                        },
                        method: 'GET',

                    }).then((response) => {
                        expect(response.status).to.eql(200)
                        expect(response.body.id).to.eql(testCaseId)
                        expect(response.body.series).to.eql("WhenBP<120")
                        expect(response.body.json).to.be.exist
                        expect(response.body.title).to.eql('test case title edited')
                    })
                })
            })
        })
    })
})

describe('Test Case description validations', () =>{

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()
    })

    it('Verify error message when the test case description has more than 250 characters while creating test case', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': "WhenBP<120",
                        'title': "test case title",
                        'description': "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrst" +
                            "uvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn" +
                            "opqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr",
                        'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.description).to.eql('Test Case Description can not be more than 250 characters.')
                })
            })
        })
    })

    it('Verify error message when the test case description has more than 250 characters while editing test case', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((measureId) => {
                cy.readFile('cypress/downloads/testCaseId').should('exist').then((testCaseId) => {
                    cy.request({
                        failOnStatusCode: false,
                        url: '/api/measures/' + measureId + '/test-cases/' + testCaseId,
                        headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                        method: 'PUT',
                        body: {
                            'id': testCaseId,
                            'name': "IPPPass",
                            'series': "WhenBP<120",
                            'title': "test case title edited",
                            'description': "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrst" +
                                           "uvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn" +
                                           "opqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr",
                            'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.description).to.eql('Test Case Description can not be more than 250 characters.')
                   })
                })
            })
        })
    })
})

describe('Measure Service: Test Case Endpoint: Authentication', () => {

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

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Bad Access Token', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value + 'TEST'
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': "WhenBP<120",
                        'description': "DENOME pass Test HB <120"
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eql(401)
                    expect(response.statusText).to.eql('Unauthorized')
                })
            })
        })
    })
})



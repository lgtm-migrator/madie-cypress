import {Utilities} from "../../../Shared/Utilities"
import {TestCaseJson} from "../../../Shared/TestCaseJson"

export {}

let measureName = 'TestMeasure' + Date.now()
let cqlLibraryName = 'TestCql' + Date.now()



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
                    'measureName': measureName,
                    'cqlLibraryName': cqlLibraryName,
                    'model': 'QI-Core',
                    'measureScoring': 'Cohort'
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {

        Utilities.deleteMeasure(measureName, cqlLibraryName, 'Cohort')

    })

    it('Create Test Case', () => {

        let title = 'test case title ~!@#!@#$$%^&%^&* &()(?><'
        let series = 'test case series ~!@#!@#$$%^&%^&* &()(?><'
        let description = 'DENOME pass Test HB <120 ~!@#!@#$$%^&%^&* &()(?><'
        //Add Test Case to the Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': series,
                        'title': title,
                        'description': description,
                        'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.id).to.be.exist
                    expect(response.body.series).to.eql(series)
                    expect(response.body.title).to.eql(title)
                    expect(response.body.description).to.eql(description)
                    expect(response.body.json).to.be.exist
                    cy.writeFile('cypress/fixtures/testcaseId', response.body.id)
                })
            })
        })
    })

    it('Edit Test Case', () => {

        //Edit created Test Case
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((measureId) => {
                cy.readFile('cypress/fixtures/testcaseId').should('exist').then((testcaseid) => {
                    cy.request({
                        url: '/api/measures/' + measureId + '/test-cases/' + testcaseid,
                        headers: {
                            authorization: 'Bearer ' + accessToken.value
                        },
                        method: 'PUT',
                        body: {
                            'id': testcaseid,
                            'name': "IPPPass",
                            'series': "WhenBP<120",
                            'title': "test case title edited",
                            'description': "IPP Pass Test BP <120",
                            'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                        }
                    }).then((response) => {
                        expect(response.status).to.eql(200)
                        expect(response.body.id).to.eql(testcaseid)
                        expect(response.body.json).to.be.exist
                        expect(response.body.series).to.eql("WhenBP<120")
                        expect(response.body.title).to.eql('test case title edited')
                        expect(response.body.json).to.be.exist
                        cy.writeFile('cypress/fixtures/testCaseId', response.body.id)
                    })
                })
            })
        })
    })

    it('Get All Test Cases', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
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
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.readFile('cypress/fixtures/testcaseId').should('exist').then((testCaseId) => {
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

describe('Measure Service: Test Case Endpoints: Validations', () =>{

    before('Create Measure', () => {

        cy.setAccessTokenCookie()

        measureName = 'TestMeasure' + Date.now()
        cqlLibraryName = 'TestCql' + Date.now()

        //Create New Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                method: 'POST',
                body: {
                    'measureName': measureName,
                    'cqlLibraryName': cqlLibraryName,
                    'model': 'QI-Core',
                    'measureScoring': 'Cohort'
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {

        Utilities.deleteMeasure(measureName, cqlLibraryName, 'Cohort')

    })

    it('Create Test Case: Description more than 250 characters', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
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

    it('Edit Test Case: Description more than 250 characters', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((measureId) => {
                cy.readFile('cypress/fixtures/testcaseId').should('exist').then((testCaseId) => {
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

    it('Create Test Case: Title more than 250 characters', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
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
                        'title': "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrst" +
                            "uvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn" +
                            "opqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr",
                        'description': "description",
                        'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.title).to.eql('Test Case Title can not be more than 250 characters.')
                })
            })
        })

    })

    it('Create Test Case: Series more than 250 characters', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrst" +
                            "uvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn" +
                            "opqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr",
                        'title': "Title",
                        'description': "description",
                        'json': "{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.series).to.eql('Test Case Series can not be more than 250 characters.')
                })
            })
        })
    })
})

describe('Test Case Json Validations', () =>{

    before('Create Measure', () => {

        cy.setAccessTokenCookie()

        measureName = 'TestMeasure' + Date.now()
        cqlLibraryName = 'TestCql' + Date.now()

        //Create New Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                method: 'POST',
                body: {
                    'measureName': measureName,
                    'cqlLibraryName': cqlLibraryName,
                    'model': 'QI-Core',
                    'measureScoring': 'Cohort'
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {

        Utilities.deleteMeasure(measureName, cqlLibraryName, 'Cohort')

    })

    it('Enter Valid Test Case Json', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': "Test Series",
                        'title': "Title",
                        'description': "description",
                        'json': TestCaseJson.API_TestCaseJson_Valid
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.hapiOperationOutcome.code).to.eql(201)
                })
            })
        })

    })

    it('Enter Invalid Test Case Json and Verify Error Message', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOM_Fail",
                        'series': "Test_Series",
                        'title': "Test_Title",
                        'description': "Test_Description",
                        'json': TestCaseJson.API_TestCaseJson_InValid
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.hapiOperationOutcome.code).to.eql(400)
                    expect(response.body.hapiOperationOutcome.message).to.eql('Unable to persist to HAPI FHIR due to errors')
                    expect(response.body.hapiOperationOutcome.outcomeResponse.issue[0].diagnostics).to.eql('Failed to parse request body as JSON resource. Error was: Incorrect resource type found, expected "Bundle" but found "Account"')
                })
            })
        })
    })

    it('Enter Patient XML and Verify Error Message', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOM_Fail",
                        'series': "Test_Series",
                        'title': "Test_Title",
                        'description': "Test_Description",
                        'json': TestCaseJson.TestCase_XML
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.hapiOperationOutcome.code).to.eql(400)
                    expect(response.body.hapiOperationOutcome.message).to.eql('Unable to persist to HAPI FHIR due to errors')
                    expect(response.body.hapiOperationOutcome.outcomeResponse.issue[0].diagnostics).to.eql('Failed to parse request body as JSON resource. Error was: Failed to parse JSON encoded FHIR content: Content does not appear to be FHIR JSON, first non-whitespace character was: \'<\' (must be \'{\')')
                })
            })
        })
    })
})

describe('Measure Service: Test Case Endpoint: Authentication', () => {

    before('Create Measure', () => {

        cy.setAccessTokenCookie()

        measureName = 'TestMeasure' + Date.now()
        cqlLibraryName = 'TestCql' + Date.now()

        //Create New Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                method: 'POST',
                body: {
                    'measureName': measureName,
                    'cqlLibraryName': cqlLibraryName,
                    'model': 'QI-Core',
                    'measureScoring': 'Cohort'
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {

        Utilities.deleteMeasure(measureName, cqlLibraryName, 'Cohort')

    })

    it('Bad Access Token', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
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

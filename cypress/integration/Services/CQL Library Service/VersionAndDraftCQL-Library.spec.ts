import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Environment} from "../../../Shared/Environment"

let CqlLibraryOne = ''
let CqlLibraryTwo = ''
let updatedCqlLibraryName = 'UpdatedTestLibrary' + Date.now()
let harpUser = Environment.credentials().harpUser

describe('Version and Draft CQL Library', () => {

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()
    })

    before('Create CQL Library', () => {

        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryOne)

        //Create Measure with Alternate User
        CqlLibraryTwo = 'TestLibrary2' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryTwo, true, true)
    })

    it('Add Version to the CQL Library', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((cqlLibraryId) => {
                cy.request({
                    url: '/api/cql-libraries/version/' + cqlLibraryId + '?isMajor=true',
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }

                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.version).to.eql("1.0.000")

                })

            })
        })
    })

    it('Add Draft to the Versioned Library', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((cqlLibraryId) => {
                cy.request({
                    url: '/api/cql-libraries/draft/' + cqlLibraryId,
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "id": cqlLibraryId,
                        "cqlLibraryName": updatedCqlLibraryName,
                        "model": "QI-Core"
                    }

                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.draft).to.eql(true)

                })
            })
        })
    })

    it('Verify non Library owner unable to create Version', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId2').should('exist').then((cqlLibraryId2) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/cql-libraries/version/' + cqlLibraryId2 + '?isMajor=true',
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }

                }).then((response) => {
                    expect(response.status).to.eql(403)
                    expect(response.body.message).to.eql('User ' + harpUser + ' cannot modify resource CQL Library with id: ' + cqlLibraryId2)

                })
            })
        })
    })
})

describe('Draft and Version Validations', () => {

    beforeEach('Set Access Token and create CQL Library', () => {

        cy.setAccessTokenCookie()

        CqlLibraryOne = 'TestLibraryOne' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryOne)
    })

    it('Verify the CQL Library updates are restricted after Version is created', () => {

        //Add Version to the CQL Library
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((cqlLibraryId) => {
                cy.request({
                    url: '/api/cql-libraries/version/' + cqlLibraryId + '?isMajor=true',
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }

                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.version).to.eql("1.0.000")

                })

            })
        })

        //Edit Library Name after versioned
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((cqlLibraryId) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/cql-libraries/' + cqlLibraryId,
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "id": cqlLibraryId,
                        "cqlLibraryName": updatedCqlLibraryName,
                        "model": "QI-Core",
                        "draft": false
                    }
                }).then((response) => {
                    expect(response.status).to.eql(409)
                    expect(response.body.message).to.eql('Could not update resource CQL Library with id: ' +cqlLibraryId+ '. Resource is not a Draft.')
                })
            })
        })
    })

})

describe('Version CQL Library without CQL', () => {

    before('Set Access Token and create CQL Library', () => {

        cy.setAccessTokenCookie()

        CqlLibraryOne = 'CQLLibraryWithoutCQL' + Date.now()
        CQLLibraryPage.createCQLLibraryAPI(CqlLibraryOne)

    })

    it('User can not version CQL Library if there is no CQL', () => {

        //Add Version to the CQL Library
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((cqlLibraryId) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/cql-libraries/version/' + cqlLibraryId + '?isMajor=true',
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }

                }).then((response) => {
                    expect(response.status).to.eql(500)
                    expect(response.body.error).to.eql('Internal Server Error')

                })

            })
        })
    })

})

describe('Version CQL Library with invalid CQL', () => {

    before('Set Access Token and create CQL Library', () => {

        cy.setAccessTokenCookie()

        CqlLibraryOne = 'CQLLibraryWithInvalidCQL' + Date.now()
        CQLLibraryPage.createCQLLibraryWithInvalidCQL(CqlLibraryOne)

    })

    it('User can not version the CQL library if the CQL has errors', () => {

        //Add Version to the CQL Library
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((cqlLibraryId) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/cql-libraries/version/' + cqlLibraryId + '?isMajor=true',
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }

                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.message).to.eql('User ' + harpUser + ' cannot version resource CQL Library with id: ' + cqlLibraryId + ' as the Cql has errors in it')

                })

            })
        })
    })

})


import {Environment} from "../../../Shared/Environment"

export {}

let CQLLibraryName = ''
let harpUser = Environment.credentials().harpUser

describe('CQL Library Service: Create CQL Library', () => {

    beforeEach('Set Access Token', () => {

        cy.setAccessTokenCookie()
    })

    it('Create CQL Library, successful creation', () => {

        CQLLibraryName = 'TestCqlLibrary' + Date.now()

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/cql-libraries',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {"cqlLibraryName": CQLLibraryName}
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                expect(response.body.cqlLibraryName).to.eql(CQLLibraryName)
                expect(response.body.createdBy).to.eql(harpUser)
            })
        })
    })

    it('Get All CQL Libraries', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/cql-libraries',
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                }
            }).then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body).to.not.be.null
                expect(response.body).to.be.a('array')
                expect(response.body[0].id).to.be.exist
            })
        })
    })

    it('Get All CQL Libraries created by logged in User', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/cql-libraries?currentUser=true',
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                }
            }).then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body).to.not.be.null
                expect(response.body).to.be.a('array')
                cy.get(response.body.length)
                expect(response.body[0].id).to.be.exist
                expect(response.body[0].createdBy).to.eql(harpUser)
            })
        })
    })

})
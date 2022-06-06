export {}

describe('Terminology Service: Value Set', () => {

    beforeEach('Set Access Token and tgt',() => {

        cy.setAccessTokenCookie()
        cy.setUMLSTGTCookie()
    })

    it('GET valueSet: Successful retrieval of valueSet', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.getCookie('UMLS_TGT').then((tgt) => {
                cy.request({
                    url: '/api/vsac/valueSet',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value
                    },
                    qs: {
                        tgt: tgt.value,
                        oid: '2.16.840.1.113762.1.4.1'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.resourceType).to.eql('ValueSet')
                    expect(response.body.title).to.eql('ONC Administrative Sex')
                })
            })
        })

    })

    it('GET valueSet: valueSet not found', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.getCookie('UMLS_TGT').then((tgt) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/vsac/valueSet',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value
                    },
                    qs: {
                        tgt: tgt.value,
                        oid: '2.16.840.1.11356762.1.4.1'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(404)
                    expect(response.statusText).to.eql('Not Found')
                    expect(response.isOkStatusCode).to.eql(false)
                })
            })
        })

    })
})

describe('Terminology Service: Value Set: Authentication', () => {

    beforeEach('Set Access Token and tgt',() => {

        cy.setAccessTokenCookie()
        cy.setUMLSTGTCookie()
    })

    it('GET valueSet: Missing TGT', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.getCookie('UMLS_TGT').then((tgt) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/vsac/valueSet',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value
                    },
                    qs: {
                        oid: '2.16.840.1.113762.1.4.1'
                    }
                }).then((response) => {
                    console.log(response)
                    expect(response.status).to.eql(400)
                    expect(response.body.message).to.eql('Required request parameter \'tgt\' for method parameter type String is not present')
                })
            })
        })

    })

    //skipping this test until https://jira.cms.gov/browse/MAT-4398 is resolved or the requirements for this case change
    it.skip('GET valueSet: TGT is invalid', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.getCookie('UMLS_TGT').then((tgt) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/vsac/valueSet',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value
                    },
                    qs: {
                        tgt: tgt.value + 'test',
                        oid: '2.16.840.1.11356762.1.4.1'
                    }
                }).then((response) => {

                    expect(response.status).to.eql(401)
                    expect(response.statusText).to.eql('Unauthorized')
                    expect(response.isOkStatusCode).to.eql(false)
                    expect(response.body.error).to.eql('Unauthorized')
                })
            })
        })

    })

    it('GET valueSet: Bad Access Token', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.getCookie('UMLS_TGT').then((tgt) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/vsac/valueSet',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value + 'test'
                    },
                    qs: {
                        tgt: tgt.value,
                        oid: '2.16.840.1.11356762.1.4.1'
                    }
                }).then((response) => {
                    console.log(response)
                    expect(response.status).to.eql(401)
                    expect(response.statusText).to.eql('Unauthorized')
                    expect(response.isOkStatusCode).to.eql(false)
                    expect(response.headers["www-authenticate"]).contains('Bearer error=\"invalid_token\"')
                })
            })
        })

    })
})





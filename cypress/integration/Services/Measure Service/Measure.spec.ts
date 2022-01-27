export {}

let measureName = ''
let CQLLibraryName = ''
let model = 'QI-Core'
let measureScoring = ''
let harpUser = ''

switch (Cypress.env('environment')) {
    case 'dev' :
        harpUser = Cypress.env('DEV_USERNAME')
        break
}

describe('Measure Service: Create Measure', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it.only('Create New Measure, successfull creation', () => {
        measureName = 'TestMeasure' + Date.now()
        CQLLibraryName = 'TestCql' + Date.now()
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring}
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.createdBy).to.eql(harpUser)
            })
        })
    })


    //Measure Name Validations
    it('Validation Error: Measure Name empty', () => {
        measureName = ''
        CQLLibraryName = 'TestCql' + Date.now()
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql("Measure Name is required.")
            })
        })
    })

    it('Validation Error: Measure Name does not contain alphabets', () => {
        measureName = '123456'
        CQLLibraryName = 'TestCql' + Date.now()
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql("A measure name must contain at least one letter.")
            })
        })
    })

    it('Validation Error: Measure Name contains under scores', () => {
        measureName = 'Test_Measure'
        CQLLibraryName = 'TestCql' + Date.now()
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql("Measure Name can not contain underscores.")
            })
        })
    })

    it('Validation Error: Measure Name contains more than 500 characters', () => {
        measureName = 'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwqwertyqwertyqwertyqwertyqwertyq'
        CQLLibraryName = 'TestCql' + Date.now()
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql("Measure Name can not be more than 500 characters.")
            })
        })
    })

    it('Validation Error: Model Invalid Value', () => {
        measureName = 'TestMeasure' + Date.now()
        CQLLibraryName = 'TestCql' + Date.now()
        model = 'QI-CoreINVALID'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.model).to.eql("MADiE was unable to complete your request, please try again.")
            })
        })
    })

})

describe('Measure Service: Create different Measure types', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Create Cohort Measure', () => {
        measureName = 'CohortTestMeasure' + Date.now()
        CQLLibraryName = 'CohortTestLibrary' + Date.now()
        measureScoring = 'Cohort'
        model = 'QI-Core'
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
            })
        })
    })

    it('Create Proportion Measure', () => {
        measureName = 'ProportionTestMeasure' + Date.now()
        CQLLibraryName = 'ProportionTestLibrary' + Date.now()
        measureScoring = 'Proportion'
        model = 'QI-Core'
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
            })
        })
    })

    it('Create Continuous Variable Measure', () => {
        measureName = 'CVTestMeasure' + Date.now()
        CQLLibraryName = 'CVTestLibrary' + Date.now()
        measureScoring = 'Continuous Variable'
        model = 'QI-Core'
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
            })
        })
    })

    it('Create Ratio Measure', () => {
        measureName = 'RatioTestMeasure' + Date.now()
        CQLLibraryName = 'RatioTestLibrary' + Date.now()
        measureScoring = 'Ratio'
        model = 'QI-Core'
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
            })
        })
    })

})

describe('Measure Service: CQL Library name validations', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Validation Error: CQL library Name empty', () => {

        CQLLibraryName = ''
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is required.")
            })
        })
    })

    it('Validation Error: CQL library Name does not starts with an upper case letter', () => {

        CQLLibraryName = 'test'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is invalid.")
            })
        })
    })

    it('Validation Error: CQL library Name contains spaces', () => {

        CQLLibraryName = 'Test 222'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is invalid.")
            })
        })
    })

    it('Validation Error: CQL library Name contains underscores', () => {

        CQLLibraryName = 'Test_222'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is invalid.")
            })
        })
    })

    it('Validation Error: CQL library Name contains special characters', () => {

        CQLLibraryName = 'Test!@#%$^&'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is invalid.")
            })
        })
    })

    it('Validation Error: CQL library Name does not contain alphabets', () => {

        CQLLibraryName = '123456'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is invalid.")
            })
        })
    })

    it('Validation Error: CQL library Name start with number', () => {

        CQLLibraryName = '123Test'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is invalid.")
            })
        })
    })

    it('Validation Error: CQL library Name already exists', () => {

        CQLLibraryName = 'TestCql1640794914452'
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.cqlLibraryName).to.eql("CQL library with given name already exists.")
            })
        })
    })

})

describe('Measure Service: Measure Scoring Validations', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Validation Error: Measure Scoring Empty', () => {

        measureName = 'MeasureScoringTest' + Date.now()
        CQLLibraryName = 'ScoringTestLibrary' + Date.now()
        measureScoring = ''

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureScoring).to.eql("Measure Scoring is required.")
            })
        })
    })

    it('Validation Error: Measure Scoring Invalid value', () => {

        measureName = 'MeasureScoringTest' + Date.now()
        CQLLibraryName = 'ScoringTestLibrary' + Date.now()
        measureScoring = 'ahjsm$&^&'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureScoring).to.eql("Value provided is not a valid option.")
            })
        })
    })
})

describe('Measure Service: Authentication', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Bad Access Token', () => {

        measureName = 'MeasureScoringTest' + Date.now()
        CQLLibraryName = 'ScoringTestLibrary' + Date.now()
        measureScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value + 'TEST'
                },
                body: {
                    "measureName": measureName,
                    "cqlLibraryName": CQLLibraryName,
                    "model": model,
                    "measureScoring": measureScoring
                }
            }).then((response) => {
                expect(response.status).to.eql(401)
                expect(response.statusText).to.eql('Unauthorized')
            })
        })
    })
})





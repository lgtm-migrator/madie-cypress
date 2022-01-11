export {}

let measureName = ''
let CQLLibraryName = ''
let model = 'QI-Core'

describe('Create Measure', () => {

    it('Create New Measure, successfull creation', () => {
        measureName = 'TestMeasure' + Date.now()
        CQLLibraryName = 'TestCql' + Date.now()
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })

    //Measure Name Validations
    it('Validation Error: Measure Name empty', () => {
        measureName = ''
        CQLLibraryName = 'TestCql' + Date.now()
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql("Measure Name is required")
        })
    })

    it('Validation Error: Measure Name does not contain alphabets', () => {
        measureName = '123456'
        CQLLibraryName = 'TestCql' + Date.now()
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql("A measure name must contain at least one letter.")
        })
    })

    it('Validation Error: Measure Name contains under scores', () => {
        measureName = 'Test_Measure'
        CQLLibraryName = 'TestCql' + Date.now()
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql("Measure Name can not contain underscores")
        })
    })

    it('Validation Error: Measure Name contains more than 500 characters', () => {
        measureName = 'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwqwertyqwertyqwertyqwertyqwertyq'
        CQLLibraryName = 'TestCql' + Date.now()
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql("Measure Name can not be more than 500 characters")
        })
    })

    it('Validation Error: Model Invalid Value', () => {
        measureName = 'TestMeasure' + Date.now()
        CQLLibraryName = 'TestCql' + Date.now()
        model = 'QI-CoreINVALID'
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.model).to.eql("MADiE was unable to complete your request, please try again.")
        })
    })

})

describe('CQL Library name validations', () => {

    it('Validation Error: CQL library Name empty', () => {

        CQLLibraryName = ''

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure Library Name is required")
        })
    })

    it('Validation Error: CQL library Name does not starts with an upper case letter', () => {

        CQLLibraryName = 'test'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.")
        })
    })

    it('Validation Error: CQL library Name contains spaces', () => {

        CQLLibraryName = 'Test 222'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.")
        })
    })

    it('Validation Error: CQL library Name contains underscores', () => {

        CQLLibraryName = 'Test_222'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure library name must not contain \'_\' (underscores).")
        })
    })

    it('Validation Error: CQL library Name contains special characters', () => {

        CQLLibraryName = 'Test!@#%$^&'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.")
        })
    })

    it('Validation Error: CQL library Name does not contain alphabets', () => {

        CQLLibraryName = '123456'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.")
        })
    })

    it('Validation Error: CQL library Name start with number', () => {

        CQLLibraryName = '123Test'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.")
        })
    })

    it('Validation Error: CQL library Name already exists', () => {

        CQLLibraryName = 'TestCql1640794914452'

        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": "Cohort"}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.cqlLibraryName).to.eql("CQL library with given name already exists")
        })
    })

})





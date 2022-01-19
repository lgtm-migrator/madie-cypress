export {}
let measureName = ''
let CQLLibraryName = 'TestCql' + Date.now()
let model = 'QI-Core'
let measureScoring = 'Cohort'

describe('Edit Measure', () => {

    it('Edit Measure Name', () => {
        measureName = 'APITestMeasure' + Date.now()
        cy.request({
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61e847f9ce2d45411d716700","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model,"measureScoring": measureScoring}
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })

    it('Validation Error: Measure Name empty', () => {
        measureName = ''
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql('Measure Name is required.')
        })
    })

    it('Validation Error: Measure Name does not contain at least 1 letter', () => {
        measureName = '12343456456'
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql('A measure name must contain at least one letter.')
        })
    })

    it('Validation Error: Measure Name contains underscore', () => {
        measureName = 'APITestMeasure_' + Date.now()
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql('Measure Name can not contain underscores.')
        })
    })

    it('Validation Error: Measure Name over 500 characters', () => {
        measureName = 'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwqwertyqwertyqwertyqwertyqwertyq'
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validationErrors.measureName).to.eql('Measure Name can not be more than 500 characters.')
        })
    })

    it('Save CQL to Measure', () => {
        measureName = 'APITestMeasure' + Date.now()
        cy.request({
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61e847f9ce2d45411d716700","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring, "cql": "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\""}
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
    it('Add Measure Steward', () => {
        measureName = 'APITestMeasure' + Date.now()
        cy.request({
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61e847f9ce2d45411d716700","measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring, "measureMetaData": {"measureSteward": "SemanticBits"}}
        }).then((response) => {
            expect(response.status).to.eql(200)
        })

    })
})
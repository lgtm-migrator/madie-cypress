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
    it('Save CQL to Measure', () => {
        cy.request({
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "619bb4b9f71fdd2f6e71378b","measureName": measureName, "cql": "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\""}
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
})
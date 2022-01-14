describe('Create different  Measure types', () => {

    let measureName = ''
    let CQLLibraryName = ''
    let model = 'QI-Core'
    let measureScoring = ''

    it('Create Cohort Measure', () => {
        measureName = 'CohortTestMeasure' + Date.now()
        CQLLibraryName = 'CohortTestLibrary' + Date.now()
        measureScoring = 'Cohort'
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })

    it('Create Proportion Measure', () => {
        measureName = 'ProportionTestMeasure' + Date.now()
        CQLLibraryName = 'ProportionTestLibrary' + Date.now()
        measureScoring = 'Proportion'
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })

    it('Create Continuous Variable Measure', () => {
        measureName = 'CVTestMeasure' + Date.now()
        CQLLibraryName = 'CVTestLibrary' + Date.now()
        measureScoring = 'Continuous Variable'
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })

    it('Create Ratio Measure', () => {
        measureName = 'RatioTestMeasure' + Date.now()
        CQLLibraryName = 'RatioTestLibrary' + Date.now()
        measureScoring = 'Ratio'
        cy.request({
            url: '/api/measure',
            method: 'POST',
            body: {"measureName": measureName, "cqlLibraryName": CQLLibraryName, "model": model, "measureScoring": measureScoring}
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })

})
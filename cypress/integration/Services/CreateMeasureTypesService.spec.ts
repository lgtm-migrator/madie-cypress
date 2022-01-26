export {}

let measureName = ''
let CQLLibraryName = ''
let model = 'QI-Core'
let measureScoring = ''

describe('Create different  Measure types', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Create Cohort Measure', () => {
        measureName = 'CohortTestMeasure' + Date.now()
        CQLLibraryName = 'CohortTestLibrary' + Date.now()
        measureScoring = 'Cohort'
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
export {}
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {Environment} from "../../../Shared/Environment"


let measureName = 'MeasureName ' + Date.now()
let CqlLibraryName = 'CQLLibraryName' + Date.now()
let measureScoring = 'Proportion'
let harpUser = Environment.credentials().harpUser

describe('Measure Service: Test Case Endpoints', () => {

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()
    })

    before('Create Measure', () => {
        
        let randValue = (Math.floor((Math.random() * 1000) + 1))
        let newMeasureName = measureName + randValue
        let newCqlLibraryName = CqlLibraryName + randValue
        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName, measureScoring)

    })
    it('Create meassure group', () => {
        let PopIniPop = 'IPP'
        let PopNum = 'Numerator'
        let PopDenom = 'Denominator'
        let measureTstScoring = 'Cohort'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((fileContents) => {
                // cy.get('[data-testid=edit-measure-'+ fileContents +']').click()
                cy.request({
                    url: '/api/measures/' + fileContents + '/groups/',
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "scoring": measureTstScoring, 
                        "population": { 
                            "initialPopulation": PopIniPop, 
                            "numerator": PopNum, 
                            "denominator": PopDenom 
                        }
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.id).to.be.exist
                    expect(response.body.scoring).to.eql('Cohort')
                    expect(response.body.population.initialPopulation).to.eql('IPP')
                    expect(response.body.population.numerator).to.eql('Numerator')
                    expect(response.body.population.denominator).to.eql('Denominator')
                    // expect(response.body.createdBy).to.eql(harpUser)
                })
            })
        })
    })

    it.only('Update meassure group', () => {
        let PopIniPop = 'IPP'
        let PopNum = 'Numerator'
        let PopNumExc = 'Numerator Exclusion'
        let PopDenom = 'Denominator'
        let measureTstScoring = 'Ratio'

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((fileContents) => {
                // cy.get('[data-testid=edit-measure-'+ fileContents +']').click()
                cy.request({
                    url: '/api/measures/' + fileContents + '/groups/',
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "scoring": measureTstScoring, 
                        "population": { 
                            "initialPopulation": PopIniPop, 
                            "numerator": PopNum,
                            "numeratorExclusion": PopNumExc,
                            "denominator": PopDenom 
                        }
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.id).to.be.exist
                    expect(response.body.scoring).to.eql('Ratio')
                    expect(response.body.population.initialPopulation).to.eql('IPP')
                    expect(response.body.population.numerator).to.eql('Numerator')
                    expect(response.body.population.numeratorExclusion).to.eql('Numerator Exclusion')
                    expect(response.body.population.denominator).to.eql('Denominator')
                    // expect(response.body.createdBy).to.eql(harpUser)
                })
            })
        })
    })
})
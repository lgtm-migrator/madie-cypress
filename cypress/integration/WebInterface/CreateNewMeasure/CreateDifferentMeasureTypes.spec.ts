import {OktaLogin} from "../../../Shared/OktaLogin"
import {LandingPage} from "../../../Shared/LandingPage"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"

let measureName = ''
let measureScoring = ''

describe('Create different Measure types', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()})

    it('Create Cohort Measure', () => {

        measureName = 'CohortTestMeasure' + Date.now()
        measureScoring = 'Cohort'

        createMeasure()
        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Create Proportion Measure', () => {

        measureName = 'ProportionTestMeasure' + Date.now()
        measureScoring = 'Proportion'

        createMeasure()
        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Create Continuous Variable Measure', () => {

        measureName = 'CVTestMeasure' + Date.now()
        measureScoring = 'CV'

        createMeasure()
        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Create Ratio Measure', () => {

        measureName = 'RatioTestMeasure' + Date.now()
        measureScoring = 'Ratio'

        createMeasure()
        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    function createMeasure() {

        //Click on Measures Button and Create New Measure
        cy.log('Create ' +measureScoring+ ' Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        switch (measureScoring){
        case 'Cohort':
            cy.get(CreateMeasurePage.measureScoringCohort).click()
            break
        case 'CV' :
            cy.get(CreateMeasurePage.measureScoringCV).click()
            break
        case 'Proportion':
            cy.get(CreateMeasurePage.measureScoringProportion).click()
            break
        case 'Ratio':
            cy.get(CreateMeasurePage.measureScoringRatio).click()
            break
        }
        cy.get(CreateMeasurePage.createMeasureButton).click()
        cy.log( measureScoring+ ' Measure created successfully')
    }
})
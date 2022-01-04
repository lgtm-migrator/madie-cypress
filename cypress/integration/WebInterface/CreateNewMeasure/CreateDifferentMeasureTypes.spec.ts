import {OktaLogin} from "../../../Shared/OktaLogin"
import {LandingPage} from "../../../Shared/LandingPage"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"

let measureName = ''
let CQLLibraryName = ''
let measureScoring = ''

describe('Create different Measure types', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()})

    it('Create Cohort Measure', () => {

        measureName = 'CohortTestMeasure' + Date.now()
        CQLLibraryName = 'CohortCQLLibrary' + Date.now()
        measureScoring = 'Cohort'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        cy.get(CreateMeasurePage.measureScoringCohort).click()
        cy.get(CreateMeasurePage.createMeasureButton).click()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Create Proportion Measure', () => {

        measureName = 'ProportionTestMeasure' + Date.now()
        CQLLibraryName = 'ProportionCQLLibrary' + Date.now()
        measureScoring = 'Proportion'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        cy.get(CreateMeasurePage.measureScoringProportion).click()
        cy.get(CreateMeasurePage.createMeasureButton).click()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Create Continuous Variable Measure', () => {

        measureName = 'CVTestMeasure' + Date.now()
        CQLLibraryName = 'CVCQLLibrary' + Date.now()
        measureScoring = 'CV'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        cy.get(CreateMeasurePage.measureScoringCV).click()
        cy.get(CreateMeasurePage.createMeasureButton).click()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Create Ratio Measure', () => {

        measureName = 'RatioTestMeasure' + Date.now()
        CQLLibraryName = 'RatioCQLLibrary' + Date.now()
        measureScoring = 'Ratio'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        cy.get(CreateMeasurePage.measureScoringRatio).click()
        cy.get(CreateMeasurePage.createMeasureButton).click()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })
})
import {OktaLogin} from "../../../Shared/OktaLogin";
import {LandingPage} from "../../../Shared/LandingPage";
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage";

let measureName = ''
let CQLLibraryName = ''
let model = ''

describe('Create New Measure', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()})

    it('Login to Madie and Create New Measure', () => {

        measureName = 'TestMeasure' + Date.now()
        CQLLibraryName = 'CQLLibrary' + Date.now()
        model = 'QI-Core'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.createMeasureButton).click()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })
})






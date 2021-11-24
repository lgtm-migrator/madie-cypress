import {OktaLogin} from "../../Shared/OktaLogin";
import {LandingPage} from "../../Shared/LandingPage";
import {CreateMeasurePage} from "../../Shared/CreateMeasurePage";

let measureName = 'TestMeasure'+ Date.now()

describe('Create New Measure', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()})

    it('Login to Madie and Create New Measure', () => {

        //Click on Measures Button
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.createMeasureButton).click()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })
})






import {OktaLogin} from "../../Shared/OktaLogin";
import {LandingPage} from "../../Shared/LandingPage";
import {CreateMeasurePage} from "../../Shared/CreateMeasurePage";

describe('Create New Measure', () => {
    beforeEach('Login',() => {

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()
    })

    it('Login to Madie and Create New Measure', () => {

        //Click on Measures Button
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type('TestMeasure')
        cy.get(CreateMeasurePage.createMeasureButton).click()
        // Click on cancel button
        cy.get(CreateMeasurePage.cancelButton).click()
    })
})




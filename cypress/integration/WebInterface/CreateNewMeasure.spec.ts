import {OktaLogin} from "../../Shared/OktaLogin"
import {LandingPage} from "../../Shared/LandingPage"

describe('Create New Measure', () => {
    beforeEach('Login',() => {

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()
    })

    it('Login to Madie and Create New Measure', () => {

        // Navigate to Create Measure Page
        cy.visit('https://dev-madie.hcqis.org/measure')
        cy.get(LandingPage.newMeasureButton).click()
        cy.get(LandingPage.enterMeasureName).type('TestMeasure')
        cy.get(LandingPage.createMeasureButton).click()

        // Click on cancel button
        cy.get(LandingPage.cancelButton).click()
    })
})


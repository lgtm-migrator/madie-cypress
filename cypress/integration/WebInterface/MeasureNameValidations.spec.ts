import {OktaLogin} from "../../Shared/OktaLogin";
import {LandingPage} from "../../Shared/LandingPage";
import {CreateMeasurePage} from "../../Shared/CreateMeasurePage";

describe('Measure Name Validations', () => {

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Verify error messages when the measure name entered is invalid', () => {

        //Click on Measures Button
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()

        //Verify error message when the Measure Name field is empty
        cy.get(CreateMeasurePage.measureNameTextbox).focus().blur()
        cy.get(CreateMeasurePage.fieldLevelError).should('contain.text', 'A measure name is required.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the Measure Name doesn't contain alphabets
        cy.get(CreateMeasurePage.measureNameTextbox).type('66777')
        cy.get(CreateMeasurePage.fieldLevelError).should('contain.text', 'A measure name must contain at least one letter.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the Measure Name has '_'
        cy.get(CreateMeasurePage.measureNameTextbox).clear().type('Test_Measure')
        cy.get(CreateMeasurePage.fieldLevelError).should('contain.text', 'Measure Name must not contain \'_\' (underscores).')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the Measure Name has more than 500 characters
        cy.get(CreateMeasurePage.measureNameTextbox).clear().type('This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is')
        cy.get(CreateMeasurePage.fieldLevelError).should('contain.text', 'A measure name cannot be more than 500 characters.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Click on cancel button
        cy.get(CreateMeasurePage.cancelButton).click()

        // Navigate to MADiE Landing page
        cy.get(LandingPage.madieLogo).click()
    })
})
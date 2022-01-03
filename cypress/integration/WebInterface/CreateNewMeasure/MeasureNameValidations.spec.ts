import {OktaLogin} from "../../../Shared/OktaLogin";
import {LandingPage} from "../../../Shared/LandingPage";
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage";

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
        cy.get(CreateMeasurePage.measureNameFieldLevelError).should('contain.text', 'A measure name is required.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the Measure Name doesn't contain alphabets
        cy.get(CreateMeasurePage.measureNameTextbox).type('66777')
        cy.get(CreateMeasurePage.measureNameFieldLevelError).should('contain.text', 'A measure name must contain at least one letter.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the Measure Name has '_'
        cy.get(CreateMeasurePage.measureNameTextbox).clear().type('Test_Measure')
        cy.get(CreateMeasurePage.measureNameFieldLevelError).should('contain.text', 'Measure Name must not contain \'_\' (underscores).')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the Measure Name has more than 500 characters
        cy.get(CreateMeasurePage.measureNameTextbox).clear().type('This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is')
        cy.get(CreateMeasurePage.measureNameFieldLevelError).should('contain.text', 'A measure name cannot be more than 500 characters.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Click on cancel button
        cy.get(CreateMeasurePage.cancelButton).click()

        // Navigate to MADiE Landing page
        cy.get(LandingPage.madieLogo).click()
    })

    it('Verify error messages when the CQL Library Name entered is invalid', () => {
        let measureName = 'TestMeasure' + Date.now()

        //Click on Measures Button
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()

        //Verify error message when the CQL Library Name field is empty
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).focus().blur()
        cy.get(CreateMeasurePage.cqlLibraryNameFieldLevelError).should('contain.text', 'Measure library name is required.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the CQL Library Name does not starts with an upper case letter
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).clear().type('test123')
        cy.get(CreateMeasurePage.cqlLibraryNameFieldLevelError).should('contain.text', 'Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the CQL Library Name contains spaces
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).clear().type('Test 123')
        cy.get(CreateMeasurePage.cqlLibraryNameFieldLevelError).should('contain.text', 'Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the CQL Library Name contains under score
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).clear().type('Test_123')
        cy.get(CreateMeasurePage.cqlLibraryNameFieldLevelError).should('contain.text', 'Measure library name must not contain \'_\' (underscores).')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the CQL Library Name contains special characters
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).clear().type('Test!@@#')
        cy.get(CreateMeasurePage.cqlLibraryNameFieldLevelError).should('contain.text', 'Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify error message when the CQL Library Name starts with a number
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).clear().type('12Test')
        cy.get(CreateMeasurePage.cqlLibraryNameFieldLevelError).should('contain.text', 'Measure library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        //Verify the error message when the CQL Library Name given already exists
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).clear().type('TestCql1640794914452')
        cy.get(CreateMeasurePage.createMeasureButton).click()
        cy.get(CreateMeasurePage.cqlLibraryNameDuplicateErrorMsg).should('contain.text', 'CQL library with given name already exists')

        // Navigate to MADiE Landing page
        cy.get(LandingPage.madieLogo).click()

    })
})
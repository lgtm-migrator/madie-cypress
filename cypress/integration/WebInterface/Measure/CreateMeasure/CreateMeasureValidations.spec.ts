import {OktaLogin} from "../../../../Shared/OktaLogin"
import {LandingPage} from "../../../../Shared/LandingPage"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"

describe('Measure Name Validations', () => {

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    //Measure Name Validations
    it('Verify error messages when the measure name entered is invalid or empty', () => {


        //Click on New Measure Button
        cy.get(LandingPage.newMeasureButton).click()

        //Verify error message when the Measure Name field is empty
        cy.get(CreateMeasurePage.measureNameTextbox).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).click()
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

    })

    //CQL Library Name Validations
    it('Verify error messages when the CQL Library Name entered is invalid or empty', () => {

        let measureName = 'TestMeasure' + Date.now()

        //Click on New Measure Button
        cy.get(LandingPage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()

        //Verify error message when the CQL Library Name field is empty
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).click()
        cy.get(CreateMeasurePage.measureNameTextbox).click()
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
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        cy.get(CreateMeasurePage.measureScoringCohort).click()
        cy.get(CreateMeasurePage.createMeasureButton).click()
        cy.get(CreateMeasurePage.serverErrorMsg).should('contain.text', 'CQL library with given name already exists')

        cy.get(CreateMeasurePage.serverErrorMsgCloseIcon).click()
        cy.get(CreateMeasurePage.cancelButton).click()

    })

    //Measure Scoring Validations
    it('Verify error message when the Measure Scoring field is empty', () => {

        let measureName = 'MeasureScoringTest' + Date.now()
        let CqlLibraryName = 'ScoringTestLibrary' + Date.now()

       //Click on New Measure Button
        cy.get(LandingPage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CqlLibraryName)
        cy.get(CreateMeasurePage.measureScoringDropdown).focus().blur()
        cy.get(CreateMeasurePage.measureScoringFieldLevelError).should('contain.text', 'Measure Scoring is required.')
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        cy.get(CreateMeasurePage.cancelButton).click()

    })

    //Measure Type Validations
    it('Verify error message when the Measure Type field is empty', () => {

        let measureName = 'MeasureTypeTest' + Date.now()
        let CqlLibraryName = 'MeasureTypeTestLibrary' + Date.now()


        //Click on New Measure Button
        cy.get(LandingPage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).focus().blur()
        cy.get(CreateMeasurePage.measureModelFieldLevelError).should('contain.text', 'A measure model is required.')
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CqlLibraryName)
        cy.get(CreateMeasurePage.measureScoringDropdown).click()
        cy.get(CreateMeasurePage.measureScoringCohort).click()
        //Verify if create measure button is disabled
        cy.get(CreateMeasurePage.createMeasureButton).should('be.disabled')

        cy.get(CreateMeasurePage.cancelButton).click()

    })
})
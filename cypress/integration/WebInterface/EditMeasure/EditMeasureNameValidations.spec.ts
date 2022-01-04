import {OktaLogin} from "../../../Shared/OktaLogin"
import {LandingPage} from "../../../Shared/LandingPage"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"

let measureName = ''
let CQLLibraryName = ''
let model = ''

describe('Edit Measure Name Validations', () => {

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Verify error messages when the edit measure name entered is invalid', () => {

        measureName = 'Measure' + Date.now()
        CQLLibraryName = 'CQLLibrary' + Date.now()
        model = 'QI-Core'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        CreateMeasurePage.clickCreateMeasureButton()


        //Click on Edit Button, Verify error message when the Measure Name field is empty
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear()
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'A measure name is required.')

        //Verify error message when the Edit Measure Name doesn't contain alphabets
        cy.get(EditMeasurePage.editMeasureCancelButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear().type('66777')
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'A measure name must contain at least one letter.')

        //Verify error message when the Measure Name has '_'
        cy.get(EditMeasurePage.editMeasureCancelButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear().type('Test_Measure')
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'Measure Name must not contain \'_\' (underscores).')

        //Verify error message when the Measure Name has more than 500 characters
        cy.get(EditMeasurePage.editMeasureCancelButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear().type('This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is')
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'A measure name cannot be more than 500 characters.')

        // Navigate to MADiE Landing page
        cy.get(LandingPage.madieLogo).click()
    })
})
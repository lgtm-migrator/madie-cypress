import {OktaLogin} from "../../../Shared/OktaLogin"
import {LandingPage} from "../../../Shared/LandingPage"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TopNav} from "../../../Shared/TopNav"

let measureName = ''
let updatedMeasureName = ''
let CQLLibraryName = ''
let model = ''


describe('Edit Measure', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Edit Measure Name and verify the measure name is updated on Measures page', () => {

        measureName = 'TestMeasure'+ Date.now()
        updatedMeasureName = 'UpdatedMeasure' + Date.now()
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

        MeasuresPage.clickEditforCreatedMeasure()

        //Edit Measure Name
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear()
        cy.wait(100)
        cy.get(EditMeasurePage.editMeasureTextBox).type(updatedMeasureName)
        cy.get(EditMeasurePage.saveEditedMeasureName).click()

        //Add Measure Steward
        cy.get(EditMeasurePage.measureStewardLeftNavTab).click()
        cy.get(EditMeasurePage.measureStewardTextBox).clear().type('SB')
        cy.get(EditMeasurePage.measureStewardSaveButton).click()
        cy.get(EditMeasurePage.measureStewardConfirmaionText).should('contain.text', 'Measure Steward Information Saved Successfully')

        //Navigate back to Measures page and verify if the Measure Name is updated
        cy.get(TopNav.measureTab).click()
        MeasuresPage.validateMeasureName(updatedMeasureName)
        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })
})
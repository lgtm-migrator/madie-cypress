import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {Header} from "../../../Shared/Header"

let measureName = 'TestMeasure' + Date.now() + 1
let CqlLibraryName = 'TestLibrary' + Date.now() + 1
let measureScoring = 'Ratio'
let updatedMeasureName = 'UpdatedTestMeasure' + Date.now() + 1 

describe('Edit Measure', () => {
    before('Create Measure', () => {

        OktaLogin.Login()

        //Create New Measure
        //CreateMeasurePage.CreateQICoreMeasure(measureName, CqlLibraryName, measureScoring)
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

        OktaLogin.Logout()

    })

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Edit Measure Name and verify the measure name is updated on Measures page', () => {

        //Create New Measure
        //CreateMeasurePage.CreateQICoreMeasureAPI(measureName,CqlLibraryName,measureScoring)

        //Edit Measure Name
        MeasuresPage.clickEditforCreatedMeasure()

        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear()
        cy.wait(100)
        cy.get(EditMeasurePage.editMeasureTextBox).type(updatedMeasureName)
        cy.get(EditMeasurePage.saveEditedMeasureName).click()

        //Add Measure Steward
        cy.get(EditMeasurePage.leftPanelMeasureSteward).contains('Steward/Author').click()
        cy.get(EditMeasurePage.measureStewardTextBox).clear().type('SB')
        cy.get(EditMeasurePage.measureStewardSaveButton).click()
        cy.get(EditMeasurePage.measureStewardConfirmaionText).should('contain.text', 'Measure Steward Information Saved Successfully')

        //Navigate back to Measures page and verify if the Measure Name is updated
        //cy.get(Header.measures).click()
        cy.get(EditMeasurePage.mainMadiePageButton).click()

        MeasuresPage.validateMeasureName(updatedMeasureName)

    })
})
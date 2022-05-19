import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {Header} from "../../../Shared/Header"
import {Utilities} from "../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let updatedMeasureName = 'UpdatedTestMeasure' + Date.now()

describe('Edit Measure', () => {
    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

    })

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    after('Clean up', () => {

        let measurementPeriodStart = "2023-01-01T00:00:00.000+00:00"
        let measurementPeriodEnd = "2023-12-31T00:00:00.000+00:00"
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, measurementPeriodStart, measurementPeriodEnd)

    })

    it('Edit Measure Name and verify the measure name is updated on Measures page', () => {

        //Edit Measure Name
        MeasuresPage.clickEditforCreatedMeasure()

        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear()
        cy.get(EditMeasurePage.editMeasureTextBox).type(updatedMeasureName)
        cy.get(EditMeasurePage.saveEditedMeasureName).click()

        //Add Measure Steward
        cy.get(EditMeasurePage.leftPanelMeasureSteward).contains('Steward/Author').click()
        cy.get(EditMeasurePage.measureStewardTextBox).clear().type('SB')
        cy.get(EditMeasurePage.measureStewardSaveButton).click()
        cy.get(EditMeasurePage.measureStewardSuccessMessage).should('contain.text', 'Measure Steward Information Saved Successfully')

        //Navigate back to Measures page and verify if the Measure Name is updated
        cy.get(Header.mainMadiePageButton).click()

        MeasuresPage.validateMeasureName(updatedMeasureName)

    })
})
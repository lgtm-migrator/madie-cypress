import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../Shared/CQLEditorPage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TopNav} from "../../../Shared/TopNav"

describe('Save CQL on CQL Editor Page', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Create New Measure and Add CQL to the Measure', () => {

        let measureName = 'TestMeasure' + Date.now()
        let CqlLibraryName = 'TestLibrary' + Date.now()
        let measureScoring = 'Ratio'

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName,CqlLibraryName,measureScoring)

        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(CQLEditorPage.cqlEditorTextBox).type('library TestMeasure version \'0.0.014\' {enter}')
        cy.get(CQLEditorPage.cqlEditorTextBox).type('using FHIR version \'4.0.1\' {enter}')
        cy.get(CQLEditorPage.cqlEditorTextBox).type('include FHIRHelpers version \'4.0.001\' called FHIRHelpers')
        cy.get(CQLEditorPage.cqlEditorSaveButton).click()

        //Navigate to Measures page and verify the saved CQL
        cy.get(TopNav.measureTab).click()
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(CQLEditorPage.cqlEditorTextBox).should('contain.text', 'library TestMeasure version \'0.0.014\' using FHIR version \'4.0.1\' include FHIRHelpers version \'4.0.001\' called FHIRHelpers' )

    })
})
import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {Header} from "../../../Shared/Header"
import {CQLEditorPage} from "../../../Shared/CQLEditorPage"
import {Utilities} from "../../../Shared/Utilities"
let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'

describe('Save CQL on CQL Editor Page', () => {

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

    it('Create New Measure and Add CQL to the Measure', () => {

        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //CQLEditorPage.readWriteCQL('cqlSaveCQL.txt')
        Utilities.readWriteFileData('cqlSaveCQL.txt', EditMeasurePage.cqlEditorTextBox)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Navigate to Measures page and verify the saved CQL
        cy.get(Header.mainMadiePageButton).click()
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(EditMeasurePage.cqlEditorTextBox).should('contain.text', 'library TestMeasure version \'0.0.014\' using FHIR version \'4.0.1\' include FHIRHelpers version \'4.0.001\' called FHIRHelpers' )

    })
})
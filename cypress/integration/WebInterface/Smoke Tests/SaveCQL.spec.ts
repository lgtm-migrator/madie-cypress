import {OktaLogin} from "../../../Shared/OktaLogin";
import {LandingPage} from "../../../Shared/LandingPage";
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage";
import {EditMeasurePage} from "../../../Shared/EditMeasurePage";
import {CQLEditorPage} from "../../../Shared/CQLEditorPage";

let measureName = ''
let CQLLibraryName = ''
let model = ''

describe('Save CQL on CQL Editor Page', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()})

    it('Create New Measure and Add CQL to the Measure', () => {

        measureName = 'TestMeasure' + Date.now()
        CQLLibraryName = 'CQLLibrary' + Date.now()
        model = 'QI-Core'

        //Click on Measures Button and Create New Measure
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.measureModelDropdown).click()
        cy.get(CreateMeasurePage.measureModelQICore).click()
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.createMeasureButton).click()

        //Navigate back to Measures page and Edit Measure Name
        cy.go('back')

        //Click on Edit Button
        cy.get(CreateMeasurePage.editMeasureButton).click()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(CQLEditorPage.cqlEditorTextBox).type('library TestMeasure version \'0.0.014\' {enter}')
        cy.get(CQLEditorPage.cqlEditorTextBox).type('using FHIR version \'4.0.1\' {enter}')
        cy.get(CQLEditorPage.cqlEditorTextBox).type('include FHIRHelpers version \'4.0.001\' called FHIRHelpers')
        cy.get(CQLEditorPage.cqlEditorSaveButton).click()

        //Navigate to Measures page and verify the saved CQL
        cy.get(CreateMeasurePage.topNavMeasureTab).click()
        cy.get(CreateMeasurePage.editMeasureButton).click()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(CQLEditorPage.cqlEditorTextBox).should('contain.text', 'library TestMeasure version \'0.0.014\' using FHIR version \'4.0.1\' include FHIRHelpers version \'4.0.001\' called FHIRHelpers' )

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })
})
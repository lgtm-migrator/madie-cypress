import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {Header} from "../../../Shared/Header"
import {CQLEditorPage} from "../../../Shared/CQLEditorPage";
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

    after('Clean up', () => {

        let measurementPeriodStart = "2023-01-01T00:00:00.000+00:00"
        let measurementPeriodEnd = "2023-12-31T00:00:00.000+00:00"
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, measurementPeriodStart, measurementPeriodEnd)

    })

    it('Create New Measure and Add CQL to the Measure', () => {

        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Navigate to Measures page and verify the saved CQL
        cy.get(Header.mainMadiePageButton).click()
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.get(EditMeasurePage.cqlEditorTextBox).invoke('text').then((text) => {
            expect(text.length).greaterThan(2581)
        })
    })
})
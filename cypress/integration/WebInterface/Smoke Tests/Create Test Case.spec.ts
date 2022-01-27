import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {LandingPage} from "../../../Shared/LandingPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseName = 'DENOMFail' + Date.now()

describe('Create Test Case', () => {
    beforeEach('Login', () => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Edit Measure and Create Test Case', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName, CqlLibraryName, measureScoring)

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases Page and create Test Case
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseName)
        cy.get(TestCasesPage.createTestCaseButton).click()
        cy.get(TestCasesPage.successMsg).should('contain.text', 'Test case saved successfully!')

        //Verify created test case exists on Test Case Page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.listOfTestCases).contains(testCaseName)
        cy.log('Test Case created successfully')

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()

    })
})
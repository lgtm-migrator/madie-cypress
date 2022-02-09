import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {LandingPage} from "../../../Shared/LandingPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseTitle = 'Title for Auto Test'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseJson = '{ \n' + 'Encounter: "Office Visit union" \n' + 'Id: "Identifier" \n' + 'value: "Visit out of hours (procedure)" \n' + '}'

describe('Create Test Case', () => {

    before ('Create Measure', () => {

        OktaLogin.Login()

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName, CqlLibraryName, measureScoring)

        OktaLogin.Logout()

    })
    beforeEach ('Login', () => {
        OktaLogin.Login()

    })
    afterEach ('Login', () => {
        OktaLogin.Logout()

    })

    it('Create Test Case', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases Page and create Test Case
        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseJson)

    })
    it('Edit and update test case', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //click tab to get to test cases
        cy.get(EditMeasurePage.testCasesTab).click()

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        testCaseTitle = 'Title for Auto TestUPDATED'
        testCaseDescription = 'DENOMFail' + Date.now() + 'UPDATED'
        testCaseJson = '{ \n' + 'TESTEncounter: "Office Visit union" \n' + 'Id: "Identifier" \n' + 'value: "Visit out of hours (procedure)" \n' + '}'
        //Edit / update Test Case
        TestCasesPage.updateLastTestCaseCreated(testCaseTitle, testCaseDescription, testCaseJson)

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()

    })
})
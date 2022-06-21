import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {TestCaseJson} from "../../../Shared/TestCaseJson"
import {Utilities} from "../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseTitle = 'Title for Auto Test          !@#$%^&*().         !@#$%^&*()'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries        !@#$%^&*()          !@#$%^&*()\''
let updatedTestCaseTitle = 'Title for Auto Test' + " some update"
let updatedTestCaseDescription = testCaseDescription + ' '+ 'UpdatedTestCaseDescription'
let updatedTestCaseSeries = 'CMSTestSeries'
let testCaseJson = TestCaseJson.TestCaseJson_Valid

describe('Create Test Case', () => {

    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName)

    })
    beforeEach('Login', () => {
        OktaLogin.Login()

    })
    afterEach('Logout', () => {
        OktaLogin.Logout()

    })

    after('Clean up', () => {

        Utilities.deleteMeasure(measureName, CqlLibraryName)

    })

    it('Create Test Case', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson, true)

    })

    it('Edit and update test case', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //click tab to get to test cases
        cy.get(EditMeasurePage.testCasesTab).click()

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        //Edit / update Test Case
        TestCasesPage.updateTestCase(updatedTestCaseTitle, updatedTestCaseDescription, updatedTestCaseSeries)

    })
})
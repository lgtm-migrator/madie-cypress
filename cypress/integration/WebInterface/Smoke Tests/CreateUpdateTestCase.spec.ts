import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"


let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseTitle = 'Title for Auto Test !@#$@#$%$%^&%&*^&*('
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries !@#$@#$%$%^&%&*^&*('
let updatedTestCaseTitle = testCaseTitle + "some update"
let updatedTestCaseDescription = testCaseDescription + ' '+ 'UpdatedTestCaseDescription'
let updatedTestCaseSeries = 'CMSTestSeries'
let testCaseJson = '{{} "resourceType": "Patient", "meta": {{} "profile": [ "http://hl7.org/fhir/us/core/' +
    'StructureDefinition/us-core-patient" ] }, "text": {{} "status": "extensions", "div": ' +
    '"<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><p><b>Generated Narrative</b></p></div>" }, "identifier": [ {{} ' +
    '"use": "usual", "type": {{} "coding": [ {{} "system": "http://terminology.hl7.org/CodeSystem/v2-0203", ' +
    '"code": "MR", "display": "Medical Record Number" } ], "text": "Medical Record Number" }, "system": ' +
    '"http://hospital.smarthealthit.org", "value": "1032702" } ], "name": [ {{} "given": "Tester" } ], "gender": ' +
    '"female" }'

describe('Create Test Case', () => {

    before('Create Measure', () => {

        OktaLogin.Login()

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName, CqlLibraryName, measureScoring)

        OktaLogin.Logout()

    })
    beforeEach('Login', () => {
        OktaLogin.Login()

    })
    afterEach('Login', () => {
        OktaLogin.Logout()

    })

    it('Create Test Case', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson)

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
import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseTitle = 'Title for Auto Test'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries'
let testCaseJson = '{{} "resourceType": "Patient", "meta": {{} "profile": [ "http://hl7.org/fhir/us/core/' +
    'StructureDefinition/us-core-patient" ] }, "text": {{} "status": "extensions", "div": ' +
    '"<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><p><b>Generated Narrative</b></p></div>" }, "identifier": [ {{} ' +
    '"use": "usual", "type": {{} "coding": [ {{} "system": "http://terminology.hl7.org/CodeSystem/v2-0203", ' +
    '"code": "MR", "display": "Medical Record Number" } ], "text": "Medical Record Number" }, "system": ' +
    '"http://hospital.smarthealthit.org", "value": "1032702" } ], "name": [ {{} "given": "Tester" } ], "gender": ' +
    '"female" }'

describe('Execute Test Case', () => {

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

    it('Execute Test Case and verify the test status', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases Page and create Test Case
        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson)

        //Click on Execute Test Cases button and validate the status
        cy.get(TestCasesPage.executeTestCaseButton).click()
        cy.get(TestCasesPage.testCaseStatus).should('not.be.null')
    })
})
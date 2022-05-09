import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {Header} from "../../../../Shared/Header"
import {Utilities} from "../../../../Shared/Utilities"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {LandingPage} from "../../../../Shared/LandingPage"

let measureName = 'TestMeasure' + Date.now()
let cqlLibraryName = 'TestLibrary' + Date.now()
let modelType = 'QI-Core'
let measureScoring = 'Proportion'
let measureCQL = "library EXM124v7QICore4 version '7.0.000'\n\n/*\nBased on CMS124v7 - Cervical Cancer Screening\n*/\n\n/*\nThis example is a work in progress and should not be considered a final specification\nor recommendation for guidance. This example will help guide and direct the process\nof finding conventions and usage patterns that meet the needs of the various stakeholders\nin the measure development community.\n*/\n\nusing QICore version '4.1.000'\n\ninclude FHIRHelpers version '4.0.001'\n\ninclude HospiceQICore4 version '2.0.000' called Hospice\ninclude AdultOutpatientEncountersQICore4 version '2.0.000' called AdultOutpatientEncounters\ninclude MATGlobalCommonFunctionsQICore4 version '5.0.000' called Global\ninclude SupplementalDataElementsQICore4 version '2.0.000' called SDE\n\ncodesystem \"SNOMEDCT:2017-09\": 'http://snomed.info/sct/731000124108' version 'http://snomed.info/sct/731000124108/version/201709'\n\nvalueset \"ONC Administrative Sex\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1'\nvalueset \"Race\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.836'\nvalueset \"Ethnicity\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.837'\nvalueset \"Payer\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.3591'\nvalueset \"Female\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.560.100.2'\nvalueset \"Home Healthcare Services\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1016'\nvalueset \"Hysterectomy with No Residual Cervix\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.198.12.1014'\nvalueset \"Office Visit\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001'\nvalueset \"Pap Test\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.108.12.1017'\nvalueset \"Preventive Care Services - Established Office Visit, 18 and Up\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1025'\nvalueset \"Preventive Care Services-Initial Office Visit, 18 and Up\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1023'\nvalueset \"HPV Test\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.110.12.1059'\n\ncode \"Congenital absence of cervix (disorder)\": '37687000' from \"SNOMEDCT:2017-09\" display 'Congenital absence of cervix (disorder)'\n\nparameter \"Measurement Period\" Interval<DateTime>\n  default Interval[@2019-01-01T00:00:00.0, @2020-01-01T00:00:00.0)\n  \ncontext Patient\n\ndefine \"SDE Ethnicity\":\n\n  SDE.\"SDE Ethnicity\"\n  \n  \ndefine \"SDE Payer\":\n\n  SDE.\"SDE Payer\"\n  \n  \ndefine \"SDE Race\":\n\n  SDE.\"SDE Race\"\n  \n  \ndefine \"SDE Sex\":\n\n  SDE.\"SDE Sex\"\n  \n  \ndefine \"Initial Population\":\n  Patient.gender = 'female'\n      and Global.\"CalendarAgeInYearsAt\"(Patient.birthDate, start of \"Measurement Period\") in Interval[23, 64]\n      and exists AdultOutpatientEncounters.\"Qualifying Encounters\"\n      \ndefine \"Denominator\":\n        \"Initial Population\"\n        \ndefine \"Denominator Exclusion\":\n    Hospice.\"Has Hospice\"\n          or exists \"Surgical Absence of Cervix\"\n         or exists \"Absence of Cervix\"\n         \ndefine \"Absence of Cervix\":\n    [Condition : \"Congenital absence of cervix (disorder)\"] NoCervixBirth\n          where Global.\"Normalize Interval\"(NoCervixBirth.onset) starts before end of \"Measurement Period\"\n          \ndefine \"Surgical Absence of Cervix\":\n    [Procedure: \"Hysterectomy with No Residual Cervix\"] NoCervixHysterectomy\n        where Global.\"Normalize Interval\"(NoCervixHysterectomy.performed) ends before end of \"Measurement Period\"\n            and NoCervixHysterectomy.status = 'completed'\n            \ndefine \"Numerator\":\n    exists \"Pap Test Within 3 Years\"\n        or exists \"Pap Test With HPV Within 5 Years\"\n        \ndefine \"Pap Test with Results\":\n    [Observation: \"Pap Test\"] PapTest\n        where PapTest.value is not null\n            and PapTest.status in { 'final', 'amended', 'corrected', 'preliminary' }\n            \ndefine \"Pap Test Within 3 Years\":\n    \"Pap Test with Results\" PapTest\n        where Global.\"Normalize Interval\"(PapTest.effective) ends 3 years or less before end of \"Measurement Period\"\n        \ndefine \"PapTest Within 5 Years\":\n    ( \"Pap Test with Results\" PapTestOver30YearsOld\n            where Global.\"CalendarAgeInYearsAt\"(Patient.birthDate, start of Global.\"Normalize Interval\"(PapTestOver30YearsOld.effective))>= 30\n                and Global.\"Normalize Interval\"(PapTestOver30YearsOld.effective) ends 5 years or less before end of \"Measurement Period\"\n    )\n    \ndefine \"Pap Test With HPV Within 5 Years\":\n    \"PapTest Within 5 Years\" PapTestOver30YearsOld\n        with [Observation: \"HPV Test\"] HPVTest\n            such that HPVTest.value is not null\n        and Global.\"Normalize Interval\"(HPVTest.effective) starts within 1 day of start of Global.\"Normalize Interval\"(PapTestOver30YearsOld.effective)\n                and HPVTest.status in { 'final', 'amended', 'corrected', 'preliminary' }\n                "

let PopIniPop = 'SDE Payer'
let PopNum = 'SDE Race'
let PopDenom = 'SDE Sex'
let PopDenex = 'Absence of Cervix'
let PopDenexcep = 'SDE Ethnicity'
let PopNumex = 'Surgical Absence of Cervix'

let TCName = 'TCName'
let TCSeries = 'SBTestSeries'
let TCTitle = 'test case title'
let TCDescription = 'DENOMFail1651609688032'
let TCJson = '{ "resourceType": "Bundle", "id": "1366", "meta": {   "versionId": "1", "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {   "fullUrl": "http://local/Encounter", "resource": { "resourceType": "Encounter","meta": { "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"}, "text": { "status": "generated","div":"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Sep 9th 2021 for Asthma<a name=\\\"mm\\\"/></div>"}, "status": "finished","class": { "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"}, "type": [ { "text": "OutPatient"} ],"subject": { "reference": "Patient/1"},"participant": [ { "individual": { "reference": "Practitioner/30164", "display": "Dr John Doe"}} ],"period": { "start": "2023-09-10T03:34:10.054Z"}}}, { "fullUrl": "http://local/Patient","resource": { "resourceType": "Patient","text": { "status": "generated","div": "<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Lizzy Health</div>"},"identifier": [ { "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ { "use": "official", "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

describe('Read only for measure, measure group, and test cases that user does not own', () => {

    before('Create Measure, Measure Group, and Test Case with alt user', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, cqlLibraryName, measureScoring, '', true, true)
        MeasureGroupPage.CreateProportionMeasureGroupAPI(true, true)
        TestCasesPage.CreateTestCaseAPI(TCTitle, TCSeries, TCDescription, '', true, true)

    })
    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    after('Clean up', () => {

        Utilities.deleteMeasure(measureName, cqlLibraryName, measureScoring)

    })
    it('Measure fields on detail page are not editable', () =>{

        //page loads
        cy.location('pathname', {timeout: 60000}).should('include', '/measures');
        Utilities.waitForElementVisible(LandingPage.myMeasuresTab, 3000)
        Utilities.waitForElementEnabled(LandingPage.myMeasuresTab, 3000)

        //navigate to the all measures tab
        Utilities.waitForElementVisible(LandingPage.allMeasuresTab, 3000)
        cy.get(LandingPage.allMeasuresTab).should('be.visible')
        Utilities.waitForElementEnabled(LandingPage.allMeasuresTab, 3000)
        cy.get(LandingPage.allMeasuresTab).should('be.enabled')
        cy.get(LandingPage.allMeasuresTab).click()

        //edit the measure that was not created by current measure
        MeasuresPage.clickEditforCreatedMeasure(true)

        cy.get(EditMeasurePage.leftPanelMeasureSteward).should('be.visible')
        cy.get(EditMeasurePage.leftPanelMeasureSteward).click()
        cy.get(EditMeasurePage.measureStewardTextBox).should('not.exist')
        
        cy.get(EditMeasurePage.leftPanelDescription).should('be.visible')
        cy.get(EditMeasurePage.leftPanelDescription).click()
        cy.get(EditMeasurePage.measureDescriptionTextBox).should('not.exist')
        
        cy.get(EditMeasurePage.leftPanelCopyright).should('be.visible')
        cy.get(EditMeasurePage.leftPanelCopyright).click()
        cy.get(EditMeasurePage.measureCopyrightTextBox).should('not.exist')        
        
        cy.get(EditMeasurePage.leftPanelDisclaimer).should('be.visible')
        cy.get(EditMeasurePage.leftPanelDisclaimer).click()
        cy.get(EditMeasurePage.measureDisclaimerTextBox).should('not.exist')

        cy.get(EditMeasurePage.leftPanelRationale).should('be.visible')
        cy.get(EditMeasurePage.leftPanelRationale).click()
        cy.get(EditMeasurePage.measureRationaleTextBox).should('not.exist')

        cy.get(EditMeasurePage.leftPanelAuthor).should('be.visible')
        cy.get(EditMeasurePage.leftPanelAuthor).click()
        cy.get(EditMeasurePage.measureAuthorTextBox).should('not.exist')

        cy.get(EditMeasurePage.leftPanelGuidance).should('be.visible')
        cy.get(EditMeasurePage.leftPanelGuidance).click()
        cy.get(EditMeasurePage.measureGuidanceTextBox).should('not.exist')



    })
    it('CQL value on the measure CQL Editor tab cannot be changed', () =>{

        //navigate to the all measures tab
        Utilities.waitForElementVisible(LandingPage.allMeasuresTab, 3000)
        cy.get(LandingPage.allMeasuresTab).should('be.visible')
        Utilities.waitForElementEnabled(LandingPage.allMeasuresTab, 3000)
        cy.get(LandingPage.allMeasuresTab).should('be.enabled')
        cy.get(LandingPage.allMeasuresTab).click()

        //edit the measure that was not created by current measure
        MeasuresPage.clickEditforCreatedMeasure(true)
        
        //confirm that the CQL Editor tab is available and click on it
        cy.get(EditMeasurePage.cqlEditorTab).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry_FHIR.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        cy.get(EditMeasurePage.cqlEditorTextBox.valueOf().toString()).eq(null)

    })
    it('Test Cases are read / view only', () =>{

        //navigate to the all measures tab
        Utilities.waitForElementVisible(LandingPage.allMeasuresTab, 3000)
        cy.get(LandingPage.allMeasuresTab).should('be.visible')
        Utilities.waitForElementEnabled(LandingPage.allMeasuresTab, 3000)
        cy.get(LandingPage.allMeasuresTab).should('be.enabled')
        cy.get(LandingPage.allMeasuresTab).click()

        //edit the measure that was not created by current measure
        MeasuresPage.clickEditforCreatedMeasure(true)

        //confirm that the test case tab is available and click on it
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()

        cy.readFile('cypress/fixtures/testCaseId2').should('exist').then((fileContents) => {
            //confirm that edit button for test case is not available
            cy.get('[data-testid=edit-test-case-'+ fileContents +']').should('not.exist')

            //confirm that view button for test case is available and click on the view button
            cy.get('[data-testid=view-test-case-'+ fileContents +']').should('be.visible')
            cy.get('[data-testid=view-test-case-'+ fileContents +']').should('be.enabled')
            cy.get('[data-testid=view-test-case-'+ fileContents +']').click()
        })

        //confirm that the text boxes, for the test case fields are not visible
        cy.get(TestCasesPage.testCaseTitle).should('not.exist')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('not.exist')
        cy.get(TestCasesPage.testCaseSeriesTextBox).should('not.exist')
        
    })
})
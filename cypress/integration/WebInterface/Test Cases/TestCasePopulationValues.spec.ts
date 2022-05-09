import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {OktaLogin} from "../../../Shared/OktaLogin"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {Utilities} from "../../../Shared/Utilities"
import {MeasureGroupPage} from "../../../Shared/MeasureGroupPage"
import {TestCaseJson} from "../../../Shared/TestCaseJson"

let measureName = 'TestMeasure' + (Date.now())
let CqlLibraryName = 'TestLibrary' + (Date.now())
let measureScoringArray = ['Ratio', 'Cohort', 'Continuous Variable', 'Proportion']

let testCaseTitle = 'test case title'
let testCaseDescription = 'DENOMFail' + Date.now()
let validTestCaseJson = TestCaseJson.TestCaseJson_Valid
let testCaseSeries = 'SBTestSeries'
let newMeasureName = ''
let newCqlLibraryName = ''
let measureCQL = "library EXM124v7QICore4 version '7.0.000'\n\n/*\nBased on CMS124v7 - Cervical Cancer Screening\n*/\n\n/*\nThis example is a work in progress and should not be considered a final specification\nor recommendation for guidance. This example will help guide and direct the process\nof finding conventions and usage patterns that meet the needs of the various stakeholders\nin the measure development community.\n*/\n\nusing QICore version '4.1.000'\n\ninclude FHIRHelpers version '4.0.001'\n\ninclude HospiceQICore4 version '2.0.000' called Hospice\ninclude AdultOutpatientEncountersQICore4 version '2.0.000' called AdultOutpatientEncounters\ninclude MATGlobalCommonFunctionsQICore4 version '5.0.000' called Global\ninclude SupplementalDataElementsQICore4 version '2.0.000' called SDE\n\ncodesystem \"SNOMEDCT:2017-09\": 'http://snomed.info/sct/731000124108' version 'http://snomed.info/sct/731000124108/version/201709'\n\nvalueset \"ONC Administrative Sex\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1'\nvalueset \"Race\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.836'\nvalueset \"Ethnicity\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.837'\nvalueset \"Payer\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.3591'\nvalueset \"Female\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.560.100.2'\nvalueset \"Home Healthcare Services\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1016'\nvalueset \"Hysterectomy with No Residual Cervix\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.198.12.1014'\nvalueset \"Office Visit\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001'\nvalueset \"Pap Test\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.108.12.1017'\nvalueset \"Preventive Care Services - Established Office Visit, 18 and Up\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1025'\nvalueset \"Preventive Care Services-Initial Office Visit, 18 and Up\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1023'\nvalueset \"HPV Test\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.110.12.1059'\n\ncode \"Congenital absence of cervix (disorder)\": '37687000' from \"SNOMEDCT:2017-09\" display 'Congenital absence of cervix (disorder)'\n\nparameter \"Measurement Period\" Interval<DateTime>\n  default Interval[@2019-01-01T00:00:00.0, @2020-01-01T00:00:00.0)\n  \ncontext Patient\n\ndefine \"SDE Ethnicity\":\n\n  SDE.\"SDE Ethnicity\"\n  \n  \ndefine \"SDE Payer\":\n\n  SDE.\"SDE Payer\"\n  \n  \ndefine \"SDE Race\":\n\n  SDE.\"SDE Race\"\n  \n  \ndefine \"SDE Sex\":\n\n  SDE.\"SDE Sex\"\n  \n  \ndefine \"Initial Population\":\n  Patient.gender = 'female'\n      and Global.\"CalendarAgeInYearsAt\"(Patient.birthDate, start of \"Measurement Period\") in Interval[23, 64]\n      and exists AdultOutpatientEncounters.\"Qualifying Encounters\"\n      \ndefine \"Denominator\":\n        \"Initial Population\"\n        \ndefine \"Denominator Exclusion\":\n    Hospice.\"Has Hospice\"\n          or exists \"Surgical Absence of Cervix\"\n         or exists \"Absence of Cervix\"\n         \ndefine \"Absence of Cervix\":\n    [Condition : \"Congenital absence of cervix (disorder)\"] NoCervixBirth\n          where Global.\"Normalize Interval\"(NoCervixBirth.onset) starts before end of \"Measurement Period\"\n          \ndefine \"Surgical Absence of Cervix\":\n    [Procedure: \"Hysterectomy with No Residual Cervix\"] NoCervixHysterectomy\n        where Global.\"Normalize Interval\"(NoCervixHysterectomy.performed) ends before end of \"Measurement Period\"\n            and NoCervixHysterectomy.status = 'completed'\n            \ndefine \"Numerator\":\n    exists \"Pap Test Within 3 Years\"\n        or exists \"Pap Test With HPV Within 5 Years\"\n        \ndefine \"Pap Test with Results\":\n    [Observation: \"Pap Test\"] PapTest\n        where PapTest.value is not null\n            and PapTest.status in { 'final', 'amended', 'corrected', 'preliminary' }\n            \ndefine \"Pap Test Within 3 Years\":\n    \"Pap Test with Results\" PapTest\n        where Global.\"Normalize Interval\"(PapTest.effective) ends 3 years or less before end of \"Measurement Period\"\n        \ndefine \"PapTest Within 5 Years\":\n    ( \"Pap Test with Results\" PapTestOver30YearsOld\n            where Global.\"CalendarAgeInYearsAt\"(Patient.birthDate, start of Global.\"Normalize Interval\"(PapTestOver30YearsOld.effective))>= 30\n                and Global.\"Normalize Interval\"(PapTestOver30YearsOld.effective) ends 5 years or less before end of \"Measurement Period\"\n    )\n    \ndefine \"Pap Test With HPV Within 5 Years\":\n    \"PapTest Within 5 Years\" PapTestOver30YearsOld\n        with [Observation: \"HPV Test\"] HPVTest\n            such that HPVTest.value is not null\n        and Global.\"Normalize Interval\"(HPVTest.effective) starts within 1 day of start of Global.\"Normalize Interval\"(PapTestOver30YearsOld.effective)\n                and HPVTest.status in { 'final', 'amended', 'corrected', 'preliminary' }\n                "

describe('Test Case Expected Measure Group population values based on initial measure scoring', () => {

    beforeEach('Create measure and login', () => {
        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName, measureScoringArray[3])
        OktaLogin.Login()

    })

    afterEach('Logout and Clean up Measures', () => {

        OktaLogin.Logout()

            let randValue = (Math.floor((Math.random() * 1000) + 1))
            let newCqlLibraryName = CqlLibraryName + randValue

            Utilities.deleteMeasure(newMeasureName, newCqlLibraryName, measureScoringArray[0])

    })

    it('Verify the Test Case Populations when Measure group is not added', () =>{

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCasePopulationHeaderForNoMeasureGroup).should('contain.text', 'No populations for current scoring. Please make sure at least one measure group has been created.')
    })

    it('Validate Population Values check boxes are correct based on measure scoring value that is applied, when the measure is initially created (defalut measure group)', () => {

        cy.log((measureScoringArray[3].valueOf()).toString())

        //Add Measure Group
        MeasureGroupPage.createMeasureGroupforProportionMeasure()

        //Navigate to Test Cases page and verify Populations
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseNUMEXCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).check().should('be.checked')

    })

    it('Validate notification that a reset of population values, on test cases, will occur once the completed save / update of the scoring value is executed', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        for (let i = 0; i<=1; i++){
            //log, in cypress, the measure score value
            cy.log((measureScoringArray[i].valueOf()).toString())
            //select scoring unit on measure
            cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[i].valueOf()).toString())
            //based on the scoring unit value, select a value for all population fields
            Utilities.validationMeasureGroupSaveAll((measureScoringArray[i].valueOf()).toString())
            //save measure group
            cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
            //validation message after attempting to save
            cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
            cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg)
                .then(($message) => {
                    if(i == 1){
                        expect($message.text()).to.equal('This change will reset the population scoring value in test cases. Are you sure you wanted to continue with this? UpdateCancel')
                    }
                    else if (i == 0){
                        expect($message.text()).to.equal('Population details for this group saved successfully.')
                    }
               })
        }

    })

    it('Validate Population Values are reset on all test cases that exist under a measure group, after the score unit value is saved / updated', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //log, in cypress, the measure score value
        cy.log((measureScoringArray[0].valueOf()).toString())
        //select scoring unit on measure
        cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[0].valueOf()).toString())
        //based on the scoring unit value, select a value for all population fields
        Utilities.validationMeasureGroupSaveAll((measureScoringArray[0].valueOf()).toString())
        //save measure group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation message after attempting to save
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('be.visible')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')
        //create test case
        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson)
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseNUMEXCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseDENEXCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.createTestCaseButton).click()
        cy.get(TestCasesPage.confirmationMsg).should('contain.text', 'Test case updated successfully!')
        //navigate back to the measure group tab / page and...
        //change score unit value and save / update measure with new value
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //log, in cypress, the measure score value
        cy.log((measureScoringArray[1].valueOf()).toString())
        //select scoring unit on measure
        cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[1].valueOf()).toString())
        //based on the scoring unit value, select a value for all population fields
        Utilities.validationMeasureGroupSaveAll((measureScoringArray[1].valueOf()).toString())
        //save measure group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation message after attempting to save
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'This change ' +
            'will reset the population scoring value in test cases. Are you sure you wanted to continue with this? UpdateCancel')
        cy.get(MeasureGroupPage.confirmScoreUnitValueUpdateBtn).click()
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population ' +
            'details for this group updated successfully.')


        cy.readFile('cypress/fixtures/measureId').should('exist').then((fileContents) => {
            cy.intercept('GET', '/api/measures/' + fileContents + '/test-cases').as('testCase')
            cy.intercept('PUT', '/api/measures/' + fileContents).as('putMeasures')

            //navigate back to the test case tab
            cy.get(EditMeasurePage.testCasesTab).click()

            cy.url({ timeout: 100000 }).should('include', '/edit/test-cases')

            cy.wait('@testCase').then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })

            cy.wait('@putMeasures').then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })
        })
        TestCasesPage.clickEditforCreatedTestCase()
        //confirm that check boxes that were checked are no longer checked
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('not.be.checked')

    })
    it('Test Case Population value options are limited to those that are defined from Measure Group -- required populations', () => {
        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        Utilities.validateMeasureGroup(measureScoringArray[3].valueOf().toString(),'wOOpt')
        //Navigate to Test Cases page and verify Populations
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'IPP')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMER')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENOM')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'NUMEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'DENEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'DENEXCEP')
    })
    it('Test Case Population value options are limited to those that are defined from Measure Group -- adding optional definitions', () => {
        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //setup measure group so that only the required fields / populations are defined / has values
        Utilities.validateMeasureGroup(measureScoringArray[3].valueOf().toString(),'wOOpt')
        //create test case
        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson)
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        //confirm that test case now has all pertinent details -- only the check boxes for the population fields that are required
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'IPP')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMER')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENOM')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'NUMEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'DENEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'DENEXCEP')
        //go back and update measure group to contain values for all of the population fields
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()
        Utilities.validateMeasureGroup(measureScoringArray[3].valueOf().toString(),'all')
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        //confirm that test case now has all of the population check boxes available
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'IPP')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMER')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENOM')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENEXCEP')

    })

    it('Test Case Population value options are limited to those that are defined from Measure Group -- removing optional definitions', () => {
        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //setup measure group so that only the required fields / populations are defined / has values
        Utilities.validateMeasureGroup(measureScoringArray[3].valueOf().toString(),'all')
        //create test case
        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson)
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        //confirm that test case now has all pertinent details -- all check boxes for the population fields are checked
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'IPP')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMER')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENOM')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENEXCEP')
        //go back and update measure group to contain values for all of the population fields
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()
        Utilities.validateMeasureGroup(measureScoringArray[3].valueOf().toString(),'wOOpt')
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        //confirm that test case now has only the required population values / check boxes
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'IPP')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'NUMER')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'DENOM')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'NUMEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'DENEX')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('not.contain.text', 'DENEXCEP')

    })

    it('Verify Test Case population dependencies for Proportion Measures', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //log, in cypress, the measure score value
        cy.log((measureScoringArray[3].valueOf()).toString())
        //select scoring unit on measure
        cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[3].valueOf()).toString())
        //based on the scoring unit value, select a value for all population fields
        Utilities.validationMeasureGroupSaveAll((measureScoringArray[3].valueOf()).toString())
        //save measure group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation message after attempting to save
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('be.visible')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')
        //create test case
        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson)
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        //confirm that test case now has all pertinent details -- only the check boxes for the population fields that are required
        cy.get(TestCasesPage.testCasePopulationValuesHeader).should('contain.text', 'Group 1 (Proportion) Population Values')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('be.visible')
        cy.get(TestCasesPage.testCasePopulationValues).should('contain.text', 'PopulationExpectedActual')

        cy.log('Select DENOM and verify IPP is checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')

        cy.log('Uncheck IPP and verify DENOM is unchecked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('not.be.checked')

        //Select DENOM again
        cy.get(TestCasesPage.testCaseDENOMCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')

        cy.log('Uncheck DENOM and verify IPP is not unchecked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')

        cy.log('Select Numerator and verify if DENOM and IPP are checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('be.checked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')

        cy.log('Uncheck DENOM and verify if Numerator is unchecked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('not.be.checked')

        //Check Numerator again
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.log('Uncheck Numerator and verify if Denom is not unchecked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('be.checked')

        //Check Numerator again
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.log('Uncheck IPP and verify if DENOM and Numerator are unchecked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('not.be.checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('not.be.checked')

        cy.log('Select Numerator Exclusion and verify IPP, Numerator and Denominator are selected')
        cy.get(TestCasesPage.testCaseNUMEXCheckBox).check().should('be.checked')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('be.checked')
    })

})

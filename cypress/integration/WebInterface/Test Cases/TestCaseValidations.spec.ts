import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {TestCaseJson} from "../../../Shared/TestCaseJson"
import {Header} from "../../../Shared/Header"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let measureScoringArray = ['Ratio', 'Cohort', 'Continuous Variable', 'Proportion']
let testCaseTitle = 'test case title'
let testCaseDescription = 'DENOMFail' + Date.now()
let validTestCaseJson = TestCaseJson.TestCaseJson_Valid
let invalidTestCaseJson = TestCaseJson.TestCaseJson_Invalid
let testCaseXML = TestCaseJson.TestCase_XML
let testCaseSeries = 'SBTestSeries'
let twoFiftyTwoCharacters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr'

describe('Test Case Validations', () => {

    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

    })
    beforeEach('Login', () => {
        OktaLogin.Login()

    })
    afterEach('Logout', () => {
        OktaLogin.Logout()

    })

    it('Create Test Case: Description more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(twoFiftyTwoCharacters)
        cy.get(TestCasesPage.createTestCaseButton).should('be.disabled')
    })

    it('Edit Test Case: Description more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson)

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        //Update Test Case Description with more than 250 characters
        cy.get(TestCasesPage.testCaseDescriptionTextBox).clear()
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(twoFiftyTwoCharacters, {delay: 0})
        cy.get(TestCasesPage.cuTestCaseButton).should('be.disabled')
    })

    it('Create Test Case: Title more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.testCasePopulationList).should('be.visible')

        cy.wait(2000)

        cy.get(TestCasesPage.testCaseTitle).should('be.visible')
        cy.get(TestCasesPage.testCaseTitle).should('be.enabled')

        cy.get(TestCasesPage.testCaseTitle).type(twoFiftyTwoCharacters)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.createTestCaseButton).should('be.disabled')
        cy.get(TestCasesPage.testCaseTitleInlineError).contains('Test Case Title cannot be more ' +
            'than 250 characters.')

    })

    it('Edit Test Case: Title more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson)

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCasePopulationList).should('be.visible')

        cy.wait(2000)

        cy.get(TestCasesPage.testCaseTitle).should('be.visible')
        cy.get(TestCasesPage.testCaseTitle).should('be.enabled')

        //Update Test Case Description with more than 250 characters
        cy.get(TestCasesPage.testCaseTitle).clear()
        cy.get(TestCasesPage.testCaseTitle).type(twoFiftyTwoCharacters, {delay: 0})
        cy.get(TestCasesPage.testCaseSeriesTextBox).click()
        cy.get(TestCasesPage.cuTestCaseButton).should('be.disabled')
        cy.get(TestCasesPage.testCaseTitleInlineError).contains('Test Case Title cannot be more ' +
            'than 250 characters.')
    })
    it('For new test case and measure: Correct check box options are available and they persist have being selected and test case is saved', () => {

        for (let i in measureScoringArray){
            switch (measureScoringArray[i].toString()){
                case "Ratio": {
                    measureScoring = "Ratio"
                    break
                }
                case "Proportion": {
                    measureScoring = "Proportion"
                    break
                }
                case "Continuous Variable": {
                    measureScoring = "Continuous Variable"
                    break
                }
                case "Cohort": {
                    measureScoring = "Cohort"
                    break
                }

            }
            //create measure
            CreateMeasurePage.CreateQICoreMeasure((measureName.concat(i)).toString(), (CqlLibraryName.concat(i)).toString(), measureScoring.toString())
            //Click on Edit Measure
            MeasuresPage.clickEditforCreatedMeasure()
            //Navigate to Test Cases page
            cy.get(EditMeasurePage.testCasesTab).click()
            //Click button to create new test case
            cy.get(TestCasesPage.newTestCaseButton).click()
            //Navigate to Test Cases page and add Test Case details
            cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
            cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
            cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries)
            cy.get(TestCasesPage.existingTestCaseSeriesDropdown).click()
            //Add json to the test case
            cy.get(TestCasesPage.aceEditor).type(validTestCaseJson)
            //validate correct check boxes are avaialable based on measure score value; and confirm that checked check boxes are persisted
            switch(measureScoring.toString()) {
                case "Ratio": {
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','IPP')
                    cy.get(TestCasesPage.testCaseIPPCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','NUMER')
                    cy.get(TestCasesPage.testCaseNUMERCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','NUMEX')
                    cy.get(TestCasesPage.testCaseNUMEXCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','DENOM')
                    cy.get(TestCasesPage.testCaseDENOMCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','DENEX')
                    cy.get(TestCasesPage.testCaseDENEXCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'DENEXCEP')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'MSRPOPL')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'MSRPOPLEX')
                    TestCasesPage.clickCreateTestCaseButton()
                    cy.get(TestCasesPage.successMsg).should('contain.text', 'Test case created successfully! Redirecting back to Test Cases...')
                    cy.wait(5000)
                    cy.get(Header.mainMadiePageButton).click()
                    MeasuresPage.clickEditforCreatedMeasure()
                    cy.get(EditMeasurePage.testCasesTab).click()
                    TestCasesPage.clickEditforCreatedTestCase()
                    cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseNUMEXCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseDENOMCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseDENEXCheckBox).should('be.checked')
                    break
                }
                case 'Proportion': {
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','IPP')
                    cy.get(TestCasesPage.testCaseIPPCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','NUMER')
                    cy.get(TestCasesPage.testCaseNUMERCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','NUMEX')
                    cy.get(TestCasesPage.testCaseNUMEXCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','DENOM')
                    cy.get(TestCasesPage.testCaseDENOMCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','DENEX')
                    cy.get(TestCasesPage.testCaseDENEXCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','DENEXCEP')
                    cy.get(TestCasesPage.testCaseDENEXCEPCheckBox).check()                        
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'MSRPOPL')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'MSRPOPLEX')
                    TestCasesPage.clickCreateTestCaseButton()
                    cy.get(TestCasesPage.successMsg).should('contain.text', 'Test case created successfully! Redirecting back to Test Cases...')
                    cy.wait(5000)
                    cy.get(Header.mainMadiePageButton).click()
                    MeasuresPage.clickEditforCreatedMeasure()
                    cy.get(EditMeasurePage.testCasesTab).click()
                    TestCasesPage.clickEditforCreatedTestCase()
                    cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseNUMEXCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseDENOMCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseDENEXCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseDENEXCEPCheckBox).should('be.checked')
                    break
                }
                case 'Continuous Variable': {
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','IPP')
                    cy.get(TestCasesPage.testCaseIPPCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','MSRPOPL')
                    cy.get(TestCasesPage.testCaseMSRPOPLCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','MSRPOPLEX')
                    cy.get(TestCasesPage.testCaseMSRPOPLEXCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','NUMER')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','NUMEX')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','DENOM')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','DENEX')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','DENEXCEP')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'DENEXCEP')
                    TestCasesPage.clickCreateTestCaseButton()
                    cy.get(TestCasesPage.successMsg).should('contain.text', 'Test case created successfully! Redirecting back to Test Cases...')
                    cy.wait(5000)
                    cy.get(Header.mainMadiePageButton).click()
                    MeasuresPage.clickEditforCreatedMeasure()
                    cy.get(EditMeasurePage.testCasesTab).click()
                    TestCasesPage.clickEditforCreatedTestCase()
                    cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseMSRPOPLCheckBox).should('be.checked')
                    cy.get(TestCasesPage.testCaseMSRPOPLEXCheckBox).should('be.checked')
                    break
                }
                case 'Cohort': {
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .contains('td','IPP')
                    cy.get(TestCasesPage.testCaseIPPCheckBox).check()
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','NUMER')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','NUMEX')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','DENOM')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value','DENEX')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'DENEXCEP')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'MSRPOPL')
                    cy.get(TestCasesPage.testCasePopulationValuesTable)
                        .should('not.have.value', 'MSRPOPLEX')
                    TestCasesPage.clickCreateTestCaseButton()
                    cy.get(TestCasesPage.successMsg).should('contain.text', 'Test case created successfully! Redirecting back to Test Cases...')
                    cy.wait(5000)
                    cy.get(Header.mainMadiePageButton).click()
                    MeasuresPage.clickEditforCreatedMeasure()
                    cy.get(EditMeasurePage.testCasesTab).click()
                    TestCasesPage.clickEditforCreatedTestCase()
                    cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.checked')
                    break

                }
            }
            cy.get(Header.mainMadiePageButton).click()
            cy.wait(7000)
            OktaLogin.Logout()
            cy.wait(7000)
            OktaLogin.Login()
            cy.wait(7000)
            measureScoring = null
        }
    })

    it('For exiting test case and measure: change check box selection and confirm change persists', () => {
        
        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure((measureName.concat('1')).toString(), (CqlLibraryName.concat('1')).toString(), measureScoring.toString())
        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //Navigate to Test Cases page
        cy.get(EditMeasurePage.testCasesTab).click()
        //Click button to create new test case
        cy.get(TestCasesPage.newTestCaseButton).click()
        //Navigate to Test Cases page and add Test Case details
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries)
        cy.get(TestCasesPage.existingTestCaseSeriesDropdown).click()
        //check check boxes
        cy.get(TestCasesPage.testCaseIPPCheckBox).check()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check()
        cy.get(TestCasesPage.testCaseNUMEXCheckBox).check()
        cy.get(TestCasesPage.testCaseDENOMCheckBox).check()
        cy.get(TestCasesPage.testCaseDENEXCheckBox).check()
        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(validTestCaseJson)
        //save test case
        TestCasesPage.clickCreateTestCaseButton()
        cy.wait(7000)
        cy.get(Header.mainMadiePageButton).click()
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        //change the checked setting of the check boxes
        cy.wait(7000)
        cy.get(TestCasesPage.testCaseIPPCheckBox).uncheck()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).uncheck()
        cy.get(TestCasesPage.testCaseDENOMCheckBox).uncheck()
        cy.wait(7000)
        //save changes
        cy.get(TestCasesPage.createTestCaseButton).click()
        cy.wait(7000)
        cy.get(Header.mainMadiePageButton).click()
        cy.wait(7000)
        MeasuresPage.clickEditforCreatedMeasure()
        cy.wait(7000)
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('not.be.checked')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('not.be.checked')
        cy.get(TestCasesPage.testCaseNUMEXCheckBox).should('be.checked')
        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('not.be.checked')
        cy.get(TestCasesPage.testCaseDENEXCheckBox).should('be.checked')
       
        


    })
})

describe('Test Case Json Validations', () => {
    
    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

    })

    beforeEach('Login', () => {
        OktaLogin.Login()

    })
    afterEach('Logout', () => {
        OktaLogin.Logout()

    })

    it('Enter Valid Test Case Json and Save', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries)
        cy.get(TestCasesPage.existingTestCaseSeriesDropdown).click()

        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(validTestCaseJson)
        cy.get(TestCasesPage.testCaseJsonValidationErrorBtn).click()
        cy.get(TestCasesPage.testCaseJsonValidationDisplayList).should('contain.text', 'Nothing to see here!')

        TestCasesPage.clickCreateTestCaseButton()
        cy.get(TestCasesPage.successMsg).should('contain.text', 'Test case created successfully! Redirecting back to Test Cases...')
    })

    it('Enter Invalid Test Case Json and Verify Error Message', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries)
        cy.get(TestCasesPage.existingTestCaseSeriesDropdown).click()

        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(invalidTestCaseJson)

        TestCasesPage.clickCreateTestCaseButton()
        cy.get(TestCasesPage.testCaseJsonValidationErrorBtn).click()
        cy.get(TestCasesPage.testCaseJsonValidationErrorList).should('contain.text', 'Failed to parse request body as JSON resource. Error was: Incorrect resource type found, expected "Patient" but found "Account"')

        cy.get(TestCasesPage.successMsg).should('contain.text', 'An error occurred with the Test Case JSON while creating the test case')
    })

    it('Enter Patient XML and Verify Error Message ', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries)
        cy.get(TestCasesPage.existingTestCaseSeriesDropdown).click()

        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(testCaseXML)

        TestCasesPage.clickCreateTestCaseButton()
        cy.get(TestCasesPage.testCaseJsonValidationErrorBtn).click()
        cy.get(TestCasesPage.testCaseJsonValidationErrorList).should('contain.text', 'Failed to parse request body as JSON resource. Error was: Failed to parse JSON encoded FHIR content: Content does not appear to be FHIR JSON, first non-whitespace character was: \'<\' (must be \'{\')')

        cy.get(TestCasesPage.successMsg).should('contain.text', 'An error occurred with the Test Case JSON while creating the test case')
    })

})
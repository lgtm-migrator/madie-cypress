import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {TestCaseJson} from "../../../../Shared/TestCaseJson"
import {Utilities} from "../../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let testCaseTitle = 'test case title'
let testCaseDescription = 'DENOMFail' + Date.now()
let validTestCaseJson = TestCaseJson.TestCaseJson_Valid
let testCaseSeries = 'SBTestSeries'
let twoFiftyTwoCharacters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr'

describe('Test Case Validations', () => {

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
    //test is waiting for 4626 to be finished
    it.skip('Validate text on the "Run Test", "Discard Changes", and "Save" buttons', () => {
        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

                //create test case
        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.detailsTab).should('exist')
        cy.get(TestCasesPage.detailsTab).should('be.visible')
        cy.get(TestCasesPage.detailsTab).click()

        cy.get(TestCasesPage.testCaseTitle).should('exist')
        Utilities.waitForElementVisible(TestCasesPage.testCaseTitle, 20000)
        Utilities.waitForElementEnabled(TestCasesPage.testCaseTitle, 20000)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('exist')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('be.visible')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).focus()
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).should('exist')
        cy.get(TestCasesPage.testCaseSeriesTextBox).should('be.visible')
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries).type('{enter}')
        cy.get(TestCasesPage.testCaseTitle).focus()
        cy.get(TestCasesPage.testCaseTitle).clear()
        cy.get(TestCasesPage.testCaseTitle).focus()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle.toString())

        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(validTestCaseJson)
            //setup for grabbing the measure create call
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id)=> {
            cy.intercept('POST', '/api/measures/' + id + '/test-cases').as('testcase')
        
            cy.get(TestCasesPage.createTestCaseButton).click()
            cy.get(TestCasesPage.detailsTab).click()
        
            //saving testCaseId to file to use later
            cy.wait('@testcase').then(({response}) => {
                expect(response.statusCode).to.eq(201)
                cy.writeFile('cypress/fixtures/testCaseId', response.body.id)
            })
            cy.get(EditMeasurePage.testCasesTab).should('be.visible')        
            cy.get(EditMeasurePage.testCasesTab).click()
        })
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()
        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        //validate text on "Run Test" button
        cy.get(TestCasesPage.runTestButton).should('contain.text', 'Run Test')
        //validate text on "Discard Changes" button

        //validate text on "Save" button

    })

    //test is waiting for 4626 to be finished
    it.skip('Validate that the "Run Test", "Discard Changes", and "Save" buttons are all viewable after clicking on Edit for a test case and on any right-pane tab', () => {
        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //create test case
        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.detailsTab).should('exist')
        cy.get(TestCasesPage.detailsTab).should('be.visible')
        cy.get(TestCasesPage.detailsTab).click()

        cy.get(TestCasesPage.testCaseTitle).should('exist')
        Utilities.waitForElementVisible(TestCasesPage.testCaseTitle, 20000)
        Utilities.waitForElementEnabled(TestCasesPage.testCaseTitle, 20000)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('exist')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('be.visible')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseDescriptionTextBox).focus()
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).should('exist')
        cy.get(TestCasesPage.testCaseSeriesTextBox).should('be.visible')
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries).type('{enter}')
        cy.get(TestCasesPage.testCaseTitle).focus()
        cy.get(TestCasesPage.testCaseTitle).clear()
        cy.get(TestCasesPage.testCaseTitle).focus()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle.toString())

        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(validTestCaseJson)
            //setup for grabbing the measure create call
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id)=> {
            cy.intercept('POST', '/api/measures/' + id + '/test-cases').as('testcase')
        
            cy.get(TestCasesPage.createTestCaseButton).click()
            cy.get(TestCasesPage.detailsTab).click()
        
            //saving testCaseId to file to use later
            cy.wait('@testcase').then(({response}) => {
                expect(response.statusCode).to.eq(201)
                cy.writeFile('cypress/fixtures/testCaseId', response.body.id)
            })
            cy.get(EditMeasurePage.testCasesTab).should('be.visible')        
            cy.get(EditMeasurePage.testCasesTab).click()
        })
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()
        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        //navigate to the CQL sub tab for test cases
        cy.get(TestCasesPage.tctMeasureCQLSubTab).should('be.visible')
        cy.get(TestCasesPage.tctMeasureCQLSubTab).click()

        //validate the presence and accessibility of the "Run Test" button
        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')

        //validate the presence and accessibility of the "Discard Changes" button

        //validate the presence and accessibility of the "Save" button

        //navigate to the Expected / Actual sub tab for test cases
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        //validate the presence and accessibility of the "Run Test" button
        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')

        //validate the presence and accessibility of the "Discard Changes" button

        //validate the presence and accessibility of the "Save" button

        //navigate to the Details sub tab for test cases
        cy.get(TestCasesPage.detailsTab).should('be.visible')
        cy.get(TestCasesPage.detailsTab).click()

        //validate the presence and accessibility of the "Run Test" button
        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')

        //validate the presence and accessibility of the "Discard Changes" button

        //validate the presence and accessibility of the "Save" button        
    })

    it('Create Test Case: Description more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.detailsTab).click()
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(twoFiftyTwoCharacters)
        cy.get(TestCasesPage.createTestCaseButton).should('be.disabled')
    })

    it('Edit Test Case: Description more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson, true)

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.detailsTab).click()

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

        cy.get(TestCasesPage.detailsTab).click()
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

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTestCaseJson, true)

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.detailsTab).click()
        cy.wait(2000)

        cy.get(TestCasesPage.testCaseTitle).should('exist')
        cy.get(TestCasesPage.testCaseTitle).should('be.visible')
        cy.get(TestCasesPage.testCaseTitle).should('be.enabled')
        cy.get(TestCasesPage.testCaseTitle).focus().clear()
        cy.get(TestCasesPage.testCaseTitle).invoke('val', '')
        cy.get(TestCasesPage.testCaseTitle).type('{selectall}{backspace}{selectall}{backspace}')

        //Update Test Case Description with more than 250 characters
        cy.get(TestCasesPage.testCaseTitle).type(twoFiftyTwoCharacters, {delay: 0})
        cy.get(TestCasesPage.testCaseSeriesTextBox).click()
        cy.get(TestCasesPage.cuTestCaseButton).should('be.disabled')
        cy.get(TestCasesPage.testCaseTitleInlineError).contains('Test Case Title cannot be more ' +
            'than 250 characters.')
    })
})
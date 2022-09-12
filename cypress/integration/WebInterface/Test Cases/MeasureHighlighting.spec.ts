import {TestCaseJson} from "../../../Shared/TestCaseJson"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {OktaLogin} from "../../../Shared/OktaLogin"
import {MeasureGroupPage} from "../../../Shared/MeasureGroupPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {Utilities} from "../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let testCaseTitle = 'test case title'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries'
let testCaseJson = TestCaseJson.TestCaseJson_Valid
let newMeasureName = ''
let newCqlLibraryName = ''

describe('Measure Highlighting', () => {

    beforeEach('Create measure and login', () => {
        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        OktaLogin.Login()

    })

    afterEach('Logout and Clean up Measures', () => {

        OktaLogin.Logout()

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        let newCqlLibraryName = CqlLibraryName + randValue

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)

    })
    //skipping due to bug MAT-4705
    it.skip('Execute single Test Case and verify Measure highlighting', () => {

        //Add Measure Group
        MeasureGroupPage.createMeasureGroupforRatioMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.testCasePopulationList).should('be.visible')

        cy.get(TestCasesPage.testCaseTitle).should('be.visible')
        cy.get(TestCasesPage.testCaseTitle).should('be.enabled')
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle, { force: true })
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries).type('{enter}')

        //Add json to the test case
        cy.get(TestCasesPage.aceEditor).type(testCaseJson)

        TestCasesPage.clickCreateTestCaseButton(true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.get(TestCasesPage.testCalculationResults).should('contain.text','define "ipp":\n' +
            '  exists ["Encounter"] E where E.period.start during "Measurement Period"')
    })

    it('Verify error message when the Test Case Json is empty', () => {

        //Add Measure Group
        MeasureGroupPage.createMeasureGroupforProportionMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.detailsTab).click()
        cy.get(TestCasesPage.testCaseTitle).should('be.visible')
        cy.get(TestCasesPage.testCaseTitle).should('be.enabled')
        cy.get(TestCasesPage.testCaseTitle).type(testCaseTitle, { force: true })
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(testCaseSeries).type('{enter}')

        cy.readFile('cypress/fixtures/measureId').should('exist').then((id)=> {
            cy.intercept('POST', '/api/measures/' + id + '/test-cases').as('testcase')

            cy.get(TestCasesPage.editTestCaseSaveButton).click()

            //saving testCaseId to file to use later
            cy.wait('@testcase').then(({response}) => {
                expect(response.statusCode).to.eq(201)
                cy.writeFile('cypress/fixtures/testCaseId', response.body.id)
            })

            cy.get(TestCasesPage.confirmationMsg).should('contain.text', 'An error occurred with the Test Case JSON while creating the test case')

            cy.get(TestCasesPage.testCaseJsonValidationErrorBtn).click()
            cy.get(TestCasesPage.testCaseJsonValidationErrorList).should('contain.text', 'An unknown exception occurred while validating the test case JSON.')
            cy.get(EditMeasurePage.testCasesTab).click()
        })

        TestCasesPage.clickEditforCreatedTestCase()
        cy.get(TestCasesPage.detailsTab).click()
        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.disabled')

    })
})

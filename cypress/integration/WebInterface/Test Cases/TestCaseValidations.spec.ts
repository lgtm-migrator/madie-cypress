import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseTitle = 'test case title ~!@#!@#$$%^&%^&* &()(?><'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseJson = '{ \n' + 'Encounter: "Office Visit union" \n' + 'Id: "Identifier" \n' + 'value: "Visit out of hours (procedure)" \n' + '}'
let testCaseSeries = 'SBTestSeries'
let twoFiftyTwoCharacters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr'

describe('Test Case Validations', () => {

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

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson)

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        //Update Test Case Description with more than 250 characters
        cy.get(TestCasesPage.testCaseDescriptionTextBox).clear().type(twoFiftyTwoCharacters, { delay:0 })
        cy.get(TestCasesPage.cuTestCaseButton).should('be.disabled')
    })

    it('Create Test Case: Title more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).click()
        cy.get(TestCasesPage.testCaseTitle).type(twoFiftyTwoCharacters)
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(TestCasesPage.createTestCaseButton).should('be.disabled')
        cy.get(TestCasesPage.testCaseTitleInlineError).contains('Test Case Title cannot be more ' +
            'than 250 characters.')

    })

    it('Edit Test Case: Title more than 250 characters', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson)

        //Click on Edit for Test Case
        TestCasesPage.clickEditforCreatedTestCase()

        //Update Test Case Description with more than 250 characters
        cy.get(TestCasesPage.testCaseTitle).clear().type(twoFiftyTwoCharacters, { delay:0 })
        cy.get(TestCasesPage.testCaseSeriesTextBox).click()
        cy.get(TestCasesPage.cuTestCaseButton).should('be.disabled')
        cy.get(TestCasesPage.testCaseTitleInlineError).contains('Test Case Title cannot be more ' +
            'than 250 characters.')
    })
})
import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {LandingPage} from "../../../Shared/LandingPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let testCaseTitle = 'New Title for Auto Test'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseJson = 'Encounter: "Office Visit union" \n' + 'Id: "Identifier" \n' + 'value: "Visit out of hours (procedure)"'

describe('Create Test Case', () => {
    beforeEach('Login', () => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Edit Measure and Create Test Case', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName, CqlLibraryName, measureScoring)

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases Page and create Test Case
        TestCasesPage.cuTestCase(testCaseTitle, testCaseDescription, testCaseJson)

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()

    })

})
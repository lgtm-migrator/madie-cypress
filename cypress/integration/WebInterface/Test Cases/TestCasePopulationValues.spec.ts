import {OktaLogin} from "../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../Shared/EditMeasurePage"
import {Utilities} from "../../../Shared/Utilities"


let measureName = 'TestMeasure' + (Date.now())
let CqlLibraryName = 'TestLibrary' + (Date.now())
let measureScoringArray = ['Ratio', 'Cohort', 'Continuous Variable', 'Proportion']

describe('Test Case Expected Measure Group population values based on initial measure scoring', () => {

    beforeEach('Create measure and login', () => {
        let randValue = (Math.floor((Math.random() * 1000) + 1))
        let newMeasureName = measureName + randValue
        let newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName, measureScoringArray[3])
        OktaLogin.Login()

    })
    afterEach('Logout', () => {
        OktaLogin.Logout()

    })

    it('Validate Population Values check boxes are correct based on measure scoring value that is applied, when the measure is initially created (defalut measure group)', () => {
        
            cy.log((measureScoringArray[3].valueOf()).toString())
            //Click on Edit Measure
            MeasuresPage.clickEditforCreatedMeasure()
            //Navigate to Test Cases page
            cy.get(EditMeasurePage.testCasesTab).click()
            //Click button to create new test case
            cy.get(TestCasesPage.newTestCaseButton).click()
            //validate proper Population Value check boxes, based on value of score
            Utilities.validateTCPopValueCheckBoxes((measureScoringArray[3].valueOf()).toString())
    })
})
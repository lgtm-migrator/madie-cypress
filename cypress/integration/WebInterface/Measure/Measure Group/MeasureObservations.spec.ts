import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {Utilities} from "../../../../Shared/Utilities"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {Header} from "../../../../Shared/Header"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let newMeasureName = ''
let newCqlLibraryName = ''

describe('Measure Observations', () => {

    beforeEach('Create New Measure and Login', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        OktaLogin.Login()

    })

    afterEach(' Clean up and Logout', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newCqlLibraryName = CqlLibraryName + randValue

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)
        OktaLogin.Logout()

    })

    it('Add Measure Observations for Ratio Measure', () => {

        MeasureGroupPage.createMeasureGroupforRatioMeasure()

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Add Denominator Observation
        cy.log('Adding Measure Observations')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('exist')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('be.visible')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).wait(1000).click()
        cy.get(MeasureGroupPage.denominatorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(0).wait(1000).click() //select ToCode
        cy.get(MeasureGroupPage.denominatorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        //Add Numerator Observation
        cy.get(MeasureGroupPage.addNumeratorObservationLink).click()
        cy.get(MeasureGroupPage.numeratorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(2).wait(1000).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.numeratorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionMaximum).click()

        //save Measure Group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()
        //navigate back to the measure group page
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //verify the saved Measure Observations
        cy.get(MeasureGroupPage.measureScoringSelect).contains('Ratio')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('ipp')
        cy.get(MeasureGroupPage.denominatorObservation).contains('ToCode')
        cy.get(MeasureGroupPage.denominatorAggregateFunction).contains('Count')
        cy.get(MeasureGroupPage.numeratorObservation).contains('isFinishedEncounter')
        cy.get(MeasureGroupPage.numeratorAggregateFunction).contains('Maximum')

    })

    it('Add Measure Observations for Continuous Variable Measure', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/CQLForTestCaseExecution.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        Utilities.setMeasureGroupType()

        cy.get(MeasureGroupPage.measureScoringSelect).click()
        cy.get(MeasureGroupPage.measureScoringCV).click()

        cy.get(MeasureGroupPage.initialPopulationSelect).click()
        cy.get(MeasureGroupPage.measurePopulationOption).eq(1).click() //select ipp

        cy.get(MeasureGroupPage.measurePopulationSelect).click()
        cy.get(MeasureGroupPage.measurePopulationOption).eq(0).click() //select denom

        cy.get(MeasureGroupPage.cvMeasureObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')

        Utilities.dropdownSelect(MeasureGroupPage.measureObservationSelect, 'ToCode')

        cy.get(MeasureGroupPage.cvAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('exist')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()
        //navigate back to the measure group page
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //verify the saved Measure Observations
        cy.get(MeasureGroupPage.measureScoringSelect).contains('Continuous Variable')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('ipp')
        cy.get(MeasureGroupPage.measurePopulationSelect).contains('denom')
        cy.get(MeasureGroupPage.cvMeasureObservation).contains('ToCode')
        cy.get(MeasureGroupPage.cvAggregateFunction).contains('Count')
    })

    it('Remove Measure Observations from Ratio Measure', () => {

        MeasureGroupPage.createMeasureGroupforRatioMeasure()

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Add Denominator Observation
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('exist')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('be.visible')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).wait(1000).click()
        cy.get(MeasureGroupPage.denominatorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(0).wait(1000).click() //select ToCode
        cy.get(MeasureGroupPage.denominatorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        //Add Numerator Observation
        cy.get(MeasureGroupPage.addNumeratorObservationLink).click()
        cy.get(MeasureGroupPage.numeratorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(2).wait(1000).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.numeratorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionMaximum).click()

        //save Measure Group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()
        //navigate back to the measure group page
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //verify the saved Measure Observations
        cy.get(MeasureGroupPage.measureScoringSelect).contains('Ratio')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('ipp')
        cy.get(MeasureGroupPage.denominatorObservation).contains('ToCode')
        cy.get(MeasureGroupPage.denominatorAggregateFunction).contains('Count')
        cy.get(MeasureGroupPage.numeratorObservation).contains('isFinishedEncounter')
        cy.get(MeasureGroupPage.numeratorAggregateFunction).contains('Maximum')

        //Remove Denominator Observation and assert
        cy.get(MeasureGroupPage.removeDenominatorObservation).click().wait(1000)
        cy.get(MeasureGroupPage.denominatorObservation).should('not.exist')
        cy.get(MeasureGroupPage.denominatorAggregateFunction).should('not.exist')

        //Remove Numerator Observation and assert
        cy.get(MeasureGroupPage.removeNumeratorObservation).click().wait(1000)
        cy.get(MeasureGroupPage.numeratorObservation).should('not.exist')
        cy.get(MeasureGroupPage.numeratorAggregateFunction).should('not.exist')

    })

    it('Verify drop down values for Measure observation aggregate function', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/CQLForTestCaseExecution.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Navigate to Measure Group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        Utilities.setMeasureGroupType()
        Utilities.dropdownSelect(MeasureGroupPage.measureScoringSelect, MeasureGroupPage.measureScoringCV)

        //Verify default value
        cy.get(MeasureGroupPage.cvAggregateFunction).should('contain', '-')

        //Verify Aggregate function dropdown values
        cy.get(MeasureGroupPage.cvAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionDropdownList).each(($ele) => {
            expect($ele.text()).to.be.oneOf(['Average', 'Count', 'Maximum', 'Median', 'Minimum', 'Sum'])
        })
    })
})

describe('Measure Observations and Stratification -- non-owner tests', () => {

    beforeEach('Create New Measure and Login', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        OktaLogin.Login()

    })

    afterEach(' Clean up and Logout', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newCqlLibraryName = CqlLibraryName + randValue

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)
        OktaLogin.Logout()

    })

    it('Non-owner of measure cannot change measure observation', () => {

        MeasureGroupPage.createMeasureGroupforRatioMeasure()

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Add Denominator Observation
        cy.log('Adding Measure Observations')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('exist')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('be.visible')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).wait(1000).click()
        cy.get(MeasureGroupPage.denominatorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(0).wait(1000).click() //select ToCode
        cy.get(MeasureGroupPage.denominatorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        //Add Numerator Observation
        cy.get(MeasureGroupPage.addNumeratorObservationLink).click()
        cy.get(MeasureGroupPage.numeratorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(2).wait(1000).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.numeratorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionMaximum).click()

        //save Measure Group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()
        //navigate back to the measure group page
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //verify the saved Measure Observations
        cy.get(MeasureGroupPage.measureScoringSelect).contains('Ratio')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('ipp')
        cy.get(MeasureGroupPage.denominatorObservation).contains('ToCode')
        cy.get(MeasureGroupPage.denominatorAggregateFunction).contains('Count')
        cy.get(MeasureGroupPage.numeratorObservation).contains('isFinishedEncounter')
        cy.get(MeasureGroupPage.numeratorAggregateFunction).contains('Maximum')

        //second / non-owner user
        OktaLogin.Logout()
        OktaLogin.AltLogin()

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()

        cy.get(MeasuresPage.allMeasuresTab).should('exist')
        cy.get(MeasuresPage.allMeasuresTab).should('be.visible')
        cy.get(MeasuresPage.allMeasuresTab).click()

        //enter edit page
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //verify that measure observation cannot be changed
        cy.get(MeasureGroupPage.denominatorObservation).should('exist')
        cy.get(MeasureGroupPage.denominatorObservation).should('be.visible')
        cy.get(MeasureGroupPage.denominatorObservation).should('not.be.enabled')

        cy.get(MeasureGroupPage.denominatorAggregateFunction).should('exist')
        cy.get(MeasureGroupPage.denominatorAggregateFunction).should('be.visible')
        cy.get(MeasureGroupPage.denominatorAggregateFunction).should('not.be.enabled')

        cy.get(MeasureGroupPage.numeratorObservation).should('exist')
        cy.get(MeasureGroupPage.numeratorObservation).should('be.visible')
        cy.get(MeasureGroupPage.numeratorObservation).should('not.be.enabled')

        cy.get(MeasureGroupPage.numeratorAggregateFunction).should('exist')
        cy.get(MeasureGroupPage.numeratorAggregateFunction).should('be.visible')
        cy.get(MeasureGroupPage.numeratorAggregateFunction).should('not.be.enabled')
    })

    it('Measure Observations and stratification cannot be changed by non-owner', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/CQLForTestCaseExecution.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()
        Utilities.setMeasureGroupType()

        cy.get(MeasureGroupPage.measureScoringSelect).click()
        cy.get(MeasureGroupPage.measureScoringCV).click()

        cy.get(MeasureGroupPage.initialPopulationSelect).click()
        cy.get(MeasureGroupPage.measurePopulationOption).eq(1).click() //select ipp

        cy.get(MeasureGroupPage.measurePopulationSelect).click()
        cy.get(MeasureGroupPage.measurePopulationOption).eq(0).click() //select denom

        cy.get(MeasureGroupPage.cvMeasureObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        Utilities.dropdownSelect(MeasureGroupPage.measureObservationSelect, 'ToCode')
        cy.get(MeasureGroupPage.cvAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('exist')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()
        //navigate back to the measure group page
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //verify the saved Measure Observations
        cy.get(MeasureGroupPage.measureScoringSelect).contains('Continuous Variable')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('ipp')
        cy.get(MeasureGroupPage.measurePopulationSelect).contains('denom')
        cy.get(MeasureGroupPage.cvMeasureObservation).contains('ToCode')
        cy.get(MeasureGroupPage.cvAggregateFunction).contains('Count')

        //second / non-owner user
        OktaLogin.Logout()
        OktaLogin.AltLogin()

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()

        cy.get(MeasuresPage.allMeasuresTab).should('exist')
        cy.get(MeasuresPage.allMeasuresTab).should('be.visible')
        cy.get(MeasuresPage.allMeasuresTab).click()

        //enter edit page
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //verify that measure observation cannot be changed
        cy.get(MeasureGroupPage.cvMeasureObservation).should('exist')
        cy.get(MeasureGroupPage.cvMeasureObservation).should('be.visible')
        cy.get(MeasureGroupPage.cvMeasureObservation).should('not.be.enabled')

        cy.get(MeasureGroupPage.cvAggregateFunction).should('exist')
        cy.get(MeasureGroupPage.cvAggregateFunction).should('be.visible')
        cy.get(MeasureGroupPage.cvAggregateFunction).should('not.be.enabled')

        //navigate to stratification tab
        cy.get(MeasureGroupPage.stratificationTab).should('exist')
        cy.get(MeasureGroupPage.stratificationTab).should('be.visible')
        cy.get(MeasureGroupPage.stratificationTab).click()

        //verify that stratification fields cannot be changed / updated
        cy.get(MeasureGroupPage.stratOne).should('not.be.enabled')

        cy.get(MeasureGroupPage.stratAssociationOne).should('not.be.enabled')

        cy.get(MeasureGroupPage.stratTwo).should('not.be.enabled')

        cy.get(MeasureGroupPage.stratAssociationTwo).should('not.be.enabled')
    })
})

describe('Measure Observation - Expected Values',  () => {

    beforeEach('Create New Measure and Login', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        OktaLogin.Login()
    })

    afterEach(' Clean up and Logout', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newCqlLibraryName = CqlLibraryName + randValue

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)
        OktaLogin.Logout()
    })

    it('Verify Expected values for Boolean Type Continuous Variable Measure Observations', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/CQLForTestCaseExecution.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        Utilities.setMeasureGroupType()

        Utilities.dropdownSelect(MeasureGroupPage.measureScoringSelect, MeasureGroupPage.measureScoringCV)

        Utilities.dropdownSelect(MeasureGroupPage.initialPopulationSelect, 'ipp')
        Utilities.dropdownSelect(MeasureGroupPage.measurePopulationSelect, 'denom')
        Utilities.dropdownSelect(MeasureGroupPage.measurePopulationExclusionSelect, 'num')

        cy.get(MeasureGroupPage.cvMeasureObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(1).wait(1000).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.cvAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('exist')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        //Navigate to Test Cases page and verify Measure Observations
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.createTestCaseDialog).should('exist')
        cy.get(TestCasesPage.createTestCaseDialog).should('be.visible')

        cy.get(TestCasesPage.createTestCaseTitleInput).should('exist')
        Utilities.waitForElementVisible(TestCasesPage.createTestCaseTitleInput, 20000)
        Utilities.waitForElementEnabled(TestCasesPage.createTestCaseTitleInput, 20000)
        cy.get(TestCasesPage.createTestCaseTitleInput).type('TestCase001')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('exist')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('be.visible')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('be.enabled')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).focus()
        cy.get(TestCasesPage.createTestCaseDescriptionInput).type('testCaseDescription')
        cy.get(TestCasesPage.createTestCaseGroupInput).should('exist')
        cy.get(TestCasesPage.createTestCaseGroupInput).should('be.visible')
        cy.get(TestCasesPage.createTestCaseGroupInput).type('testCaseSeries').type('{enter}')

        TestCasesPage.clickCreateTestCaseButton()

        TestCasesPage.clickEditforCreatedTestCase()

        //click on Expected / Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).wait(1000).should('be.checked')

        //Verify Measure Observation row is added
        cy.get(TestCasesPage.measureObservationRow).should('exist')

        //Check Measure Population Exclusion and verify Observation row goes away
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).should('exist')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).check().should('be.checked')
        cy.get(TestCasesPage.measureObservationRow).should('not.exist')

        //Uncheck Measure Population Exclusion and verify Observation row re appears
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).should('exist')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.measureObservationRow).should('exist')
    })

    it('Verify Expected values for Boolean Type Ratio Measure Observations', () => {

        MeasureGroupPage.createMeasureGroupforRatioMeasure()

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Add Denominator Observation
        cy.log('Adding Measure Observations')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('exist')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).should('be.visible')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).wait(1000).click()
        cy.get(MeasureGroupPage.denominatorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(0).wait(1000).click() //select ToCode
        cy.get(MeasureGroupPage.denominatorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        //Add Numerator Observation
        cy.get(MeasureGroupPage.addNumeratorObservationLink).click()
        cy.get(MeasureGroupPage.numeratorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).wait(1000).eq(2).wait(1000).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.numeratorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionMaximum).click()

        //save Measure Group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')

        //Navigate to Test Cases page and verify Measure Observations
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.createTestCaseDialog).should('exist')
        cy.get(TestCasesPage.createTestCaseDialog).should('be.visible')

        cy.get(TestCasesPage.createTestCaseTitleInput).should('exist')
        Utilities.waitForElementVisible(TestCasesPage.createTestCaseTitleInput, 20000)
        Utilities.waitForElementEnabled(TestCasesPage.createTestCaseTitleInput, 20000)
        cy.get(TestCasesPage.createTestCaseTitleInput).type('TestCase002')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('exist')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('be.visible')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('be.enabled')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).focus()
        cy.get(TestCasesPage.createTestCaseDescriptionInput).type('testCaseDescription')
        cy.get(TestCasesPage.createTestCaseGroupInput).should('exist')
        cy.get(TestCasesPage.createTestCaseGroupInput).should('be.visible')
        cy.get(TestCasesPage.createTestCaseGroupInput).type('testCaseSeries').type('{enter}')

        TestCasesPage.clickCreateTestCaseButton()

        TestCasesPage.clickEditforCreatedTestCase()
        //click on Expected / Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.testCaseDENOMExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseDENOMExpected).wait(1000).should('be.checked')
        cy.get(TestCasesPage.testCaseNUMERExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseNUMERExpected).wait(1000).should('be.checked')

        //Verify Numerator and Denominator Observation rows are added
        cy.get(TestCasesPage.denominatorObservationRow).should('exist')
        cy.get(TestCasesPage.numeratorObservationRow).should('exist')

        //Check Denominator Exclusion and verify Denominator Observation row goes away
        cy.get(TestCasesPage.testCaseDENEXExpected).should('exist')
        cy.get(TestCasesPage.testCaseDENEXExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseDENEXExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseDENEXExpected).check().should('be.checked')
        cy.get(TestCasesPage.denominatorObservationRow).should('not.exist')

        //Uncheck Denominator Exclusion and verify Denominator Observation row re appears
        cy.get(TestCasesPage.testCaseDENEXExpected).should('exist')
        cy.get(TestCasesPage.testCaseDENEXExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseDENEXExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseDENEXExpected).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.denominatorObservationRow).should('exist')

        //Check Numerator Exclusion and verify Numerator Observation row goes away
        cy.get(TestCasesPage.testCaseNUMEXExpected).should('exist')
        cy.get(TestCasesPage.testCaseNUMEXExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMEXExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMEXExpected).check().should('be.checked')
        cy.get(TestCasesPage.numeratorObservationRow).should('not.exist')

        //Uncheck Numerator Exclusion and verify Numerator Observation row re appears
        cy.get(TestCasesPage.testCaseNUMEXExpected).should('exist')
        cy.get(TestCasesPage.testCaseNUMEXExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMEXExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMEXExpected).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.numeratorObservationRow).should('exist')

        //Check Numerator & Denominator Exclusion and verify Numerator & Denominator Observation rows goes away
        cy.get(TestCasesPage.testCaseNUMEXExpected).check().should('be.checked')
        cy.get(TestCasesPage.testCaseDENEXExpected).check().should('be.checked')
        cy.get(TestCasesPage.denominatorObservationRow).should('not.exist')
        cy.get(TestCasesPage.numeratorObservationRow).should('not.exist')

        //Uncheck Numerator & Denominator Exclusion and verify Numerator & Denominator Observation rows re appear
        cy.get(TestCasesPage.testCaseNUMEXExpected).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.testCaseDENEXExpected).uncheck().should('not.be.checked')
        cy.get(TestCasesPage.denominatorObservationRow).should('exist')
        cy.get(TestCasesPage.numeratorObservationRow).should('exist')
    })
})

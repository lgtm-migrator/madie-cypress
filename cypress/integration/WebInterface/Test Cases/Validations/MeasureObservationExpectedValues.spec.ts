import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {Utilities} from "../../../../Shared/Utilities"
import {TestCaseJson} from "../../../../Shared/TestCaseJson"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let randValue = (Math.floor((Math.random() * 1000) + 1))
let testCaseTitle = 'Title for Auto Test'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries'
let testCaseJson = TestCaseJson.TestCaseJson_Valid
let newMeasureName = measureName + randValue
let newCqlLibraryName = CqlLibraryName + randValue

describe('Measure Observation Expected values', () => {

    beforeEach('Create Measure, Test Case and login', () => {

        randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        TestCasesPage.CreateTestCaseAPI(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson)
        OktaLogin.Login()
    })

    afterEach('Logout and Clean up Measures', () => {

        randValue = (Math.floor((Math.random() * 1000) + 1))
        newCqlLibraryName = CqlLibraryName + randValue

        OktaLogin.Logout()
        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)

    })

    it('Validate and save Measure observation for CV measure', () => {

        //Create Continuous variable measure group
        MeasureGroupPage.createMeasureGroupforContinuousVariableMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()

        //click on Expected/Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).wait(1000).should('be.checked')

        //Validate measure observation expected values
        cy.get(TestCasesPage.measureObservationRow).clear().type('@#')
        cy.get(TestCasesPage.measureObservationExpectedValueError).should('contain.text', 'Only positive numeric values can be entered in the expected values')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.disabled')
        cy.get(TestCasesPage.measureObservationRow).clear().type('ab12')
        cy.get(TestCasesPage.measureObservationExpectedValueError).should('contain.text', 'Only positive numeric values can be entered in the expected values')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.disabled')
        cy.get(TestCasesPage.measureObservationRow).clear().type('-15')
        cy.get(TestCasesPage.measureObservationExpectedValueError).should('contain.text', 'Only positive numeric values can be entered in the expected values')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.disabled')

        //Save measure observation expected values
        cy.get(TestCasesPage.measureObservationRow).clear().type('1.3')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.detailsTab).click()
        cy.get(TestCasesPage.confirmationMsg).should('contain.text', 'An error occurred with the Test Case JSON while updating the test case')

        //Assert saved observation values
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.measureObservationRow).should('contain.value', '1.3')
    })

    it('Validate and save Measure observation for Ratio measure', () => {

        //Create Ratio measure group
        MeasureGroupPage.createMeasureGroupforRatioMeasure()
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //Select null values for Denominator & Numerator Exclusion
        cy.get(MeasureGroupPage.denominatorExclusionSelect).click()
        cy.get('.MuiList-root > [data-value=""]').click()
        cy.get(MeasureGroupPage.numeratorExclusionSelect).click()
        cy.get('.MuiList-root > [data-value=""]').click()

        //Add Denominator Observation
        cy.log('Adding Measure Observations')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).wait(1000).click()
        cy.get(MeasureGroupPage.denominatorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).eq(0).click() //select ToCode
        cy.get(MeasureGroupPage.denominatorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        //Add Numerator Observation
        cy.get(MeasureGroupPage.addNumeratorObservationLink).click()
        cy.get(MeasureGroupPage.numeratorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).eq(2).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.numeratorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionMaximum).click()

        //save Measure Group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()

        //click on Expected/Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.testCaseDENOMExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseDENOMExpected).wait(1000).should('be.checked')
        cy.get(TestCasesPage.testCaseNUMERExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseNUMERExpected).wait(1000).should('be.checked')

        //Validate measure observation expected values
        cy.get(TestCasesPage.denominatorObservationRow).type('@#')
        cy.get(TestCasesPage.denominatorObservationExpectedValueError).should('contain.text', 'Only positive numeric values can be entered in the expected values')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.disabled')
        cy.get(TestCasesPage.numeratorObservationRow).type('ab12')
        cy.get(TestCasesPage.numeratorObservationExpectedValueError).should('contain.text', 'Only positive numeric values can be entered in the expected values')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.disabled')
        cy.get(TestCasesPage.numeratorObservationRow).type('-15')
        cy.get(TestCasesPage.numeratorObservationExpectedValueError).should('contain.text', 'Only positive numeric values can be entered in the expected values')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.disabled')

        //Save measure observation expected values
        cy.get(TestCasesPage.denominatorObservationRow).clear().type('1.3')
        cy.get(TestCasesPage.numeratorObservationRow).clear().type('5')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        //Assert saved observation values
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.denominatorObservationRow).should('contain.value', '1.3')
        cy.get(TestCasesPage.numeratorObservationRow).should('contain.value', '5')
    })

    it('Verify Expected / Actual page dirty check for Measure Observations', () => {

        //Create Continuous variable measure group
        MeasureGroupPage.createMeasureGroupforContinuousVariableMeasure()

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()

        //click on Expected/Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).wait(1000).check()
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).wait(1000).should('be.checked')

        //Enter value in to Measure observation Expected values
        cy.get(TestCasesPage.measureObservationRow).type('1.3')

        //attempt to navigate away from the test case page
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //verify that the discard modal appears
        cy.get(MeasureGroupPage.discardChangesConfirmationModal).should('exist')
        cy.get(MeasureGroupPage.discardChangesConfirmationModal).should('be.visible')
        cy.get(MeasureGroupPage.continueDiscardChangesBtn).should('exist')
        cy.get(MeasureGroupPage.continueDiscardChangesBtn).should('be.visible')
        cy.get(MeasureGroupPage.continueDiscardChangesBtn).should('be.enabled')
        cy.get(MeasureGroupPage.continueDiscardChangesBtn).click()

    })
})

describe('Measure observation expected result', () => {

    beforeEach('Create Measure, Test Case and login', () => {

        randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        TestCasesPage.CreateTestCaseAPI(testCaseTitle, testCaseDescription, testCaseSeries, testCaseJson)
        OktaLogin.Login()
    })

    afterEach('Logout and Clean up Measures', () => {

        randValue = (Math.floor((Math.random() * 1000) + 1))
        newCqlLibraryName = CqlLibraryName + randValue

        OktaLogin.Logout()
        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)

    })

    it('Verify Measure Observation expected result for CV measure', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/CQLForFluentFunction.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents, {delay: 50})
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        Utilities.setMeasureGroupType()

        cy.get(MeasureGroupPage.popBasis).should('exist')
        cy.get(MeasureGroupPage.popBasis).should('be.visible')
        cy.get(MeasureGroupPage.popBasis).click()
        cy.get(MeasureGroupPage.popBasis).type('Encounter')
        cy.get(MeasureGroupPage.popBasisOption).click()

        Utilities.dropdownSelect(MeasureGroupPage.measureScoringSelect, MeasureGroupPage.measureScoringCV)
        Utilities.dropdownSelect(MeasureGroupPage.initialPopulationSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.measurePopulationSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.measurePopulationExclusionSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.cvMeasureObservation, 'isFinishedEncounter')
        Utilities.dropdownSelect(MeasureGroupPage.cvAggregateFunction, 'Maximum')

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()

        //click on Expected/Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        //Enter values in to Measure population(MP) & Measure population exclusion(MPE) fields and verify MP-MPE = number of observation rows
        cy.get(TestCasesPage.testCaseMSRPOPLExpected).type('5')
        cy.get(TestCasesPage.testCaseMSRPOPLEXExpected).type('1')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Measure Observation 1')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Measure Observation 2')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Measure Observation 3')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Measure Observation 4')

    })

    it('Verify Measure Observation expected result for Ratio measure', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.readFile('cypress/fixtures/CQLForFluentFunction.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        Utilities.setMeasureGroupType()

        cy.get(MeasureGroupPage.popBasis).should('exist')
        cy.get(MeasureGroupPage.popBasis).should('be.visible')
        cy.get(MeasureGroupPage.popBasis).click()
        cy.get(MeasureGroupPage.popBasis).type('Encounter')
        cy.get(MeasureGroupPage.popBasisOption).click()

        Utilities.dropdownSelect(MeasureGroupPage.measureScoringSelect, MeasureGroupPage.measureScoringRatio)

        Utilities.dropdownSelect(MeasureGroupPage.initialPopulationSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.denominatorSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.denominatorExclusionSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.numeratorSelect, 'Qualifying Encounters')
        Utilities.dropdownSelect(MeasureGroupPage.numeratorExclusionSelect, 'Qualifying Encounters')

        //Add Denominator Observation
        cy.log('Adding Measure Observations')
        cy.get(MeasureGroupPage.addDenominatorObservationLink).wait(1000).click()
        cy.get(MeasureGroupPage.denominatorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).eq(0).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.denominatorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionCount).click()

        //Add Numerator Observation
        cy.get(MeasureGroupPage.addNumeratorObservationLink).click()
        cy.get(MeasureGroupPage.numeratorObservation).click()
        cy.get(MeasureGroupPage.measureObservationSelect).should('exist')
        cy.get(MeasureGroupPage.measureObservationSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureObservationSelect).eq(0).click() //select isFinishedEncounter
        cy.get(MeasureGroupPage.numeratorAggregateFunction).click()
        cy.get(MeasureGroupPage.aggregateFunctionMaximum).click()

        //save Measure Group
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')


        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).click()
        TestCasesPage.clickEditforCreatedTestCase()

        //click on Expected/Actual tab
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist')
        cy.get(TestCasesPage.tctExpectedActualSubTab).should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        //Enter values in to Denominator & Denominator exclusion(DE) fields and verify Denominator-DE = number of Denominator observation rows
        cy.get(TestCasesPage.testCaseDENOMExpected).type('4')
        cy.get(TestCasesPage.testCaseDENEXExpected).type('1')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Denominator Observation 1')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Denominator Observation 2')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Denominator Observation 3')

        //Enter values in to Numerator & Numerator exclusion(NE) fields and verify Denominator-NE = number of Numerator observation rows
        cy.get(TestCasesPage.testCaseNUMERExpected).type('4')
        cy.get(TestCasesPage.testCaseNUMEXExpected).type('1')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Numerator Observation 1')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Numerator Observation 2')
        cy.get(TestCasesPage.testCasePopulationValuesTable).should('contain.text', 'Numerator Observation 3')
    })
})

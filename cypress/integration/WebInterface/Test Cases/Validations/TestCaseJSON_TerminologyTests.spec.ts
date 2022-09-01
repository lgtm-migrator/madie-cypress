import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {TestCaseJson} from "../../../../Shared/TestCaseJson"
import {Utilities} from "../../../../Shared/Utilities"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"

let measureName = 'TestMeasure' + Date.now()
let newMeasureName = ''
let newCqlLibraryName
let CqlLibraryName = 'TestLibrary' + Date.now()

let testCaseTitle = 'test case title'
let testCaseDescription = 'DENOMFail' + Date.now()
let validTerminologyFHIR_and_QICORETestCaseJson = TestCaseJson.validTestCaseJsonFHIR_and_QICORE
let invalidTerminologyFHIR_and_QICOREEntireEntryBlockTestCaseJson = TestCaseJson.invalidTestCaseJsonFHIR_and_QICORE
let invalidTerminologyFHIR_and_QICOREStatusTestCaseJson = TestCaseJson.invalidTestCaseJsonFHIR_and_QICORE_Status
let invalidTerminologyFHIR_and_QICOREMDatesTestCaseJson = TestCaseJson.invalidTestCaseJsonFHIR_and_QICORE_MDates
let validTerminologyQICoreTestCaseJson = TestCaseJson.validTestCaseJsonQICOre
let invalidTerminologyQICoreEntireEncounterBlockTestCaseJson = TestCaseJson.invalidTestCaseJsonQICore
let invalidTerminologyQICoreStatusTestCaseJson = TestCaseJson.invalidTestCaseJsonQICore_status
let invalidTerminologyQICoreMDatesTestCaseJson = TestCaseJson.invalidTestCaseJsonQICore_MDates
let testCaseSeries = 'SBTestSeries'

describe('Test Case JSON / terminology tests: Negative tests -- Test Case JSON does not use value set(s)', () => {
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

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)

    })
    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- missing entire Encounter block -- FHIR', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        Utilities.dropdownSelect(MeasureGroupPage.measureScoringSelect, MeasureGroupPage.measureScoringProportion)
        Utilities.dropdownSelect(MeasureGroupPage.initialPopulationSelect, 'ipp')

        Utilities.dropdownSelect(MeasureGroupPage.denominatorSelect, 'denom')

        Utilities.dropdownSelect(MeasureGroupPage.numeratorSelect, 'num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREEntireEntryBlockTestCaseJson, true)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCaseExpected_Actual_table_tbl).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n')

    })
     //skipping test due to bug MAT-4631
     it.skip('Test Case JSON improper use of / invalid value set(s) -- Encounter in wrong status -- FHIR', () =>{
        //Click on Edit Button
         MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('ipp')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('denom')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREStatusTestCaseJson, true)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineFour).should('contain.text', '\ndefine "num":\n\n  exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n')

    })
    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- Test Case JSON using wrong dates -- FHIR', () =>{
        //Click on Edit Button
         MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('ipp')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('denom')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREMDatesTestCaseJson, true)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n')

    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- missing entire Encounter block -- FHIR based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRbasedQICoreTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('num')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('num')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREEntireEntryBlockTestCaseJson, true)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')
        
        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n')

    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- Encounter in wrong status -- FHIR based QICore', () =>{
        //Click on Edit Button
         MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRbasedQICoreTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('num')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('num')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREStatusTestCaseJson, true)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n')

    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- missing entire Encounter block -- QICore based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).should('exist')
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLQICoreTermTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).should('exist')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Initial Population')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('Denominator')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('Numerator')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyQICoreEntireEncounterBlockTestCaseJson, true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).click()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "Qualifying Encounters":\n  (\n    [Encounter: "Office Visit"]\n          union [Encounter: "Annual Wellness Visit"]\n  ) ValidEncounter\n        where ValidEncounter.period during "Measurement Period"\n            and ValidEncounter.status  = \'finished\'\n')
        cy.get(TestCasesPage.testCalculationResultsLineThree).should('contain.text', '\ndefine "Initial Population":\n  exists "Qualifying Encounters"\n')
    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- Encounter in wrong status -- QICore based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).should('exist')
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLQICoreTermTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).should('exist')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Initial Population')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('Denominator')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('Numerator')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyQICoreStatusTestCaseJson, true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).click()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "Qualifying Encounters":\n  (\n    [Encounter: "Office Visit"]\n          union [Encounter: "Annual Wellness Visit"]\n  ) ValidEncounter\n        where ValidEncounter.period during "Measurement Period"\n            and ValidEncounter.status  = \'finished\'\n')
        cy.get(TestCasesPage.testCalculationResultsLineThree).should('contain.text', '\ndefine "Initial Population":\n  exists "Qualifying Encounters"\n')
    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON improper use of / invalid value set(s) -- Test Case JSON using wrong dates -- QICore based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).should('exist')
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLQICoreTermTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).should('exist')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Initial Population')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('Denominator')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('Numerator')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyQICoreMDatesTestCaseJson, true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).click()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "Qualifying Encounters":\n  (\n    [Encounter: "Office Visit"]\n          union [Encounter: "Annual Wellness Visit"]\n  ) ValidEncounter\n        where ValidEncounter.period during "Measurement Period"\n            and ValidEncounter.status  = \'finished\'\n')
        cy.get(TestCasesPage.testCalculationResultsLineThree).should('contain.text', '\ndefine "Initial Population":\n  exists "Qualifying Encounters"\n')
    })
})

describe('Test Case JSON / terminology tests: positive tests -- Test Case JSON uses value set(s)', () => {
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

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)
    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON proper use of value set(s) -- QICore based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).should('exist')
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLQICoreTermTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).should('exist')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Initial Population')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('Denominator')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('Numerator')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTerminologyQICoreTestCaseJson, true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).click()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "Qualifying Encounters":\n  (\n    [Encounter: "Office Visit"]\n          union [Encounter: "Annual Wellness Visit"]\n  ) ValidEncounter\n        where ValidEncounter.period during "Measurement Period"\n            and ValidEncounter.status  = \'finished\'\n')
        cy.get(TestCasesPage.testCalculationResultsLineFour).should('contain.text', '\ndefine "Denominator":\n  "Initial Population"\n')
        cy.get(TestCasesPage.testCalculationResultsLineFive).should('contain.text', '\ndefine "Numerator":\n  Patient.gender = \'female\'\n      and exists "Qualifying Encounters"\n')

    })
    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON proper use of value set(s) -- FHIR', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).should('exist')
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).should('exist')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('ipp')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('denom')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTerminologyFHIR_and_QICORETestCaseJson, true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).click()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n')
    })

    //skipping test due to bug MAT-4631
    it.skip('Test Case JSON proper use of value set(s) -- FHIR based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).should('exist')
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRbasedQICoreTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).should('exist')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })

        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //select a group type
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).should('exist')
                cy.wrap($ele).focus()
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).should('exist').invoke('click')        

        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')
        

        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('num')


        cy.get(MeasureGroupPage.denominatorSelect).should('be.visible')
        cy.get(MeasureGroupPage.denominatorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.denominatorSelect).select('num')

        cy.get(MeasureGroupPage.numeratorSelect).should('be.visible')
        cy.get(MeasureGroupPage.numeratorSelect).should('be.enabled')
        cy.get(MeasureGroupPage.numeratorSelect).select('num')
        
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTerminologyFHIR_and_QICORETestCaseJson, true)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.testCaseIPPCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPCheckBox).click()
        cy.get(TestCasesPage.testCaseIPPCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).click()
        cy.get(TestCasesPage.testCaseNUMERCheckBox).check().should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMCheckBox).should('exist')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERCheckBox).should('be.checked')

        cy.get(TestCasesPage.cuTestCaseButton).should('exist')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.cuTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.cuTestCaseButton).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        cy.get(TestCasesPage.testCalculationResults).should('contain', 'Population Group: population-group-1')

        cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n')
    })
})

import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {TestCaseJson} from "../../../../Shared/TestCaseJson"
import {Utilities} from "../../../../Shared/Utilities"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {MeasureCQL} from "../../../../Shared/MeasureCQL"

let measureName = 'TestMeasure' + Date.now()
let newMeasureName = ''
let newCqlLibraryName
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureCQL = MeasureCQL.CQL_Multiple_Populations

let testCaseTitle = 'test case title'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries'
let validTerminologyFHIR_and_QICORETestCaseJson = TestCaseJson.validTestCaseJsonFHIR_and_QICORE
let invalidTerminologyFHIR_and_QICOREEntireEntryBlockTestCaseJson = TestCaseJson.invalidTestCaseJsonFHIR_and_QICORE
let invalidTerminologyFHIR_and_QICOREStatusTestCaseJson = TestCaseJson.invalidTestCaseJsonFHIR_and_QICORE_Status
let invalidTerminologyFHIR_and_QICOREMDatesTestCaseJson = TestCaseJson.invalidTestCaseJsonFHIR_and_QICORE_MDates

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
    it('Test Case JSON improper use of / invalid value set(s) -- missing entire Encounter block -- FHIR', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'ipp', 'denom', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREEntireEntryBlockTestCaseJson)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid + '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n')
        })
    })
     it('Test Case JSON improper use of / invalid value set(s) -- Encounter in wrong status -- FHIR', () =>{
        //Click on Edit Button
         MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'ipp', 'denom', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        //Create Measure Group
        cy.get(EditMeasurePage.measureGroupsTab).click()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREStatusTestCaseJson)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

         cy.get(TestCasesPage.tcHighlightingTab).should('exist')
         cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
         cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

         //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')
        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid /* + '\ndefine "ipp":\n\n exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n\ndefine function ToDateTime(value dateTime): value.value\n' */)
        })

    })
    it('Test Case JSON improper use of / invalid value set(s) -- Test Case JSON using wrong dates -- FHIR', () =>{
        //Click on Edit Button
         MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'ipp', 'denom', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREMDatesTestCaseJson)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()        

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')
        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid /* + '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n' */)
        })

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n')

    })
    it('Test Case JSON improper use of / invalid value set(s) -- missing entire Encounter block -- FHIR based QICore', () =>{
        //Click on Edit Button
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRbasedQICoreTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'num', 'num', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREEntireEntryBlockTestCaseJson)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()         

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid /* + '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n' */)
        })
        
        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n')

    })
    it('Test Case JSON improper use of / invalid value set(s) -- Encounter in wrong status -- FHIR based QICore', () =>{
        //Click on Edit Button
         MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        
        cy.readFile('cypress/fixtures/CQLFHIRbasedQICoreTerminologyTest.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'num', 'num', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, invalidTerminologyFHIR_and_QICOREStatusTestCaseJson)
        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid /* + '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n' */)
        })
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

    it('Test Case JSON proper use of value set(s) -- FHIR', () =>{
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
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'ipp', 'denom', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTerminologyFHIR_and_QICORETestCaseJson)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()        

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERExpected).should('exist')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseNUMERExpected).check()
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMExpected).should('exist')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid /* + '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n' */)
        })

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', '\ndefine "ipp":\n\n  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period"\n')
    })

    it('Test Case JSON proper use of value set(s) -- FHIR based QICore', () =>{
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
        cy.wait(4500)

        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'num', 'num', 'num', 'Boolean')
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()

        TestCasesPage.createTestCase(testCaseTitle, testCaseDescription, testCaseSeries, validTerminologyFHIR_and_QICORETestCaseJson)

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.tctExpectedActualSubTab).should('exist').should('be.visible')
        cy.get(TestCasesPage.tctExpectedActualSubTab).click()         

        cy.get(TestCasesPage.testCaseIPPExpected).should('exist')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseIPPExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseIPPExpected).check()
        cy.get(TestCasesPage.testCaseIPPExpected).should('be.checked')

        cy.get(TestCasesPage.testCaseNUMERExpected).should('exist')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERExpected).click()
        cy.wait(500)
        cy.get(TestCasesPage.testCaseNUMERExpected).check()
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.checked')

        cy.get(TestCasesPage.testCaseDENOMExpected).should('exist')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.visible')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.enabled')
        cy.get(TestCasesPage.testCaseNUMERExpected).should('be.checked')

        cy.get(TestCasesPage.editTestCaseSaveButton).should('exist')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.visible')
        cy.get(TestCasesPage.editTestCaseSaveButton).should('be.enabled')
        cy.get(TestCasesPage.editTestCaseSaveButton).click()

        cy.get(TestCasesPage.tcHighlightingTab).should('exist')
        cy.get(TestCasesPage.tcHighlightingTab).should('be.visible')
        cy.get(TestCasesPage.tcHighlightingTab).click()

        cy.get(TestCasesPage.runTestButton).should('be.visible')
        cy.get(TestCasesPage.runTestButton).should('be.enabled')
        cy.get(TestCasesPage.runTestButton).click()

        //cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Measure Group 1 - (Proportion)')

        cy.readFile('cypress/fixtures/groupId').should('exist').then((groupid) => {
            cy.get(TestCasesPage.testCalculationResults).should('contain.text', 'Population Group: ' + groupid /* + '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n' */)
        })

        //cy.get(TestCasesPage.testCalculationResultsLineTwo).should('contain.text', '\ndefine "num":\n    exists ["Encounter": "Office Visit"] E where E.status ~ \'finished\'\n')
    })
})

describe('Warning modal on Test Case JSON Editor', () => {

    beforeEach('Create measure and login', () => {

        CqlLibraryName = 'TestLibrary5' + Date.now()

        CreateMeasurePage.CreateAPIQICoreMeasureWithCQL(measureName, CqlLibraryName, measureCQL)
        OktaLogin.Login()
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.wait(4500)
        OktaLogin.Logout()
        MeasureGroupPage.CreateProportionMeasureGroupAPI(false, false, 'Initial Population', 'Initial Population', 'Initial Population', 'Boolean')
        OktaLogin.Login()
    })

    afterEach('Logout and Clean up Measures', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        let newCqlLibraryName = CqlLibraryName + randValue

        OktaLogin.Logout()
        Utilities.deleteMeasure(measureName, newCqlLibraryName)
    })

    it('Verify warning modal when the Test Case JSON has unsaved changes', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Navigate to Test Cases page and create Test case
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.newTestCaseButton).should('be.visible')
        cy.get(TestCasesPage.newTestCaseButton).should('be.enabled')
        cy.get(TestCasesPage.newTestCaseButton).click()

        cy.get(TestCasesPage.createTestCaseDialog).should('exist')
        cy.get(TestCasesPage.createTestCaseDialog).should('be.visible')

        cy.get(TestCasesPage.createTestCaseTitleInput).should('exist')
        Utilities.waitForElementVisible(TestCasesPage.createTestCaseTitleInput, 20000)
        Utilities.waitForElementEnabled(TestCasesPage.createTestCaseTitleInput, 20000)
        cy.get(TestCasesPage.createTestCaseTitleInput).type(testCaseTitle.toString())
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('exist')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('be.visible')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).should('be.enabled')
        cy.get(TestCasesPage.createTestCaseDescriptionInput).focus()
        cy.get(TestCasesPage.createTestCaseDescriptionInput).type(testCaseDescription)
        cy.get(TestCasesPage.createTestCaseGroupInput).should('exist')
        cy.get(TestCasesPage.createTestCaseGroupInput).should('be.visible')
        cy.get(TestCasesPage.createTestCaseGroupInput).type(testCaseSeries).type('{enter}')

        TestCasesPage.clickCreateTestCaseButton()

        TestCasesPage.clickEditforCreatedTestCase()

        cy.get(TestCasesPage.aceEditor).type('Warning Modal Test')

        //Warning Modal displayed when user navigated to Measure Group tab without saving changes
        cy.get(EditMeasurePage.measureGroupsTab).click()
        cy.get(TestCasesPage.discardChangesConfirmationModal).should('contain.text', 'Discard Changes?')
        cy.get(TestCasesPage.discardChangesConfirmationText).should('contain.text', 'Are you sure you want to discard your changes?')
        cy.get(TestCasesPage.discardChangesCancelBtn).click()

        //Click on details tab & the warning modal should not display
        cy.get(TestCasesPage.detailsTab).click()
        cy.get(TestCasesPage.discardChangesConfirmationModal).should('not.exist')

        //Click on Test Cases tab and discard all changes
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(TestCasesPage.continueDiscardChangesBtn).click()
        cy.get(TestCasesPage.newTestCaseButton).should('exist')

    })
})
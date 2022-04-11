import {Header} from "../../../../Shared/Header"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {Utilities} from "../../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoringArray = ['Ratio', 'Cohort', 'Continuous Variable', 'Proportion']


describe('Validate Measure Group', () => {

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

    it('All population selections are saved to the database', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Measure group description
        cy.get(MeasureGroupPage.measureGroupDescriptionBox).type('MeasureGroup Description value')
            
        for (let i in measureScoringArray){
            //log, in cypress, the measure score value
            cy.log((measureScoringArray[i].valueOf()).toString())
            //select scoring unit on measure
            cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[i].valueOf()).toString())
            //based on the scoring unit value, select a value for all population fields
            Utilities.validationMeasureGroupSaveAll((measureScoringArray[i].valueOf()).toString())                
            //save measure group
            cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
            //validation message after attempting to save
            cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
            cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg)
                .then(($message) => {
                    if ($message.text() == 'This change will reset the population scoring value in test cases. Are you sure you wanted to continue with this? UpdateCancel') {
                        cy.get(MeasureGroupPage.confirmScoreUnitValueUpdateBtn).click()
                        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')
                    }
                    else if ( $message.text() != 'This change will reset the population scoring value in test cases. Are you sure you wanted to continue with this? UpdateCancel') {
                        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')
                    }
               })
        }
        //navigate back to main measure page
        cy.get(Header.mainMadiePageButton).click()

    })

    it('Validate that required populations have to have a selected value before measure group can be saved', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Measure group description
        cy.get(MeasureGroupPage.measureGroupDescriptionBox).type('MeasureGroup Description value')
                    
        for (let i in measureScoringArray){
            //log, in cypress, the measure score value
            cy.log((measureScoringArray[i].valueOf()).toString())
            //select scoring unit on measure
            cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[i].valueOf()).toString())
            //based on the scoring unit value, select a value for all population fields
            Utilities.validationMeasureGroupSaveWithoutRequired((measureScoringArray[i].valueOf()).toString())                
            //save measure group button is not enabled
            cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.disabled')
        }
        //navigate back to main measure page
        cy.get(Header.mainMadiePageButton).click()

    })

    it('Validate that non-required populations do not need to be selected before saving', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //navigate to CQL Editor page / tab
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //read and write CQL from flat file
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry.txt').should('exist').then((fileContents) => {
            cy.get(EditMeasurePage.cqlEditorTextBox).type(fileContents)
        })
        //save CQL on measure
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //Measure group description
        cy.get(MeasureGroupPage.measureGroupDescriptionBox).type('MeasureGroup Description value')
                    
        for (let i in measureScoringArray){
            //log, in cypress, the measure score value
            cy.log((measureScoringArray[i].valueOf()).toString())
            //select scoring unit on measure
            cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[i].valueOf()).toString())
            //based on the scoring unit value, select a value for all population fields
            Utilities.validationMeasureGroupSaveWithoutOptional((measureScoringArray[i].valueOf()).toString())
            if ((measureScoringArray[i].valueOf()).toString() == 'Cohort') {
                //save measure group button is not enabled
                cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.disabled')
            }
            else {
                cy.wait(1000)
                //save measure group
                cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
                //validation message after attempting to save
                cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
                cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg)
                    .then(($message) => {
                        if ($message.text() == 'This change will reset the population scoring value in test cases. Are you sure you wanted to continue with this? UpdateCancel') {
                            cy.get(MeasureGroupPage.confirmScoreUnitValueUpdateBtn).click()
                            cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group updated successfully.')
                        }
                        else if ( $message.text() != 'This change will reset the population scoring value in test cases. Are you sure you wanted to continue with this? UpdateCancel') {
                            cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')
                        }
                    })

                } 
        }
        //navigate back to main measure page
        cy.get(Header.mainMadiePageButton).click()

    })
})
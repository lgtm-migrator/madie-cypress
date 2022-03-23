import {Header} from "../../../../Shared/Header"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoringArray = ['Ratio', 'Cohort', 'Continuous Variable', 'Proportion']
let randValue = (Math.floor((Math.random() * 1000) + 1))
let newMeasureName = measureName + randValue
let newCqlLibraryName = CqlLibraryName + randValue

describe('Validate Measure Group', () => {

/*     before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName, (measureScoringArray[i].valueOf()).toString())

    }) */
/*     beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Login', () => {

        OktaLogin.Logout()

    }) */

    it('All population values are saved to the database', () => {

/*         //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click() */
        
        for (let i in measureScoringArray){
            cy.wait(7000)
            OktaLogin.Login()
            //Create New Measure
            let randValue = (Math.floor((Math.random() * 1000) + 1))
            let newMeasureName = measureName + randValue
            let newCqlLibraryName = CqlLibraryName + randValue
            CreateMeasurePage.CreateQICoreMeasure(newMeasureName, newCqlLibraryName, (measureScoringArray[i].valueOf()).toString())
            //log, in cypress, the measure score value
            cy.log((measureScoringArray[i].valueOf()).toString())
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
            //select scoring unit on measure
            cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[i].valueOf()).toString())
            switch ((measureScoringArray[i].valueOf()).toString()){
                case "Ratio": {
                    //verify the correct populations are displayed and not displayed
                    cy.get(MeasureGroupPage.initialPopulationSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorExclusionSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorExceptionSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.numeratorSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.numeratorExclusionSelect)
                        .should('be.visible')
                    cy.get(Header.mainMadiePageButton).click()
                    cy.wait(7000)
                    OktaLogin.Logout()
                    break
                }
                case 'Proportion': {
                    //verify the correct populations are displayed and not displayed
                    cy.get(MeasureGroupPage.initialPopulationSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorExclusionSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorExceptionSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.numeratorSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.numeratorExclusionSelect)
                        .should('be.visible')
                    cy.get(Header.mainMadiePageButton).click()
                    cy.wait(7000)
                    OktaLogin.Logout()
                    break
                }
                case 'Continuous Variable': {
                    //verify the correct populations are displayed and not displayed
                    cy.get(MeasureGroupPage.initialPopulationSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorExclusionSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorExceptionSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.numeratorSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.numeratorExclusionSelect)
                        .should('not.exist')
                    cy.get(Header.mainMadiePageButton).click()
                    cy.wait(7000)
                    OktaLogin.Logout()
                    break
                }
                case 'Cohort': {
                    //verify the correct populations are displayed and not displayed
                    cy.get(MeasureGroupPage.initialPopulationSelect)
                        .should('be.visible')
                    cy.get(MeasureGroupPage.denominatorSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.denominatorExclusionSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.denominatorExceptionSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.numeratorSelect)
                        .should('not.exist')
                    cy.get(MeasureGroupPage.numeratorExclusionSelect)
                        .should('not.exist')
                    cy.get(Header.mainMadiePageButton).click()
                    cy.wait(7000)
                    OktaLogin.Logout()
                    break

                }
                
            }
        }

    })

    it('Validate that required populations have to indicated before measure group can be saved', () => {


    })

    it('Validate that non-required populations do not need to be selected before saving', () => {


    })
})
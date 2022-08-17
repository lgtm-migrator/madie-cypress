import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {Utilities} from "../../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName1 = 'TestLibrary' + Date.now()
let measureScoringArray = ['Ratio', 'Cohort', 'Continuous Variable', 'Proportion']
let mgPVTestType = ['all', 'wOReq', 'wOOpt']

describe('Validate Measure Group additions', () => {

    before('Create measure', () => {
        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName1)

    })

    beforeEach('Login', () => {

        OktaLogin.Login()

    })

    afterEach('Login', () => {

        OktaLogin.Logout()

    })

    after('Clean up', () => {

        Utilities.deleteMeasure(measureName, CqlLibraryName1)

    })

    it('Able to add complete group to a measure whom already has a group and previous group is not affected', () => {

        //click on Edit button to edit measure
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
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        cy.log((measureScoringArray[3].valueOf()).toString())
        //select scoring unit on measure
        cy.get(MeasureGroupPage.measureScoringSelect).select((measureScoringArray[3].valueOf()).toString())
        Utilities.validateMeasureGroup((measureScoringArray[3].valueOf()).toString(), mgPVTestType[0])

        //Click on the measure group tab
        // cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        // cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        // cy.get(EditMeasurePage.measureGroupsTab).click()

        cy.get(MeasureGroupPage.addMeasureGroupButton).should('be.visible')
        cy.get(MeasureGroupPage.addMeasureGroupButton).click()

        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).click({force:true})

        cy.get(MeasureGroupPage.measureScoringSelect).should('exist')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Cohort')

        cy.get(MeasureGroupPage.initialPopulationSelect).should('exist')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Pap Test with Results')

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('exist')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        cy.get(MeasureGroupPage.measureGroupOne).should('exist')
        cy.get(MeasureGroupPage.measureGroupOne).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupOne).click()

        cy.get(MeasureGroupPage.measureScoringSelect).contains('Proportion')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('SDE Payer')
        cy.get(MeasureGroupPage.denominatorSelect).contains('SDE Sex')
        cy.get(MeasureGroupPage.denominatorExclusionSelect).contains('Absence of Cervix')
        cy.get(MeasureGroupPage.denominatorExceptionSelect).contains('SDE Ethnicity')
        cy.get(MeasureGroupPage.numeratorSelect).contains('SDE Race')
        cy.get(MeasureGroupPage.numeratorExclusionSelect).contains('Surgical Absence of Cervix')

        cy.get(MeasureGroupPage.measureGroupTwo).should('exist')
        cy.get(MeasureGroupPage.measureGroupTwo).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTwo).click()

        cy.get(MeasureGroupPage.measureScoringSelect).contains('Cohort')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('Pap Test with Results')

    })

    it('Ensure numbering of groups is updated when group is created and saved out of sequential order', () => {

        //click on Edit button to edit measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).should('exist')
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        for (let i = 1; i <= 4; i++){
            cy.get(MeasureGroupPage.addMeasureGroupButton).should('be.visible')
            cy.get(MeasureGroupPage.addMeasureGroupButton).click()
        }

        cy.get(MeasureGroupPage.measureGroupOne).should('exist')
        cy.get(MeasureGroupPage.measureGroupOne).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTwo).should('exist')
        cy.get(MeasureGroupPage.measureGroupTwo).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupThree).should('exist')
        cy.get(MeasureGroupPage.measureGroupThree).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupFour).should('exist')
        cy.get(MeasureGroupPage.measureGroupFour).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupFive).should('exist')
        cy.get(MeasureGroupPage.measureGroupFive).should('be.visible')

        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).click({force:true})

        cy.get(MeasureGroupPage.measureScoringSelect).should('exist')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureScoringSelect).should('be.enabled')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Cohort')

        cy.get(MeasureGroupPage.initialPopulationSelect).should('exist')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.visible')
        cy.get(MeasureGroupPage.initialPopulationSelect).should('be.enabled')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Pap Test with Results')

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('exist')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        cy.get(MeasureGroupPage.measureGroupOne).should('exist')
        cy.get(MeasureGroupPage.measureGroupOne).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupOne).click()

        cy.get(MeasureGroupPage.measureScoringSelect).contains('Proportion')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('SDE Payer')
        cy.get(MeasureGroupPage.denominatorSelect).contains('SDE Sex')
        cy.get(MeasureGroupPage.denominatorExclusionSelect).contains('Absence of Cervix')
        cy.get(MeasureGroupPage.denominatorExceptionSelect).contains('SDE Ethnicity')
        cy.get(MeasureGroupPage.numeratorSelect).contains('SDE Race')
        cy.get(MeasureGroupPage.numeratorExclusionSelect).contains('Surgical Absence of Cervix')

        cy.get(MeasureGroupPage.measureGroupTwo).should('exist')
        cy.get(MeasureGroupPage.measureGroupTwo).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTwo).click()

        cy.get(MeasureGroupPage.measureScoringSelect).contains('Cohort')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('Pap Test with Results')

        cy.get(MeasureGroupPage.measureGroupFour).should('not.exist')

        cy.get(MeasureGroupPage.measureGroupFive).should('not.exist')

    })
})
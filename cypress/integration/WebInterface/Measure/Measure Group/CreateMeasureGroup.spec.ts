import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
import {Utilities} from "../../../../Shared/Utilities"
import {Header} from "../../../../Shared/Header"
let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = MeasureGroupPage.measureScoringUnit

describe('Validate Measure Group', () => {

    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

    })
    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Login', () => {

        OktaLogin.Logout()

    })

    it('Verify default values in Measure Group page', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //get current value what is in the scoring box
        cy.get(MeasureGroupPage.measureScoringSelect).find(':selected').should('to.have.value', measureScoring)
    })

    it('Verify values in the scoring drop down box', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

        //validate values in the scoring drop down box
        cy.get('#scoring-unit-select').find('option').then(options => {
            const actual = [...options].map(o => o.value)
            expect(actual).to.deep.eq(['Cohort', 'Continuous Variable', 'Proportion', 'Ratio'])
        })
    })
    it('Initial Population being populated from CQL', () => {

        //click on Edit button to edit measure
        MeasuresPage.clickEditforCreatedMeasure()
        //click on the CQL Editor tab
        CQLEditorPage.clickCQLEditorTab()
        //CQLEditorPage.readWriteCQL('cqlCreateMeasureGroup.txt')
        Utilities.readWriteFileData('cqlCreateMeasureGroup.txt', EditMeasurePage.cqlEditorTextBox)
        //save CQL
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        //Validate saved message on page
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'CQL saved successfully')
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //validate population definitions are those that were added via CQL
        cy.get('#measure-group-population-select-initial-population').find('option:nth-child(1)').should('contain.text', 'Initial Population')

    })

    it('Scoring unit and population association saves and persists', () => {

        //click on Edit button to edit measure
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //select a population definition
        cy.get(MeasureGroupPage.initialPopulationSelect).select('Initial Population') //select the 'Initial Population' option
        //save population definiitong with scoring unit
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('exist')
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        //validate data is saved in mongo database --> future addition to automated test script

        //navigate away from measure group page
        cy.get(Header.mainMadiePageButton).click()
        //navigate back to the measure group page
        MeasuresPage.clickEditforCreatedMeasure()
        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()
        //verify that the population and the scoring unit that was saved, together, appears
        cy.get(MeasureGroupPage.measureScoringSelect).contains('Ratio')
        cy.get(MeasureGroupPage.initialPopulationSelect).contains('Initial Population')

    })
})

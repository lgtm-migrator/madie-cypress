import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
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
        // read file
        cy.fixture('cqlData.txt').then((str) => {
            // split file by line endings
            const fileArr = str.split(/\r?\n/);
            // log file in form of array
            cy.log(fileArr);
            // remove new line endings
            const cqlArr = fileArr.map((line: any) => {
                const goodLine = line.split('\\n');
                return goodLine[0];
            });
            // log new array
            cy.log(cqlArr);
            CQLEditorPage.cqlValues.cqlLibraryV = cqlArr[0]
            CQLEditorPage.cqlValues.cqlFHIRV = cqlArr[1]
            CQLEditorPage.cqlValues.cqlIncludeFHIRHelpers = cqlArr[2]
            CQLEditorPage.cqlValues.cqlIncludeSuppDataEleFHIR4 = cqlArr[3]
            CQLEditorPage.cqlValues.cqlValueSet = cqlArr[4]
            CQLEditorPage.cqlValues.cqlValueSetContinued = cqlArr[5]
            CQLEditorPage.cqlValues.cqlParameter = cqlArr[6]
            CQLEditorPage.cqlValues.cqlContext = cqlArr[7]
            CQLEditorPage.cqlValues.cqlDefineIniPop = cqlArr[8]
            //Enter value in CQL Editor tab
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlLibraryV.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlFHIRV.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlIncludeFHIRHelpers.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlIncludeSuppDataEleFHIR4.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlValueSet.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlValueSetContinued.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlParameter.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlContext.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
            cy.get(EditMeasurePage.cqlEditorTextBox).type(CQLEditorPage.cqlValues.cqlDefineIniPop.toString())
            cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}')
        })
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
        cy.get('#measure-group-population-select-initial-population').select('Initial Population') //select the 'Initial Population' option
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
        cy.get('#scoring-unit-select').contains('Ratio')
        cy.get('#measure-group-population-select-initial-population').contains('Initial Population')

    }) 
})

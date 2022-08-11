import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
import {Utilities} from "../../../../Shared/Utilities"
import {MeasureCQL} from "../../../../Shared/MeasureCQL"
let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureCQL = MeasureCQL.ICFTest_CQL
describe('Reset Measure Populations', () => {

    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureCQL)

    })
    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    after('Clean up', () => {

        Utilities.deleteMeasure(measureName, CqlLibraryName)

    })

    it('Validate if the Measure populations reset on Measure Group Scoring change', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the measure group tab
        cy.get(EditMeasurePage.measureGroupsTab).click()

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
        cy.get(MeasureGroupPage.measureScoringSelect).select('Ratio')

        //measure group description
        cy.get(MeasureGroupPage.measureGroupDescriptionBox).type('MeasureGroup Description value')

        //Add Measure Populations for Ratio Measure
        cy.get(MeasureGroupPage.popBasis).should('exist')
        cy.get(MeasureGroupPage.popBasis).should('be.visible')
        cy.get(MeasureGroupPage.popBasis).click()
        cy.get(MeasureGroupPage.popBasis).type('Boolean').type('{enter}')
        cy.get(MeasureGroupPage.initialPopulationSelect).select('SDE Ethnicity')
        cy.get(MeasureGroupPage.denominatorSelect).select('SDE Payer')
        cy.get(MeasureGroupPage.denominatorExclusionSelect).select('SDE Race')
        cy.get(MeasureGroupPage.numeratorSelect).select('Initial Population')
        cy.get(MeasureGroupPage.numeratorExclusionSelect).select('SDE Ethnicity')
        //save population definition with scoring unit
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()
        //validation successful save message
        cy.get(MeasureGroupPage.successfulSaveMeasureGroupMsg).should('contain.text', 'Population details for this group saved successfully.')

        //verify the measure group's description before reset
        cy.get(MeasureGroupPage.measureGroupDescriptionBox)
            .then(($message) => {
                expect($message.val().toString()).to.equal('MeasureGroup Description value')
            })

        //Verify the Populations before reset
        cy.get(MeasureGroupPage.initialPopulationSelect).should('contain.text','SDE Ethnicity')
        cy.get(MeasureGroupPage.denominatorSelect).should('contain.text','SDE Payer')
        cy.get(MeasureGroupPage.denominatorExclusionSelect).should('contain.text','SDE Race')
        cy.get(MeasureGroupPage.numeratorSelect).should('contain.text','Initial Population')
        cy.get(MeasureGroupPage.numeratorExclusionSelect).should('contain.text','SDE Ethnicity')

        //Reset Measure Scoring to Proportion
        cy.log('Reset Measure Scoring')
        cy.get(MeasureGroupPage.measureScoringSelect).select('Proportion')

        //verify the measure group's description after reset
        cy.get(MeasureGroupPage.measureGroupDescriptionBox)
            .then(($message) => {
                expect($message.val().toString()).to.equal('MeasureGroup Description value')
            })

        //verify the populations after reset
        cy.get(MeasureGroupPage.initialPopulationSelect).should('contain.text', 'Select Initial Population')
        cy.get(MeasureGroupPage.denominatorSelect).should('contain.text', 'Select Denominator')
        cy.get(MeasureGroupPage.denominatorExclusionSelect).should('contain.text', 'Select Denominator Exclusion')
        cy.get(MeasureGroupPage.denominatorExceptionSelect).should('contain.text', 'Select Denominator Exception')
        cy.get(MeasureGroupPage.numeratorSelect).should('contain.text', 'Select Numerator')
        cy.get(MeasureGroupPage.numeratorExclusionSelect).should('contain.text', 'Select Numerator Exclusion')
        cy.log('Measure Populations reset successfully')

    })

})

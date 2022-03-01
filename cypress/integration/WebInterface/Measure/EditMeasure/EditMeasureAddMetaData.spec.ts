import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {Header} from "../../../../Shared/Header"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = MeasureGroupPage.measureScoringUnit

describe('Edit Measure: Add Meta Data', () => {

    before('Create Measure', () => {

        OktaLogin.Login()

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName, CqlLibraryName, measureScoring)

        OktaLogin.Logout()

    })
    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Verify the entry, save and retrieval of all Measure Meta Data', () => {

        let steward = 'steward'
        let description = 'description'

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Enter meta data
        //Measure Steward
        cy.get(EditMeasurePage.leftPanelMeasureSteward).click()
        cy.get(EditMeasurePage.measureStewardTextBox).type(steward)
        cy.get(EditMeasurePage.measureStewardSaveButton).click()

        //Description
        cy.get(EditMeasurePage.leftPanelDescription).click()
        cy.get(EditMeasurePage.measureDescriptionTextBox).type(description)
        cy.get(EditMeasurePage.measureDescriptionSaveButton).click()
        cy.get(EditMeasurePage.measureDescriptionSuccessMessage).should('be.visible')

        cy.get(Header.measures).click()

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //verification of data entry
        //steward
        cy.get(EditMeasurePage.leftPanelMeasureSteward).click()
        cy.get(EditMeasurePage.measureStewardTextBox).invoke('val').then(val =>{
            expect(val).to.eql(steward)
        })

        //description
        cy.get(EditMeasurePage.leftPanelDescription).click()
        cy.get(EditMeasurePage.measureDescriptionTextBox).invoke('val').then(val =>{
            expect(val).to.eql(description)
        })
    })
})
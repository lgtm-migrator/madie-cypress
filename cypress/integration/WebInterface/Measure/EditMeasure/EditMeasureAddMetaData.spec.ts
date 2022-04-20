import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {Header} from "../../../../Shared/Header"
import {Utilities} from "../../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = MeasureGroupPage.measureScoringUnit

describe('Edit Measure: Add Meta Data', () => {

    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

    })
    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    after('Clean up', () => {

        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring)

    })

    it('Verify the entry, save and retrieval of all Measure Meta Data', () => {

        let steward = 'steward'
        let description = 'description'
        let copyright = 'copyright'
        let disclaimer = 'disclaimer'
        let rationale = 'rationale'
        let author = 'author'
        let guidance = 'guidance'

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Enter meta data
        //Measure Steward
        Utilities.waitForElementVisible(EditMeasurePage.leftPanelMeasureSteward, 10000)
        cy.get(EditMeasurePage.leftPanelMeasureSteward).click()
        cy.get(EditMeasurePage.measureStewardTextBox).clear().type(steward)
        cy.get(EditMeasurePage.measureStewardSaveButton).click()

        //Description
        cy.get(EditMeasurePage.leftPanelDescription).click()
        cy.get(EditMeasurePage.measureDescriptionTextBox).clear().type(description)
        cy.get(EditMeasurePage.measureDescriptionSaveButton).click()
        cy.get(EditMeasurePage.measureDescriptionSuccessMessage).should('be.visible')

        //Copyright
        cy.get(EditMeasurePage.leftPanelCopyright).click()
        cy.get(EditMeasurePage.measureCopyrightTextBox).clear().type(copyright)
        cy.get(EditMeasurePage.measureCopyrightSaveButton).click()
        cy.get(EditMeasurePage.measureCopyrightSuccessMessage).should('be.visible')

        //Disclaimer
        cy.get(EditMeasurePage.leftPanelDisclaimer).click()
        cy.get(EditMeasurePage.measureDisclaimerTextBox).clear().type(disclaimer)
        cy.get(EditMeasurePage.measureDisclaimerSaveButton).click()
        cy.get(EditMeasurePage.measureDisclaimerSuccessMessage).should('be.visible')

        //Rationale
        cy.get(EditMeasurePage.leftPanelRationale).click()
        cy.get(EditMeasurePage.measureRationaleTextBox).clear().type(rationale)
        cy.get(EditMeasurePage.measureRationaleSaveButton).click()
        cy.get(EditMeasurePage.measureRationaleSuccessMessage).should('be.visible')

        //Author
        cy.get(EditMeasurePage.leftPanelAuthor).click()
        cy.get(EditMeasurePage.measureAuthorTextBox).clear().type(author)
        cy.get(EditMeasurePage.measureAuthorSaveButton).click()
        cy.get(EditMeasurePage.measureAuthorSuccessMessage).should('be.visible')

        //Guidance
        cy.get(EditMeasurePage.leftPanelGuidance).click()
        cy.get(EditMeasurePage.measureGuidanceTextBox).clear().type(guidance)
        cy.get(EditMeasurePage.measureGuidanceSaveButton).click()
        cy.get(EditMeasurePage.measureGuidanceSuccessMessage).should('be.visible')

        cy.get(Header.mainMadiePageButton).click()

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //verification of data entry
        //steward
        cy.get(EditMeasurePage.leftPanelMeasureSteward).click()
        cy.get(EditMeasurePage.measureStewardTextBox).invoke('val').then(val =>{
            expect(val).to.eql(steward)
        })
        cy.log('Measure Steward added successfully')

        //description
        cy.get(EditMeasurePage.leftPanelDescription).click()
        cy.get(EditMeasurePage.measureDescriptionTextBox).invoke('val').then(val =>{
            expect(val).to.eql(description)
        })
        cy.log('Measure Description added successfully')

        //copyright
        cy.get(EditMeasurePage.leftPanelCopyright).click()
        cy.get(EditMeasurePage.measureCopyrightTextBox).invoke('val').then(val =>{
            expect(val).to.eql(copyright)
        })
        cy.log('Measure Copyright added successfully')

        //disclaimer
        cy.get(EditMeasurePage.leftPanelDisclaimer).click()
        cy.get(EditMeasurePage.measureDisclaimerTextBox).invoke('val').then(val =>{
            expect(val).to.eql(disclaimer)
        })
        cy.log('Measure Disclaimer added successfully')

        //rationale
        cy.get(EditMeasurePage.leftPanelRationale).click()
        cy.get(EditMeasurePage.measureRationaleTextBox).invoke('val').then(val =>{
            expect(val).to.eql(rationale)
        })
        cy.log('Measure Rationale added successfully')

        //author
        cy.get(EditMeasurePage.leftPanelAuthor).click()
        cy.get(EditMeasurePage.measureAuthorTextBox).invoke('val').then(val =>{
            expect(val).to.eql(author)
        })
        cy.log('Measure Author added successfully')

        //guidance
        cy.get(EditMeasurePage.leftPanelGuidance).click()
        cy.get(EditMeasurePage.measureGuidanceTextBox).invoke('val').then(val =>{
            expect(val).to.eql(guidance)
        })
        cy.log('Measure Guidance added successfully')
    })
})
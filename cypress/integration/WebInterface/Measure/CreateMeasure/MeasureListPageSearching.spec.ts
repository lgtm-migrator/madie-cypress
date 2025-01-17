import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()

describe('Measure List Page Searching', () => {

    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()
    })

    it('Measure search on My Measures and All Measures tab', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasure(measureName,CqlLibraryName)

        //Search for the Measure using Measure name
        cy.log('Search Measure with measure name')
        cy.get(MeasuresPage.searchInputBox).type(measureName).wait(1000).type('{enter}').wait(1000)
        cy.get(MeasuresPage.measureListTitles).should('contain', measureName)

        //Search for the Measure under All Measures tab
        cy.log('Search Measure with measure name under All Measures tab')
        cy.get(MeasuresPage.allMeasuresTab).click()
        cy.get(MeasuresPage.searchInputBox).clear().type(measureName).wait(1000).type('{enter}').wait(1000)
        cy.get(MeasuresPage.measureListTitles).should('contain', measureName)

        //Search for the Measure using eCQMTitle
        cy.log('Search Measure with eCQM Title')
        cy.get('[data-testid="my-measures-tab"]').click()
        cy.get(MeasuresPage.searchInputBox).clear().type('eCQMTitle01').wait(1000).type('{enter}').wait(1000)
        cy.get(MeasuresPage.measureListTitles).should('contain', measureName)
        cy.get(MeasuresPage.viewMeasureButton).click()
        cy.get(CreateMeasurePage.eCQMAbbreviatedTitleTextbox).should('have.value','eCQMTitle01')

        //Delete the Measure & search for deleted Measure under My Measures tab
        cy.log('Delete Measure')
        cy.get(EditMeasurePage.deleteMeasureButton).click()
        cy.get(EditMeasurePage.deleteMeasureConfirmationMsg).should('contain.text', 'Are you sure you want to delete ' + measureName + '?')
        cy.get(EditMeasurePage.deleteMeasureConfirmationButton).click()
        cy.get(EditMeasurePage.successfulMeasureDeleteMsg).should('contain.text', 'Measure successfully deleted')
        cy.wait(1000)

        //Search for Deleted Measure
        cy.log('Search for Deleted Measure')
        cy.get(MeasuresPage.searchInputBox).type(measureName).wait(1000).type('{enter}').wait(1000)
        cy.get(MeasuresPage.measureListTitles).should('not.exist')

        //Search for deleted Measure under All Measures tab
        cy.log('Search for Deleted Measure under All Measures tab')
        cy.get(MeasuresPage.allMeasuresTab).click()
        cy.get(MeasuresPage.searchInputBox).clear().type(measureName).wait(1000).type('{enter}').wait(1000)
        cy.get(MeasuresPage.measureListTitles).should('not.exist')

    })
})

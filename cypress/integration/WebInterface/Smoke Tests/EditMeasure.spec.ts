import {OktaLogin} from "../../../Shared/OktaLogin";
import {LandingPage} from "../../../Shared/LandingPage";
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage";
import {EditMeasurePage} from "../../../Shared/EditMeasurePage";

let measureName = ''
let updatedMeasureName = ''
let CQLLibraryName = ''

describe('Edit Measure', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Edit Measure Name and verify the measure name is updated on Measures page', () => {

        measureName = 'TestMeasure'+ Date.now()
        updatedMeasureName = 'UpdatedMeasure' + Date.now()
        CQLLibraryName = 'CQLLibrary' + Date.now()

        //Click on Measures Button
        cy.get(LandingPage.measuresButton).click()
        cy.get(CreateMeasurePage.newMeasureButton).click()
        cy.get(CreateMeasurePage.measureNameTextbox).type(measureName)
        cy.get(CreateMeasurePage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CreateMeasurePage.createMeasureButton).click()

        //Navigate back to Measures page and Edit Measure Name
        cy.go('back')

        //Click on Edit Button
        cy.get(CreateMeasurePage.editMeasureButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear()
        cy.wait(100)
        cy.get(EditMeasurePage.editMeasureTextBox).type(updatedMeasureName)
        cy.get(EditMeasurePage.saveEditedMeasureName).click()

        //Navigate back to Measures page and verify if the Measure Name is updated
        cy.go('back')
        cy.get(CreateMeasurePage.listOfMeasures).should('contain', updatedMeasureName)

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()

    })
})
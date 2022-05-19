import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {Utilities} from "../../../../Shared/Utilities"

let measureName = 'TestMeasure' + Date.now()
let CqlLibraryName = 'TestLibrary' + Date.now()
let measureScoring = 'Ratio'
let newMeasureName = ''
let newCqlLibraryName = ''

describe('Edit Measure Name Validations', () => {
    before('Create Measure', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring)

    })

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    after('Clean up', () => {
        let measurementPeriodStart = "2023-01-01T00:00:00.000+00:00"
        let measurementPeriodEnd = "2023-12-31T00:00:00.000+00:00"
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, measurementPeriodStart, measurementPeriodEnd)
    })

    it('Verify error messages when the edit measure name entered is invalid', () => {

        //Click on Edit Button, Verify error message when the Measure Name field is empty
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear()
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'A measure name is required.')

        //Verify error message when the Edit Measure Name doesn't contain alphabets
        cy.get(EditMeasurePage.editMeasureCancelButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear().type('66777')
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'A measure name must contain at least one letter.')

        //Verify error message when the Measure Name has '_'
        cy.get(EditMeasurePage.editMeasureCancelButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear().type('Test_Measure')
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'Measure Name must not contain \'_\' (underscores).')

        //Verify error message when the Measure Name has more than 500 characters
        cy.get(EditMeasurePage.editMeasureCancelButton).click()
        cy.get(EditMeasurePage.editMeasurePen).click()
        cy.get(EditMeasurePage.editMeasureTextBox).clear().type('This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is for measure name validation.This test is')
        cy.get(EditMeasurePage.editMeasureSaveButton).click()
        cy.get(EditMeasurePage.editMeasureFieldLevelError).should('contain.text', 'A measure name cannot be more than 500 characters.')

    })
})

describe.only('Measurement Period Validations', () => {

    // let measureName = 'TestMeasure' + Date.now()
    // let CqlLibraryName = 'TestLibrary' + Date.now()

    beforeEach('Create measure and login', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName, measureScoring)
        OktaLogin.Login()

    })

    afterEach('Logout and Clean up Measures', () => {

        OktaLogin.Logout()

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newCqlLibraryName = CqlLibraryName + randValue

        let measurementPeriodStart = "2023-01-01T00:00:00.000+00:00"
        let measurementPeriodEnd = "2023-12-31T00:00:00.000+00:00"
        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName, measureScoring, measurementPeriodStart, measurementPeriodEnd)

    })

    it('Verify error message when the Measurement Period end date is after the start date', () => {

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(CreateMeasurePage.measurementPeriodEndDate).clear().type('01/01/1999')
        cy.get(CreateMeasurePage.measurementPeriodStartDate).clear().type('12/01/2022')
        cy.get(CreateMeasurePage.measurementPeriodEndDateError).should('contain.text', 'Measurement period end date should be greater than measurement period start date.')

    })

    it('Verify error message when the Measurement Period start and end dates are empty', () => {

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(CreateMeasurePage.measurementPeriodStartDate).clear()
        cy.get(CreateMeasurePage.measurementPeriodStartDate).focus().blur()
        cy.get(CreateMeasurePage.measurementPeriodStartDateError).should('contain.text', 'Required')
        cy.get(CreateMeasurePage.measurementPeriodEndDate).clear()
        cy.get(CreateMeasurePage.measurementPeriodEndDate).focus().blur()
        cy.get(CreateMeasurePage.measurementPeriodEndDateError).should('contain.text', 'Required')
    })

    it('Verify error message when the Measurement Period start and end dates are not in valid range', () => {

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(CreateMeasurePage.measurementPeriodStartDate).clear().type('01/01/1800')
        cy.get(CreateMeasurePage.measurementPeriodEndDate).click()
        cy.get(CreateMeasurePage.measurementPeriodStartDateError).should('contain.text', 'Start date should be between the years 1900 and 2099.')
        cy.get(CreateMeasurePage.measurementPeriodEndDate).clear().type('01/01/1800')
        cy.get(CreateMeasurePage.measurementPeriodStartDate).click()
        cy.get(CreateMeasurePage.measurementPeriodEndDateError).should('contain.text', 'End date should be between the years 1900 and 2099.')
    })

    it('Verify error message when the Measurement Period start and end date format is not valid', () => {

        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(CreateMeasurePage.measurementPeriodStartDate).clear().type('2020/01/02')
        cy.get(CreateMeasurePage.measurementPeriodEndDate).click()
        cy.get(CreateMeasurePage.measurementPeriodStartDateError).should('contain.text', 'Invalid date format. (mm/dd/yyyy)')
        cy.get(CreateMeasurePage.measurementPeriodEndDate).clear().type('2021/01/02')
        cy.get(CreateMeasurePage.measurementPeriodStartDate).click()
        cy.get(CreateMeasurePage.measurementPeriodEndDateError).should('contain.text', 'Invalid date format. (mm/dd/yyyy)')
    })

})
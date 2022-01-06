import {LandingPage} from "./LandingPage"

export class CreateMeasurePage {

    public static readonly newMeasureButton = '[data-testid=create-new-measure-button]'
    public static readonly createMeasureButton = '[data-testid=create-new-measure-save-button]'
    public static readonly cancelButton = '[data-testid=create-new-measure-cancel-button]'
    public static readonly measureNameTextbox = '[data-testid=measure-name-text-field]'
    public static readonly measureModelDropdown = '#mui-1'
    public static readonly measureModelQICore = '[data-testid="measure-model-option-QI-Core"]'
    public static readonly cqlLibraryNameTextbox = '[data-testid="cql-library-name"]'
    public static readonly measureNameFieldLevelError = '[data-testid=measureName-helper-text]'
    public static readonly cqlLibraryNameFieldLevelError = '[data-testid="cqlLibraryName-helper-text"]'
    public static readonly cqlLibraryNameDuplicateErrorMsg = '[data-testid="server-error-alerts"]'
    public static readonly measureScoringDropdown = '#measureScoring'
    public static readonly measureScoringCohort = '[data-value="Cohort"]'
    public static readonly measureScoringProportion = '[data-value="Proportion"]'
    public static readonly measureScoringCV = '[data-value="CV"]'
    public static readonly measureScoringRatio = '[data-value="Ratio"]'

    public static CreateQICoreMeasure(measureName,CqlLibraryName,measureScoring) : void {

        cy.log('Create ' +measureScoring+ ' Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(this.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(CqlLibraryName)
        cy.get(this.measureScoringDropdown).click()
        switch (measureScoring){
            case 'Cohort':
                cy.get(this.measureScoringCohort).click()
                break
            case 'CV' :
                cy.get(this.measureScoringCV).click()
                break
            case 'Proportion':
                cy.get(this.measureScoringProportion).click()
                break
            case 'Ratio':
                cy.get(this.measureScoringRatio).click()
                break
        }
        cy.get(this.createMeasureButton).click()
        cy.log( measureScoring+ ' Measure created successfully')

        //setup for grabbing the measure create call
        cy.intercept('POST', '/api/measure').as('measure')

        cy.get(this.createMeasureButton).click()

        //saving measureID to file to use later
        cy.wait('@measure').then(({response}) => {
            expect(response.statusCode).to.eq(201)
            cy.writeFile('cypress/downloads/measureId', response.body.id)
        })

    }
}
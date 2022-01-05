import {LandingPage} from "./LandingPage"

let measureName = ''

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


    public static clickCreateMeasureButton() : void {
        measureName = 'TestMeasure' + Date.now()

        cy.log('Create New Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(this.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(measureName)
        cy.get(this.measureScoringDropdown).click()
        cy.get(this.measureScoringCohort).click()
        cy.log('Measure Created Successfully')

        //setup for grabbing the measure create call
        cy.intercept('POST', '/api/measure').as('measure')

        cy.get(this.createMeasureButton).click()

        //saving measureID to file to use later
        cy.wait('@measure').then(({response}) => {
            expect(response.statusCode).to.eq(201)
            cy.writeFile('cypress/downloads/measureId', response.body.id)
        })
    }

    public static createCohortMeasure() : void {
       measureName = 'CohortTestMeasure' + Date.now()

        cy.log('Create Cohort Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(this.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(measureName)
        cy.get(this.measureScoringDropdown).click()
        cy.get(this.measureScoringCohort).click()
        cy.get(this.createMeasureButton).click()
        cy.log('Cohort Measure Created Successfully')
    }

    public static createProportionMeasure() : void {
       measureName = 'ProportionTestMeasure' + Date.now()

        cy.log('Create Proportion Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(this.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(measureName)
        cy.get(this.measureScoringDropdown).click()
        cy.get(this.measureScoringProportion).click()
        cy.get(this.createMeasureButton).click()
        cy.log('Proportion Measure Created Successfully')
    }

    public static createContinuousVariableMeasure() : void {
        measureName = 'CVTestMeasure' + Date.now()

        cy.log('Create Continuous Variable Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(this.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(measureName)
        cy.get(this.measureScoringDropdown).click()
        cy.get(this.measureScoringCV).click()
        cy.get(this.createMeasureButton).click()
        cy.log('Continuous Variable Measure Created Successfully')
    }

    public static createRatioMeasure() : void {
       measureName = 'RatioTestMeasure' + Date.now()

        cy.log('Create Ratio Measure')
        cy.get(LandingPage.measuresButton).click()
        cy.get(this.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(measureName)
        cy.get(this.measureScoringDropdown).click()
        cy.get(this.measureScoringRatio).click()
        cy.get(this.createMeasureButton).click()
        cy.log('Ratio Measure Created Successfully')
    }
}
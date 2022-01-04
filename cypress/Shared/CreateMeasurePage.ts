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


    public static clickCreateMeasureButton() : void {

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



export class MeasuresPage {

    public static readonly measureList = '.MeasureList___StyledTd-sc-1kfngu9-13'

    public static clickEditforCreatedMeasure(): void {
        cy.readFile('cypress/fixtures/measureId').should('exist').then((fileContents) => {
            cy.get('[data-testid=edit-measure-'+ fileContents +']').click()
        })
    }

    public static validateMeasureName(expectedValue: string): void {
        cy.readFile('cypress/fixtures/measureId').should('exist').then((fileContents) => {

            let element = cy.get('[data-testid=edit-measure-'+ fileContents +']').parent()
            element.parent().should('contain', expectedValue)

        })
    }
}
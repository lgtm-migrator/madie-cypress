

export class MeasuresPage {
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    public static clickEditforCreatedMeasure(): void {
        cy.readFile('cypress/downloads/measureId').should('exist').then((fileContents) => {
            cy.get('[data-testid=edit-measure-'+ fileContents +']').click()
        })
    }

    public static validateMeasureName(expectedValue: string): void {
        cy.readFile('cypress/downloads/measureId').should('exist').then((fileContents) => {

            let element = cy.get('[data-testid=edit-measure-'+ fileContents +']').parent()
            element.parent().should('contain', expectedValue)

        })
    }
}
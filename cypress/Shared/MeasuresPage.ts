


export class MeasuresPage {

    public static readonly measureListTitles = '.MeasureList___StyledTd-sc-1kfngu9-13'
    public static readonly allMeasuresTab = '[data-testid=all-measures-tab]'


    public static clickEditforCreatedMeasure(secondMeasure?: boolean): void {
        let filePath = 'cypress/fixtures/measureId'

        if (secondMeasure === true)
        {
            filePath = 'cypress/fixtures/measureId2'
        }

        cy.readFile(filePath).should('exist').then((fileContents) => {
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
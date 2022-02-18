export class CQLEditorPage {

    //Navigate button to get to Measure Group page
    public static readonly cqlEditorTab = '[data-testid=cql-editor-tab]'

    //cql editor box on page
    public static readonly cqlEditorTextBox = '.ace_content'

    //save button on page
    public static readonly cqlEditorSaveButton = '[data-testid="save-cql-btn"]'

    public static clickMeasureGroupTab(): void {
        
        cy.get(this.cqlEditorTab)
        .invoke('removeAttr', 'target')
        .click()

    }

}
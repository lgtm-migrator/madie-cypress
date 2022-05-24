import {EditMeasurePage} from "./EditMeasurePage"
export class CQLEditorPage {

    //success save message without errors
    public static readonly successfulCQLSaveNoErrors = '[data-testid=save-cql-success]'

    //Error marker inside of the CQL Editor window
    public static readonly errorInCQLEditorWindow = 'div.ace_gutter-cell.ace_error'

    //UMLS Not Logged in Error
    public static readonly umlsMessage = '[data-testid="valueset-success"]'

    //click action on the tab to get to the CQL Editor
    public static clickCQLEditorTab(): void {
        
        cy.get(EditMeasurePage.cqlEditorTab)
        .invoke('removeAttr', 'target')
        .click()

    }

}
import {EditMeasurePage} from "../Shared/EditMeasurePage"
export class CQLEditorPage {

    //success save message without errors
    public static readonly successfulCQLSaveNoErrors = '[data-testid=save-cql-success]'

    //Error marker inside of the CQL Editor window
    public static readonly errorInCQLEditorWindow = 'div.ace_gutter-cell.ace_error'

    public static cqlValues = {
        cqlText: ''
    }

    public static readWriteCQL(file: string): void{
        cy.fixture(file).then((str) => {
            // split file by line endings
            const fileArr = str.split(/\r?\n/);
            // log file in form of array
            cy.log(fileArr);
            // remove new line endings
            const cqlArr = fileArr.map((line: any) => {
                const goodLine = line.split('\\n');
                return goodLine[0];
            });
            // log new array
            cy.log(cqlArr);
            for (var i in cqlArr){
                this.cqlValues.cqlText = cqlArr[i]
                cy.get(EditMeasurePage.cqlEditorTextBox).type(this.cqlValues.cqlText.toString()).type('{enter}')
                this.cqlValues.cqlText = ''
            }
        })
    }

    //click action on the tab to get to the CQL Editor
    public static clickCQLEditorTab(): void {
        
        cy.get(EditMeasurePage.cqlEditorTab)
        .invoke('removeAttr', 'target')
        .click()

    }

}
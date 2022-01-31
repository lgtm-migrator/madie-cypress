import {EditMeasurePage} from "./EditMeasurePage";

export class TestCasesPage {

    public static readonly newTestCaseButton = '.sc-iqseJM'
    public static readonly testCaseDescriptionTextBox = '[data-testid=create-test-case-description]'
    public static readonly createTestCaseButton = '[data-testid=create-test-case-button]'
    public static readonly successMsg = '[data-testid=create-test-case-alert]'
    public static readonly listOfTestCases = '.TestCaseList___StyledTr-sc-1iefzo5-8'
    public static readonly aceEditor = '#ace-editor-wrapper > .ace_scroller > .ace_content'

    public static createTestCase (testCaseName:string, testCaseJson:string)  :void{
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.newTestCaseButton).click()
        cy.get(this.testCaseDescriptionTextBox).type(testCaseName)

        //Add json to the test case
        cy.get(this.aceEditor).type(testCaseJson)

        cy.get(this.createTestCaseButton).click()
        cy.get(this.successMsg).should('contain.text', 'Test case saved successfully!')

        //Verify created test case exists on Test Case Page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.listOfTestCases).contains(testCaseName)
        cy.log('Test Case created successfully')
    }
}
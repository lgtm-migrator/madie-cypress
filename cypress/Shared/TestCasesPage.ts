import {EditMeasurePage} from "./EditMeasurePage"

export class TestCasesPage {

    public static readonly newTestCaseButton = '.sc-iqseJM'
    public static readonly editTestCaseButton ='[class="TestCaseList__Button-sc-1iefzo5-2 cIVwpR"]'
    ///<button data-testid="edit-test-case-61fda86b0ed1674fd78ac96b" class="TestCaseList__Button-sc-1iefzo5-2 cIVwpR">Edit</button>
    public static readonly testCaseTitle = '[data-testid=create-test-case-title]'
    public static readonly testCaseDescriptionTextBox = '[data-testid=create-test-case-description]'
    public static readonly cuTestCaseButton = '[data-testid=create-test-case-button]'
    public static readonly successMsg = '[data-testid=create-test-case-alert]'
    public static readonly listOfTestCases = '.TestCaseList___StyledTr-sc-1iefzo5-8'
    public static readonly aceEditor = '#ace-editor-wrapper > .ace_scroller > .ace_content'


    public static cuTestCase (testCaseTitle:string, testCaseDescription:string, testCaseJson:string)  :void{
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.newTestCaseButton).click()
        cy.get(this.testCaseTitle).type(testCaseTitle)
        cy.get(this.testCaseDescriptionTextBox).type(testCaseDescription)

        //Add json to the test case
        cy.get(this.aceEditor).type(testCaseJson)

        //Save new test case
        cy.get(this.cuTestCaseButton).click()
        cy.get(this.successMsg).should('contain.text', 'Test case saved successfully!')

        //
        //Verify created test case exists on Test Case Page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.listOfTestCases).contains(testCaseDescription)
        cy.log('Test Case created successfully')

        //Edit / Update test case title
        cy.get(this.editTestCaseButton).click()
        cy.get(this.testCaseTitle).type(testCaseTitle + ' something new to title')
        cy.get(this.testCaseDescriptionTextBox).clear().type('UpdatedTestCaseDescription')

        //Add json to the test case
        //cy.get(this.aceEditor).type(testCaseJson)

        //Save edited / updated to test case
        cy.get(this.cuTestCaseButton).click()
        cy.get(this.successMsg).should('contain.text', 'Test case updated successfully!')
        cy.log('Test Case description updated successfully')

        //Verify edited / updated test case exists on Test Case Page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.listOfTestCases).contains('UpdatedTestCaseDescription')

    }
}
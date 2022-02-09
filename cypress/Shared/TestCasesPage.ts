import {EditMeasurePage} from "./EditMeasurePage"

export class TestCasesPage {

    public static readonly newTestCaseButton = '.sc-iqseJM'
    public static readonly testCaseDescriptionTextBox = '[data-testid=create-test-case-description]'
    public static readonly createTestCaseButton = '[data-testid=create-test-case-button]'
    public static readonly successMsg = '[data-testid=create-test-case-alert]'
    public static readonly listOfTestCases = '.TestCaseList___StyledTr-sc-1iefzo5-8'
    public static readonly aceEditor = '#ace-editor-wrapper > .ace_scroller > .ace_content'
    public static readonly editTestCase = '[class="TestCaseList__Button-sc-1iefzo5-2 cIVwpR"]'
    public static readonly updateTestCaseButton = '[data-testid="create-test-case-button"]'
    public static readonly testCaseTitle = '[data-testid=create-test-case-title]'
    public static readonly editTestCaseButton ='[class="TestCaseList__Button-sc-1iefzo5-2 cIVwpR"]'
    public static readonly cuTestCaseButton = '[data-testid=create-test-case-button]'

    public static clickCreateTestCaseButton() : void {

        //setup for grabbing the measure create call
        cy.readFile('cypress/downloads/measureId').should('exist').then((id)=> {
            cy.intercept('POST', '/api/measures/'+ id + '/test-cases').as('testcase')

            cy.get(this.createTestCaseButton).click()
    
            //saving testCaseId to file to use later
            cy.wait('@testcase').then(({response}) => {
                expect(response.statusCode).to.eq(201)
                cy.writeFile('cypress/downloads/testCaseId', response.body.id)
            })
        })

    }

    public static createTestCase (testCaseTitle:string, testCaseDescription:string, testCaseJson:string)  :void{
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.newTestCaseButton).click()
        cy.get(this.testCaseTitle).type(testCaseTitle)
        cy.get(this.testCaseDescriptionTextBox).type(testCaseDescription)

        //Add json to the test case
        cy.get(this.aceEditor).type(testCaseJson)

        //cy.get(this.createTestCaseButton).click()
        //cy.get(this.cuTestCaseButton).click()
        this.clickCreateTestCaseButton()
        cy.get(this.successMsg).should('contain.text', 'Test case saved successfully!')

        //Verify created test case exists on Test Case Page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.listOfTestCases).contains(testCaseTitle)

        cy.log('Test Case created successfully')
    }
    public static updateTestCase (testCaseTitle:string, testCaseDescription:string, testCaseJson:string)  :void{
        let updatedTitle = testCaseTitle + "some update"

        //Edit / Update test case title
        cy.get(this.testCaseTitle).clear().type(updatedTitle)
        cy.get(this.testCaseDescriptionTextBox).clear().type(testCaseDescription + ' '+ 'UpdatedTestCaseDescription')

        //Add json to the test case
        cy.get(this.aceEditor).type(testCaseJson)

        //Save edited / updated to test case
        cy.get(this.cuTestCaseButton).click()
        cy.get(this.successMsg).should('contain.text', 'Test case updated successfully!')
        cy.log('Test Case description updated successfully')

        //Verify edited / updated test case exists on Test Case Page
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.listOfTestCases).contains(updatedTitle)

        cy.log('Test Case created successfully')
    }
    public static clickEditforCreatedTestCase(): void {
        cy.readFile('cypress/downloads/testCaseId').should('exist').then((fileContents) => {
            cy.get('[data-testid=edit-test-case-'+ fileContents +']').click()
        })
    }
}
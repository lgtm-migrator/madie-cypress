import {EditMeasurePage} from "./EditMeasurePage"
import { Environment } from "./Environment"

export class TestCasesPage {

    public static readonly ippActualCheckBox = '[data-testid="test-population-initialPopulation-actual"]'
    public static readonly numActualCheckBox = '[data-testid="test-population-numerator-actual"]'
    public static readonly numExclusionActuralCheckBox = '[data-testid="test-population-numeratorExclusion-actual"]'
    public static readonly denomActualCheckBox = '[data-testid="test-population-denominator-actual"]'
    public static readonly newTestCaseButton = '[data-testid="create-new-test-case-button"]'
    public static readonly testCaseDescriptionTextBox = '[data-testid=create-test-case-description]'
    public static readonly testCaseSeriesTextBox = '[data-testid="create-test-case-series"] > .MuiOutlinedInput-root'
    public static readonly existingTestCaseSeriesDropdown = '#mui-6'
    public static readonly createTestCaseButton = '[data-testid=create-test-case-button]'
    public static readonly confirmationMsg = '[data-testid="create-test-case-alert"]'
    public static readonly testCaseSeriesList = 'tbody > tr > :nth-child(3)'
    public static readonly aceEditor = '.ace_content'
    public static readonly testCaseTitle = '[data-testid=create-test-case-title]'
    public static readonly cuTestCaseButton = '[data-testid="create-test-case-button"]'
    public static readonly executeTestCaseButton = '[data-testid="execute-test-cases-button"]'
    public static readonly testCaseStatus = 'tbody > tr > :nth-child(4)'
    public static readonly testCaseTitleInlineError = '[data-testid="title-helper-text"]'
    public static readonly testCaseJsonValidationErrorBtn = '[data-testid="show-json-validation-errors-button"]'
    public static readonly testCaseJsonValidationDisplayList = '[data-testid="json-validation-errors-list"] > span'
    public static readonly testCaseJsonValidationErrorList = '.CreateTestCase__ValidationErrorCard-sc-z6rmnc-7'
    public static readonly testCasePopulationList = '[data-testid="create-test-case-populations"]'
    //<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-standardError MuiAlert-standard css-17y7f73" role="alert" data-testid="execution_context_loading_errors"><div class="MuiAlert-icon css-1l54tgj"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ErrorOutlineIcon"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></div><div class="MuiAlert-message css-1w0ym84">An error exists with the measure CQL, please review the CQL Editor tab.</div></div>
    public static readonly testCaseMeasureCQLError = '[data-testid="execution_context_loading_errors"]'
    public static readonly testCaseExecutionError = '[data-testid="display-tests-error"]'
    public static readonly runTestButton = '[data-testid="run-test-case-button"]'
    public static readonly testCalculationResults = '[data-testid=calculation-results]'
    public static readonly testCalculationResultsLineTwo = '[data-testid="calculation-results"] > div > :nth-child(2)'
    public static readonly testCalculationError = '[data-testid="calculation-error-alert"]'

    //Test Case Population Values
    public static readonly testCaseIPPCheckBox = '[data-testid="test-population-initialPopulation-expected"]'
    public static readonly testCaseNUMERCheckBox = '[data-testid="test-population-numerator-expected"]'
    public static readonly testCaseNUMEXCheckBox = '[data-testid="test-population-numeratorExclusion-expected"]'
    public static readonly testCaseDENOMCheckBox = '[data-testid="test-population-denominator-expected"]'
    public static readonly testCaseDENEXCheckBox = '[data-testid="test-population-denominatorExclusion-expected"]'
    public static readonly testCaseDENEXCEPCheckBox = '[data-testid="test-population-denominatorException-expected"]'
    public static readonly testCaseMSRPOPLCheckBox = '[data-testid="test-population-measurePopulation-expected"]'
    public static readonly testCaseMSRPOPLEXCheckBox = '[data-testid="test-population-measurePopulationExclusion-expected"]'
    public static readonly testCasePopulationHeaderForNoMeasureGroup = '.GroupPopulations___StyledSpan2-sc-1752rtp-2'
    public static readonly testCasePopulationValuesHeader = '.GroupPopulations___StyledSpan-sc-1752rtp-1'
    public static readonly testCasePopulationValuesTable = '[data-testid="test-case-population-list-tbl"]'
    public static readonly testCasePopulationValues = '.TestCasePopulationList___StyledTr-sc-iww9ze-3'
    public static readonly initialPopulationRow = '[data-testid="test-row-population-id-initialPopulation"]'
    public static readonly numeratorRow = '[data-testid="test-row-population-id-numerator"]'
    public static readonly numeratorExclusionRow = '[data-testid="test-row-population-id-numeratorExclusion"]'
    public static readonly denominatorRow = '[data-testid="test-row-population-id-denominator"]'
    public static readonly denominatorExclusionRow = '[data-testid="test-row-population-id-denominatorExclusion"]'

    public static clickCreateTestCaseButton(withBundleId?:boolean) : void {

        //setup for grabbing the measure create call
        cy.readFile('cypress/fixtures/measureId').should('exist').then((id)=> {
            cy.intercept('POST', '/api/measures/' + id + '/test-cases').as('testcase')
            cy.intercept('GET', '/api/measures/' + id).as('getMeasures')

            cy.get(this.createTestCaseButton).click()

            //saving testCaseId to file to use later
            cy.wait('@testcase').then(({response}) => {
                expect(response.statusCode).to.eq(201)
                cy.writeFile('cypress/fixtures/testCaseId', response.body.id)
            })
            if (withBundleId){
                cy.get(TestCasesPage.confirmationMsg).should('have.text', 'Test case created successfully! Bundle IDs are auto generated on save. MADiE has over written the ID provided')
            }
            else {
                cy.get(TestCasesPage.confirmationMsg).should('have.text', 'Test case created successfully! Bundle ID has been auto generated')
            }    
    
            cy.get(EditMeasurePage.testCasesTab).click()

            cy.wait('@getMeasures').then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })
        })
    }

    public static grabValidateTestCaseTitleAndSeries(testCaseTitle: string, testCaseSeries: string) : void{
        cy.readFile('cypress/fixtures/testCaseId').should('exist').then((fileContents) => {
            cy.get('[data-testid=test-case-row-'+ fileContents +']').should('be.visible')
            cy.get('[data-testid=test-case-row-'+ fileContents +']').invoke('text').then(
                (text) => {
                    expect(text).to.include(testCaseTitle)
                    expect(text).to.include(testCaseSeries)
                })

        })
    }

    public static createTestCase (testCaseTitle:string, testCaseDescription:string, testCaseSeries:string, testCaseJson:string, withBundleId?:boolean)  :void{

        if ((withBundleId == undefined) || (withBundleId === null)){withBundleId = false}
        
        //Navigate to Test Cases page and add Test Case details
        cy.get(EditMeasurePage.testCasesTab).should('be.visible')
        cy.get(EditMeasurePage.testCasesTab).click()
        cy.get(this.newTestCaseButton).should('be.visible')
        cy.get(this.newTestCaseButton).should('be.enabled')
        cy.get(this.newTestCaseButton).click()

        cy.get(this.testCasePopulationList).should('be.visible')

        cy.get(this.testCaseTitle).should('be.visible')
        cy.get(this.testCaseTitle).should('be.enabled')
        cy.get(this.testCaseTitle).type(testCaseTitle, { force: true })
        cy.get(this.testCaseDescriptionTextBox).type(testCaseDescription)
        cy.get(this.testCaseSeriesTextBox).type(testCaseSeries).type('{enter}')

        //Add json to the test case
        cy.get(this.aceEditor).type(testCaseJson)

        this.clickCreateTestCaseButton(withBundleId)



        //Verify created test case Title and Series exists on Test Cases Page
        this.grabValidateTestCaseTitleAndSeries(testCaseTitle, testCaseSeries)

        cy.log('Test Case created successfully')
    }

    public static updateTestCase (updatedTestCaseTitle:string, updatedTestCaseDescription:string, updatedTestCaseSeries:string)  :void{
        cy.get(this.testCasePopulationList).should('be.visible')

        //Edit / Update test case title
        cy.get(this.testCaseTitle).should('be.visible')
        cy.get(this.testCaseTitle).should('be.enabled')
        cy.get(this.testCaseTitle).clear()
        cy.get(this.testCaseTitle).type(updatedTestCaseTitle)
        //Update Test Case Description
        cy.get(TestCasesPage.testCaseDescriptionTextBox).clear()
        cy.get(TestCasesPage.testCaseDescriptionTextBox).type(updatedTestCaseDescription)
        //Update Test Case Series
        cy.get(TestCasesPage.testCaseSeriesTextBox).clear()
        cy.get(TestCasesPage.testCaseSeriesTextBox).type(updatedTestCaseSeries).type('{enter}')

        //Save edited / updated to test case
        cy.get(this.cuTestCaseButton).click()
        cy.get(this.confirmationMsg).should('contain.text', 'Test case updated successfully!')

        cy.get(EditMeasurePage.testCasesTab).click()

        //Verify edited / updated test case Title and Series exists on Test Cases Page
        this.grabValidateTestCaseTitleAndSeries(updatedTestCaseTitle, updatedTestCaseSeries)

        cy.log('Test Case updated successfully')
    }
    public static clickEditforCreatedTestCase(): void {
        cy.readFile('cypress/fixtures/testCaseId').should('exist').then((fileContents) => {
            cy.get('[data-testid=edit-test-case-'+ fileContents +']').should('be.visible')
            cy.get('[data-testid=edit-test-case-'+ fileContents +']').should('be.enabled')
            cy.get('[data-testid=edit-test-case-'+ fileContents +']').click()
        })
    }
    public static CreateTestCaseAPI(title: string, series: string, description: string, jsonValue?: string, twoTestCases?: boolean, altUser?: boolean): string {
        let user = ''
        let measurePath = ''
        let testCasePath = ''
        if (altUser)
        {
            cy.setAccessTokenCookieALT()
            user = Environment.credentials().harpUserALT
        }
        else
        {
            cy.setAccessTokenCookie()
            user = Environment.credentials().harpUser
        }
        if (twoTestCases === true)
        {
            measurePath = 'cypress/fixtures/measureId2'
            testCasePath = 'cypress/fixtures/testcaseId2'
            //cy.writeFile('cypress/fixtures/measureId2', response.body.id)
        }
        else
        {
            measurePath = 'cypress/fixtures/measureId'
            testCasePath = 'cypress/fixtures/testcaseId'
            //cy.writeFile('cypress/fixtures/measureId', response.body.id)
        }

        //Add Test Case to the Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile(measurePath).should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/test-cases',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'POST',
                    body: {
                        'name': "DENOMFail",
                        'series': series,
                        'title': title,
                        'description': description,
                        'json': jsonValue
                        //"{ \n  Encounter: \"Office Visit union\" \n  Id: \"Identifier\" \n  value: \"Visit out of hours (procedure)\" \n}"
                    }
                }).then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.id).to.be.exist
                    expect(response.body.series).to.eql(series)
                    expect(response.body.title).to.eql(title)
                    expect(response.body.description).to.eql(description)
                    cy.writeFile(testCasePath, response.body.id)
                })
            })
        })
        return user
    }
}

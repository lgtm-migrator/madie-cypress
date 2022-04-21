import {Header} from "./Header"
import {Environment} from "./Environment"
import {EditMeasurePage} from "./EditMeasurePage";

export class CQLLibraryPage {

    public static readonly createCQLLibraryBtn = '[data-testid="create-new-cql-library-button"]'
    public static readonly cqlLibraryNameTextbox = '#cqlLibraryName'
    public static readonly cqlLibraryModelDropdown = '#cqlLibraryModel'
    public static readonly allLibrariesBtn = '[data-testid="all-cql-libraries-tab"]'
    //cql Library editor box on page
    public static readonly cqlLibraryEditorTextBox = '.ace_content'
    public static readonly cqlLibraryModelQICore = '[data-testid="cql-library-model-option-QI-Core"]'
    public static readonly saveCQLLibraryBtn = '[data-testid="cql-library-save-button"]'//'#saveBtn'
    public static readonly cqlLibraryNameList = ':nth-child(1) > .CqlLibraryList___StyledTd-sc-1rv02q7-10'
    public static readonly cqlLibraryModelList = ':nth-child(1) > .CqlLibraryList___StyledTd2-sc-1rv02q7-11'
    public static readonly cqlLibraryNameInvalidError = '[data-testid="cqlLibraryName-helper-text"]'
    public static readonly duplicateCQLLibraryNameError = '[data-testid="cql-library-server-error-alerts"]'
    public static readonly cqlLibraryModelErrorMsg = '#cqlLibraryModel-helper-text'
    public static readonly successfulCQLSaveNoErrors = '[data-testid=cql-library-success-alert]'

    //Error marker inside of the CQL Editor window
    public static readonly errorInCQLEditorWindow = 'div.ace_gutter-cell.ace_error'

    //Version and Draft CQL Library
    public static readonly versionLibraryRadioButton = '[name="type"]'
    public static readonly createVersionContinueButton = '[data-testid="create-version-continue-button"] > :nth-child(1)'
    public static readonly VersionDraftMsgs = '.MuiAlert-message.css-1w0ym84'
    public static readonly cqlLibraryVersionList = ':nth-child(1) > .CqlLibraryList___StyledTd3-sc-1rv02q7-12 > p'
    public static readonly updateDraftedLibraryTextBox = '[data-testid="cql-library-name-text-field"]'
    public static readonly createDraftContinueBtn = '[data-testid="create-draft-continue-button"]'
    public static readonly editLibraryErrorMsgAfterVersion = '.CreateEditCqlLibrary__InfoAlert-sc-4o3bpi-2'


    public static createCQLLibrary (CQLLibraryName: string) : void {

        cy.get(Header.cqlLibraryTab).click()
        cy.get(this.createCQLLibraryBtn).click()
        cy.get(this.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(this.cqlLibraryModelDropdown).click()
        cy.get(this.cqlLibraryModelQICore).click()
        this.clickCreateLibraryButton()
        cy.get(Header.cqlLibraryTab).click()
        cy.get(this.cqlLibraryNameList).contains(CQLLibraryName)
        cy.get(this.cqlLibraryModelList).contains('QI-Core')

        cy.log('CQL Library Created Successfully')
    }

    public static clickCreateLibraryButton() : void {

        let alias = 'library' + (Date.now().valueOf()+1).toString()
        //setup for grabbing the measure create call
        cy.intercept('POST', '/api/cql-libraries').as(alias)

        cy.get(this.saveCQLLibraryBtn).click()
        //saving measureID to file to use later
        cy.wait('@' + alias).then(({response}) => {
            expect(response.statusCode).to.eq(201)
            cy.writeFile('cypress/fixtures/cqlLibraryId', response.body.id)
        })
    }

    public static createCQLLibraryAPI(CqlLibraryName: string, twoLibraries?: boolean, altUser?: boolean): string {
        let user = ''

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

        //Create New CQL Library
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/cql-libraries',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                method: 'POST',
                body: {
                    'cqlLibraryName': CqlLibraryName,
                    'model': 'QI-Core',
                    'createdBy': user
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                expect(response.body.cqlLibraryName).to.eql(CqlLibraryName)
                if (twoLibraries === true)
                {
                    cy.writeFile('cypress/fixtures/cqlLibraryId2', response.body.id)
                }
                else
                {
                    cy.writeFile('cypress/fixtures/cqlLibraryId', response.body.id)
                }

            })
        })
        return user
    }


    public static clickEditforCreatedLibrary(): void {

        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).click()
        cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((fileContents) => {

            cy.intercept('GET', '/api/cql-libraries/' + fileContents).as('cqlLibrary')

            cy.get('[data-testid=edit-cqlLibrary-'+ fileContents +']').click()

            cy.wait('@cqlLibrary').then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })

        })
    }

    public static validateCQLLibraryName(expectedValue: string): void {

        cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((fileContents) => {
            let element = cy.get('[data-testid=edit-cqlLibrary-'+ fileContents +']').parent()
            element.parent().should('contain', expectedValue)

        })
    }

    public static clickVersionforCreatedLibrary(secondLibrary?: boolean): void {

        let filePath = 'cypress/fixtures/cqlLibraryId'

        if (secondLibrary === true)
        {
            filePath = 'cypress/fixtures/cqlLibraryId2'
        }

        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).click()
        cy.readFile(filePath).should('exist').then((fileContents) => {
            cy.get('[data-testid="create-new-version-'+ fileContents +'-button"]').click()
        })
    }

    public static validateVersionNumber(expectedValue: string, versionNumber: string): void {
        cy.readFile('cypress/fixtures/cqlLIbraryId').should('exist').then((fileContents) => {

            let element = cy.get('[data-testid=cqlLibrary-button-'+ fileContents +']').parent()
            element.parent().should('contain', expectedValue).children().eq(2).should('contain', versionNumber)
        })
    }

    public static clickDraftforCreatedLibrary(): void {

        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).click()
        cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((fileContents) => {
            cy.get('[data-testid="create-new-draft-'+ fileContents +'-button"]').click()
        })
    }
}


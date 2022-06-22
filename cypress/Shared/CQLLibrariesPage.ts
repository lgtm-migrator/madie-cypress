
import {Utilities} from "../Shared/Utilities"
import {Header} from "./Header";

export class CQLLibrariesPage {

    //Version and Draft CQL Library
    public static readonly versionLibraryRadioButton = '[name="type"]'
    public static readonly createVersionContinueButton = '[data-testid="create-version-continue-button"] > :nth-child(1)'
    public static readonly VersionDraftMsgs = '.MuiAlert-message.css-1w0ym84'
    public static readonly cqlLibraryVersionList = ':nth-child(1) > .CqlLibraryList___StyledTd3-sc-1rv02q7-12 > p'
    public static readonly updateDraftedLibraryTextBox = '[data-testid="cql-library-name-text-field"]'
    public static readonly createDraftContinueBtn = '[data-testid="create-draft-continue-button"]'
    public static readonly editLibraryErrorMsgAfterVersion = '.CreateEditCqlLibrary__InfoAlert-sc-4o3bpi-2'
    public static readonly versionErrorMsg = '[data-testid=create-version-error-message]'
    public static readonly versionCancelBtn = '[data-testid="create-version-cancel-button"]'





    public static clickEditforCreatedLibrary(secondLibrary?: boolean): void {
        let filePath = 'cypress/fixtures/cqlLibraryId'

        if (secondLibrary === true)
        {
            filePath = 'cypress/fixtures/cqlLibraryId2'
        }
        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).click()
        cy.readFile(filePath).should('exist').then((fileContents) => {

            cy.intercept('GET', '/api/cql-libraries/' + fileContents).as('cqlLibrary')

            cy.get('[data-testid=edit-cqlLibrary-'+ fileContents +']').should('be.visible')
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
        cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((fileContents) => {

            let element = cy.get('[data-testid=cqlLibrary-button-'+ fileContents +']').parent()
            element.parent().should('contain', expectedValue).children().eq(2).should('contain', versionNumber)
        })
    }

    public static clickDraftforCreatedLibrary(): void {

        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).should('exist')
        cy.get(Header.cqlLibraryTab).should('be.visible')
        cy.get(Header.cqlLibraryTab).click()
        cy.readFile('cypress/fixtures/cqlLibraryId').should('exist').then((fileContents) => {
            cy.get('[data-testid="create-new-draft-'+ fileContents +'-button"]').click()
        })
    }
}
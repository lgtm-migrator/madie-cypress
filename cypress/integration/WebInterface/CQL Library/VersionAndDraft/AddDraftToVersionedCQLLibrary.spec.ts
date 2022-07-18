import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../../Shared/CQLLibraryPage"
import {CQLLibrariesPage} from "../../../../Shared/CQLLibrariesPage"

let CqlLibraryOne = ''
let updatedCqlLibraryName = ''

//skipping do to issue with createAPICQLLibraryWithValidCQL and its CQL value
describe('Add Draft to CQL Library', () => {

    beforeEach('Create CQL Library and Login', () => {
        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryOne)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Add Draft to the versioned Library', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedTestLibrary1' + Date.now()

        //Click Edit CQL Library
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Add valid CQL to the CQL Editor
        cy.readFile('cypress/fixtures/CQLForTestCaseExecution.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        CQLLibrariesPage.clickVersionforCreatedLibrary()
        cy.get(CQLLibrariesPage.versionLibraryRadioButton).should('exist')
        cy.get(CQLLibrariesPage.versionLibraryRadioButton).should('be.enabled')
        cy.get(CQLLibrariesPage.versionLibraryRadioButton).eq(0).click()

        cy.get(CQLLibrariesPage.createVersionContinueButton).should('exist')
        cy.get(CQLLibrariesPage.createVersionContinueButton).should('be.visible')
        cy.get(CQLLibrariesPage.createVersionContinueButton).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibrariesPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibrariesPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).should('exist')
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).should('be.visible')
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).should('be.enabled')
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName)

        cy.get(CQLLibrariesPage.createDraftContinueBtn).should('exist')
        cy.get(CQLLibrariesPage.createDraftContinueBtn).should('be.visible')
        cy.get(CQLLibrariesPage.createDraftContinueBtn).should('be.enabled')
        cy.get(CQLLibrariesPage.createDraftContinueBtn).click()

        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'New Draft of CQL Library is Successfully created')
        cy.get(CQLLibrariesPage.cqlLibraryVersionList).should('contain', 'Draft 1.0.000')
        cy.log('Draft Created Successfully')
    })

})



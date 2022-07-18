import {CQLLibraryPage} from "../../../../Shared/CQLLibraryPage"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CQLLibrariesPage} from "../../../../Shared/CQLLibrariesPage"

let apiCQLLibraryName = 'TestLibrary' + Date.now()
let updatedCqlLibraryName = 'UpdatedTestLibrary' + Date.now()
let versionNumber = '1.0.000'

describe('Add Draft to CQL Library', () => {

    before('Create CQL library', () => {

        //Create CQL Library
        CQLLibraryPage.createCQLLibraryAPI(apiCQLLibraryName)

        OktaLogin.Login()

    })

    after('Logout', () => {

        OktaLogin.Logout()

    })

    it('Add Draft to the versioned Library', () => {

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
        CQLLibrariesPage.validateVersionNumber(apiCQLLibraryName, versionNumber)
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
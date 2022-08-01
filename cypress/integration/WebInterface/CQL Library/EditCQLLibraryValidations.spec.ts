import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibrariesPage} from "../../../Shared/CQLLibrariesPage"

let CQLLibraryName = 'TestLibrary' + Date.now()

describe('Edit Measure', () => {
    before('Create Measure', () => {

        //Create CQL Library
        CQLLibraryPage.createCQLLibraryAPI(CQLLibraryName)
    })

    beforeEach('Login', () => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Verify error messages when the edit CQL Library name entered is invalid', () => {

        //Click on Edit button, Verify error message when the CQL Library Name field is empty
        CQLLibrariesPage.clickEditforCreatedLibrary()
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear()
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).focus().blur()
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name is required.')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has special characters
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).type('UpdatedTest_@Library')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name does not start with an Upper Case letter
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('updatedTestLibrary')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has spaces
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('UpdatedTest   Library')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has only numbers
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('35657')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has more than 255 characters
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name cannot be more than 255 characters.')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')
    })

})
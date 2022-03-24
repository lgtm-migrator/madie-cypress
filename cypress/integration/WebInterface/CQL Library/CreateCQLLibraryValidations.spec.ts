import {OktaLogin} from "../../../Shared/OktaLogin"
import {Header} from "../../../Shared/Header"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"


describe('CQL Library Validations', () => {

    let apiCQLLibraryName = 'TestLibrary' + Date.now()

    before('Create CQL Library', () => {

        CQLLibraryPage.createCQLLibraryAPI(apiCQLLibraryName)
    })

    beforeEach('Login', () => {
        OktaLogin.Login()

    })
    afterEach('Logout', () => {
        OktaLogin.Logout()

    })

    it('CQL Library Name Validations', () => {

        cy.get(Header.cqlLibraryTab).click()
        cy.get(CQLLibraryPage.createCQLLibraryBtn).click()

        //Verify error message when the CQL Library Name field is empty
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).focus().blur()
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name is required.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has special characters
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).type('Test_@Measure')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name does not start with an Upper Case letter
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('testMeasure')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has spaces
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('Test   Measure')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has only numbers
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('35657')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name must start with an upper case letter, followed by alpha-numeric character(s) and must not contain spaces or other special characters.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')

        //Verify error message when the CQL Library Name has more than 255 characters
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type('Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw')
        cy.get(CQLLibraryPage.cqlLibraryNameInvalidError).should('contain.text', 'Library name cannot be more than 255 characters.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')

        //Verify error message for duplicate CQL Library Name
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear().type(apiCQLLibraryName)
        cy.get(CQLLibraryPage.cqlLibraryModelDropdown).click()
        cy.get(CQLLibraryPage.cqlLibraryModelQICore).click()
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()
        cy.get(CQLLibraryPage.duplicateCQLLibraryNameError).should('contain.text', 'Library name must be unique. cqlLibraryName : Library name must be unique.')

    })

    it('CQL Library Model Validations', () => {

        let CQLLibraryName = 'TestLibrary' + Date.now()

        //Verify error message for empty CQL Library Model
        cy.get(Header.cqlLibraryTab).click()
        cy.get(CQLLibraryPage.createCQLLibraryBtn).click()
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(CQLLibraryPage.cqlLibraryModelDropdown).focus().blur()
        cy.get(CQLLibraryPage.cqlLibraryModelErrorMsg).should('contain.text', 'A CQL library model is required.')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.disabled')
    })
})

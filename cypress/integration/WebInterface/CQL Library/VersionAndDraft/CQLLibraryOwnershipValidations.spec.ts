import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../../Shared/CQLLibraryPage"
import {Header} from "../../../../Shared/Header"
import {CQLLibrariesPage} from "../../../../Shared/CQLLibrariesPage"

let CqlLibraryOne = ''
let CqlLibraryTwo = ''
let CQLLibraryPublisher = 'SemanticBits'

describe('Verify non Library owner unable to create Version', () => {

    before('Create CQL Library using ALT user', () => {
        //Create Measure with Alternate User
        CqlLibraryTwo = 'TestLibrary2' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryTwo, CQLLibraryPublisher,  true, true)
    })

    beforeEach('Create CQL Library and Login', () => {
        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryOne, CQLLibraryPublisher)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    //Skipping until MAT-5012 is fixed
    it.skip('Verify non Library owner unable to create Version', () => {

        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).click()

        //Navigate to All Libraries tab
        cy.get(CQLLibraryPage.allLibrariesBtn).click()
        CQLLibrariesPage.clickVersionforCreatedLibrary(true)
        cy.get(CQLLibrariesPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibrariesPage.createVersionContinueButton).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'User is unauthorized to create a version')
    })

})

describe('Edit CQL Library ownership validations', () => {

    beforeEach('Create CQL Library with regular user and Login as Alt user', () => {

        CqlLibraryOne = 'TestLibrary' + Date.now()

        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryOne, CQLLibraryPublisher)

        OktaLogin.AltLogin()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()
    })

    it('Verify Non owner of the library unable to edit details', () => {

        //Navigate to CQL Library Page
        cy.get(Header.cqlLibraryTab).click()

        //Navigate to All Libraries tab
        cy.get(CQLLibraryPage.allLibrariesBtn).click()

        //Edit CQL Library
        CQLLibrariesPage.clickEditforCreatedLibrary()
        cy.get(CQLLibraryPage.editLibraryOwnershipError).should('contain.text', 'You are not the owner of the CQL Library. Only owner can edit it.')
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).should('have.attr', 'readonly', 'readonly')
        cy.get(CQLLibraryPage.cqlLibraryDesc).should('have.attr', 'readonly', 'readonly')
        cy.get(CQLLibraryPage.updateCQLLibraryBtn).should('be.disabled')

    })
})


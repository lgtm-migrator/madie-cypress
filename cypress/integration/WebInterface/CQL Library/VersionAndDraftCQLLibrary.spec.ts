import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Header} from "../../../Shared/Header"

let CqlLibraryOne = ''
let CqlLibraryTwo = ''
let updatedCqlLibraryName = 'UpdatedTestLibrary' + Date.now()

describe('Add Version and Draft to CQL Library', () => {

    before('Create CQL Library', () => {

        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createCQLLibraryAPI(CqlLibraryOne)

        //Create Measure with Alternate User
        CqlLibraryTwo = 'TestLibrary2' + Date.now()
        CQLLibraryPage.createCQLLibraryAPI(CqlLibraryTwo, true, true)
    })

    beforeEach('Login', () => {

        OktaLogin.Login()

    })

    afterEach('Login', () => {

        OktaLogin.Logout()

    })

    it('Add Version to the CQL Library', () => {

        let versionNumber = '1.0.000'

        CQLLibraryPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.successfulVersionMsg).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

    })

    it('Add Draft to the versioned Library', () => {

        CQLLibraryPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName)
        cy.get(CQLLibraryPage.createDraftContinueBtn).click()
        cy.get(CQLLibraryPage.successfulVersionMsg).should('contain.text', 'New Draft of CQL Library is Successfully created')
        cy.get(CQLLibraryPage.cqlLibraryVersionList).should('contain', 'Draft 1.0.000')
        cy.log('Draft Created Successfully')
    })

   it('Verify non Library owner unable to create Version', () => {

       //Navigate to CQL Library Page
       cy.get(Header.cqlLibraryTab).click()

       //Navigate to All Libraries tab
       cy.get(CQLLibraryPage.allLibrariesBtn).click()
       CQLLibraryPage.clickVersionforCreatedLibrary(true)
       cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()
       cy.get(CQLLibraryPage.createVersionContinueButton).click()
       cy.get(CQLLibraryPage.successfulVersionMsg).should('contain.text', 'User is unauthorized to create a version')
   })
})
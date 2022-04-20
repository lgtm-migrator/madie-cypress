import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Header} from "../../../Shared/Header"

let CqlLibraryOne = ''
let CqlLibraryTwo = ''
let CqlLibraryOther = ''
let updatedCqlLibraryName = ''

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

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Add Version to the CQL Library', () => {

        let versionNumber = '1.0.000'

        CQLLibraryPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

    })

    it('Add Draft to the versioned Library', () => {

        updatedCqlLibraryName = 'UpdatedTestLibrary1' + Date.now()

        CQLLibraryPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName)
        cy.get(CQLLibraryPage.createDraftContinueBtn).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New Draft of CQL Library is Successfully created')
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
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'User is unauthorized to create a version')
    })
})

describe('Draft and Version Validations', () => {

    beforeEach('Login', () => {

        //Create CQL Library
        CqlLibraryOne = 'TestLibraryOne' + Date.now()
        CQLLibraryPage.createCQLLibraryAPI(CqlLibraryOne)

        CqlLibraryOther = 'AnotherLibrary' + Date.now()
        CQLLibraryPage.createCQLLibraryAPI(CqlLibraryOther, true, false)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

   it('User cannot create a draft of a draft that already exists, while the version is still open', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedCQLLibraryOne' + Date.now()

        CQLLibraryPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibraryPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName)
        cy.get(CQLLibraryPage.createDraftContinueBtn).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New Draft of CQL Library is Successfully created')
        cy.get(CQLLibraryPage.cqlLibraryVersionList).should('contain', 'Draft 1.0.000')
        cy.log('Draft Created Successfully')

        CQLLibraryPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName+'1')
        cy.get(CQLLibraryPage.createDraftContinueBtn).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'Cannot draft resource CQL Library. A draft already exists for the CQL Library Group.')
   })

    it('Verify the CQL Library updates are restricted after Version is created', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedCQLLibraryOne' + Date.now()

        CQLLibraryPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibraryPage.clickEditforCreatedLibrary()
        cy.get(CQLLibraryPage.editLibraryErrorMsgAfterVersion).should('contain.text', 'CQL Library is not a draft. Only drafts can be edited.')
    })

    it('Draft cannot be saved with a name that exists for a different library', () => {
        let versionNumber = '1.0.000'
        CQLLibraryPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibraryPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(CqlLibraryOther)
        cy.get(CQLLibraryPage.createDraftContinueBtn).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'Requested Cql Library cannot be drafted. Library name must be unique.')
        cy.log('Draft was not created due to the attempt to use the name of an already existing Library')
    })

})
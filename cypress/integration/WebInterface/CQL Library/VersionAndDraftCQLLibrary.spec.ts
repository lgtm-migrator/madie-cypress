import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Header} from "../../../Shared/Header"

let CqlLibraryOne = ''
let CqlLibraryTwo = ''
let CqlLibraryOther = ''
let updatedCqlLibraryName = ''

describe('Add Version and Draft to CQL Library', () => {

    before('Create CQL Library using ALT user', () => {
        //Create Measure with Alternate User
        CqlLibraryTwo = 'TestLibrary2' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryTwo, true, true)
    })

    beforeEach('Craete CQL Library and Login', () => {
        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryOne)
        
        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Add Version to the CQL Library', () => {

        let versionNumber = '1.0.000'

        CQLLibraryPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibraryPage.versionLibraryRadioButton).should('exist')
        cy.get(CQLLibraryPage.versionLibraryRadioButton).should('be.enabled')          
        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()

        cy.get(CQLLibraryPage.createVersionContinueButton).should('exist')
        cy.get(CQLLibraryPage.createVersionContinueButton).should('be.visible')
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

    })

    it('Add Draft to the versioned Library', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedTestLibrary1' + Date.now()

        CQLLibraryPage.clickVersionforCreatedLibrary()
        cy.get(CQLLibraryPage.versionLibraryRadioButton).should('exist')
        cy.get(CQLLibraryPage.versionLibraryRadioButton).should('be.enabled')          
        cy.get(CQLLibraryPage.versionLibraryRadioButton).eq(0).click()

        cy.get(CQLLibraryPage.createVersionContinueButton).should('exist')
        cy.get(CQLLibraryPage.createVersionContinueButton).should('be.visible')
        cy.get(CQLLibraryPage.createVersionContinueButton).click()
        cy.get(CQLLibraryPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibraryPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibraryPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).should('exist')
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).should('be.visible')
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).should('be.enabled')
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName)

        cy.get(CQLLibraryPage.createDraftContinueBtn).should('exist')
        cy.get(CQLLibraryPage.createDraftContinueBtn).should('be.visible')
        cy.get(CQLLibraryPage.createDraftContinueBtn).should('be.enabled') 
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

    before('Create CQL Library', () => {
        //create a single use CQL Library
        CqlLibraryOther = 'Another' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryOther)
    })

    beforeEach('Craete CQL Library and Login', () => {
        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createCQLLibraryWithValidCQL(CqlLibraryOne)

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
        cy.get(CQLLibraryPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName + '1')
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

    it('User can not version CQL Library if there is no CQL', () => {

        CQLLibraryPage.clickEditforCreatedLibrary()

        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('exist')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.enabled')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        CQLLibraryPage.clickVersionforCreatedLibrary()
        cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(4)').should('contain.text', 'Versioning cannot be done as there is no associated Cql with this library')

        //Click on cancel version button
        cy.get(CQLLibraryPage.versionCancelBtn).click()
    })

})

describe('Version CQL Library with errors', () => {

    beforeEach('Login', () => {

        //Create CQL Library
        CqlLibraryOther = 'CQLLibraryWithErrors' + Date.now()
        CQLLibraryPage.createCQLLibraryWithInvalidCQL(CqlLibraryOther)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('User can not version the CQL library if the CQL has errors', () => {

        CQLLibraryPage.clickVersionforCreatedLibrary()
        cy.get(CQLLibraryPage.versionErrorMsg).should('contain.text', 'Versioning cannot be done as the Cql has errors in it')

        //Click on cancel version button
        cy.get(CQLLibraryPage.versionCancelBtn).click()
    })

})

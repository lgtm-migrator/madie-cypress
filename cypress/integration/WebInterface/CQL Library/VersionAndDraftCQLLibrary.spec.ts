import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Header} from "../../../Shared/Header"
import {CQLLibrariesPage} from "../../../Shared/CQLLibrariesPage"

let CqlLibraryOne = ''
let CqlLibraryTwo = ''
let CqlLibraryOther = ''
let updatedCqlLibraryName = ''

describe('Add Version and Draft to CQL Library', () => {

    before('Create CQL Library using ALT user', () => {
        //Create Measure with Alternate User
        CqlLibraryTwo = 'TestLibrary2' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryTwo, true, true)
    })

    beforeEach('Create CQL Library and Login', () => {
        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryOne)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Add Version to the CQL Library', () => {

        let versionNumber = '1.0.000'

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

    })

    it('Add Draft to the versioned Library', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedTestLibrary1' + Date.now()

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

    it('Verify non Library owner unable to create Version', () => {

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

describe.only('Draft and Version Validations', () => {

    before('Create CQL Library', () => {
        //create a single use CQL Library
        CqlLibraryOther = 'Another' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryOther)
    })

    beforeEach('Craete CQL Library and Login', () => {
        //Create CQL Library with Regular User
        CqlLibraryOne = 'TestLibrary1' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithValidCQL(CqlLibraryOne)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('User cannot create a draft of a draft that already exists, while the version is still open', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedCQLLibraryOne' + Date.now()

        CQLLibrariesPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibrariesPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibrariesPage.createVersionContinueButton).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibrariesPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibrariesPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName)
        cy.get(CQLLibrariesPage.createDraftContinueBtn).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'New Draft of CQL Library is Successfully created')
        cy.get(CQLLibrariesPage.cqlLibraryVersionList).should('contain', 'Draft 1.0.000')
        cy.log('Draft Created Successfully')

        CQLLibrariesPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).clear().type(updatedCqlLibraryName + '1')
        cy.get(CQLLibrariesPage.createDraftContinueBtn).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'Cannot draft resource CQL Library. A draft already exists for the CQL Library Group.')
    })

    it('Verify the CQL Library updates are restricted after Version is created', () => {

        let versionNumber = '1.0.000'
        updatedCqlLibraryName = 'UpdatedCQLLibraryOne' + Date.now()

        CQLLibrariesPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibrariesPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibrariesPage.createVersionContinueButton).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibrariesPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibrariesPage.clickEditforCreatedLibrary()
        cy.get(CQLLibrariesPage.editLibraryErrorMsgAfterVersion).should('contain.text', 'CQL Library is not a draft. Only drafts can be edited.')
    })

    it('Draft cannot be saved with a name that exists for a different library', () => {


        let versionNumber = '1.0.000'

        CQLLibrariesPage.clickVersionforCreatedLibrary()

        cy.get(CQLLibrariesPage.versionLibraryRadioButton).eq(0).click()
        cy.get(CQLLibrariesPage.createVersionContinueButton).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'New version of CQL Library is Successfully created')
        CQLLibrariesPage.validateVersionNumber(CqlLibraryOne, versionNumber)
        cy.log('Version Created Successfully')

        CQLLibrariesPage.clickDraftforCreatedLibrary()
        cy.get(CQLLibrariesPage.updateDraftedLibraryTextBox).clear().type(CqlLibraryOther)
        cy.get(CQLLibrariesPage.createDraftContinueBtn).click()
        cy.get(CQLLibrariesPage.VersionDraftMsgs).should('contain.text', 'Requested Cql Library cannot be drafted. Library name must be unique.')
        cy.log('Draft was not created due to the attempt to use the name of an already existing Library')
    })

    it('User can not version CQL Library if there is no CQL', () => {

        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).should('exist')
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).should('be.visible')

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('exist')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.visible')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.enabled')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('be.visible')
        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        CQLLibrariesPage.clickVersionforCreatedLibrary()
        cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(4)').should('contain.text', 'Versioning cannot be done as there is no associated Cql with this library')

        //Click on cancel version button
        cy.get(CQLLibrariesPage.versionCancelBtn).click()
    })

})

describe('Version CQL Library with errors', () => {

    beforeEach('Login', () => {

        //Create CQL Library
        CqlLibraryOther = 'CQLLibraryWithErrors' + Date.now()
        CQLLibraryPage.createAPICQLLibraryWithInvalidCQL(CqlLibraryOther)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('User can not version the CQL library if the CQL has ELM translation errors', () => {

        cy.get(Header.cqlLibraryTab).click()
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Verify CQL ELM translation errors
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', "ELM: 1:3 | Could not resolve identifier SDE in the current library.ELM: 5:13 | Member SDE Sex not found for type null.")

        CQLLibrariesPage.clickVersionforCreatedLibrary()
        cy.get(CQLLibrariesPage.versionErrorMsg).should('contain.text', 'Versioning cannot be done as the Cql has errors in it')

        //Click on cancel version button
        cy.get(CQLLibrariesPage.versionCancelBtn).click()
    })

    it('User can not version the CQL library if the CQL has parsing errors', () => {

        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')

        //Add valid CQL
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry_FHIR.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{home}')

        //Add parsing error to the valid CQL
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('tdysfdfjch')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.visible')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.enabled')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        //Verify CQL parsing errors
        cy.scrollTo('top')
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).click()
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('be.visible')

        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('exist')
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('not.be.empty')
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('not.be.null')

        CQLLibrariesPage.clickVersionforCreatedLibrary()
        cy.get(CQLLibrariesPage.versionErrorMsg).should('contain.text', 'Versioning cannot be done as the Cql has errors in it')

        //Click on cancel version button
        cy.get(CQLLibrariesPage.versionCancelBtn).click()
    })

})

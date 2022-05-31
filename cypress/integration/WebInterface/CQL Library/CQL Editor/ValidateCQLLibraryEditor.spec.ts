import {OktaLogin} from "../../../../Shared/OktaLogin"
import {Header} from "../../../../Shared/Header"
import {CQLLibraryPage} from "../../../../Shared/CQLLibraryPage"
import {umlsLoginForm} from "../../../../Shared/umlsLoginForm"
import {CQLLibrariesPage} from "../../../../Shared/CQLLibrariesPage"

let apiCQLLibraryName = ''

describe('Validate CQL on CQL Library page', () => {

    beforeEach('Create CQL library', () => {

        apiCQLLibraryName = 'TestLibrary' + Date.now()
        //Create CQL Library
        CQLLibraryPage.createCQLLibraryAPI(apiCQLLibraryName)

        OktaLogin.Login()

    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Add valid CQL on CQL Library Editor and verify no errors appear', () => {

        //Click Edit CQL Library
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Add valid CQL to the CQL Editor
        cy.readFile('cypress/fixtures/CQLForTestCaseExecution.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('not.exist')

    })

    it('Verify errors appear on CQL Library page and in the CQL Editor object, on save and on tab / page load', () => {

        //Click Edit CQL Library
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')

        cy.wait(1000)

        //Update text in the CQL Library Editor that will cause error
        cy.readFile('cypress/fixtures/cqlCQLEditor.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        //save the value in the CQL Editor
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        //Validate error(s) in CQL Editor window
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', "ELM: 1:3 | Could not resolve identifier SDE in the current library.")
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', "ELM: 5:13 | Member SDE Sex not found for type null.")

        //Navigate away from the page
        cy.get(Header.mainMadiePageButton).click()

        //Navigate back to the CQL Library page
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Validate error(s) in CQL Editor windows
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', "ELM: 1:3 | Could not resolve identifier SDE in the current library.")
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', "ELM: 5:13 | Member SDE Sex not found for type null.")

    })

    it('Verify errors appear on CQL Editor page and in the CQL Editor object, on save and on tab / page load, when included library is not found', () => {

        //Click Edit CQL Library
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')

        cy.wait(1000)

        //Update text in the CQL Library Editor that will cause error
        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry_FHIR_404.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        //save the value in the CQL Editor
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.visible')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).should('be.enabled')
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        //Validate error(s) in CQL Editor after saving
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', '"status":404,"error":"Not Found","path":"/api/hapiFhir/libraries/cql"}"')

        //Navigate away from the page
        cy.get(Header.mainMadiePageButton).click()

        //Navigate back to the CQL Library page
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Validate error(s) in CQL Editor persists after saving
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', '"status":404,"error":"Not Found","path":"/api/hapiFhir/libraries/cql"}"')

    })

    it('Verify no errors appear on CQL Editor page and in the CQL Editor object, on save and on tab / page load, when included library is found', () => {

        //Click Edit CQL Library
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')

        cy.wait(1000)

        cy.readFile('cypress/fixtures/EXM124v7QICore4Entry_FHIR.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        //save the value in the CQL Editor
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        //Validate the lack of error(s) in CQL Editor
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('not.exist')

        //Navigate away from the page
        cy.get(Header.mainMadiePageButton).click()

        //Navigate back to the CQL Library page
        CQLLibrariesPage.clickEditforCreatedLibrary()

        //Validate error(s) in CQL Editor persists after saving
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('not.exist')

    })
})

describe('CQL Library: CQL Editor: valueSet', () => {

    beforeEach('Create CQL library', () => {

        apiCQLLibraryName = 'TestLibrary' + Date.now()
        //Create CQL Library
        CQLLibraryPage.createCQLLibraryAPI(apiCQLLibraryName)

        OktaLogin.Login(false)

    })

    afterEach('Logout and Clean up Measures', () => {

        OktaLogin.Logout()

    })

    it('UMLS Error: User Not Logged in', () => {

        //Click on Edit Button
        CQLLibrariesPage.clickEditforCreatedLibrary()

        cy.readFile('cypress/fixtures/ValueSetTestingEntryValid.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('be.visible')
        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        cy.get(CQLLibraryPage.umlsErrorMessage).should('be.visible')
        cy.get(CQLLibraryPage.umlsErrorMessage).should('contain.text', 'Please log in to UMLS!')

    })

    it('Value Sets are valid', () => {

        umlsLoginForm.UMLSLogin()

        //Click on Edit Button
        CQLLibrariesPage.clickEditforCreatedLibrary()

        cy.readFile('cypress/fixtures/ValueSetTestingEntryValid.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('be.visible')
        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        cy.get(CQLLibraryPage.umlsSuccessMessage).should('be.visible')
        cy.get(CQLLibraryPage.umlsSuccessMessage).should('contain.text', 'Value Set is valid!')

    })

    it('Value Set Invalid', () => {

        umlsLoginForm.UMLSLogin()

        //Click on Edit Button
        CQLLibrariesPage.clickEditforCreatedLibrary()

        cy.readFile('cypress/fixtures/ValueSetTestingEntryInValid.txt').should('exist').then((fileContents) => {
            cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type(fileContents)
        })

        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()

        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('be.visible')
        cy.get(CQLLibraryPage.successfulCQLSaveNoErrors).should('contain.text', 'Cql Library successfully updated')

        cy.get(CQLLibraryPage.umlsErrorMessage).should('not.be.visible')

        //Validate error(s) in CQL Editor window
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLLibraryPage.errorInCQLEditorWindow).should('exist')

        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLLibraryPage.errorInCQLEditorWindow).eq(0).invoke
        ('show').click({force:true, multiple: true})

        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text',
            'ELM: 1:102 | Request failed with status code 404 for oid = ' +
            '2.16.840.1.113883.3.464.1003.110.12.105900 location = 18:1-18:102')
    })
})
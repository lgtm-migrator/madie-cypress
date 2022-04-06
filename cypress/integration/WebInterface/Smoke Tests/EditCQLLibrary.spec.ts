import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Header} from "../../../Shared/Header"

let CQLLibraryName = 'TestLibrary' + Date.now()
let updatedCQLLibraryName= 'UpdatedTestLibrary' + Date.now()

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

    it('Edit CQL Library Name and verify the library is updated on CQL Library page', () => {

        //Edit CQL Library Name
        CQLLibraryPage.clickEditforCreatedLibrary()

        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).clear()
        cy.get(CQLLibraryPage.cqlLibraryNameTextbox).type(updatedCQLLibraryName)
        cy.get(CQLLibraryPage.saveCQLLibraryBtn).click()
        cy.log('CQL Library Updated Successfully')

        //Navigate back to CQL Library page and verify if the Library Name is updated
        cy.get(Header.cqlLibraryTab).click()

        CQLLibraryPage.validateCQLLibraryName(updatedCQLLibraryName)
    })
})
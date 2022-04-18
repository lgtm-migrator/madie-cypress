import {OktaLogin} from "../../../Shared/OktaLogin"
import {Header} from "../../../Shared/Header"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"
import {Utilities} from "../../../Shared/Utilities"

describe('CQL Library Version and Draft tests', () => {

    let apiCQLLibraryName = 'TestLibrary' + Date.now()
    let CQLLibraryName = 'TestLibrary' + Date.now()

    beforeEach('Create CQL Library and Login', () => {
        let randValueAPICQLLIbraryName = (Math.floor((Math.random() * 1000) + 1))
        let apiCQLLibraryNameBE = apiCQLLibraryName + randValueAPICQLLIbraryName
        CQLLibraryPage.createCQLLibraryAPI(apiCQLLibraryNameBE)
        OktaLogin.Login()

    })
    afterEach('Logout', () => {
        OktaLogin.Logout()
    })
})
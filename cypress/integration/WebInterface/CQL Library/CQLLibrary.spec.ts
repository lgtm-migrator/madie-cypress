import {OktaLogin} from "../../../Shared/OktaLogin"
import {CQLLibraryPage} from "../../../Shared/CQLLibraryPage"

let CQLLibraryName = ''

describe('Create CQL Library', () => {

    beforeEach('Login', () => {

        OktaLogin.Login()
    })

    afterEach('Logout', () => {

        OktaLogin.Logout()

    })

    it('Navigate to CQL Library Page and create New Library', () => {

        CQLLibraryName = 'TestLibrary' + Date.now()

       CQLLibraryPage.createCQLLibrary(CQLLibraryName)

    })
})
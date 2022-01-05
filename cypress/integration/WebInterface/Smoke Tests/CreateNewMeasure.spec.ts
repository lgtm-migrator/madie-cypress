import {OktaLogin} from "../../../Shared/OktaLogin"
import {LandingPage} from "../../../Shared/LandingPage"
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"

describe('Create New Measure', () => {

    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Login to Madie and Create New Measure', () => {

        //Create New Measure
        CreateMeasurePage.createCohortMeasure()

        // Navigate to home page
        cy.get(LandingPage.madieLogo).click()
    })

})






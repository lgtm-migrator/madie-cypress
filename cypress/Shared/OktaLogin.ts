import {Header} from "./Header"
import {Environment} from "./Environment"
import {LandingPage} from "./LandingPage"
import {umlsLoginForm} from "./umlsLoginForm"

let umlsLoggedIn = true

//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    //public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'

    public static Login(umlsLogin?: boolean) {

        cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
        cy.url({ timeout: 1000000 }).should('include', '/login')
        cy.get(this.usernameInput, { timeout: 1000000 }).should('be.enabled')
        cy.get(this.usernameInput, { timeout: 1000000 }).should('be.visible')
        cy.get(this.passwordInput, { timeout: 1000000 }).should('be.enabled')
        cy.get(this.passwordInput, { timeout: 1000000 }).should('be.visible')
        cy.get(this.usernameInput).type(Environment.credentials().harpUser)
        cy.get(this.passwordInput).type(Environment.credentials().password)
        cy.get(this.signInButton, { timeout: 1000000 }).should('be.enabled')
        cy.get(this.signInButton, { timeout: 1000000 }).should('be.visible')

        //setup for grabbing the measure create call
        cy.intercept('GET', '/api/vsac/umls-credentials/status').as('umls')

        cy.get(this.signInButton).click()

        cy.wait('@umls').then(({response}) => {
            expect(response.statusCode).to.eq(200)
            umlsLoggedIn = !!response.body

            if (umlsLogin === false || umlsLoggedIn === true) {
                //do nothing
            }
            else
            {
                umlsLoginForm.UMLSLogin()
            }
        })
        cy.get(LandingPage.newMeasureButton).should('be.visible')
        cy.log('Login Successful')

    }


    public static Logout(): void {
        cy.get(Header.userProfileSelect, { timeout: 1000000 }).should('be.visible')
        cy.get(Header.userProfileSelect).should('be.visible')
        cy.get(Header.userProfileSelect).click()
        cy.get(Header.userProfileSelectSignOutOption, { timeout: 1000000 }).should('be.visible')
        cy.get(Header.userProfileSelectSignOutOption).should('be.visible')
        cy.get(Header.userProfileSelectSignOutOption).click({ force: true })

        cy.log('Logout Successful')
    }

}
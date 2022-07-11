import {Header} from "./Header"
import {Environment} from "./Environment"
import {LandingPage} from "./LandingPage"
import {umlsLoginForm} from "./umlsLoginForm"

//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    public static readonly signInButton = '#okta-signin-submit'

    public static Login() {

        cy.visit('/login', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
        cy.get(this.usernameInput, { timeout: 60000 }).should('be.enabled')
        cy.get(this.usernameInput, { timeout: 60000 }).should('be.visible')
        cy.get(this.passwordInput, { timeout: 60000 }).should('be.enabled')
        cy.get(this.passwordInput, { timeout: 60000 }).should('be.visible')
        cy.get(this.usernameInput).type(Environment.credentials().harpUser)
        cy.get(this.passwordInput).type(Environment.credentials().password)
        cy.get(this.signInButton, { timeout: 60000 }).should('be.enabled')
        cy.get(this.signInButton, { timeout: 60000 }).should('be.visible')

        //setup for grabbing the measure create call
        cy.intercept('GET', '/api/vsac/umls-credentials/status').as('umls')

        cy.get(this.signInButton).click()

        cy.wait('@umls').then(({response}) => {

            if(response.statusCode === 200)
            {
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


        cy.get(Header.userProfileSelect).should('exist')
        cy.get(Header.userProfileSelect, { timeout: 1000000 }).should('be.visible')       
        cy.get(Header.userProfileSelect).should('be.visible')
        cy.get(Header.userProfileSelect).invoke('click')
        cy.get(Header.userProfileSelect).click()

        cy.get(Header.userProfileSelectSignOutOption).should('exist')
        cy.get(Header.userProfileSelectSignOutOption, { timeout: 1000000 }).should('be.visible')       
        cy.get(Header.userProfileSelectSignOutOption).should('be.visible')
        cy.get(Header.userProfileSelectSignOutOption).focus()
        cy.get(Header.userProfileSelectSignOutOption).invoke('click')
        cy.intercept('POST', '/api/log/logout').as('logout')
        cy.get(Header.userProfileSelectSignOutOption).click({ force: true })
        cy.wait('@logout', {timeout: 60000}).then(({response}) => {
            expect(response.statusCode).to.eq(405)
        })

        cy.log('Logout Successful')
    }

}
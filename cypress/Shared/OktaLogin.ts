import {Header} from "./Header"
import {Environment} from "./Environment"

//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    //public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'

    public static Login(): void {

        //Navigate to Login page and Login with passed harp user and password
        cy.intercept('POST', 'api/v1/authn').as('login')

        cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
        cy.get(this.usernameInput, { timeout: 600000 }).should('be.visible')
        cy.get(this.usernameInput).type(Environment.credentials().harpUser)
        cy.get(this.passwordInput).type(Environment.credentials().password)
        cy.get(this.signInButton).click()
        cy.wait('@login').its('response.statusCode').should('eq', 200)

        cy.log('Login Successful')

    }

    public static Logout(): void {

        cy.intercept('GET', '/env-config/oktaConfig.json').as('logout')

        cy.get(Header.signOutButton).should('be.visible')
        cy.get(Header.signOutButton).click({force:true})
        cy.get(this.usernameInput, { timeout: 600000 }).should('be.visible')
        cy.wait('@logout').its('response.statusCode').should('eq', 200)

        cy.log('Logout Successful')
    }

}
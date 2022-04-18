import {Header} from "./Header"
import {Environment} from "./Environment"
import {LandingPage} from "./LandingPage";

//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    //public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'

    public static Login(): void {

        cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
        cy.url({ timeout: 100000 }).should('include', '/login')
        cy.get(this.usernameInput, { timeout: 600000 }).should('be.visible')
        cy.get(this.usernameInput).type(Environment.credentials().harpUser)
        cy.get(this.passwordInput).type(Environment.credentials().password)
        cy.get(this.signInButton).click()
        cy.get(LandingPage.newMeasureButton).should('be.visible')
        cy.log('Login Successful')

    }

    public static Logout(): void {

        cy.get(Header.userProfileSelect).should('be.visible')
        cy.get(Header.userProfileSelect).select('Sign Out')
        //cy.url({ timeout: 100000 }).should('include', '/login')
        cy.log('Logout Successful')
    }

}
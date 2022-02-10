import {LandingPage} from "./LandingPage"
import {Environment} from "./Environment"


//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    //public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'

    public static Login(): void {

        //navigate to Login page
        cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })

        //Login with passed harp user and password
        cy.get(this.usernameInput, { timeout: 400000 }).should('be.visible')
        cy.get(this.usernameInput).type(Environment.credentials().harpUser)
        cy.get(this.passwordInput).type(Environment.credentials().password)
        cy.get(this.signInButton).click()
        //Verify the success message on home page
        cy.get(LandingPage.loginSuccessmsg).should('contain.text', 'You are successfully logged in')
        cy.log('Login Successful')
    }

    public static Logout(): void {
        cy.get(LandingPage.signOutButton).should('be.visible')
        cy.get(LandingPage.signOutButton).click()
        cy.log('Logout Successful')
    }
}
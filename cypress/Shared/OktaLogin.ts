import {LandingPage} from "./LandingPage"

//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    //public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'
    public static readonly signOutButton = '#main > :nth-child(2) > :nth-child(4)'

    // private static harpUser = Cypress.env('DEV_USERNAME')
    // private static password = Cypress.env('DEV_PASSWORD')

    private static harpUser = Cypress.env('MADIE_DEV_USERNAME')
    private static password = Cypress.env('MADIE_DEV_PASSWORD')

    public static Login(): void {

        //navigate to Login page
        cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })

        //Login with passed harp user and password
        cy.get(this.usernameInput, { timeout: 400000 }).should('be.visible')
        cy.get(this.usernameInput).type(this.harpUser)
        cy.get(this.passwordInput).type(this.password)
        cy.get(this.signInButton).click()
        //Verify the success message on home page
        cy.get(LandingPage.loginSuccessmsg).should('contain.text', 'You are successfully logged in')
        cy.log('Login Successful')
    }

    public static Logout(): void {
        cy.get(this.signOutButton).should('be.visible')
        cy.get(this.signOutButton).click()
        cy.log('Logout Successful')
    }
}
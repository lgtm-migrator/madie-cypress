import { MATMeasureLibraryExample } from './MATMeasureLibraryExample'

//Example Login Class
export class MATLoginExample {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'

    private static harpUser = Cypress.env('DEV_USERNAME')
    private static password = Cypress.env('DEV_PASSWORD')

    public static Login(): void {

        //navigate to Login page
        cy.visit('/MeasureAuthoringTool/Login.html', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })

        //Login with passed harp user and password
        cy.get(this.usernameInput, { timeout: 400000 }).should('be.visible')
        cy.get(this.usernameInput).type(this.harpUser)
        cy.get(this.passwordInput).type(this.password)

        cy.get(this.termsConditionsCheckbox).click()
        cy.get(this.signInButton).click()

        cy.get(MATMeasureLibraryExample.row1MeasureSearch, { timeout: 400000 }).should('be.visible')

        cy.log('Login Successful')
    }
}

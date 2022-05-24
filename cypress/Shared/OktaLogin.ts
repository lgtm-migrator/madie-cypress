import {Header} from "./Header"
import {Environment} from "./Environment"
import {LandingPage} from "./LandingPage"
import {umlsLoginForm} from "./umlsLoginForm"

//MADiE OKTA Login Class
export class OktaLogin {

    public static readonly usernameInput = '#okta-signin-username'
    public static readonly passwordInput = '#okta-signin-password'
    //public static readonly termsConditionsCheckbox = '.custom-checkbox'
    public static readonly signInButton = '#okta-signin-submit'

    public static Login(umlsLogin?: boolean) {

        cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
        cy.url({ timeout: 100000 }).should('include', '/login')
        cy.get(this.usernameInput, { timeout: 600000 }).should('be.visible')
        cy.get(this.usernameInput).type(Environment.credentials().harpUser)
        cy.get(this.passwordInput).type(Environment.credentials().password)
        cy.get(this.signInButton).click()
        cy.get(LandingPage.newMeasureButton).should('be.visible')
        cy.log('Login Successful')

        if (umlsLogin === false) {
            //do nothing
        }
        else
        {
            umlsLoginForm.UMLSLogin()
        }

    }


    public static Logout(): void {

        cy.get(Header.userProfileSelect).should('be.visible')
        cy.get(Header.userProfileSelect).click()
        cy.get(Header.userProfileSelectSignOutOption).should('be.visible')
        cy.get(Header.userProfileSelectSignOutOption).click()

        cy.log('Logout Successful')
    }

}
import {Header} from "./Header"
import {Environment} from "./Environment"
import {LandingPage} from "./LandingPage"
import {umlsLoginForm} from "./umlsLoginForm"
import {Utilities} from "./Utilities"

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
    public static UMLSLogin(): void {
               //umls login link appears and is available to click, at the top of the page
               cy.get(Header.umlsLoginButton).should('exist')
               cy.get(Header.umlsLoginButton).should('be.visible')
               cy.get(Header.umlsLoginButton).should('be.enabled')
               cy.get(Header.umlsLoginButton).click()
               
               //form to enter API and to actually log into UMLS appears and is available to read and enter API key
               cy.get(umlsLoginForm.umlsForm).should('exist')
               cy.get(umlsLoginForm.umlsForm).should('be.visible')
               
               //enter API key into input text box
               cy.get(umlsLoginForm.apiTextInput).should('exist')
               cy.get(umlsLoginForm.apiTextInput).click()
               cy.get(umlsLoginForm.apiTextInput).should('be.visible')
               cy.get(umlsLoginForm.apiTextInput).should('be.enabled')
               umlsLoginForm.retrieveAndEnterAPIKey()
               
               //click on 'Connect to UMLS' button
               cy.get(umlsLoginForm.connectToUMLSButton).should('exist')
               Utilities.waitForElementVisible(umlsLoginForm.connectToUMLSButton, 3000)
               cy.get(umlsLoginForm.connectToUMLSButton).should('be.visible')
               Utilities.waitForElementEnabled(umlsLoginForm.connectToUMLSButton, 3000)
               cy.get(umlsLoginForm.connectToUMLSButton).should('be.enabled')
               cy.get(umlsLoginForm.connectToUMLSButton).click()
               
               //confirmation appears indicating that user is, now, logged into UMLS
               cy.get(umlsLoginForm.umlsConnectSuccessMsg).should('exist')
               cy.get(umlsLoginForm.umlsConnectSuccessMsg).should('be.visible')
               cy.get(umlsLoginForm.umlsConnectSuccessMsg).should('contain.text', 'UMLS successfully authenticated')

    }

    public static Logout(): void {

        cy.get(Header.userProfileSelect).should('be.visible')
        cy.get(Header.userProfileSelect).select('Sign Out')
        //cy.url({ timeout: 100000 }).should('include', '/login')
        cy.log('Logout Successful')
    }

}
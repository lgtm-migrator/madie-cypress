import {CQLEditorPage} from "./CQLEditorPage"
import {Environment} from "./Environment"

export class umlsLoginForm {
    //the form, itself, and related buttons and fields
    public static readonly umlsForm = '[data-testid="UMLS-connect-form"]'
    public static readonly apiTextInput = '[data-testid="UMLS-key-input"]'
    public static readonly connectToUMLSButton = '[data-testid="submit-UMLS-key"]'
    public static readonly umlsConnectSuccessMsg = '[data-testid="UMLS-login-success-text"]'
    public static readonly closeUMLSForm = '[data-testid="close-UMLS-dialog-button"]'
    public static readonly genericError = '[data-testid="UMLS-login-generic-error-text"]'
    public static readonly closeGenericError = '[data-testid="CloseIcon"]'
    
    //retrieve API kiey
    public static retrieveAndEnterAPIKey() : void {
        
        cy.get(this.apiTextInput).type(Environment.credentials().umls_API_KEY)
/*         cy.readFile('cypress/fixtures/UMLS_API.txt').should('exist').then((fileContents) => {
            cy.get(this.apiTextInput).type(fileContents)
        }) */
    }
}
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export { } // this file needs to be a module

declare global {
    namespace Cypress {
        interface Chainable {
            myCustomFunction: typeof myCustomFunctionImplementation
        }
    }
}

export function myCustomFunctionImplementation(subject: any, text: string) {
    return cy.get(subject)
        .should('be.visible')
        .should('contain', text)
}

/**
 * Checks whether the subject contains the provided text
 *
 * @param {any}         subject   The element you want to check the text for
 * @param {string}      text   The text value
 */
Cypress.Commands.add('myCustomFunction', (subject: any, text: string) => {
    return myCustomFunctionImplementation(subject, text)
})

import {Header} from "./Header"

export class CQLLibraryPage {

    public static readonly createCQLLibraryBtn = '[data-testid="create-new-cql-library-button"]'
    public static readonly cqlLibraryNameTextbox = '[data-testid="cql-library-name-text-field"]'
    public static saveCQLLibraryBtn = '[data-testid="create-new-cql-library-save-button"]'
    public static readonly listofCQLLibraries = '.CqlLibraryList___StyledTd-sc-1rv02q7-8'

    public static createCQLLibrary (CQLLibraryName: string) : void {

        cy.get(Header.cqlLibraryTab).click()
        cy.get(this.createCQLLibraryBtn).click()
        cy.get(this.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(this.saveCQLLibraryBtn).click()
        cy.get(this.listofCQLLibraries).contains(CQLLibraryName)
        cy.log('CQL Library Created Successfully')
    }

}


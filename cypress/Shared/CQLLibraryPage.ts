import {Header} from "./Header"

export class CQLLibraryPage {

    public static readonly createCQLLibraryBtn = '[data-testid="create-new-cql-library-button"]'
    public static readonly cqlLibraryNameTextbox = '#cqlLibraryName'
    public static readonly cqlLibraryModelDropdown = '#cqlLibraryModel'
    public static readonly cqlLibraryModelQICore = '[data-testid="cql-library-model-option-QI-Core"]'
    public static saveCQLLibraryBtn = '#saveBtn'
    public static readonly cqlLibraryNameList = '.CqlLibraryList___StyledTd-sc-1rv02q7-9'
    public static readonly cqlLibraryModelList = '.CqlLibraryList___StyledTd2-sc-1rv02q7-10'
    public static readonly cqlLibraryNameInvalidError = '[data-testid="cqlLibraryName-helper-text"]'
    public static readonly cqlLibraryNamenotUniqueError = '[data-testid="cql-library-server-error-alerts"]'

    public static createCQLLibrary (CQLLibraryName: string) : void {

        cy.get(Header.cqlLibraryTab).click()
        cy.get(this.createCQLLibraryBtn).click()
        cy.get(this.cqlLibraryNameTextbox).type(CQLLibraryName)
        cy.get(this.cqlLibraryModelDropdown).click()
        cy.get(this.cqlLibraryModelQICore).click()
        cy.get(this.saveCQLLibraryBtn).click()
        cy.get(this.cqlLibraryNameList).contains(CQLLibraryName)
        cy.get(this.cqlLibraryModelList).contains('QI-Core')
        cy.log('CQL Library Created Successfully')
    }

    public static createCQLLibraryAPI (apiCQLLibraryName: string) : void {
        cy.setAccessTokenCookie()

        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/cql-libraries',
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                body: {
                    "cqlLibraryName": apiCQLLibraryName,
                    "model": "QI-Core"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                expect(response.body.cqlLibraryName).to.eql(apiCQLLibraryName)
            })
        })
    }
}


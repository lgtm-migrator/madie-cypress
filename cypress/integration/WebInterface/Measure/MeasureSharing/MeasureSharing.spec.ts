import {Environment} from "../../../../Shared/Environment"
import {MeasureCQL} from "../../../../Shared/MeasureCQL"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {Utilities} from "../../../../Shared/Utilities"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {LandingPage} from "../../../../Shared/LandingPage"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
import {MeasureGroupPage} from "../../../../Shared/MeasureGroupPage"
import {TestCasesPage} from "../../../../Shared/TestCasesPage"
import {TestCaseJson} from "../../../../Shared/TestCaseJson"

let measureName = 'TestMeasure' + Date.now()
let cqlLibraryName = 'TestCql' + Date.now()
let newCqlLibraryName = cqlLibraryName + 'someUpdate'
let updatedMeasureName = measureName + 'someUpdate'
let measureSharingAPIKey = Environment.credentials().measureSharing_API_Key
let harpUserALT = Environment.credentials().harpUserALT
let measureCQL = MeasureCQL.SBTEST_CQL
let testCaseTitle = 'Title for Auto Test'
let testCaseDescription = 'DENOMFail' + Date.now()
let testCaseSeries = 'SBTestSeries'
let testCaseJson = TestCaseJson.TestCaseJson_Valid

describe('Measure Sharing', () => {

    beforeEach('Create Measure and Set Access Token', () => {

        cy.setAccessTokenCookie()

        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, cqlLibraryName, measureCQL)
    })

    afterEach('Clean up', () => {

        Utilities.deleteMeasure(measureName, cqlLibraryName)
        OktaLogin.Logout()
    })

    it('Verify shared Measure is viewable under My Measures tab', () => {

        //Share Measure with ALT User
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/grant?userid=' + harpUserALT,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value,
                        'api-key': measureSharingAPIKey
                    },
                    method: 'PUT'

                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.eql(harpUserALT + ' granted access to Measure successfully.')
                })
            })
        })

        //Login as ALT User
        OktaLogin.AltLogin()
        cy.get(LandingPage.myMeasuresTab).click()
        cy.get(MeasuresPage.measureListTitles).should('contain', measureName)

    })

    it('Verify Measure can be edited by the shared user', () => {

        //Share Measure with ALT User
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/grant?userid=' + harpUserALT,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value,
                        'api-key': measureSharingAPIKey
                    },
                    method: 'PUT'

                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.eql(harpUserALT + ' granted access to Measure successfully.')
                })
            })
        })

        //Login as ALT User
        OktaLogin.AltLogin()

        //Edit Measure details
        MeasuresPage.clickEditforCreatedMeasure()
        cy.get(EditMeasurePage.measureNameTextBox).clear().type(updatedMeasureName)
        cy.get(EditMeasurePage.cqlLibraryNameTextBox).clear().type(newCqlLibraryName)
        cy.get(EditMeasurePage.measurementInformationSaveButton).click()
        cy.get(EditMeasurePage.successfulMeasureSaveMsg).should('contain.text', 'Measurement Information Updated Successfully')

        //Edit Measure CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()
        cy.get(EditMeasurePage.cqlEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')

        Utilities.typeFileContents('cypress/fixtures/CQLForTestCaseExecution.txt', EditMeasurePage.cqlEditorTextBox)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('be.visible')

        //Add New Measure group
        cy.get(EditMeasurePage.measureGroupsTab).should('be.visible')
        cy.get(EditMeasurePage.measureGroupsTab).click()

        cy.get(MeasureGroupPage.addMeasureGroupButton).click()
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('exist')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).should('be.visible')
        cy.get(MeasureGroupPage.measureGroupTypeSelect).click()
        cy.get(MeasureGroupPage.measureGroupTypeCheckbox).each(($ele) => {
            if ($ele.text() == "Process") {
                cy.wrap($ele).click()
            }
        })
        cy.get(MeasureGroupPage.measureGroupTypeDropdownBtn).click({force:true})

        Utilities.dropdownSelect(MeasureGroupPage.measureScoringSelect, MeasureGroupPage.measureScoringCohort)
        Utilities.dropdownSelect(MeasureGroupPage.initialPopulationSelect, 'ipp')

        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('exist')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.visible')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).should('be.enabled')
        cy.get(MeasureGroupPage.saveMeasureGroupDetails).click()

        //Create New Test case
        TestCasesPage.createTestCase(testCaseTitle,testCaseDescription,testCaseSeries,testCaseJson)

    })
})
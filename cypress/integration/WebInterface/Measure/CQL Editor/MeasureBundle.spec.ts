import {Utilities} from "../../../../Shared/Utilities"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
import {Header} from "../../../../Shared/Header"
import {EditMeasurePage } from "../../../../Shared/EditMeasurePage"

export {}
const now = require('dayjs')
let mpStartDate = now().subtract('1', 'year').format('YYYY-MM-DD')
let mpEndDate = now().format('YYYY-MM-DD')

let measureName = 'MeasureName ' + Date.now()
let CqlLibraryName = 'CQLLibraryName' + Date.now()
let measureScoring = 'Proportion'
let model = 'QI-Core'
let invalidmeasureCQL = "library SimpleFhirMeasureLibs version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"


let PopIniPop = 'SDE Payer'
let PopNum = 'SDE Race'
let PopDenom = 'SDE Sex'
let PopDenex = 'Absence of Cervix'
let PopDenexcep = 'SDE Ethnicity'
let PopNumex = 'Surgical Absence of Cervix'

describe('Measure Bundle end point returns cqlErrors as true', () => {
    before('Create Measure',() => {

        cy.setAccessTokenCookie()
        //Create New Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
                },
                method: 'POST',
                body: {
                    'measureName': measureName,
                    'cqlLibraryName': CqlLibraryName,
                    'model': model,
                    'measureScoring': measureScoring,
                    'cql': invalidmeasureCQL,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })

        //create Measure Group
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((retrievedMeasureID) => {
                cy.request({
                    url: '/api/measures/' + retrievedMeasureID + '/groups/',
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "scoring": measureScoring,
                        "population": 
                        {
                            "initialPopulation": PopIniPop,
                            "denominator": PopDenom,
                            "denominatorExclusion": PopDenex,
                            "denominatorException": PopDenexcep,
                            "numerator": PopNum,
                            "numeratorExclusion": PopNumex
                        }
                    }
                }).then((response) => {
                        expect(response.status).to.eql(201)
                        expect(response.body.id).to.be.exist
                        cy.writeFile('cypress/fixtures/groupId', response.body.id)
                })
            })
        })
    })

    beforeEach('Set Access Token',() => {

        OktaLogin.Login(true)


    })

    after('Clean up',() => {
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring)

    })
    it('Log into the UI and save Measure CQL so the cqlErrors flag will update to true', () => {
        //Navigate away from the page
        cy.get(Header.measures).click()

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the CQL Editor tab
        CQLEditorPage.clickCQLEditorTab()

        //making some minor and invalid change to the Measure CQL
        cy.get(EditMeasurePage.cqlEditorTextBox).type('some invalid value')

        //save the value in the CQL Editor
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //log out of UI
        OktaLogin.Logout()
        //log into backend
        cy.setAccessTokenCookie()

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'GET',

                    }).then((response) => {
                        expect(response.status).to.eql(200)
                        expect(response.body.cqlErrors).to.eql(true)

                })

            })
        })
    })
})
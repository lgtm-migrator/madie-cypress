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
let invalidmeasureCQL = "library SimpleFhirMeasureLibs versionsdfgsdfg '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
let measureCQL = "library SimpleFhirMeasureLib version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
let elmJson = "{\"library\":{\"identifier\":{\"id\":\"SimpleFhirMeasureLib\",\"version\":\"0.0.004\"},\"schemaIdentifier\":{\"id\":\"urn:hl7-org:elm\",\"version\":\"r1\"},\"usings\":{\"def\":[{\"localIdentifier\":\"System\",\"uri\":\"urn:hl7-org:elm-types:r1\"},{\"localId\":\"1\",\"locator\":\"2:1-2:26\",\"localIdentifier\":\"FHIR\",\"uri\":\"http://hl7.org/fhir\",\"version\":\"4.0.1\",\"annotation\":[{\"type\":\"Annotation\",\"s\":{\"r\":\"1\",\"s\":[{\"value\":[\"\",\"using \"]},{\"s\":[{\"value\":[\"FHIR\"]}]},{\"value\":[\" version \",\"'4.0.1'\"]}]}}]}]},\"includes\":{\"def\":[{\"localId\":\"2\",\"locator\":\"3:1-3:56\",\"localIdentifier\":\"FHIRHelpers\",\"path\":\"FHIRHelpers\",\"version\":\"4.0.001\",\"annotation\":[{\"type\":\"Annotation\",\"s\":{\"r\":\"2\",\"s\":[{\"value\":[\"\",\"include \"]},{\"s\":[{\"value\":[\"FHIRHelpers\"]}]},{\"value\":[\" version \",\"'4.0.001'\",\" called \",\"FHIRHelpers\"]}]}}]}]},\"parameters\":{\"def\":[{\"localId\":\"5\",\"locator\":\"4:1-4:49\",\"accessLevel\":\"Public\",\"annotation\":[{\"type\":\"Annotation\",\"s\":{\"r\":\"5\",\"s\":[{\"value\":[\"\",\"parameter \",\"'Measurement Period'\",\" \"]},{\"r\":\"4\",\"s\":[{\"value\":[\"Interval<\"]},{\"r\":\"3\",\"s\":[{\"value\":[\"DateTime\"]}]},{\"value\":[\">\"]}]}]}}],\"parameterTypeSpecifier\":{\"localId\":\"4\",\"locator\":\"4:32-4:49\",\"type\":\"IntervalTypeSpecifier\",\"pointType\":{\"localId\":\"3\",\"locator\":\"4:41-4:48\",\"name\":\"{urn:hl7-org:elm-types:r1}DateTime\",\"type\":\"NamedTypeSpecifier\"}}}]},\"contexts\":{\"def\":[{\"locator\":\"5:1-5:15\",\"name\":\"Patient\"}]},\"statements\":{\"def\":[{\"locator\":\"5:1-5:15\",\"name\":\"Patient\",\"context\":\"Patient\",\"expression\":{\"type\":\"SingletonFrom\",\"operand\":{\"locator\":\"5:1-5:15\",\"dataType\":\"{http://hl7.org/fhir}Patient\",\"templateId\":\"http://hl7.org/fhir/StructureDefinition/Patient\",\"type\":\"Retrieve\"}}}]}},\"externalErrors\":[]}"


let PopIniPop = 'denom'
let PopNum = 'num'
let PopDenom = 'denom'
let PopDenex = 'num'
let PopDenexcep = 'ipp'
let PopNumex = 'numeratorExclusion'
//skipping until bug MAT-4450 is fixed
describe.skip('Measure Bundle end point returns cqlErrors as true', () => {
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
        Utilities.deleteMeasure(measureName, CqlLibraryName)

    })
    it('Log into the UI and save Measure CQL so the cqlErrors flag will update to true', () => {
        //Navigate away from the page
        cy.get(Header.measures).click()

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Click on the CQL Editor tab
        CQLEditorPage.clickCQLEditorTab()

        //making some minor and invalid change to the Measure CQL
        cy.get(EditMeasurePage.cqlEditorTextBox).type('{enter}{home}')
        cy.get(EditMeasurePage.cqlEditorTextBox).type('#)*&Y)_8)#&$*#$')


        //save the value in the CQL Editor
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
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

describe('Bundle returns elmXML', () => {
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
                    'cql': measureCQL,
                    'elmJson': elmJson,
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
        Utilities.deleteMeasure(measureName, CqlLibraryName)

    })

    it('Upon saving CQL from the UI, GET Bundle request returns elmxml', () => {
        //Navigate away from the page
        cy.get(Header.measures).click()

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        
        //Click on the CQL Editor tab
        CQLEditorPage.clickCQLEditorTab()

        //save CQL from UI
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.visible')
        cy.get(EditMeasurePage.cqlEditorSaveButton).should('be.enabled')
        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        //log out of UI
        OktaLogin.Logout()

        //log into backend
        cy.setAccessTokenCookie()

        //send GET Bundle request and verify response includes elmxml value
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.resourceType).to.eql('Bundle')
                    expect(response.body.entry).to.be.a('array')
                    expect(response.body.entry[1].resource.content[1].contentType).to.eql('application/elm+xml')
                    expect(response.body.entry[1].resource.content[1].data).is.not.empty
                })
            })
        })
    })
})
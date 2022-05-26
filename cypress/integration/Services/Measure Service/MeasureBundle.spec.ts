import {Utilities} from "../../../Shared/Utilities"
import {OktaLogin} from "../../../Shared/OktaLogin"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {CQLEditorPage} from "../../../Shared/CQLEditorPage"
import {Header} from "../../../Shared/Header"
import {EditMeasurePage } from "../../../Shared/EditMeasurePage"

export {}
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
const now = require('dayjs')
let mpStartDate = now().subtract('1', 'year').format('YYYY-MM-DD')
let mpEndDate = now().format('YYYY-MM-DD')

let measureName = 'MeasureName ' + Date.now()
let CqlLibraryName = 'CQLLibraryName' + Date.now()
let measureScoring = 'Proportion'
let model = 'QI-Core'
let invalidmeasureCQL = "library SimpleFhirMeasureLibs version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
let measureCQL = "library SimpleFhirMeasureLib version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
let missingFHIRHelpersMeasureCQL = "library SimpleFhirMeasureLib version '0.0.004'\nusing FHIR version '4.0.1'\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"

let PopIniPop = 'SDE Payer'
let PopNum = 'SDE Race'
let PopDenom = 'SDE Sex'
let PopDenex = 'Absence of Cervix'
let PopDenexcep = 'SDE Ethnicity'
let PopNumex = 'Surgical Absence of Cervix'

describe('Measure Bundle end point returns expected data with valid Measure CQL', () => {

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
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })

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

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring)

    })
    it('Get Measure bundle data from madie-fhir-service and confirm all pertinent data is present', () => {

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
                    expect(response.body.entry[0].resource.resourceType).to.eql('Measure')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('start')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('end')
                    expect(response.body.entry[0].resource.library[0]).is.not.empty
                    expect(response.body.entry[0].resource.group[0].population[0].code.coding[0].code).to.eql('initial-population')
                    expect(response.body.entry[0].resource.group[0].population[0].criteria.expression).to.eql('SDE Payer')
                    expect(response.body.entry[0].resource.group[0].population[1].code.coding[0].code).to.eql('denominator')
                    expect(response.body.entry[0].resource.group[0].population[1].criteria.expression).to.eql('SDE Sex')
                    expect(response.body.entry[0].resource.group[0].population[2].code.coding[0].code).to.eql('denominator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[2].criteria.expression).to.eql('Absence of Cervix')
                    expect(response.body.entry[0].resource.group[0].population[3].code.coding[0].code).to.eql('denominator-exception')
                    expect(response.body.entry[0].resource.group[0].population[3].criteria.expression).to.eql('SDE Ethnicity')
                    expect(response.body.entry[0].resource.group[0].population[4].code.coding[0].code).to.eql('numerator')
                    expect(response.body.entry[0].resource.group[0].population[4].criteria.expression).to.eql('SDE Race')
                    expect(response.body.entry[0].resource.group[0].population[5].code.coding[0].code).to.eql('numerator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[5].criteria.expression).to.eql('Surgical Absence of Cervix')
                    expect(response.body.entry[1].resource.resourceType).to.eql('Library')
                })
            })
        })
    })
})
/* describe.only('Measure Bundle end point returns nothing with Measure CQL missing FHIRHelpers include line', () => {
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
                    'cql': missingFHIRHelpersMeasureCQL,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })

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

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {
        let measurementPeriodStart = "2023-01-01T00:00:00.000Z"
        let measurementPeriodEnd = "2023-12-31T00:00:00.000Z"
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, measurementPeriodStart, measurementPeriodEnd)

    })
    it('Get Measure bundle data from madie-fhir-service and confirm all pertinent data is present', () => {
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
                    expect(response.body.entry[0].resource.resourceType).to.eql('Measure')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('start')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('end')
                    expect(response.body.entry[0].resource.library[0]).is.not.empty
                    expect(response.body.entry[0].resource.group[0].population[0].code.coding[0].code).to.eql('initial-population')
                    expect(response.body.entry[0].resource.group[0].population[0].criteria.expression).to.eql('SDE Payer')
                    expect(response.body.entry[0].resource.group[0].population[1].code.coding[0].code).to.eql('denominator')
                    expect(response.body.entry[0].resource.group[0].population[1].criteria.expression).to.eql('SDE Sex')
                    expect(response.body.entry[0].resource.group[0].population[2].code.coding[0].code).to.eql('denominator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[2].criteria.expression).to.eql('Absence of Cervix')
                    expect(response.body.entry[0].resource.group[0].population[3].code.coding[0].code).to.eql('denominator-exception')
                    expect(response.body.entry[0].resource.group[0].population[3].criteria.expression).to.eql('SDE Ethnicity')
                    expect(response.body.entry[0].resource.group[0].population[4].code.coding[0].code).to.eql('numerator')
                    expect(response.body.entry[0].resource.group[0].population[4].criteria.expression).to.eql('SDE Race')
                    expect(response.body.entry[0].resource.group[0].population[5].code.coding[0].code).to.eql('numerator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[5].criteria.expression).to.eql('Surgical Absence of Cervix')
                    expect(response.body.entry[1].resource.resourceType).to.eql('Library')
                })
            })
        })
    })
}) */
describe('Measure Bundle end point returns 403 if measure was not created by current user', () => {
    let measureName = 'MeasureName ' + Date.now()
    let CqlLibraryName = 'CQLLibraryName' + Date.now()
    let measureScoring = 'Proportion'
    let measureCQL = "library SimpleFhirMeasureLib version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
    before('Create Measure',() => {
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring, measureCQL, true, true)
    })

    beforeEach('Set Access Token',() => {
        cy.setAccessTokenCookie()
    })

    after('Clean up',() => {

        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, true, true)

    })
    it('Get Measure bundle resource will only return if current user is equal to createdBy user', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId2').should('exist').then((id2) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id2 + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    expect(response.status).to.eql(403)

                })
            })
        })
    })

})
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
    it('Log into the UI and save Measure CQL', () => {
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

        OktaLogin.Logout()
        cy.setAccessTokenCookie()
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
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
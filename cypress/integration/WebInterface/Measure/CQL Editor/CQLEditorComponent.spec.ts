import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {OktaLogin} from "../../../../Shared/OktaLogin"
import {Utilities} from "../../../../Shared/Utilities"
import {MeasuresPage} from "../../../../Shared/MeasuresPage"
import {EditMeasurePage} from "../../../../Shared/EditMeasurePage"
import {CQLEditorPage} from "../../../../Shared/CQLEditorPage"
import {MeasureCQL} from "../../../../Shared/MeasureCQL"
import {CQLLibraryPage} from "../../../../Shared/CQLLibraryPage"

let measureName = 'TestMeasure' + Date.now() + 1
let CqlLibraryName = 'TestLibrary' + Date.now() + 1
let randValue = (Math.floor((Math.random() * 1000) + 1))
let newMeasureName = measureName + randValue
let newCqlLibraryName = CqlLibraryName + randValue
let measureCQL = MeasureCQL.ICFCleanTest_CQL

let measureCQL_valid = 'library ' + newCqlLibraryName + ' version \'0.0.000\'\n' +
    '\n' +
    'using FHIR version \'4.0.1\'\n' +
    '\n' +
    'include FHIRHelpers version \'4.1.000\' called FHIRHelpers\n' +
    '\n' +
    'valueset "Office Visit": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\'\n' +
    '\n' +
    'parameter "Measurement Period" Interval<DateTime>\n' +
    '\n' +
    'context Patient\n' +
    '\n' +
    'define "ipp":\n' +
    '  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period" \n' +
    '  \n' +
    'define "denom":\n' +
    '    "ipp"\n' +
    '    \n' +
    'define "num":\n' +
    '    exists ["Encounter"] E where E.status ~ \'finished\'\n' +
    '      \n' +
    'define "numeratorExclusion":\n' +
    '    "num"'

let measureCQL_WithErrors = 'library ' + newCqlLibraryName + ' version \'0.0.000\'\n' +
    'using QICore version \'4.1.1\'\n' +
    'include FHIRHelpers version \'4.1.000\' \n' +
    'valueset "ONC Administrative Sex": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1\' \n' +
    'valueset "Race": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.836\'\n' +
    'valueset "Ethnicity": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.837\'\n' +
    'valueset "Payer": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.3591\'\n' +
    'valueset "Female": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.560.100.2\'\n' +
    'valueset "Home Healthcare Services": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1016\'\n' +
    'valueset "Hysterectomy with No Residual Cervix": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.198.12.1014\'\n' +
    'valueset "Office Visit": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\'\n' +
    'valueset "Pap Test": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.108.12.1017\'\n' +
    'valueset "Preventive Care Services - Established Office Visit, 18 and Up": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1025\'\n' +
    'valueset "HPV Test": \'\')'

let measureCQL_WithWarnings = 'library ' + newCqlLibraryName + ' version \'0.0.000\'\n' +
    'using QICore version \'4.1.0\'\n' +
    'include FHIRHelpers version \'4.1.000\' called FHIRHelpers\n' +
    'valueset "Encounter Inpatient": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.307\'\n' +
    'valueset "Hospice care ambulatory": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1108.15\'\n' +
    'parameter "Measurement Period" Interval<DateTime>\n' +
    '  default Interval[@2019-01-01T00:00:00.0, @2020-01-01T00:00:00.0)\n' +
    'context Patient\n' +
    'define "Has Hospice":\n' +
    '\t exists (\n' +
    '      [ServiceRequest: "Hospice care ambulatory"] HospiceOrder\n' +
    '        where HospiceOrder.intent = \'order\'\n' +
    '            and HospiceOrder.authoredOn in "Measurement Period"\n' +
    '    ){del}{del}{del}{del}'

describe('Validate errors/warnings/success messages on CQL editor component on save', () => {

    beforeEach('Create measure and login', () => {

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName)
        OktaLogin.Login()

    })

    afterEach('Logout and Clean up Measures', () => {

        OktaLogin.Logout()
        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)

    })

    it('Verify success message on CQL editor component, on save and on tab / page load', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.get(EditMeasurePage.cqlEditorTextBox).type(measureCQL_valid)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()

        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'CQL saved successfully')

    })

    it('Verify errors appear on CQL Editor component and in the CQL Editor object, on save and on tab / page load', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.get(EditMeasurePage.cqlEditorTextBox).type(measureCQL_WithErrors)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'Changes saved successfully but the following errors were found')

        //Verify errors in CQL Editor component
        cy.get('[data-testid="generic-success-text-sub-header"]').should('contain.text', '2 CQL errors found:')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 14, Col:0: VSAC: 0:22 | Request failed with status code 400 for oid = undefined location = 14:0-14:22')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 14, Col:23: Parse: 23:24 | extraneous input \')\' expecting {<EOF>, \'using\', \'include\', \'public\', \'private\', \'parameter\', \'codesystem\', \'valueset\', \'code\', \'concept\', \'define\', \'context\'}')

        //Verify the same error(s) appear in CQL Editor windows
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLEditorPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLEditorPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'VSAC: 0:22 | Request failed with status code 400 for oid = undefined location = 14:0-14:22')
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'Parse: 23:24 | extraneous input \')\' expecting {<EOF>, \'using\', \'include\', \'public\', \'private\', \'parameter\', \'codesystem\', \'valueset\', \'code\', \'concept\', \'define\', \'context\'}')

    })

    it('Verify warnings appear on CQL Editor component and in the CQL Editor object, on save and on tab / page load', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()

        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()

        cy.get(EditMeasurePage.cqlEditorTextBox).type(measureCQL_WithWarnings)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'Changes saved successfully but the following errors were found')

        //Verify warnings in CQL Editor component
        cy.get('[data-testid="generic-success-text-sub-header"]').should('contain.text', '2 CQL errors found:')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 11, Col:14: ELM: 14:56 | Could not resolve code path type for the type of the retrieve QICore.ServiceRequest.')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 11, Col:14: ELM: 14:56 | Could not resolve membership operator for terminology target of the retrieve.')

        //Verify the same warning(s) appear in CQL Editor windows
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLEditorPage.warningInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLEditorPage.warningInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'ELM: 14:56 | Could not resolve code path type for the type of the retrieve QICore.ServiceRequest.')
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'ELM: 14:56 | Could not resolve membership operator for terminology target of the retrieve.')
    })
})

describe('Validate errors/warnings/success messages on CQL editor component on CQL update', () => {

    beforeEach('Create measure and login', () => {

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        newMeasureName = measureName + randValue
        newCqlLibraryName = CqlLibraryName + randValue

        //Create New Measure
        CreateMeasurePage.CreateQICoreMeasureAPI(newMeasureName, newCqlLibraryName, measureCQL)
        OktaLogin.Login()

    })

    afterEach('Logout and Clean up Measures', () => {

        OktaLogin.Logout()

        let randValue = (Math.floor((Math.random() * 1000) + 1))
        let newCqlLibraryName = CqlLibraryName + randValue

        Utilities.deleteMeasure(newMeasureName, newCqlLibraryName)

    })

    it('Verify success message on CQL editor component, on CQL update and on tab / page load', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')
        cy.wait(1000)

        //Update text in the CQL Library Editor
        cy.get(EditMeasurePage.cqlEditorTextBox).type(measureCQL_valid)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'CQL updated successfully')

    })

    it('Verify errors appear on CQL Editor component and in the CQL Editor object, on CQL update and on tab / page load', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')
        cy.wait(1000)

        //Update text in the CQL Library Editor that will cause error
        cy.get(EditMeasurePage.cqlEditorTextBox).type(measureCQL_WithErrors)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'Changes saved successfully but the following errors were found')
        cy.get('[data-testid="library-warning"]').should('contain.text', 'CQL updated successfully! Library Name and/or Version can not be updated in the CQL Editor. MADiE has overwritten the updated Library Name and/or Version.')

        //Verify errors in CQL Editor component
        cy.get('[data-testid="generic-success-text-sub-header"]').should('contain.text', '2 CQL errors found:')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 14, Col:0: VSAC: 0:22 | Request failed with status code 400 for oid = undefined location = 14:0-14:22')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 14, Col:23: Parse: 23:24 | extraneous input \')\' expecting {<EOF>, \'using\', \'include\', \'public\', \'private\', \'parameter\', \'codesystem\', \'valueset\', \'code\', \'concept\', \'define\', \'context\'}')

        //Verify the same error(s) appear in CQL Editor windows
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLEditorPage.errorInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLEditorPage.errorInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'VSAC: 0:22 | Request failed with status code 400 for oid = undefined location = 14:0-14:22')
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'Parse: 23:24 | extraneous input \')\' expecting {<EOF>, \'using\', \'include\', \'public\', \'private\', \'parameter\', \'codesystem\', \'valueset\', \'code\', \'concept\', \'define\', \'context\'}')

    })

    it('Verify warnings appear on CQL Editor component and in the CQL Editor object, on CQL update and on tab / page load', () => {

        //Click on Edit Measure
        MeasuresPage.clickEditforCreatedMeasure()
        //Add CQL
        cy.get(EditMeasurePage.cqlEditorTab).click()
        //Clear the text in CQL Library Editor
        cy.get(CQLLibraryPage.cqlLibraryEditorTextBox).type('{selectall}{backspace}{selectall}{backspace}')
        cy.wait(1000)

        //Update text in the CQL Library Editor that will cause warning
        cy.get(EditMeasurePage.cqlEditorTextBox).type(measureCQL_WithWarnings)

        cy.get(EditMeasurePage.cqlEditorSaveButton).click()
        cy.get(CQLEditorPage.successfulCQLSaveNoErrors).should('contain.text', 'Changes saved successfully but the following errors were found')
        cy.get('[data-testid="library-warning"]').should('contain.text', 'CQL updated successfully! Library Name and/or Version can not be updated in the CQL Editor. MADiE has overwritten the updated Library Name and/or Version.')

        //Verify warnings in CQL Editor component
        cy.get('[data-testid="generic-success-text-sub-header"]').should('contain.text', '2 CQL errors found:')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 11, Col:14: ELM: 14:56 | Could not resolve code path type for the type of the retrieve QICore.ServiceRequest.')
        cy.get('[data-testid="generic-success-text-list"] > li').should('contain.text', 'Row: 11, Col:14: ELM: 14:56 | Could not resolve membership operator for terminology target of the retrieve.')

        //Verify the same warning(s) appear in CQL Editor windows
        cy.get('#ace-editor-wrapper > div.ace_gutter > div').find(CQLEditorPage.warningInCQLEditorWindow).should('exist')
        cy.get('#ace-editor-wrapper > div.ace_gutter > div > ' + CQLEditorPage.warningInCQLEditorWindow).invoke('show').click({force:true, multiple: true})
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'ELM: 14:56 | Could not resolve code path type for the type of the retrieve QICore.ServiceRequest.')
        cy.get('#ace-editor-wrapper > div.ace_tooltip').invoke('show').should('contain.text', 'ELM: 14:56 | Could not resolve membership operator for terminology target of the retrieve.')

    })
})

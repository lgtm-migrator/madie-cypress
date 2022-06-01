import { Environment } from "./Environment"
import {LandingPage} from "./LandingPage"
import {MeasuresPage} from "./MeasuresPage"

export class CreateMeasurePage {

    public static readonly createMeasureButton = 'button[data-testid="create-new-measure-save-button"]'
    public static readonly cancelButton = '[data-testid=create-new-measure-cancel-button]'
    public static readonly measureNameTextbox = '[data-testid=measure-name-text-field]'
    public static readonly measureModelDropdown = '#model-select'
    public static readonly measureModelQICore = '[data-testid="measure-model-option-QI-Core"]'
    public static readonly measureModelFieldLevelError = '.MuiFormHelperText-root'
    public static readonly cqlLibraryNameTextbox = '[data-testid="cql-library-name"]'
    public static readonly measureNameFieldLevelError = '[data-testid=measureName-helper-text]'
    public static readonly cqlLibraryNameFieldLevelError = '[data-testid="cqlLibraryName-helper-text"]'
    public static readonly serverErrorMsg = '[data-testid="server-error-alerts"]'
    public static readonly serverErrorMsgCloseIcon = '[data-testid="server-error-alerts"] [data-testid="CloseIcon"]'
    public static readonly serverErrorMsgMeasureCreation = '[data-testid="server-error-msg"]'
    public static readonly measureScoringDropdown = '#measureScoring'
    public static readonly measureScoringFieldLevelError = '.MuiFormHelperText-root'
    public static readonly measureScoringCohort = '[data-testid=measure-scoring-option-Cohort]'
    public static readonly measureScoringContinuousVariable = '[data-testid="measure-scoring-option-Continuous Variable"]'
    public static readonly measureScoringProportion = '[data-testid=measure-scoring-option-Proportion]'
    public static readonly measureScoringRatio = '[data-testid=measure-scoring-option-Ratio]'
    public static readonly measurementPeriodStartDate = '[name=measurementPeriodStart]'
    public static readonly measurementPeriodEndDate = '[name=measurementPeriodEnd]'
    public static readonly measurementPeriodStartDateError = '[data-testid=measurementPeriodStart-helper-text]'
    public static readonly measurementPeriodEndDateError = '[data-testid=measurementPeriodEnd-helper-text]'


    public static clickCreateMeasureButton() : void {

        let alias = 'measure' + (Date.now()+1).toString()
        //setup for grabbing the measure create call
        cy.intercept('POST', '/api/measure').as(alias)

        cy.get(this.createMeasureButton).click()

        //saving measureID to file to use later
        cy.wait('@' + alias).then(({response}) => {
            expect(response.statusCode).to.eq(201)
            cy.writeFile('cypress/fixtures/measureId', response.body.id)
        })
    }

    public static CreateQICoreMeasure(measureName: string,CqlLibraryName: string,measureScoring: string) : void {

        const now = require('dayjs')
        let mpStartDate = now().subtract('1', 'year').format('MM/DD/YYYY')
        let mpEndDate = now().format('MM/DD/YYYY')

        cy.log('Create ' +measureScoring+ ' Measure')
        cy.get(LandingPage.newMeasureButton).click()
        cy.get(this.measureNameTextbox).type(measureName)
        cy.get(this.measureModelDropdown).click()
        cy.get(this.measureModelQICore).click()
        cy.get(this.cqlLibraryNameTextbox).type(CqlLibraryName)
        cy.get(this.measureScoringDropdown).click()
        switch (measureScoring){
            case 'Cohort':
                cy.get(this.measureScoringCohort).click()
                break
            case 'Continuous Variable' :
                cy.get(this.measureScoringContinuousVariable).click()
                break
            case 'Proportion':
                cy.get(this.measureScoringProportion).click()
                break
            case 'Ratio':
                cy.get(this.measureScoringRatio).click()
                break
        }

        cy.get(CreateMeasurePage.measurementPeriodStartDate).type(mpStartDate)
        cy.get(CreateMeasurePage.measurementPeriodEndDate).type(mpEndDate)

        this.clickCreateMeasureButton()

        cy.get(MeasuresPage.measureListTitles).should('be.visible')

        cy.log( measureScoring+ ' Measure created successfully')
    }

    public static CreateQICoreMeasureAPI(measureName: string, CqlLibraryName: string, measureScoring: string, measureCQL?: string, twoMeasures?: boolean, altUser?: boolean): string {

        let user = ''
        const now = require('dayjs')
        let mpStartDate = now().subtract('1', 'year').format('YYYY-MM-DD')
        let mpEndDate = now().format('YYYY-MM-DD')
        let elmJson = "{\"library\":{\"identifier\":{\"id\":\"SimpleFhirMeasureLib\",\"version\":\"0.0.004\"},\"schemaIdentifier\":{\"id\":\"urn:hl7-org:elm\",\"version\":\"r1\"},\"usings\":{\"def\":[{\"localIdentifier\":\"System\",\"uri\":\"urn:hl7-org:elm-types:r1\"},{\"localId\":\"1\",\"locator\":\"2:1-2:26\",\"localIdentifier\":\"FHIR\",\"uri\":\"http://hl7.org/fhir\",\"version\":\"4.0.1\",\"annotation\":[{\"type\":\"Annotation\",\"s\":{\"r\":\"1\",\"s\":[{\"value\":[\"\",\"using \"]},{\"s\":[{\"value\":[\"FHIR\"]}]},{\"value\":[\" version \",\"'4.0.1'\"]}]}}]}]},\"includes\":{\"def\":[{\"localId\":\"2\",\"locator\":\"3:1-3:56\",\"localIdentifier\":\"FHIRHelpers\",\"path\":\"FHIRHelpers\",\"version\":\"4.0.001\",\"annotation\":[{\"type\":\"Annotation\",\"s\":{\"r\":\"2\",\"s\":[{\"value\":[\"\",\"include \"]},{\"s\":[{\"value\":[\"FHIRHelpers\"]}]},{\"value\":[\" version \",\"'4.0.001'\",\" called \",\"FHIRHelpers\"]}]}}]}]},\"parameters\":{\"def\":[{\"localId\":\"5\",\"locator\":\"4:1-4:49\",\"accessLevel\":\"Public\",\"annotation\":[{\"type\":\"Annotation\",\"s\":{\"r\":\"5\",\"s\":[{\"value\":[\"\",\"parameter \",\"'Measurement Period'\",\" \"]},{\"r\":\"4\",\"s\":[{\"value\":[\"Interval<\"]},{\"r\":\"3\",\"s\":[{\"value\":[\"DateTime\"]}]},{\"value\":[\">\"]}]}]}}],\"parameterTypeSpecifier\":{\"localId\":\"4\",\"locator\":\"4:32-4:49\",\"type\":\"IntervalTypeSpecifier\",\"pointType\":{\"localId\":\"3\",\"locator\":\"4:41-4:48\",\"name\":\"{urn:hl7-org:elm-types:r1}DateTime\",\"type\":\"NamedTypeSpecifier\"}}}]},\"contexts\":{\"def\":[{\"locator\":\"5:1-5:15\",\"name\":\"Patient\"}]},\"statements\":{\"def\":[{\"locator\":\"5:1-5:15\",\"name\":\"Patient\",\"context\":\"Patient\",\"expression\":{\"type\":\"SingletonFrom\",\"operand\":{\"locator\":\"5:1-5:15\",\"dataType\":\"{http://hl7.org/fhir}Patient\",\"templateId\":\"http://hl7.org/fhir/StructureDefinition/Patient\",\"type\":\"Retrieve\"}}}]}},\"externalErrors\":[]}"

        if (altUser)
        {
            cy.setAccessTokenCookieALT()
            user = Environment.credentials().harpUserALT
        }
        else
        {
            cy.setAccessTokenCookie()
            user = Environment.credentials().harpUser
        }

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
                    'model': 'QI-Core',
                    'measureScoring': measureScoring,
                    'createdBy': user,
                    'cql': measureCQL,
                    'elmJson': elmJson,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z",
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                if (twoMeasures === true)
                {
                    cy.writeFile('cypress/fixtures/measureId2', response.body.id)
                }
                else
                {
                    cy.writeFile('cypress/fixtures/measureId', response.body.id)
                }

            })
        })
        return user
    }
}
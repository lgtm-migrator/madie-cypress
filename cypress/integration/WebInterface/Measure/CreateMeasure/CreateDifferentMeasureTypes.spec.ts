import {OktaLogin} from "../../../../Shared/OktaLogin"
import {CreateMeasurePage} from "../../../../Shared/CreateMeasurePage"
import {Utilities} from "../../../../Shared/Utilities";


let measureName = ''
let CqlLibraryName = ''
let measureScoring = ''

describe('Create different Measure types', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
        let measurementPeriodStart = "2023-01-01T00:00:00.000+00:00"
        let measurementPeriodEnd = "2023-12-31T00:00:00.000+00:00"
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, measurementPeriodStart, measurementPeriodEnd)
    })

    it('Create Cohort Measure', () => {

        measureName = 'CohortTestMeasure' + Date.now()
        CqlLibraryName = 'CohortTestLibrary' + Date.now()
        measureScoring = 'Cohort'

        CreateMeasurePage.CreateQICoreMeasure(measureName,CqlLibraryName,measureScoring)
    })

    it('Create Proportion Measure', () => {

        measureName = 'ProportionTestMeasure' + Date.now()
        CqlLibraryName = 'ProportionTestLibrary' + Date.now()
        measureScoring = 'Proportion'

        CreateMeasurePage.CreateQICoreMeasure(measureName,CqlLibraryName,measureScoring)
    })

    it('Create Continuous Variable Measure', () => {

        measureName = 'CVTestMeasure' + Date.now()
        CqlLibraryName = 'CVTestLibrary' + Date.now()
        measureScoring = 'Continuous Variable'

        CreateMeasurePage.CreateQICoreMeasure(measureName,CqlLibraryName,measureScoring)

    })

    it('Create Ratio Measure', () => {

        measureName = 'RatioTestMeasure' + Date.now()
        CqlLibraryName = 'RatioTestLibrary' + Date.now()
        measureScoring = 'Ratio'

        CreateMeasurePage.CreateQICoreMeasure(measureName,CqlLibraryName,measureScoring)
    })

})
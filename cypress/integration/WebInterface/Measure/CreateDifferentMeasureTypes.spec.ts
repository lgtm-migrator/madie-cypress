import {OktaLogin} from "../../../Shared/OktaLogin"
import {LandingPage} from "../../../Shared/LandingPage"


let measureName = ''
let CqlLibraryName = ''
let measureScoring = ''

describe('Create different Measure types', () => {
    beforeEach('Login',() => {
        OktaLogin.Login()
    })

    afterEach('Logout', () => {
        OktaLogin.Logout()
    })

    it('Create Cohort Measure', () => {

        measureName = 'CohortTestMeasure' + Date.now()
        CqlLibraryName = 'CohortTestLibrary' + Date.now()
        measureScoring = 'Cohort'

        CreateMeasurePage.CreateQICoreMeasure (measureName,CqlLibraryName,measureScoring)
    })

    it('Create Proportion Measure', () => {

        measureName = 'ProportionTestMeasure' + Date.now()
        CqlLibraryName = 'ProportionTestLibrary' + Date.now()
        measureScoring = 'Proportion'

        CreateMeasurePage.CreateQICoreMeasure (measureName,CqlLibraryName,measureScoring)
    })

    it('Create Continuous Variable Measure', () => {

        measureName = 'CVTestMeasure' + Date.now()
        CqlLibraryName = 'CVTestLibrary' + Date.now()
        measureScoring = 'Continuous Variable'

        CreateMeasurePage.CreateQICoreMeasure (measureName,CqlLibraryName,measureScoring)

    })

    it('Create Ratio Measure', () => {

        measureName = 'RatioTestMeasure' + Date.now()
        CqlLibraryName = 'RatioTestLibrary' + Date.now()
        measureScoring = 'Ratio'

        CreateMeasurePage.CreateQICoreMeasure (measureName,CqlLibraryName,measureScoring)
    })

})
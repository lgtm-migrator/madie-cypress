import { MATLoginExample } from '../../Shared/MATLoginExample'
import { MATMeasureLibraryExample } from '../../Shared/MATMeasureLibraryExample'

describe('Example Login to MAT', () => {
    beforeEach('Login',() => {

        MATLoginExample.Login()

    })

    it('example TEST, verify new measure button exists and visible', () => {

        //verifying New Measure button is visible and active
        cy.get(MATMeasureLibraryExample.newMeasureButton).should('be.visible')
        cy.get(MATMeasureLibraryExample.newMeasureButton).should('be.enabled')

    })
})



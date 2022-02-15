import {MeasuresPage} from "../Shared/MeasuresPage"
import {OktaLogin} from "../Shared/OktaLogin"
import {CreateMeasurePage} from "../Shared/CreateMeasurePage"
import {TestCasesPage} from "../Shared/TestCasesPage"
import {EditMeasurePage} from "../Shared/EditMeasurePage"
export class MeasureGroupPage {


    //Navigate button to get to Measure Group page
    public static readonly measureGroupTab = '[data-testid=measure-groups-tab]'

    //Scoring drop-down box
    public static readonly measureScoringDBox = '[data-testid=select-measure-scoring-groups]'


    //Measure Details
    public static readonly measureScoringUnit = "Ratio"
    public static readonly initialPopulation1 = ""

    public static clickMeasureGroupTab(): void {
        
            cy.get(this.measureGroupTab)
            .invoke('removeAttr', 'target')
            .click()

    }
}
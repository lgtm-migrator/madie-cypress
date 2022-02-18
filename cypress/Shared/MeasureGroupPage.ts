import {EditMeasurePage} from "../Shared/EditMeasurePage"

export class MeasureGroupPage {

    //Measure Details
    public static readonly measureScoringUnit = "Ratio"
    public static readonly initialPopulation1 = ""

    public static clickMeasureGroupTab(): void {
        let measureGroupTabValue = EditMeasurePage.measureGroupsTab
        cy.get(measureGroupTabValue)
        .invoke('removeAttr', 'target')
        .click()
    }
}
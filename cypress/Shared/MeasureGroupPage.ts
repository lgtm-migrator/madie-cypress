export class MeasureGroupPage {

    //Scoring drop-down box
    public static readonly measureScoringSelect = '[data-testid="scoring-unit-select"]'
    public static readonly saveMeasureGroupDetails = '[data-testid="group-form-submit-btn"]'

    //Populations
    public static readonly initialPopulationSelect = '#measure-group-population-select-initial-population'
    public static readonly denominatorSelect = '#measure-group-population-select-denominator'
    public static readonly denominatorExclusionSelect = '#measure-group-population-select-denominator-exclusion'
    public static readonly denominatorExceptionSelect = '#measure-group-population-select-denominator-exception'
    public static readonly numeratorSelect = '#measure-group-population-select-numerator'
    public static readonly numeratorExclusionSelect = '#measure-group-population-select-numerator-exclusion'

    //Measure Details
    public static readonly measureScoringUnit = "Ratio"

    //saved message
    public static readonly successfulSaveMeasureGroupMsg = '.MuiAlert-message.css-1w0ym84'

}
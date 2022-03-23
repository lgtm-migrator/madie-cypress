export class MeasureGroupPage {

    //Scoring drop-down box
    public static readonly measureScoringSelect = '[data-testid="scoring-unit-select"]'
    public static readonly saveMeasureGroupDetails = '[data-testid="group-form-submit-btn"]'

    //Populations
    public static readonly initialPopulationSelect = '[name="population.initialPopulation"]'
    public static readonly denominatorSelect = '[name="population.denominator"]'
    public static readonly denominatorExclusionSelect = '[name="population.denominatorExclusion"]'
    public static readonly denominatorExceptionSelect = '#population-select-denominator-exception'
    public static readonly numeratorSelect = '[name="population.numerator"]'
    public static readonly numeratorExclusionSelect = '[name="population.numeratorExclusion"]'

    //Measure Details
    public static readonly measureScoringUnit = "Ratio"

    //saved message
    public static readonly successfulSaveMeasureGroupMsg = '.MuiAlert-message.css-1w0ym84'

}
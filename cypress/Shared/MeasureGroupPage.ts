export class MeasureGroupPage {

    //Scoring drop-down box
    public static readonly measureScoringSelect = '[data-testid="scoring-unit-select"]'
    public static readonly saveMeasureGroupDetails = '[data-testid="group-form-submit-btn"]'

    //Populations
    public static readonly initialPopulationSelect = '[name="population.initialPopulation"]'
    public static readonly denominatorSelect = '[name="population.denominator"]'
    public static readonly denominatorExclusionSelect = '[name="population.denominatorExclusion"]'
    public static readonly denominatorExceptionSelect = '[name="population.denominatorException"]'
    public static readonly numeratorSelect = '[name="population.numerator"]'
    public static readonly numeratorExclusionSelect = '[name="population.numeratorExclusion"]'
    public static readonly measurePopulationSelect = '[name="population.measurePopulation"]'
    public static readonly measurePopulationExclusionSelect = '[name="population.measurePopulationExclusion"]'


    //Measure Details
    public static readonly measureScoringUnit = "Ratio"

    //saved message
    public static readonly successfulSaveMeasureGroupMsg = '.MuiAlert-message.css-1w0ym84'

    //update button
    public static readonly confirmScoreUnitValueUpdateBtn = '[data-testid="group-form-update-btn"]'

    //#main > div > div > form > div:nth-child(1) > div.MeasureGroups__Content-sc-1ozd0ed-1.bHnBjN > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiAlert-root.MuiAlert-standardWarning.MuiAlert-standard.css-tft4vz > div.MuiAlert-message.css-1w0ym84
    //<div class="MuiAlert-message css-1w0ym84">This change will reset the population scoring value in test cases. Are you sure you wanted to continue with this? <span class="MeasureGroups__ButtonSpacer-sc-1ozd0ed-7 cMTNLO"><button type="submit" data-testid="group-form-update-btn" class="sc-iqseJM sc-crHmcD sc-ksdxgE gWXOKc eglphJ fxUUyI" style="background: rgb(66, 75, 90);">Update</button></span><span class="MeasureGroups__ButtonSpacer-sc-1ozd0ed-7 cMTNLO"><button type="button" class="sc-iqseJM sc-iAKWXU sc-jObWnj gWXOKc itOCGl PmDTC">Cancel</button></span></div>

}
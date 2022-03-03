export class EditMeasurePage {

    //Main MADiE page
    public static readonly mainMadiePageButton = '#main > div > nav > div > div.sc-dkPtRN.evWbfP > a > img'
    //<img src="https://dev-madie.hcqis.org/madie-layout/2798aee/440c877d753a4666ccb5.svg" alt="MADiE Logo">
    //#main > div > nav > div > div.sc-dkPtRN.evWbfP > a > img

    //Edit Measure tab menu
    public static readonly measureDetailsTab = '[data-testid=measure-details-tab]'
    public static readonly cqlEditorTab = '[data-testid=cql-editor-tab]'
    public static readonly measureGroupsTab = '[data-testid=measure-groups-tab]'
    public static readonly testCasesTab = '[data-testid=patients-tab]'

    //Measure Details
    public static readonly editMeasurePen = 'path'
    public static readonly editMeasureTextBox = '[data-testid="inline-edit-input"]'
    public static readonly saveEditedMeasureName = '.fa-check-circle > path'
    public static readonly editMeasureFieldLevelError = '[data-testid="edit-measure-name-error-text"]'
    public static readonly editMeasureSaveButton = '[data-testid="save-edit-measure-name"] > path'
    public static readonly editMeasureCancelButton = '.fa-times-circle'

    //left panel
    public static readonly leftPanelMeasureSteward = '[data-testid="leftPanelMeasureSteward"]'
    public static readonly leftPanelDescription = '[data-testid="leftPanelMeasureDescription"]'
    public static readonly leftPanelCopyright = '[data-testid="leftPanelMeasureCopyright"]'

    //Measure CQL Page
    //cql editor box on page
    public static readonly cqlEditorTextBox = '.ace_content'
    //save button on page
    public static readonly cqlEditorSaveButton = '[data-testid="save-cql-btn"]'

    //Measure Groups Page
    //Scoring drop-down box
    public static readonly measureScoringDBox = '[data-testid="scoring-unit-select"]'
    public static readonly saveMeasureGroupDetails = '[data-testid="group-form-submit-btn"]'


    //Measure Meta Data
    //Measure Steward Page
    public static readonly measureStewardTextBox = '[data-testid="measureStewardInput"]'
    public static readonly measureStewardSaveButton = '[data-testid="measureStewardSave"]'
    public static readonly measureStewardConfirmaionText = '.sc-bqiRlB'

    //Description Page
    public static readonly measureDescriptionTextBox = '[data-testid="measureDescriptionInput"]'
    public static readonly measureDescriptionSaveButton = '[data-testid="measureDescriptionSave"]'
    public static readonly measureDescriptionSuccessMessage = '[data-testid="measureDescriptionSuccess"]'

    //Copyright Page
    public static readonly measureCopyrightTextBox = '[data-testid="measureCopyrightInput"]'
    public static readonly measureCopyrightSaveButton = '[data-testid="measureCopyrightSave"]'
    public static readonly measureCopyrightSuccessMessage = '[data-testid="measureCopyrightSuccess"]'

}
export class EditMeasurePage {

    //dirty modal
    public static readonly dirtCheckModal = '[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiDialog-paperFullWidth css-mbdu2s"]'
    public static readonly keepWorkingCancel = '[data-testid="discard-dialog-cancel-button"]'
    public static readonly discardChangesContinue = '[data-testid="discard-dialog-continue-button"]'
    

    //Edit Measure tab menu
    public static readonly measureDetailsTab = '[data-testid=measure-details-tab]'
    public static readonly cqlEditorTab = '[data-testid=cql-editor-tab]'
    public static readonly measureGroupsTab = '[data-testid=groups-tab]'
    public static readonly testCasesTab = '[data-testid=patients-tab]'

    //Measurement Information
    public static readonly measurementInformationForm = '[data-testid="measure-information-edit"]'
    public static readonly measureNameTextBox = '[data-testid="measure-name-input"]'
    public static readonly cqlLibraryNameTextBox = '[data-testid="cql-library-name-input"]'
    public static readonly measurementInformationSaveButton = '[data-testid="measurement-information-save-button"]'
    public static readonly measureNameFieldLevelError = '[data-testid="measureName-helper-text"]'
    public static readonly measureId = '[data-testid="measure-id-input"]'
    public static readonly versionId = '[data-testid="version-id-input"]'
    public static readonly successfulMeasureSaveMsg = '[data-testid="measurement-information-success-message"]'

    //left panel
    public static readonly leftPanelMeasureInformation = '[data-testid="leftPanelMeasureInformation"]'
    public static readonly leftPanelMeasureSteward = '[data-testid="leftPanelMeasureSteward"]'
    public static readonly leftPanelDescription = '[data-testid="leftPanelMeasureDescription"]'
    public static readonly leftPanelCopyright = '[data-testid="leftPanelMeasureCopyright"]'
    public static readonly leftPanelDisclaimer = '[data-testid="leftPanelMeasureDisclaimer"]'
    public static readonly leftPanelRationale = '[data-testid="leftPanelMeasureRationale"]'
    public static readonly leftPanelStewardDevelopers = '[data-testid="leftPanelMeasureSteward"]'
    public static readonly leftPanelGuidance = '[data-testid="leftPanelMeasureGuidance"]'
    public static readonly leftPanelMClinicalGuidanceRecommendation = '[data-testid="leftPanelMeasureClinicalGuidance"]'

    //Measure CQL Page
    //cql editor box on page
    public static readonly cqlEditorTextBox = '.ace_content'
    //save button on page
    public static readonly cqlEditorSaveButton = '[data-testid="save-cql-btn"]'
    //discard changes
    public static readonly cqlEditorDiscardButton = '[data-testid="reset-cql-btn"]'

    //Delete Measure
    public static readonly deleteMeasureButton = '[data-testid=delete-measure-button]'
    public static readonly deleteMeasureConfirmationMsg = '.message'
    public static readonly deleteMeasureConfirmationButton = '[data-testid=delete-measure-button-2]'
    public static readonly successfulMeasureDeleteMsg = '[data-testid=edit-measure-information-success-text]'

    //Measure Meta Data
    //Measure Steward & Developers Page
    public static readonly measureStewardDrpDwn = '[data-testid="steward"]'
    public static readonly measureStewardDrpDwnOption = '#steward-option-0'
    public static readonly measureStewardObjHoldingValue = '#steward'
    public static readonly measureDeveloperDrpDwn = '[data-testid="developers"]'
    public static readonly measureDevelopersDrpDwnOption = '#developers-option-0'
    public static readonly measureDevelopersObjHoldingValue = '#developers'
    //<span class="MuiChip-label MuiChip-labelMedium css-9iedg7">ACO Health Solutions</span>
    public static readonly measureStewardDevelopersSaveButton = '[data-testid="steward-and-developers-save"]'
    public static readonly measureStewardDevelopersDiscardCancel = '[data-testid="cancel-button"]'
    public static readonly measureStewardDevelopersSuccessMessage = '[data-testid="steward-and-developers-success"]'
    public static readonly measureStewardAlertMsg = '[data-testid="steward-helper-text"]'
    public static readonly measureDevelopersAlertMsg = '[data-testid="developers-helper-text"]'

    //Description Page
    public static readonly measureDescriptionTextBox = '[data-testid="measureDescriptionInput"]'
    public static readonly measureDescriptionSaveButton = '[data-testid="measureDescriptionSave"]'
    public static readonly measureDescriptionSuccessMessage = '[data-testid="measureDescriptionSuccess"]'

    //Copyright Page
    public static readonly measureCopyrightTextBox = '[data-testid="measureCopyrightInput"]'
    public static readonly measureCopyrightSaveButton = '[data-testid="measureCopyrightSave"]'
    public static readonly measureCopyrightSuccessMessage = '[data-testid="measureCopyrightSuccess"]'

    //Disclaimer Page
    public static readonly measureDisclaimerTextBox = '[data-testid="measureDisclaimerInput"]'
    public static readonly measureDisclaimerSaveButton = '[data-testid="measureDisclaimerSave"]'
    public static readonly measureDisclaimerSuccessMessage = '[data-testid="measureDisclaimerSuccess"]'

    //Rationale Page
    public static readonly measureRationaleTextBox = '[data-testid="measureRationaleInput"]'
    public static readonly measureRationaleSaveButton = '[data-testid="measureRationaleSave"]'
    public static readonly measureRationaleSuccessMessage = '[data-testid="measureRationaleSuccess"]'

    //Guidance Page
    public static readonly measureGuidanceTextBox = '[data-testid="measureGuidanceInput"]'
    public static readonly measureGuidanceSaveButton = '[data-testid="measureGuidanceSave"]'
    public static readonly measureGuidanceSuccessMessage = '[data-testid="measureGuidanceSuccess"]'

    //Clinical Guidance / Recommendation Page
    public static readonly measureClinicalRecommendationTextBox = '[data-testid="measureClinical Recommendation StatementInput"]'
    public static readonly measureClinicalRecommendationSaveButton = '[data-testid="measureClinical Recommendation StatementSave"]'
    public static readonly measureClinicalRecommendationDiscardButton = '[data-testid="cancel-button"]'
    public static readonly measureClinicalRecommendationSuccessMessage = '[data-testid="measureClinical Recommendation StatementSuccess"]'
}
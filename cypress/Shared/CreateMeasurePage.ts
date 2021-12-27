export class CreateMeasurePage {

    public static readonly newMeasureButton = '[data-testid=create-new-measure-button]'
    public static readonly createMeasureButton = '[data-testid=create-new-measure-save-button]'
    public static readonly cancelButton = '[data-testid=create-new-measure-cancel-button]'
    public static readonly measureNameTextbox = '[data-testid=measure-name-text-field]'
    public static readonly cqlLibraryNameTextbox = '[data-testid="cql-library-name"]'
    public static readonly fieldLevelError = '[data-testid=measureName-helper-text]'
    public static readonly editMeasureButton = 'button[class="MeasureList___StyledButton-sc-1kfngu9-19 gwghIH"]:visible:last'
    public static readonly listOfMeasures = '.MeasureList___StyledTd-sc-1kfngu9-13 > [data-testid="measure-button-null"]:visible:last'
    public static readonly topNavMeasureTab = ':nth-child(2) > .styles__InnerItem-sc-147g1sa-8'
}
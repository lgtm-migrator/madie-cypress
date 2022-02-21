import {EditMeasurePage} from "../Shared/EditMeasurePage"
export class CQLEditorPage {

    //success save message without errors
    public static readonly successfulCQLSaveNoErrors = '[data-testid=save-cql-success]'

    //Error marker inside of the CQL Editor window
    public static readonly errorInCQLEditorWindow = 'div.ace_gutter-cell.ace_error'
    //<div class="ace_gutter-cell  ace_error" style="height: 14px; top: 70px;">6<span style="display: none;"></span></div>
    //<div class="ace_layer ace_gutter-layer ace_folding-enabled" style="height: 1e+06px; top: 0px; left: 0px; width: 47px;"><div class="ace_gutter-cell " style="height: 14px; top: 0px;">1<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 14px;">2<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 28px;">3<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 42px;">4<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 56px;">5<span style="display: none;"></span></div><div class="ace_gutter-cell  ace_error" style="height: 14px; top: 70px;">6<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 84px;">7<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 98px;">8<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 112px;">9<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 126px;">10<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 140px;">11<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 154px;">12<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 168px;">13<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 182px;">14<span style="display: none;"></span></div><div class="ace_gutter-cell " style="height: 14px; top: 196px;">15<span style="display: none;"></span></div><div class="ace_gutter-cell ace_gutter-active-line " style="height: 14px; top: 210px;">16<span style="display: none;"></span></div></div>

    //click action on the tab to get to the CQL Editor
    public static clickCQLEditorTab(): void {
        
        cy.get(EditMeasurePage.cqlEditorTab)
        .invoke('removeAttr', 'target')
        .click()

    }

}
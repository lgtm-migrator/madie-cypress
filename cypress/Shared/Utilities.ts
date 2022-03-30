import { type } from "os";
import {EditMeasurePage} from "../Shared/EditMeasurePage"
import {TestCasesPage} from "../Shared/TestCasesPage"
import {Header} from "../Shared/Header"
import {MeasureGroupPage} from "../Shared/MeasureGroupPage"
export class Utilities {

    public static textValues = {
        dataLines: null
    }

    public static readWriteFileData(file: string, pageResource: any): void{
        cy.fixture(file).then((str) => {
            // split file by line endings
            const fileArr = str.split(/\r?\n/);
            // log file in form of array
            cy.log(fileArr);
            // remove new line endings
            const cqlArr = fileArr.map((line: any) => {
                const goodLine = line.split(/[\r\n]+/);
                return goodLine[0];
            });
            // log new array
            cy.log(cqlArr);
            for (let i in cqlArr){
                if (cqlArr[i] == '' || cqlArr[i] == null || cqlArr[i] == undefined){
                    cy.get(pageResource).type('{enter}')
                }
                else { 
                    this.textValues.dataLines = cqlArr[i]
                    cy.get(pageResource)
                        .type(this.textValues.dataLines)
                        .type('{enter}')
                    this.textValues.dataLines = null
                }

            }
        })
    }

    public static waitForElementEnabled = (element: string, timeout: number) => {
        cy.get(element, { timeout: timeout }).should('be.enabled')
    }

    public static waitForElementVisible = (element: string, timeout: number) => {
        cy.get(element, { timeout: timeout }).should('be.visible')
    }

    public static validateTCPopValueCheckBoxes (measureScoreValue: string | string[]): void {
        switch ((measureScoreValue.valueOf()).toString()){
            case "Ratio": {
                //validate what available check boxes should and shouldn't be present / visible
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','IPP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','NUMER')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','NUMEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','DENOM')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','DENEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'DENEXCEP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'MSRPOPL')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'MSRPOPLEX')
                cy.get(Header.mainMadiePageButton).click()
                cy.wait(7000)
                break
            }
            case 'Proportion': {
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','IPP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','NUMER')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','NUMEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','DENOM')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','DENEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','DENEXCEP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'MSRPOPL')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'MSRPOPLEX')
                cy.get(Header.mainMadiePageButton).click()
                cy.wait(7000)
                break
            }
            case 'Continuous Variable': {
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','IPP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','MSRPOPL')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','MSRPOPLEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','NUMER')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','NUMEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','DENOM')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','DENEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','DENEXCEP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'DENEXCEP')
                cy.get(Header.mainMadiePageButton).click()
                cy.wait(7000)
                break
            }
            case 'Cohort': {
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .contains('td','IPP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','NUMER')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','NUMEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','DENOM')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value','DENEX')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'DENEXCEP')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'MSRPOPL')
                cy.get(TestCasesPage.testCasePopulationValuesTable)
                    .should('not.have.value', 'MSRPOPLEX')
                cy.get(Header.mainMadiePageButton).click()
                cy.wait(7000)
                break

            }
        }
    }

    public static validationMeasureGroupSaveAll (measureScoreValue: string | string[]): void {
        switch ((measureScoreValue.valueOf()).toString()){
            case "Ratio": {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .select('SDE Sex')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .select('Absence of Cervix')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .select('SDE Race')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .select('Surgical Absence of Cervix')
                break
            }
            case 'Proportion': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .select('SDE Sex')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .select('Absence of Cervix')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .select('SDE Ethnicity')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .select('SDE Race')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .select('Surgical Absence of Cervix')
                break
            }
            case 'Continuous Variable': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.measurePopulationSelect)
                    .select('SDE Sex')
                cy.get(MeasureGroupPage.measurePopulationExclusionSelect)
                    .select('Absence of Cervix')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .should('not.exist')
                break
            }
            case 'Cohort': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .should('not.exist')
                break

            }
            
        }
    }

    public static validationMeasureGroupSaveWithoutRequired (measureScoreValue: string | string[]): void {
        switch ((measureScoreValue.valueOf()).toString()){
            case "Ratio": {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .select('Absence of Cervix')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .select('Surgical Absence of Cervix')
                break
            }
            case 'Proportion': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .select('Absence of Cervix')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .select('SDE Ethnicity')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .select('Surgical Absence of Cervix')
                break
            }
            case 'Continuous Variable': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.measurePopulationExclusionSelect)
                    .select('Absence of Cervix')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .should('not.exist')
                break
            }
            case 'Cohort': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.denominatorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .should('not.exist')
                break

            }
            
        }
    }

    public static validationMeasureGroupSaveWithoutOptional (measureScoreValue: string | string[]): void {
        switch ((measureScoreValue.valueOf()).toString()){
            case "Ratio": {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .select('SDE Sex')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .select('SDE Race')
                break
            }
            case 'Proportion': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .select('SDE Sex')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .select('SDE Race')
                break
            }
            case 'Continuous Variable': {
                //verify the correct populations are displayed and not displayed
                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.measurePopulationSelect)
                    .select('SDE Sex')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .should('not.exist')
                break
            }
            case 'Cohort': {
                //verify the correct populations are displayed and not displayed
 /*                cy.get(MeasureGroupPage.initialPopulationSelect)
                    .select('SDE Payer')
                cy.get(MeasureGroupPage.denominatorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExclusionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.denominatorExceptionSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorSelect)
                    .should('not.exist')
                cy.get(MeasureGroupPage.numeratorExclusionSelect)
                    .should('not.exist') */
                break

            }
            
        }
    }
}
import { type } from "os";
import {EditMeasurePage} from "../Shared/EditMeasurePage"
import {TestCasesPage} from "../Shared/TestCasesPage"
export class Utilities {

    public static textValues = {
        dataLines: ''
    }

    public static readWriteFileData(file: string, pageResource: any): void{
        cy.fixture(file).then((str) => {
            // split file by line endings
            const fileArr = str.split(/\r?\n/);
            // log file in form of array
            cy.log(fileArr);
            // remove new line endings
            const cqlArr = fileArr.map((line: any) => {
                const goodLine = line.split('\\n'||'\\r');
                return goodLine[0];
            });
            // log new array
            cy.log(cqlArr);
            let i = null
            for (i in cqlArr){
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
}
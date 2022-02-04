
export class Measure {

    measureName: string
    cqlLibraryName: string
    model: string
    measureScoring: string

    constructor(measureName: string, cqlLibraryName: string, measureScoring: string ) {
        this.measureName = measureName
        this.cqlLibraryName = cqlLibraryName
        this.model = 'QI-Core'
        this.measureScoring = measureScoring
    }


}
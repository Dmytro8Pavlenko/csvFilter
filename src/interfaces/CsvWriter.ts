import { ContentPattern, CsvContentGenerator } from './Generator'

export abstract class CsvWriter {
    constructor(protected path: string, protected csvContentGenerator: CsvContentGenerator<ContentPattern>) { }
    
    abstract writeLines(quantity): Promise<void>
}
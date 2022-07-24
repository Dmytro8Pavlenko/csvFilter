import { CsvWriter } from '../interfaces/CsvWriter'
import { createWriteStream } from 'fs';


export class StreamCsvWriter extends CsvWriter  {
    async writeLines(quantity): Promise<void> {
        const ws = createWriteStream(this.path);

        await new Promise((resolve) => {
            ws.write(`${this.csvContentGenerator.generateCsvHeaders()}\n`, resolve)
        })  

        for (let index = 0; index < quantity; index++) {
            await new Promise((resolve) => {
                ws.write(`${this.csvContentGenerator.generateCsvRecord()}\n`, resolve)
            })            
        }

        await new Promise((resolve) => {
            ws.close(resolve);
        });
    }
}
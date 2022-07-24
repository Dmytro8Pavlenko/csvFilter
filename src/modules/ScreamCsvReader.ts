import { createReadStream } from 'fs';
import { CsvReader } from '../interfaces/CsvReader';
import { SplitStream } from './SplitStream';

export type Response = Record<number | string, string>

export class StreamCsvReader extends CsvReader<Array<Response>> {
    protected result: Array<Response> = []
    protected header: Array<string>

    readDataFromFile(): Promise<Array<Response>> {
        return new Promise((resolve: (param: any) => void) => {
            const ws = createReadStream(this.path);
            const transform = new SplitStream();

            ws.pipe(transform);

            transform.on('data', this.dataHandler.bind(this))
            transform.on('end', (): void => {
                resolve(this.result);
            })
        })
    }

    protected dataHandler(chunk: Buffer): void {
        const line: string = chunk.toString();
        const columns: Array<string> = line.split(',');

        if (!this.header) {
            this.header = columns;
        } else {
            const obj: Response = {};

            for (let i = 0; i < this.header.length; i++) {
                const key: string = this.header[i];
                const value: string = columns[i];

                obj[key] = value;
            }
            
            if (!this.filter || this.filter.check(obj)) {
                this.result.push(obj);
            }
        }        
    }
}
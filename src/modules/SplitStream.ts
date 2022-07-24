import { Transform } from 'stream';

export class SplitStream extends Transform {
    constructor(delimiter = '\n') {
        super();

        this._buffer = Buffer.from("");
        this._delimiter = Buffer.from(delimiter);
    }

    protected _buffer: Buffer
    protected _delimiter: Buffer

    _transform (chunk, encoding, done) {
        this._buffer = Buffer.concat([ this._buffer, chunk ]);

        let index = this._buffer.indexOf(this._delimiter);

        while (index !== -1) {
            const part = this._buffer.slice(0, index);
            this.push(part);

            this._buffer = this._buffer.slice(index + this._delimiter.length);
            index = this._buffer.indexOf(this._delimiter);
        }

        return done();
    }
}
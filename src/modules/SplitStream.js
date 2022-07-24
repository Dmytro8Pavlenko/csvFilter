"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.SplitStream = void 0;
var stream_1 = require("stream");
var SplitStream = /** @class */ (function (_super) {
    __extends(SplitStream, _super);
    function SplitStream(delimiter) {
        if (delimiter === void 0) { delimiter = '\n'; }
        var _this = _super.call(this) || this;
        _this._buffer = Buffer.from("");
        _this._delimiter = Buffer.from(delimiter);
        return _this;
    }
    SplitStream.prototype._transform = function (chunk, encoding, done) {
        this._buffer = Buffer.concat([this._buffer, chunk]);
        var index = this._buffer.indexOf(this._delimiter);
        while (index !== -1) {
            var part = this._buffer.slice(0, index);
            this.push(part);
            this._buffer = this._buffer.slice(index + this._delimiter.length);
            index = this._buffer.indexOf(this._delimiter);
        }
        return done();
    };
    return SplitStream;
}(stream_1.Transform));
exports.SplitStream = SplitStream;

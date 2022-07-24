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
exports.StreamCsvReader = void 0;
var fs_1 = require("fs");
var CsvReader_1 = require("../interfaces/CsvReader");
var SplitStream_1 = require("./SplitStream");
var StreamCsvReader = /** @class */ (function (_super) {
    __extends(StreamCsvReader, _super);
    function StreamCsvReader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.result = [];
        return _this;
    }
    StreamCsvReader.prototype.readDataFromFile = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var ws = (0, fs_1.createReadStream)(_this.path);
            var transform = new SplitStream_1.SplitStream();
            ws.pipe(transform);
            transform.on('data', _this.dataHandler.bind(_this));
            transform.on('end', function () {
                resolve(_this.result);
            });
        });
    };
    StreamCsvReader.prototype.dataHandler = function (chunk) {
        var line = chunk.toString();
        var columns = line.split(',');
        if (!this.header) {
            this.header = columns;
        }
        else {
            var obj = {};
            for (var i = 0; i < this.header.length; i++) {
                var key = this.header[i];
                var value = columns[i];
                obj[key] = value;
            }
            if (!this.filter || this.filter.check(obj)) {
                this.result.push(obj);
            }
        }
    };
    return StreamCsvReader;
}(CsvReader_1.CsvReader));
exports.StreamCsvReader = StreamCsvReader;

"use strict";
exports.__esModule = true;
exports.CsvWriter = void 0;
var CsvWriter = /** @class */ (function () {
    function CsvWriter(path, csvContentGenerator) {
        this.path = path;
        this.csvContentGenerator = csvContentGenerator;
    }
    return CsvWriter;
}());
exports.CsvWriter = CsvWriter;

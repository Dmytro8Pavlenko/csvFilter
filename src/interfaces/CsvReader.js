"use strict";
exports.__esModule = true;
exports.Filter = exports.CsvReader = void 0;
var CsvReader = /** @class */ (function () {
    function CsvReader(path) {
        this.path = path;
    }
    CsvReader.prototype.setFilter = function (filter) {
        this.filter = filter;
    };
    return CsvReader;
}());
exports.CsvReader = CsvReader;
var Filter = /** @class */ (function () {
    function Filter() {
    }
    return Filter;
}());
exports.Filter = Filter;

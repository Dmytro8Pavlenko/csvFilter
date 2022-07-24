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
exports.RandomCSVContentGenerator = void 0;
var Generator_1 = require("../interfaces/Generator");
var RandomCSVContentGenerator = /** @class */ (function (_super) {
    __extends(RandomCSVContentGenerator, _super);
    function RandomCSVContentGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RandomCSVContentGenerator.prototype.generateRecord = function () {
        var array = [];
        for (var key in this.scheme) {
            var rules = this.scheme[key];
            var fieldResult = '';
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                var randomIndex = this.generateRandomArrayIndex(rule.length);
                var variant = rule[randomIndex];
                fieldResult += variant;
            }
            array.push(fieldResult);
        }
        return array;
    };
    RandomCSVContentGenerator.prototype.generateRandomArrayIndex = function (arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    };
    RandomCSVContentGenerator.prototype.generateCsvHeaders = function () {
        return Object.keys(this.scheme).join(',');
    };
    RandomCSVContentGenerator.prototype.generateCsvRecord = function () {
        return this.generateRecord().join(',');
    };
    return RandomCSVContentGenerator;
}(Generator_1.CsvContentGenerator));
exports.RandomCSVContentGenerator = RandomCSVContentGenerator;

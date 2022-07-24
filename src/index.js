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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var CsvReader_1 = require("./interfaces/CsvReader");
var CsvGenerator_1 = require("./modules/CsvGenerator");
var StreamCsvWriter_1 = require("./modules/StreamCsvWriter");
var ScreamCsvReader_1 = require("./modules/ScreamCsvReader");
var scheme = {
    'testField1': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField2': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField3': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField4': [['20'], ['0', '1', '2',], ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']]
};
var randomCSVContentGenerator = new CsvGenerator_1.RandomCSVContentGenerator(scheme);
var streamCsvWriter = new StreamCsvWriter_1.StreamCsvWriter('../csv/test.csv', randomCSVContentGenerator);
var streamCsvReader = new ScreamCsvReader_1.StreamCsvReader('../csv/test.csv');
var CustomFilter1 = /** @class */ (function (_super) {
    __extends(CustomFilter1, _super);
    function CustomFilter1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomFilter1.prototype.check = function (record) {
        return record.testField1 === 'aazzqq' && record.testField2 === 'ccccee';
    };
    return CustomFilter1;
}(CsvReader_1.Filter));
var CustomFilter2 = /** @class */ (function (_super) {
    __extends(CustomFilter2, _super);
    function CustomFilter2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomFilter2.prototype.check = function (record) {
        return record.testField1 === 'bbxxww' && record.testField2 === 'ccccee';
    };
    return CustomFilter2;
}(CsvReader_1.Filter));
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result1, result2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, streamCsvWriter.writeLines(10000)];
            case 1:
                _a.sent();
                streamCsvReader.setFilter(new CustomFilter1());
                return [4 /*yield*/, streamCsvReader.readDataFromFile()];
            case 2:
                result1 = _a.sent();
                streamCsvReader.setFilter(new CustomFilter2());
                return [4 /*yield*/, streamCsvReader.readDataFromFile()];
            case 3:
                result2 = _a.sent();
                console.log('result1', result1);
                console.log('result2', result2);
                console.log('done');
                return [2 /*return*/];
        }
    });
}); };
main();

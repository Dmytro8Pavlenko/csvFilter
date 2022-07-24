import { Filter } from './interfaces/CsvReader';
import { ContentPattern } from './interfaces/Generator';
import { RandomCSVContentGenerator } from './modules/CsvGenerator';
import { StreamCsvWriter } from './modules/StreamCsvWriter';
import { StreamCsvReader, Response } from './modules/ScreamCsvReader';

const scheme = <ContentPattern>{
    'testField1': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField2': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField3': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField4': [['20'], ['0', '1', '2',], ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']],
}

const randomCSVContentGenerator = new RandomCSVContentGenerator(scheme);

const streamCsvWriter = new StreamCsvWriter('../csv/test.csv', randomCSVContentGenerator);
const streamCsvReader = new StreamCsvReader('../csv/test.csv');

class CustomFilter1 extends Filter{
    check(record: Record<string | number, string>): boolean {
        return record.testField1 === 'aazzqq' && record.testField2 === 'ccccee';
    }
}
class CustomFilter2 extends Filter{
    check(record: Record<string | number, string>): boolean {
        return record.testField1 === 'bbxxww' && record.testField2 === 'ccccee';
    }
}

const main = async (): Promise<void> => {
    await streamCsvWriter.writeLines(10000);

    streamCsvReader.setFilter(new CustomFilter1());
    
    const result1: Array<Response> = await streamCsvReader.readDataFromFile();

    streamCsvReader.setFilter(new CustomFilter2());
    
    const result2: Array<Response> = await streamCsvReader.readDataFromFile();

    console.log('result1', result1);
    console.log('result2', result2);

    console.log('done');
};

main();
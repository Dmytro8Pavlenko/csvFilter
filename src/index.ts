import { ContentPattern } from './interfaces/Generator';
import { RandomCSVContentGenerator } from './modules/CsvGenerator';
import { StreamCsvWriter } from './modules/StreamCsvWriter';

const scheme = <ContentPattern>{
    'testField1': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField2': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField3': [['aa', 'bb', 'cc'], ['zz', 'xx', 'cc'], ['qq', 'ww', 'ee']],
    'testField4': [['20'], ['0', '1', '2',], ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']],
}

const randomCSVContentGenerator = new RandomCSVContentGenerator(scheme);

const streamCsvWriter = new StreamCsvWriter('../csv/test.csv', randomCSVContentGenerator);

const main = async (): Promise<void> => {
    streamCsvWriter.writeLines(10000);

    console.log('done');
};

let a = Number;
main();
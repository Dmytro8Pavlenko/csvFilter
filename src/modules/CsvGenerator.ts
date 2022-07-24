import { CsvContentGenerator, ContentPattern, Variant, FieldName, Rule } from '../interfaces/Generator'


export class RandomCSVContentGenerator extends CsvContentGenerator<ContentPattern> {
    protected generateRecord(): Array<string> {
        const array: Array<string> = [];

        for (const key in this.scheme) {
            const rules: Array<Rule> = this.scheme[key];
            
            let fieldResult: string = '';

            for (let rule of rules) {
                const randomIndex = this.generateRandomArrayIndex(rule.length)
                const variant: Variant = rule[randomIndex];

                fieldResult += variant;
            }

            array.push(fieldResult);
        }

        return array;
    }

    protected generateRandomArrayIndex(arrayLength: number): number {
        return Math.floor(Math.random() * arrayLength);
    }

    generateCsvHeaders(): string {
        return Object.keys(this.scheme).join(',');
    }

    generateCsvRecord(): string {
        return this.generateRecord().join(',');
    }
}
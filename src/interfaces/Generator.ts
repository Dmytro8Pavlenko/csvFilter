export abstract class CsvContentGenerator<Param> {
    constructor(protected scheme: Param) { }
    abstract generateCsvHeaders(): string
    abstract generateCsvRecord(): string
}

export type Variant = number | string

export type FieldName = number | string

// export type Content = Record<FieldName, string>

export type Rule = Array<Variant>

export type ContentPattern = Record<FieldName, Array<Rule>>
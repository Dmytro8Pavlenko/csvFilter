export abstract class CsvReader<ResType> {
    constructor(protected path: string) { }

    protected filter: Filter
    
    setFilter(filter: Filter): void{
        this.filter = filter
    }

    abstract readDataFromFile(): Promise<ResType>
}

export abstract class Filter {
    constructor() { }

    abstract check(record: Record<number | string, string>): boolean
}
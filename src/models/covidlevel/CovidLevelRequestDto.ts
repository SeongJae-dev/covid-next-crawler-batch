interface CovidLevelRequestDtoAttribute{
    level: number,
    name: string,
    county: string,
}

export class CovidLevelRequestDto   {
     _level: number;
     _name: string | null;
     _county: string;



    constructor(level:number, name:string, county: string) {
        this._level = level;
        this._name = name;
        this._county = county;
    }


    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get name(): string {
        return this._name ?? "";
    }

    set name(value: string) {
        this._name = value;
    }

    get county(): string {
        return this._county;
    }

    set county(value: string) {
        this._county = value;
    }
}
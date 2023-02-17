interface LocationI {
    country: string,
    lat: string,
    locality: string,
    long: string
}
interface DriverI {
    dateOfBirth : string,
    driverId: string,
    familyName: string,
    givenName: string,
    nationality: string,
    url: string,
}
interface ResultI {
    Driver: DriverI,
    points: string,
    position: string
    Time: {
        millis: string;
    }
}
export interface RaceI {
    Results: ResultI [],
    date: string,
    raceName: string,
    round: string,
    season: string,
    url: string,
}
export interface ResultF1Data  {
    MRData: {
        RaceTable: {
            Races: RaceI [],
            season: string
        },
        limit: string;
        offset: string;
        series: string;
        total: string;
        url: string;
        xmlns: string;
    }
}

export type DriverUi = Pick<DriverI, "familyName" | "givenName"> & {
    points: number,
    time: number
}

export interface UiData {
    season: string,
    winner: string
}
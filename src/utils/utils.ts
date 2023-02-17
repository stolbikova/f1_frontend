import { RaceI, DriverUi } from '@src/types';

interface GetYearsProps { from: number, to: number };
export const getYears = (props: GetYearsProps | undefined): number[] => {
    const { from, to } = props;
    const years: number[] = [];
    for (let y = from; y <= to; y++) years.push(y);
    return years
}

// TODO: work wrong for 1952 year.
export const getWinner = (races: RaceI[] | RaceI): DriverUi => {
    const winner = '';
    const newRaces = Array.isArray(races) ? races : [races];

    const data: Record<string, DriverUi> = {}
    newRaces.forEach(race => {
        const results = race.Results
        results.forEach(result => {
            if (!Number(result.points)) return;

            const driverId = result.Driver.driverId;
            const points = data[driverId] ? data[driverId]?.points + Number(result.points) : Number(result.points);
            const time = Number(result.Time?.millis);
            data[driverId] = {
                points,
                time,
                familyName: result.Driver.familyName,
                givenName: result.Driver.givenName
            }
        })
    })
    const sorted: DriverUi [] = Object.values(data).sort((a: any,b: any) => {
        if (a.points===b.points) {
            return a.time>b.time?1:-1;
        }
        return a.points<b.points?1:-1
    });

    return sorted[0];
}
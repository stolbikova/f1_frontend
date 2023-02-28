
import { F1_API, ROW_LIMIT, START_F1_YEAR, CUR_YEAR } from '@src/constants';
import { getYears } from "@src/utils/utils";
import { ResultF1Data } from '@src/types';

export const fetchF1Data = ({page}: {page: number}): Promise<ResultF1Data[]> => {
    const from = START_F1_YEAR + (page * ROW_LIMIT);
    let to = from + ROW_LIMIT - 1;
    if (to > CUR_YEAR) to = CUR_YEAR - 1;

    const years: number[] = getYears({ from, to });
    const urls = years.map(y => `${F1_API}/${y}/results.json`);
    const fetchedData: Promise<ResultF1Data[]> = Promise.all(urls.map(async url => {
        const resp = await fetch(url);
        return resp.json();
    }));

    return fetchedData;
}
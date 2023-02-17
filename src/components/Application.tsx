import './Application.css';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Season } from './Season/Season';
import React, { useEffect, useState } from 'react';
import { F1_API, ROW_LIMIT, START_F1_YEAR, CUR_YEAR } from '@src/constants';
import { getYears, getWinner } from '@src/utils/utils';
import { ResultF1Data, UiData } from '@src/types';
import {List} from '@src/components/List/List';

const Application: React.FC = () => {
  const [store, setStore] = useState<ResultF1Data []>([]);
  const [seasonList, setSeasonList] = useState<UiData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  useEffect(() => {
      fetchData({ page: 0 });
  }, [])

  const fetchData = async ({ page }: { page: number }) => {
      setLoading(true);
      const from = START_F1_YEAR + (page * ROW_LIMIT);
      let to = from + ROW_LIMIT - 1;
      if (to > CUR_YEAR) to = CUR_YEAR - 1;

      const years: number[] = getYears({ from, to });
      const urls = years.map(y => `${F1_API}/${y}/results.json`);
      const fetchedData: ResultF1Data[] = await Promise.all(urls.map(async url => {
          const resp = await fetch(url);
          return resp.json();
      }));

      setStore(prevStore => ([...prevStore,...fetchedData]));
      const parsedData: UiData[] = fetchedData.map(i => {
          const w = getWinner(i.MRData.RaceTable.Races);
          return ({
              season: i.MRData.RaceTable.season,
              winner: w.givenName + ' ' + w.familyName
          })
      });

      setSeasonList(prev => [...prev, ...parsedData]);
      setLoading(false);
  }

  const handlePageChange = (page: number) => {
      fetchData({ page });
  }
  const router = createBrowserRouter([
    {
      path: '',
      element: <List data={seasonList} onPageChange={handlePageChange} loading={loading}></List>
    },
    {
      path: "/season/:year",
      loader: ({params}) => {
        console.log(store, params.year)
        return {
          data: store.find(s => s.MRData.RaceTable.season === params.year),
          winner: seasonList.find(s => s.season === params.year).winner
        }},
      element: <Season />,
    },
  ]);

  return (<RouterProvider router={router} />);
};

export default Application;

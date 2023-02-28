import './Application.css';
import {
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import { Season } from './Season/Season';
import { useEffect, useState } from 'react';
import { getWinner } from '@src/utils/utils';
import { ResultF1Data, UiData } from '@src/types';
import {List} from '@src/components/List/List';
import { fetchF1Data } from '@src/utils/fetchData';

const Application: React.FC = () => {
  const [store, setStore] = useState<ResultF1Data []>([]);
  const [seasonList, setSeasonList] = useState<UiData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  useEffect(() => {
      fetchData({ page: 0 });
  }, [])

  const fetchData = async ({ page }: { page: number }) => {
      setLoading(true);
      const fetchedData: ResultF1Data[] = await fetchF1Data({page});

      setStore(prevStore => ([...prevStore, ...fetchedData]));
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
  const router = createHashRouter([
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

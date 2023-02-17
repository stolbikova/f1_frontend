import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import { ResultF1Data } from '@src/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getWinner} from '@src/utils/utils';

interface SeasonProps {}

interface SeasonLoaderData {
    data: ResultF1Data,
    winner: string
}

export const Season: React.FC<SeasonProps> = () => {
    const {data, winner} = (useLoaderData() as SeasonLoaderData);
    const races = data?.MRData?.RaceTable?.Races;

    return (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }} >
        <Table sx={{ maxWidth: 350 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Race Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Winner</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {races?.map((race, idx) => {
                    const w = getWinner(race);
                    const raceWinner = w.givenName + ' ' + w.familyName;
                    return (
                    <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: raceWinner === winner ? '#a3a8ad' : '' }}
                    >
                        <TableCell component="th" scope="row">
                            {race.raceName}
                        </TableCell>
                        <TableCell align="right">{race.date}</TableCell>
                        <TableCell align="right">{raceWinner}</TableCell>
                    </TableRow>
                )})}
            </TableBody>
        </Table>
    </TableContainer>
    )
}


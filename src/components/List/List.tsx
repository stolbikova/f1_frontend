import React, { useState } from 'react';
import { ROW_LIMIT, START_F1_YEAR, CUR_YEAR } from '@src/constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";
import './List.css';
import {UiData} from '@src/types';


interface ListProps {
    data: UiData[],
    onPageChange: (page: number) => void;
    loading: boolean;
}

export const List: React.FC<ListProps> = ({data, onPageChange, loading}) => {
    const [page, setPage] = useState<number>(0);
    const navigate = useNavigate();

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number) => {
        setPage(newPage);
        onPageChange(newPage);
    }

    const handleClick = (idx: number) => {
        navigate(`/season/${data[idx].season}`);
    }

    const headerCellStyle = { fontWeight: '700' }

    return (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }} >
            <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={headerCellStyle}>Season</TableCell>
                        <TableCell align="right" style={headerCellStyle}>Winner </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * ROW_LIMIT, page * ROW_LIMIT + ROW_LIMIT).map((row, idx) => (
                        <TableRow
                            key={row.season}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => handleClick(idx)}
                        >
                            <TableCell component="th" scope="row">
                                {row.season}
                            </TableCell>
                            <TableCell align="right">{row.winner}</TableCell>
                        </TableRow>
                    ))}
                    <TablePagination
                        colSpan={3}
                        count={CUR_YEAR - START_F1_YEAR}
                        rowsPerPage={ROW_LIMIT}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[ROW_LIMIT]}
                    />
                </TableBody>
            </Table>
        </TableContainer>
    )
}


import React, {useState} from "react";
import {useGetCitiesQuery} from "../api/apiSlice";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

const CityTable = () => {

    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(0);

    const {
        isSuccess,
        data: cities
    } = useGetCitiesQuery({page: pageNo, limit: pageSize});

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, pageNo: number) => {
        setPageNo(pageNo);
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPageSize(parseInt(e.target.value, 10));
        setPageNo(0);
    }

    return <div style={{width: '100%'}}>
        {isSuccess && cities.length > 0 && <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"left"}>Id</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Population</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cities.map(city => (
                            <TableRow
                                key={city.id}
                            >
                                <TableCell align={"left"}>{city.id}</TableCell>
                                <TableCell align="center">{city.name}</TableCell>
                                <TableCell align="center">{city.type}</TableCell>
                                <TableCell align="center">{city.state}</TableCell>
                                <TableCell align="center">{city.population}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={150}
                rowsPerPage={pageSize}
                page={pageNo}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>}
    </div>
}

export default CityTable;


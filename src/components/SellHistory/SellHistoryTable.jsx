import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function SellHistoryTable(props) {
    const {value, index} = props;
    const [sells, setSells] = useState([]);

    useEffect(() => {
        axios.get("http://51.79.84.218:8009/scotia-tech/v1/api/venta/get-list-sale").then((response) => {
            setSells(response.data.data);
        });
    }, []);

    return (
        <div>
            {value !== index ?
            <></> :
            <Grid container spacing={2} sx={{minWidth:"100%", height: "99%", padding: "30px"}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Código factura</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Libro</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Valor pagado</TableCell>
                                <TableCell>Cliente</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sells.map((sell, index) => 
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{sell.codigoFactura}</TableCell>
                                    <TableCell>{sell.fecha}</TableCell>
                                    <TableCell>{sell.libro}</TableCell>
                                    <TableCell>{sell.cantidad}</TableCell>
                                    <TableCell>{sell.valorPagar}</TableCell>
                                    <TableCell>{sell.cliente}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>}
        </div>
    );

}

export default SellHistoryTable;
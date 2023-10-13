import { Add, Check, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Fab, FormControl, Grid, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function BookList(props) {

    const {value, index} = props;
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedBook, setSelectedBook] = useState(0);
    const [selectedUser, setSelectedUser] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const price = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const setIdBook = (bookId) => {
        setSelectedBook(bookId);
        setOpen(true);
    };

    const handleCustomer = (selectedUser) => {
        setSelectedUser(selectedUser.target.value);
    }

    const handleSell = () => {
        const data = {
            state: true,
            codigoFactura: document.getElementById("bill-code").value,
            fecha: new Date(),
            cantidad: document.getElementById("amount").value,
            libroId: {
                id: selectedBook
            },
            clienteId: {
                id: selectedUser
            }
        };
        console.log(data)
        axios.post("http://51.79.84.218:8009/scotia-tech/v1/api/venta", data).then((response) => {
            if (response.status === 200) {
                setOpen(false);
                alert(response.data.message);
            }
        });
    }

    console.log("User: " + selectedUser)
    console.log("Book: " + selectedBook)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    useEffect(() => {
        axios.get("http://51.79.84.218:8009/scotia-tech/v1/api/libro/get-list-book").then((response) => {
            setBooks(response.data.data);
        });
        axios.get("http://51.79.84.218:8009/scotia-tech/v1/api/cliente").then((response) => {
            setUsers(response.data.data);
        });
    }, []);

    return (
        <div>
            {value !== index ? 
            <></> :
            <Grid container spacing={2} sx={{minWidth:"100%", height: "99%", padding: "30px"}}>
                {books.map((book, index) => 
                    <Grid item xs={6} key={index}>
                        <Card sx={{minWidth: "40%", textAlign: "left"}}>
                            <>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <Typography variant="h5" component="div">{book.libro}</Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>{price.format(book.precio)}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Fab variant="extended" color="primary" aria-label="add" onClick={() => setIdBook(book.id)}>
                                                <Add />
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" size="small" endIcon={<Edit/>}>Editar cliente</Button>
                                    <Button variant="outlined" size="small" color="error" endIcon={<Delete/>}>Eliminar cliente</Button>
                                </CardActions>
                            </>
                        </Card>
                    </Grid>
                )}
            </Grid>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h1" sx={{color: "black", marginBottom: "15px"}}>
                        Nueva compra
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedUser}
                            label="Cliente"
                            onChange={handleCustomer}
                            sx={{marginBottom: "15px"}}
                        >
                            {users.map((user, index) => 
                                <MenuItem key={index} value={user.id}>{user.nombre}</MenuItem>
                            )}
                        </Select>
                        <TextField id="bill-code" label="Código de factura" variant="outlined" sx={{paddingTop: "15px", paddingBottom: "15px"}}/>
                        <TextField id="amount" label="Cantidad de libros" variant="outlined" inputProps={{ min: 1, max: 9, type: "number" }} sx={{paddingTop: "15px", paddingBottom: "15px"}} />
                    </FormControl>
                    <Button variant="contained" size="small" color="success" endIcon={<Check/>} onClick={handleSell}>Crear venta</Button>
                </Box>
            </Modal>
        </div>
    );

}

export default BookList;
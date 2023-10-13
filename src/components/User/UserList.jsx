import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Fab, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function UserList(props) {
    const {value, index} = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://51.79.84.218:8009/scotia-tech/v1/api/cliente").then((response) => {
            setUsers(response.data.data);
        });
    }, []);

    return (
        <div>
            {value !== index ? 
            <></> : 
            <Grid container spacing={2} sx={{minWidth:"100%", height: "99%", padding: "30px"}}>
                {users.map((user, index) =>
                    <Grid item xs={6} key={index}>
                        <Card variant="outlined" sx={{minWidth: "40%", textAlign: "left"}}>
                            <>
                                <CardContent>
                                    <Typography variant="h5" component="div">{user.nombre}</Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>{user.correo}</Typography>
                                    <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom>{user.telefono}</Typography>
                                    <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom>{user.direccion}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" size="small" endIcon={<Edit/>}>Editar cliente</Button>
                                    <Button variant="outlined" size="small" color="error" endIcon={<Delete/>}>Eliminar cliente</Button>
                                </CardActions>
                            </>
                        </Card>
                    </Grid>
                )}
                <Fab variant="extended" color="primary" aria-label="add" sx={{position: "absolute", bottom: "25px", right: "25px"}}>
                    <Add />  Agregar cliente
                </Fab>
            </Grid>}
        </div>
    );
}

export default UserList;
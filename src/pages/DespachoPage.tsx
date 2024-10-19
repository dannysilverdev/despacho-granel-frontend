import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Container,
    Stack,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CardSelector from '../components/CardSelector';
import dayjs from 'dayjs';

const DespachoPage: React.FC = () => {
    const [cliente, setCliente] = useState('');
    const [producto, setProducto] = useState('');
    const [silo, setSilo] = useState('');
    const [ordenCompra, setOrdenCompra] = useState('');
    const [carga, setCarga] = useState('');

    const username = "usuarioEjemplo"; // Obtener este valor desde la sesión o contexto de autenticación

    const handleClienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCliente(event.target.value);
    };

    const handleProductoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProducto(event.target.value);
    };

    const handleSiloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSilo(event.target.value);
    };

    const handleOrdenCompraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrdenCompra(event.target.value);
    };

    const handleCargaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCarga(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Obtener la fecha y hora actuales
        const fechaDespacho = dayjs().format('YYYY-MM-DD HH:mm:ss');

        // Datos del formulario
        const despachoData = {
            numeroGuia: event.currentTarget.numeroGuia.value,
            fechaDespacho,
            cliente,
            producto,
            silo,
            ordenCompra,
            carga,
            responsable: username,
        };

        console.log('Datos del despacho:', despachoData);
        // Aquí es donde se implementaría la llamada al backend para enviar estos datos
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default', p: 2 }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 800 }}>
                    <Typography variant="h4" gutterBottom>
                        Despacho Granel - Formulario de Ingreso
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Número de Guía"
                                    name="numeroGuia"
                                    type="number"
                                    required
                                />
                                <CardSelector
                                    options={[
                                        { value: 'Nestlé', label: 'Nestlé' },
                                        { value: 'CPW', label: 'CPW' },
                                    ]}
                                    value={cliente}
                                    onChange={handleClienteChange}
                                    label="Cliente"
                                />
                                <CardSelector
                                    options={[
                                        { value: 'Harina debil', label: 'Harina débil' },
                                        { value: 'Harina fuerte', label: 'Harina fuerte' },
                                        { value: 'Semolina', label: 'Semolina' },
                                    ]}
                                    value={producto}
                                    onChange={handleProductoChange}
                                    label="Producto"
                                />
                                <CardSelector
                                    options={[
                                        { value: 'JJBB21', label: 'JJBB21' },
                                        { value: 'JJBB22', label: 'JJBB22' },
                                    ]}
                                    value={silo}
                                    onChange={handleSiloChange}
                                    label="Silo"
                                />
                                <TextField
                                    fullWidth
                                    label="Orden de Compra"
                                    type="number"
                                    value={ordenCompra}
                                    onChange={handleOrdenCompraChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Carga"
                                    type="number"
                                    value={carga}
                                    onChange={handleCargaChange}
                                    required
                                    InputProps={{
                                        style: { fontSize: '1.5rem' }
                                    }}
                                />
                                <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                                    Enviar
                                </Button>
                            </Stack>
                        </Container>
                    </form>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default DespachoPage;

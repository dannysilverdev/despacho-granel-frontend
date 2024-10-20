import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';

const DespachoPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [cliente, setCliente] = useState('');
    const [producto, setProducto] = useState('');
    const [silo, setSilo] = useState('');
    const [ordenCompra, setOrdenCompra] = useState('');
    const [carga, setCarga] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el username del token almacenado en localStorage
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const payloadBase64 = token.split('.')[1];
                if (payloadBase64) {
                    const decodedPayload = JSON.parse(atob(payloadBase64));
                    console.log('Payload decodificado:', decodedPayload);

                    // Intentar encontrar el campo userId, ya que parece ser el que contiene el nombre del usuario
                    const potentialUsername = decodedPayload.userId;

                    if (potentialUsername) {
                        setUsername(potentialUsername);
                    } else {
                        console.warn('El token no contiene un campo de usuario válido');
                    }
                } else {
                    console.warn('Token malformado: no tiene payload');
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        } else {
            console.warn('No se encontró ningún token.');
        }
    }, []);

    useEffect(() => {
        if (!username) {
            console.log('Username aún no está definido.');
        } else {
            console.log('Username obtenido:', username);
        }
    }, [username]);

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

        // Verificar si el username está vacío antes de enviar
        if (!username) {
            alert('El username no se ha establecido correctamente. Por favor, inténtalo de nuevo.');
            return;
        }

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

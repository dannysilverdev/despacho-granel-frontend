import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL; // Accediendo a la variable de entorno

    for (const key in import.meta.env) {
        console.log(`${key}: ${import.meta.env[key]}`);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${apiUrl}/login`, { // Usando la variable de entorno apiUrl
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            navigate('/home');
        } else {
            alert('Login failed');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Despacho Granel
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Ingresar
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
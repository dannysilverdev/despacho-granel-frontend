import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Función para abrir o cerrar el Drawer
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Contenido del Drawer
    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem component="button" key="Home" onClick={() => console.log('Navigate to Home')}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem component="button" key="Profile" onClick={() => console.log('Navigate to Profile')}>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem component="button" key="Logout" onClick={() => console.log('Logout')}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    {/* IconButton para abrir el Drawer en dispositivos móviles */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} // Mostrar solo en pantallas pequeñas
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Despacho Granel App
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer para mostrar el menú lateral en dispositivos móviles */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
            </Drawer>

            {/* Espacio debajo del AppBar para que el contenido no quede cubierto */}
            <Box sx={{ mt: 8 }} />
        </>
    );
};

export default Header;

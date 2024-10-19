import { useEffect, useState } from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const Home = () => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                navigate('/login')
                return
            }

            const response = await fetch('https://h7scr7rpeg.execute-api.us-east-1.amazonaws.com/dev/home', {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (response.ok) {
                const data = await response.json()
                setMessage(data.message || 'Welcome Home')
            } else {
                alert('Unauthorized')
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        fetchData()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <Header />
            <Container maxWidth="sm">
                <Typography variant="h4" component="h1" gutterBottom>
                    {message}
                </Typography>
                <Button onClick={handleLogout} variant="contained" color="primary">
                    Logout
                </Button>
            </Container>
        </>
    )
}

export default Home

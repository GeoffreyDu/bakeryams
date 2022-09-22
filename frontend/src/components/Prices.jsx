import { useState, useEffect } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Card from "@mui/material/Card"
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { back_url } from '../config/index.js'

export const Prices = () => {
    const [prices, setPrices] = useState([])
    const [error, setError] = useState('')
    
    
    useEffect(()=> {
        const token = localStorage.getItem('token')
        const getPrices = async () => {
            try {   
                const response =  await axios.get(`${back_url}/prices`, { headers: { Authorization: `Bearer ${token}` } })
                setPrices(response.data.prices)
                console.log(response.data)
            } catch (error) {
                setError(error.response.data.error)
                console.log(error)
            }
        }
        getPrices()
    }, [])

    const formatDate = (date) => {
        const frDate = new Date(date).toLocaleDateString("fr")
        const frTime =new Date(date).toLocaleTimeString("fr")
        return `Le ${frDate} à ${frTime}`
    }

    return (
        <div>
            { error && <Alert severity="error" style={{ display: 'flex', justifyContent: 'center' }}>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
            }
            <h1>Liste des prix</h1>
            { prices && <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                { prices.map((price, key)=> <Card variant="outlined" style={{width: '350px', marginRight: '5px', padding: '20px', marginBottom: '5px', backgroundColor: 'rgba(0, 0, 0, 0.1)'}} key={key}>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        {price.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Remporté par: {price.winner}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        {formatDate(price.date)}
                    </Typography>
                </Card>)}
            </div> }
        </div>
    )
}
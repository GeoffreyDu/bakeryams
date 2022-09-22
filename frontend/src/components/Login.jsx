import { useState } from "react"
import axios from 'axios'
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useNavigate } from 'react-router-dom'
import { useLogin } from "../provider/LoginProvider.jsx"
import { back_url } from '../config/index.js'

export const Login = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { isLogged, setIsLogged } = useLogin()
    const navigate = useNavigate()

    const handleChangeMail = e => {
        setMail(e.target.value)
    }
    const handleChangePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try { 
            if(isLogged){
                setError('Vous êtes déjà connecté')
                return 
            }  
            const user = {
                mail,
                password
            }
            const response =  await axios.post(`${back_url}/login`, user )
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            setIsLogged(true)
            navigate('/game')
        } catch (error) {
            setError(error.response.data.error)
            console.log(error)
        }
    }

    return (
        <div>
            { error && <Alert severity="error" style={{ display: 'flex', justifyContent: 'center' }}>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
            }
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <TextField id="mail" name="mail" label="Adresse mail" type="text" value={mail} onChange={handleChangeMail} sx={{ mb: "10px", width: 300 }}/>
                    <TextField id="password" name="password" label="Mot de passe" type="password" value={password} onChange={handleChangePassword} sx={{ mb: "10px", width: 300 }}/>
                    <Button type="submit">Connexion</Button>
                </Grid>
            </form>
        </div>
    )
}
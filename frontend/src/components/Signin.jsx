import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { back_url } from '../config/index.js'
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export const Signin = () => {
    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleChangeUsername = e => {
        setUsername(e.target.value)
    }
    const handleChangeMail = e => {
        setMail(e.target.value)
    }
    const handleChangePassword = e => {
        setPassword(e.target.value)
    }
    const handleChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("les mots de passe ne sont pas identiques")
            return
        }
        if(!/\S+@\S+\.\S+/.test(mail)){
            setError("Le mail est invalide")
            return
        }
        try {   
            const user = {
                username,
                mail,
                password,
                confirmPassword
            }
            const response =  await axios.post(`${back_url}/users`, user )
            console.log(response.data)
            if(response.data.error){
                setError(response.data.error)
                return
            }
            navigate('/login')
        } catch (error) {
            setError(error.response.data.error)
            console.log(error.error)
        }
    }

    return (
        <div>
            { error && <Alert severity="error" style={{ display: 'flex', justifyContent: 'center' }}>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
            }
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <TextField id="username" name="username" label="Pseudo" type="text" value={username} onChange={handleChangeUsername} sx={{ mb: "10px", width: 300 }}/>
                    <TextField id="mail" name="mail" label="Adresse mail" type="text" value={mail} onChange={handleChangeMail} sx={{ mb: "10px", width: 300 }}/>
                    <TextField id="password" name="password" label="Mot de passe" type="password" value={password} onChange={handleChangePassword} sx={{ mb: "10px", width: 300 }}/>
                    <TextField id="confirmPassword" name="confirmPassword" label="Confirmation du mot passe" type="password" value={confirmPassword} onChange={handleChangeConfirmPassword} sx={{ mb: "10px", width: 300 }}/>
                    <Button type="submit">Envoyer</Button>
                </Grid>
            </form>
        </div>
    )
}
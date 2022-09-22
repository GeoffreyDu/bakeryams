import { useNavigate } from 'react-router-dom'
import { useLogin } from '../provider/LoginProvider.jsx'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'

export const NavbarLogged = () => {
    const navigate = useNavigate()
    const { setIsLogged } = useLogin()

    const logout = () => {
        localStorage.clear()
        setIsLogged(false)
        navigate('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' style={{ background: 'black' }}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <NavLink to='/' style={{ textDecoration: "none" }}>
                            <IconButton>
                                <Typography style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    <HomeIcon />
                                </Typography>
                            </IconButton>
                        </NavLink>
                        <NavLink to='/game' style={{ textDecoration: "none" }}>
                            <IconButton>
                                <Typography style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    Jeu concours
                                </Typography>
                            </IconButton>
                        </NavLink>
                        <NavLink to='/prices' style={{ textDecoration: "none" }}>
                            <IconButton>
                                <Typography style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    Liste des prix
                                </Typography>
                            </IconButton>
                        </NavLink>
                    </div>
                    <Button variant="outlined" color='inherit' onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
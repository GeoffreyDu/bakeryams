import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'

export const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: 'black' }}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <NavLink to='/' style={{ textDecoration: "none" }}>
                        <IconButton>
                            <Typography style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                <HomeIcon />
                            </Typography>
                        </IconButton>
                    </NavLink>
                    <div>
                        <NavLink to='/signin' style={{ textDecoration: "none" }}>
                            <IconButton>
                                <Typography style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    Inscription
                                </Typography>
                            </IconButton>
                        </NavLink>
                        <NavLink to='/login' style={{ textDecoration: "none" }}>
                            <IconButton>
                                <Typography style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    Connexion
                                </Typography>
                            </IconButton>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
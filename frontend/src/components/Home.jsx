import { NavLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export const Home = () => {
    
    return (
        <div className='home'>
            <Typography variant="h1" sx={{pt: 5}}>Chocolatier untel</Typography>
            
            <Typography variant="h5">Chocolatiers de père en fils depuis cinq générations, nous mettons tout en oeuvre pour réaliser les meilleures créations possibles</Typography>
            <Typography variant="p" sx={{pb: 3}} className='homeInvite'>
                <span style={{ marginRight: '5px'}}>Pour nous rejoindre</span>
                <NavLink to='/signin' style={{ textDecoration: 'none' }}><Link underline="hover">Inscrivez-vous</Link></NavLink> / <NavLink to='/login' style={{ textDecoration: 'none' }}><Link underline="hover">connectez-vous</Link></NavLink>
            </Typography>
        </div>
    )
}
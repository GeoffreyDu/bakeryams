import React, { useState } from "react"
import axios from "axios"
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import Card from '@mui/joy/Card'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { back_url } from '../config/index.js'
import de1  from '../images/de1.png'
import de2 from '../images/de2.png'
import de3 from '../images/de3.png'
import de4 from '../images/de4.png'
import de5 from '../images/de5.png'
import de6 from '../images/de6.png'
import { List } from "@mui/material"

const des = [de1, de2, de3, de4, de5, de6]
export const Game = () => {
    const [hand, setHand] = useState([])
    const [end, setEnd] = useState(false)
    const [prices, setPrices] = useState([])
    const [result, setResult] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const token = localStorage.getItem('token')

    const startGame = async() => {
        try {
            const response = await axios.get(`${back_url}/game`, { headers: { Authorization: `Bearer ${token}` } })
            setEnd(response.data.end.end)
            setPrices(response.data.end.prix)
            setMessage(response.data.end.message)
            setHand(response.data.hand)
            setResult(response.data.result)  
        } catch (error) {
            console.log(error);
            setError(error.response.data.error)
        }
    }
    
    return (
        <React.Fragment>
            { error && <Alert severity="error" style={{ display: 'flex', justifyContent: 'center' }}>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
            }

            <Typography variant="h1" sx={{mt: 5}}>Concours pâtisserie</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <Typography variant="h5" sx={{mr: 2}}>Bienvenue au jeu concours, pour participer cliquez sur le bouton</Typography>
                <Button disabled={end} onClick={startGame} variant="contained" size="large">JOUER <PlayArrowIcon/></Button>
            </div>

            { !end
                ? <div>
                    <h2 className="result">{result.toLocaleUpperCase()} { result === 'perdu' ? <SentimentVeryDissatisfiedIcon style={{fill: "red"}}/>  : result !== "" && <AutoAwesomeIcon style={{fill: "green"}} />}</h2>
                    <div>
                        { des.length > 0 && hand.map((el, key) => des[el-1] ? <img className="diceImg" key={key} src={des[el-1]} alt='https://www.flaticon.com/free-icons/dice'/> :  <span>{ el }</span>) }
                    </div>
                    

                    { prices.length > 0 &&
                            <Grid container alignItems="center" justify="center" direction="column" sx={{mt: '20px'}}>
                                <Card  variant="outlined" sx={{ minWidth: '320px', maxWidth: '800px' }} style={{ backgroundColor: 'rgb(237, 247, 237)' }}>
                                        <List>
                                            <h3>{message && message}</h3>
                                            { prices.map((el, key)=>  <ListItem className='listItem' key={ key }>
                                                    <WorkspacePremiumIcon/><ListItemText style={{textAlign: 'center'}} primary={ el } />
                                                </ListItem>) 
                                            }
                                        </List>
                                </Card>
                            </Grid>
                    } 
                </div>
                : <p>Concours terminé</p>
            }
        </React.Fragment>
    )
}
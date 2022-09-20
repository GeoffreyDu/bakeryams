import React, { useState } from "react"
import axios from "axios"
import { back_url } from '../config/index.js'
import de1  from '../images/de1.png'
import de2 from '../images/de2.png'
import de3 from '../images/de3.png'
import de4 from '../images/de4.png'
import de5 from '../images/de5.png'
import de6 from '../images/de6.png'

const des = [de1, de2, de3, de4, de5, de6]
export const Game = () => {
    const [hand, setHand] = useState([])
    const [end, setEnd] = useState()
    const [prices, setPrices] = useState([])
    const [result, setResult] = useState('')

    const startGame = async() => {
        const response = await axios.get(`${back_url}/game`)
        setEnd(response.data.end.end)
        setPrices(response.data.end.prix)
        setHand(response.data.hand)
        setResult(response.data.result)
    }

    const date = prices [0]
    const restPrices = prices.slice(1)
    return (
        <React.Fragment>
            <h1>Concours pâtisserie</h1>
            <p>Bienvenue au jeu concours, pour participer cliquez sur le bouton</p>
            <button disabled={end} onClick={startGame}>JOUER</button>
            { !end
                ? <div>
                    <h2>{result}</h2>
                    <div>
                        { des.length > 0 && hand.map((el, key) => des[el-1] ? <img key={key} src={des[el-1]} alt='https://www.flaticon.com/free-icons/dice'/> :  <span>{ el }</span>) }
                    </div>
                    
                    { date && <p>Date: { date }</p> }
                        { prices.length > 1 &&
                            <ul>
                                <p>Vous avez gagné: </p>
                                {restPrices.map((el, key)=>  <li key={ key }>{ el }</li>)}
                            </ul> 
                        }
                    
                </div>
                : <p>Partie terminée</p>
            }
        </React.Fragment>
    )
}
import { useState, useContext } from 'react'
import { LoginContext } from '../context/context.js'


export const LoginProvider = ({ children }) => {
    const token = localStorage.getItem('token')
    const [isLogged, setIsLogged] = useState(token)

    return (
        <LoginContext.Provider value={{ isLogged, setIsLogged }}>
            { children }
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)
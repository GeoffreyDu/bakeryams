import { useLogin } from "../provider/LoginProvider.jsx"
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
    const { isLogged } = useLogin()
    
    if (!isLogged) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}
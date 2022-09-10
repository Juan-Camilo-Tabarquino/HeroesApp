import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { authContext } from "../auth"

export const PublicRoute = ({ children }) => {
  
    const { logged } = useContext( authContext )

    return (!logged) ? children : <Navigate to ="/marvel" />

}

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <h2 className='text-3xl'>Loading...</h2>
    }
    if(user){
        return children;
    }
    return <Navigate state={{from:location}} replace></Navigate>
};

export default PrivateRoute;
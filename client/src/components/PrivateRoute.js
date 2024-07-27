import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();

    if (authUser) {
        return <Outlet /> //Will direct to one of the nested Routes inside PrivateRoute. See App component.
    } else {
        return <Navigate to="/signin" state={{from: location.pathname}}/>

    }
}

export default PrivateRoute;
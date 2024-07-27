import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const UserSignOut = () => {
    const { actions } = useContext(UserContext);

    useEffect(() => actions.signOut()); //useEffect takes in a function to run
    return <Navigate to='/' replace /> //replaces signout route with root in history stack to prevent a loop with pressing back button
}

export default UserSignOut
import { Link } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Nav = () => {
  const { authUser } = useContext(UserContext);
  return (
    <nav>
      {authUser === null ?
        <>
          <Link className="signup" to="/signup">Sign up</Link>
          <Link className="signin" to="/signin">Sign in</Link>
        </>
        :
        <>
          <span>Welcome {authUser.name}</span>
          <Link className="settings" to="/settings">Settings</Link>
          <Link className="signout" to="/signout">Sign Out</Link>
        </>

      }


    </nav>
  );
}

export default Nav;
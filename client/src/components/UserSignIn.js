import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';


const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const { accentColor } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    let navFrom = "/authenticated";
    if (location.state) {
      navFrom = location.state.from
    }

    const credentials = {
      username: username.current.value,
      password: password.current.value
    }


    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(navFrom);
      } else {
        setErrors(["Sign-in was unsuccessful"])
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate ("/");

  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign in</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              ref={username}
              placeholder="User Name" />
            <input
              id="password"
              name="password"
              type="password"
              ref={password}
              placeholder="Password" />
            <div className="pad-bottom">
              <button className="button" type="submit" style={{ background: accentColor }}>Sign in</button>
              <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>
          Don't have a user account? <Link style={{ color: accentColor }} to="/signup">Click here</Link> to sign up!
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";


const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser")
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

//TO DO: Currently the app maintains the settings of the previous user even when a new user signs in. Make it so that each individual users settings are saved?


  const signIn = async (credentials) => {

    const response = await api('/users', 'GET', null, credentials);
      if (response.status === 200) {
        const user = await response.json();
        setAuthUser(user);
        Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1} );
        return user
      } else if (response.status === 401) {
        return null
      } else {
        throw new Error();
      }

  }

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
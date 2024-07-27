import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
  const cookie = Cookies.get("defaultTheme");
  const defaultTheme = cookie ? JSON.parse(cookie) : {
    isDarkMode: false,
    accentColor: '#63537d',
    fontPercentage: 100
  }
  const [isDarkMode, setIsDarkMode] = useState(defaultTheme.isDarkMode);
  const [accentColor, setAccentColor] = useState(defaultTheme.accentColor);
  const [fontPercentage, setFontPercentage] = useState(defaultTheme.fontPercentage);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    document.body.style.fontSize = `${fontPercentage}%`;

    const theme = { //create an object that records the themes saved in state
      isDarkMode, //: isDarkMode, don't need to repeat since they are the key/value pair have same name
      accentColor,
      fontPercentage
    }
    Cookies.set("defaultTheme", JSON.stringify(theme)); // this will update with each re-render, instead of creating a new cookie each time

  }, [isDarkMode, fontPercentage, accentColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(currentMode => !currentMode);
  }

  return (
    <ThemeContext.Provider value={{
      accentColor,
      isDarkMode,
      fontPercentage,
      actions: {
        toggleDarkMode,
        updateAccentColor: setAccentColor,
        updateFontPercentage: setFontPercentage
      }
    }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
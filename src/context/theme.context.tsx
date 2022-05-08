import { IS_SERVER } from 'constant';
import React, { useEffect, useState } from 'react';

interface IThemeContext {
   darkMode: boolean;
   toggleChangeTheme: () => void;
}

const ThemeCtx = React.createContext<IThemeContext | null>(null);

const getTheme = () => {
   if (!IS_SERVER) {
      const theme = localStorage.getItem('theme');
      if (theme) {
         return theme === 'dark' ? true : false;
      }
      return false;
   }
   return false;
};

const initValue: IThemeContext = {
   darkMode: getTheme(),
   toggleChangeTheme: () => {},
};

export const useTheme = () => React.useContext(ThemeCtx);

const ThemeProvider: React.FC<{
   children?: React.ReactNode;
}> = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState<boolean>(initValue.darkMode);

   const toggleChangeTheme = () => {
      setIsDarkMode(!isDarkMode);
   };

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.setAttribute('data-theme', 'dark');
         localStorage.setItem('theme', 'dark');
      } else {
         document.documentElement.setAttribute('data-theme', 'light');
         localStorage.setItem('theme', 'light');
      }
   }, [isDarkMode]);

   return (
      <ThemeCtx.Provider
         value={{
            darkMode: isDarkMode,
            toggleChangeTheme,
         }}
      >
         {children}
      </ThemeCtx.Provider>
   );
};

export default ThemeProvider;

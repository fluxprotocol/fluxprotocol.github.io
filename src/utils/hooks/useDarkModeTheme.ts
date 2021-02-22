import React, { useEffect, useState } from 'react';

const DEFAULT_THEME = 'light';

export const themeContext = React.createContext({
    toggleTheme: () => {},
    theme: DEFAULT_THEME,
});

function setModeOnRoot(mode: string) {
    document.documentElement.setAttribute('data-theme', mode);
}

export const useDarkMode = () => {
    const [theme, setTheme] = useState<string>(DEFAULT_THEME);

    const setMode = (mode: 'light' | 'dark') => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
        setModeOnRoot(mode);
    };

    const toggleTheme = () => {
        theme === 'light' ? setMode('dark') : setMode('light');
    };

    // on load get theme from localstorage and set it
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');

        if (localTheme) {
            setTheme(localTheme);
            setModeOnRoot(localTheme);
        }
    }, []);

    return [theme, toggleTheme]
};


export const useDarkModeThemeContext = () => {
    const context = React.useContext(themeContext);

    return context;
};

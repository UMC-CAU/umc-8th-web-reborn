import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { THEME } from './themeConstants';

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContextState {
    theme: TTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextState | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): React.ReactElement => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = (): void => {
        setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = (): IThemeContextState => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

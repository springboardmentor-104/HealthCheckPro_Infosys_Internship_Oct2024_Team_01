import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useCustomTheme must be used within a ThemeProvider');
    }
    return context;
};

export default useCustomTheme;
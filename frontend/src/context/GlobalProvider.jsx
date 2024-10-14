import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// Create a context
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    );

    useEffect(() => {
        user && setUser(JSON.parse(localStorage.getItem('user')));
    }
        , []);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalProvider;
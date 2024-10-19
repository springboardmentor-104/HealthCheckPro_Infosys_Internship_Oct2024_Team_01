// Desc: Global context provider for user state and any other state that needs to be shared across the application

import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    // Add states and functions to be shared across the application
    // Import via useGlobalState hook in hooks folder

    // Usage: Gets the user from localStorage if it exists
    // If not, user is null

    const [user, setUser] = useState(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    );

    useEffect(() => {
        console.log('=== user GlobalProvider.jsx [21] ===', user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    , [user]);


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
// Desc: Custom hook to use the global state
// Don't forget to import this hook in the components where you want to use the global state
// And don't change this file unless you know what you are doing

import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";


const useGlobalState = () =>{
    const context = useContext(GlobalContext);
    if(context === undefined){
        throw new Error('useGlobalState must be used within a GlobalProvider');
    }
    return context;
}

export default useGlobalState;
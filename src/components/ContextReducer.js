import React, { createContext,useContext,useReducer } from 'react'

const cartStateContext= createContext();
const cartDispatchContext= createContext();

const reducer = (state, action) => {

}
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {cart: []});
    return (
        
            <cartDispatchContext.Provider value={dispatch}>
                <cartStateContext.Provider value={state}>
                {children}
                </cartStateContext.Provider>
            </cartDispatchContext.Provider>
            
        
    )
}

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);


import React, { createContext,useContext,useReducer } from 'react'

const cartStateContext= createContext();
const cartDispatchContext= createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state,{id:action.id,foodName:action.foodName,qty:action.qty,size:action.size,price:action.price}];
    
        default:
            console.log("Invalid Action , Error in Reducer");
            break;
    }
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


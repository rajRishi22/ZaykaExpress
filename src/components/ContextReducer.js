import React, { createContext, useContext, useReducer } from 'react';
// useContext is a hook that manages the global state - It solves the problem of prop drilling 
// useReducer is a hook that manages the state and actions in a single function
// createContext is a function that creates a context to be used in the application
// useContext is a hook that returns the current context value for the context
// useReducer is used for managing a lot of state values in a single function - state and action value hota hai isme
const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    id: action.payload.id,
                    foodName: action.payload.foodName,
                    qty: action.payload.qty,
                    size: action.payload.size,
                    price: action.payload.price,
                },
            ];
        case "REMOVE":
            let newArr=[...state]
            newArr.splice(action.index,1)
            return newArr;
        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    console.log(food.qty,parseInt(action.qty),action.price+food.price)
                    arr[index]={...food,qty:parseInt(action.qty)+parseInt(food.qty),price:action.price+food.price}
                }
                return arr;
            })
            return arr;
        case "DROP":
            let empArray=[]
            return empArray;

        default:
            console.log('Invalid Action, Error in Reducer');
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);

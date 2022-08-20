import { createContext, useReducer } from 'react'
export const CartContext = createContext()

const initialState = []

const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {

        case "ADD_CART_SUCCESS":
            return {
              cart: payload,
            };
        case "DELETE_CART":
          const data = action.payload
          const id = state.findIndex(object => {
            return object.id === data
          })
          state.splice(id, 1)
      default:
        throw new Error();
    }
  };

  export const CartContextProvider = ({ children }) => {
    const [payload, act] = useReducer(reducer, initialState);

    return (
    <CartContext.Provider value={[payload, act]}>
        {children}
    </CartContext.Provider>
    );
};
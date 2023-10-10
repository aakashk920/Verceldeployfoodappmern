import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        // Check if the item already exists in the cart
        const existingItem = state.find((item) => item.id === action.id);
  
        if (existingItem) {
          // If it exists, update the quantity
          return state.map((item) =>
            item.id === action.id
              ? {
                  ...item,
                  qty: item.qty + action.qty, // Increase quantity
                  price: item.price + action.price, // Update price
                }
              : item
          );
        } else {
          // If it doesn't exist, add it to the cart
          return [
            ...state,
            {
              id: action.id,
              qty: action.qty,
              size: action.size,
              price: action.price,
              img: action.img,
              name: action.name,
            },
          ];
        }
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...state];
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    arr[index] = { ...food, qty: parseFloat(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
            case "DROP":
            let empArray=[]
            return empArray
        default:
            console.log("Error in Reducer");
    }
}


export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/checkoutReducer";

const CheckoutContext = createContext();

const getLocalCheckoutData = () => {
  let localCartData = localStorage.getItem("manishCart");
  if (!localCartData || JSON.parse(localCartData).length === 0) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  checkout: getLocalCheckoutData(),
};

const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkoutHandler = (id, total_price) => {
    dispatch({
      type: "CHECKOUT_PAGE_HANDLER",
      payload: { id, total_price },
    });
    // console.log("idr", id)
  };


  useEffect(() => {
    localStorage.setItem("manishCart", JSON.stringify(state.checkout));
  }, [state.checkout])

  return (
    <CheckoutContext.Provider value={{ ...state, checkoutHandler }}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export { CheckoutProvider, useCheckoutContext };

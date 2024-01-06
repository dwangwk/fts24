// Create a context file (e.g., contexts/AppContext.js)

import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  mintFormData: {
    recipientAddress: '',
    amount: '',
  },
  transferFormData: {
    recipientAddress: '',
    amount: '',
    src_token: '',
    destchain: "16015286601757825753", // Defaults to Sepolia testnet
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'RESET_FORM_DATA':
      return initialState;
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/data/products';

export type Language = 'en' | 'am' | 'or';

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  language: Language;
  sidebarOpen: boolean;
  cart: CartItem[];
  user: any;
  searchQuery: string;
  selectedCategory: string;
}

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_USER'; payload: any }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  language: 'en',
  sidebarOpen: false,
  cart: [],
  user: null,
  searchQuery: '',
  selectedCategory: ''
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });

  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch, 
      toggleSidebar, 
      sidebarOpen: state.sidebarOpen 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
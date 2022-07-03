import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { Coordinates } from "../hooks/useTrackLocation";

interface CoffeeStoresContextTypes {
  coordinates: Coordinates | null;
  coffeeStores: any[];
  dispatch: Dispatch<any>;
}

const coffeeStoresContextInit: CoffeeStoresContextTypes = {
  coordinates: null,
  coffeeStores: [],
  dispatch: (value) => {},
};

export const CoffeeStoresContext = createContext(coffeeStoresContextInit);

interface CoffeeStoresContextProviderProps {
  children: ReactElement;
}

type CoffeeStoresContextActions =
  | { type: "SET_POSITION"; payload: Coordinates }
  | { type: "SET_CS"; payload: any[] };

const coffeeStoresContextReducer = (
  state: CoffeeStoresContextTypes,
  action: CoffeeStoresContextActions
) => {
  switch (action.type) {
    case "SET_POSITION":
      return { ...state, coordinates: action.payload };
    case "SET_CS":
      return { ...state, coffeeStores: action.payload };
    default:
      return state;
  }
};

const CoffeeStoresContextProvider: FC<CoffeeStoresContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [{ coordinates, coffeeStores }, dispatch] = useReducer(
    coffeeStoresContextReducer,
    coffeeStoresContextInit
  );

  return (
    <CoffeeStoresContext.Provider
      value={{ coordinates, coffeeStores, dispatch }}
    >
      {children}
    </CoffeeStoresContext.Provider>
  );
};

export default CoffeeStoresContextProvider;

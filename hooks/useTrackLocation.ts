import { useContext, useEffect, useState } from "react";
import { TSFunctionType } from "@typescript-eslint/types/dist/generated/ast-spec";
import { CoffeeStoresContext } from "../context";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const useTrackLocation = (): [
  null | string,
  boolean,
  Function,
  Function
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [location, setLocation] = useState<Coordinates | null>(null);
  const { dispatch } = useContext(CoffeeStoresContext);

  const resetError = () => {
    setError(null);
  };

  const getPosition = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError("Your browser doesn't support Geolocation");
      setIsLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setLocation({
          //   longitude: position.coords.longitude,
          //   latitude: position.coords.latitude,
          // });

          dispatch({
            type: "SET_POSITION",
            payload: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          });
          setError(null);
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    }
  };

  return [error, isLoading, getPosition, resetError];
};

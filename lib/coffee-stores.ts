import { createApi } from "unsplash-js";
import { Coordinates } from "../hooks/useTrackLocation";

const getURL = (ll: Coordinates, query: string, limit: number): string => {
  return `${process.env.NEXT_PUBLIC_FQ_API_HOST}?query=${query}&ll=${ll.latitude}%2C${ll.longitude}&radius=5000&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  coords: Coordinates = { latitude: 43.703762, longitude: -79.39592 },
  limit: number = 8
) => {
  const url = getURL(coords, "coffee shop", limit);
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FQ_API_KEY!,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  const photos = await getUnsplashPlacePhotos();

  return (data.results as any[]).map((item, inx) => ({
    name: item.name,
    neighborhood:
      item.location.neighborhood[0] || item.location.crossStreet || "",
    address: item.location.address || "",
    imgUrl: photos![inx],
    id: item.fsq_id,
  }));
};

export const fetchPlacePhoto = async (id: string) => {
  const url = `https://api.foursquare.com/v3/places/${id}/photos?limit=1`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FQ_API_KEY!,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data && data.length > 0) {
    return `${data[0].prefix}${data[0].suffix}`;
  } else {
    return "";
  }
};

export const getUnsplashPlacePhotos = async () => {
  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  });

  const photos = await unsplash.search.getPhotos({
    query: "coffee shops",
    page: 1,
    perPage: 10,
  });

  return photos.response?.results.map((photo) => photo.urls.small);
};

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { Coordinates } from "../../hooks/useTrackLocation";

type Data = any;

interface GetCoffeeStoresByLocationRequest {
  position: Coordinates;
  limit: number;
}

const GetCoffeeStoresByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { latLong, limit } = req.query;

  try {
    const position: Coordinates = {
      latitude: +(latLong as String).split(",")[0],
      longitude: +(latLong as String).split(",")[1],
    };
    const coffeeShops = await fetchCoffeeStores(position, +limit);
    res.status(200);
    res.json(coffeeShops);
  } catch (e) {
    res.status(500);
    res.json({ message: "Something went wrong..." });
  }
};

export default GetCoffeeStoresByLocation;

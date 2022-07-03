import {
  findRecordsByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";

const getCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      if (id) {
        const records = await findRecordsByFilter(`${id}`);
        if (records.length > 0) {
          res.status(200);
          res.json(records);
        } else {
          res.json({ message: "Nothing be found..." });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing..." });
      }
    } catch (e) {
      res.status(500);
      res.json({
        message: `Error of finding a store ${(e as Error).message}`,
      });
    }
  } else {
    res.status(200);
    res.json({ message: "not GET method" });
  }
};

export default getCoffeeStoreById;

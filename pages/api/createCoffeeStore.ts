import {
  findRecordsByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    try {
      if (body.id) {
        const records = await findRecordsByFilter(`${body.id}`);
        if (records.length > 0) {
          res.status(200);
          res.json({ records });
        } else {
          if (body.name) {
            const createRecords = await table.create([
              {
                fields: {
                  ...body,
                },
              },
            ]);
            const createdRecords = getMinifiedRecords(createRecords);
            res.status(200);
            res.json({ message: "Records have been created!", createdRecords });
          } else {
            res.status(400);
            res.json({ message: "Name is missing..." });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing..." });
      }
    } catch (e) {
      res.status(500);
      res.json({
        message: `Error creating or finding a store ${(e as Error).message}`,
      });
    }
  } else {
    res.status(200);
    res.json({ message: "not POST method" });
  }
};

export default createCoffeeStore;

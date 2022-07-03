import {
  findRecordsByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";

const favouriteCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const records = await findRecordsByFilter(`${id}`);
        if (records.length > 0) {
          const calculateVoting = !records[0].voting
            ? 0
            : records[0].voting + 1;

          const updateRecord = await table.update([
            {
              id: records[0].recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);
          res.status(200);
          res.json(getMinifiedRecords(updateRecord));
        } else {
          res.status(400);
          res.json({ message: "This Coffee Store doesn't exist..." });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing..." });
      }
    } catch (e) {
      res.status(500);
      res.json({
        message: `Error upvoting a Coffee store ${(e as Error).message}`,
      });
    }
  } else {
    res.status(400);
    res.json({ message: "not PUT method" });
  }
};

export default favouriteCoffeeStoreById;

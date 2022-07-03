import Airtable, { FieldSet, Records } from "airtable";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!);

const table = base("coffee shops");

export interface StoreRecord {
  recordId: string;
  neighborhood: string;
  address: string;
  voting: number;
  imgUrl: string;
  id: string;
  name: string;
}

const getMinifiedRecords = (records: Records<FieldSet>): StoreRecord[] =>
  records.map((record: any) => ({
    recordId: record.id,
    ...record.fields,
  }));

const findRecordsByFilter = async (id: string) => {
  const records = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();
  if (records.length > 0) {
    return getMinifiedRecords(records);
  } else return [];
};

export { table, getMinifiedRecords, findRecordsByFilter };

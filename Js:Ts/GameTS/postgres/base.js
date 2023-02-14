import fs from "fs";

export const runner = (sqlFileName) => {
  const sql = fs.createReadStream(`./migrations/${sqlFileName}.sql`);
   
}
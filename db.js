import 'dotenv/config'
import postgres from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  prepare: false
});


// async function getPgVersion() {
//   const result = await sql`select version()`;
//   console.log(result[0]);
// }

// getPgVersion();

// const {DATABASE_URL} = process.env;

// export const sql = postgres(DATABASE_URL)

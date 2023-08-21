import sql from '../db.js';
import fs from 'fs';
import { promisify } from 'util';
import Papa from 'papaparse';

const readFileAsync = promisify(fs.readFile);


export async function get() {
  const procedureMappings = await sql`
    select * 
    from procedure_mapping
  `;
  return procedureMappings;
}

export async function runSync() {
  const procedureMappings = (await readFileAsync('src/procedureMappings/SRBE Exercise - Procedure Mapping - Sheet1.csv')).toString();
  const { data: procedureMappingsData } = Papa.parse(procedureMappings, { skipEmptyLines: true });
  await sync(procedureMappingsData);
}

export async function sync(procedureMappings = []) {
  procedureMappings.shift(); // remove header
  try {

    console.log('Syncing procedure_mappings . . .');

    // WORK HERE

  } catch(err) {
      console.log(err);
      throw err;
  }
}

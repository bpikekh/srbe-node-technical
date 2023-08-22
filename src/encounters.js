import sql from './db.js';


export async function getEncountersByProcedureIdentifier({ procedure_identifier }) {
  if (!procedure_identifier) throw Error('Invalid params: Missing procedure_identifier');

  const [procedure_mapping] = await sql`select cpts, icd_10_partials from procedure_mapping where identifier = ${procedure_identifier}`;
  if (!procedure_mapping) throw Error(`Invalid params: No procedure_mapping matching identifier: "${procedure_identifier}" exists`);

  const { cpts, icd_10_partials } = procedure_mapping;
  if (!Array.isArray(cpts) || !Array.isArray(icd_10_partials) || cpts.length === 0 || icd_10_partials.length === 0) {
    throw Error('Malformed procedure_mapping - All codes should be a populated array');
  }

  return sql.unsafe(`
    select * from encounter
    where (
      ${procedure_mapping.cpts.length > 0 ? `cpt_primary in (${procedure_mapping.cpts.map(code => `'${code}'`).join(', ')})` : ''}
      ${procedure_mapping.cpts.length > 0 && procedure_mapping.icd_10_partials.length > 0 ? ' OR ' : ''}
      ${procedure_mapping.icd_10_partials.map(partial => `substring(icd_10_primary from 1 for ${partial.length}) = '${partial}'`).join(' OR ')}
    )
  `);
}

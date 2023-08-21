const { createDb, migrate } = require('postgres-migrations');
const runCSVSync = require('./runtimeSync.cjs');

const { PGPORT, PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;


async function init() {
  setTimeout(async () => {
    const config = {
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      port: parseInt(PGPORT)
    };
    await createDb(PGDATABASE, { ...config, defaultDatabase: 'postgres' });
    await migrate(config, 'migrations/sqls');
    await runCSVSync();
    process.exit(0);
  }, 100);
}

init();
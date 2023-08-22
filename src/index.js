import express from 'express';
import asyncHandler from 'express-async-handler';
import * as procedureMappings from './procedureMappings/procedureMappings.js';
import { getEncountersByProcedureIdentifier } from './encounters.js';

const { NODE_ENV, PORT } = process.env;

const app = express();
app.use(express.json());



// Exercise endpoint
// Syncs database with procedure mapping csv
app.post('/sync-procedure-mappings', asyncHandler(async (req, res) => {
  const data = await procedureMappings.runSync();
  res.send(data);
}));

// Testing endpoint
// Use this to test if the procedure_mapping table is properly synced
app.get('/procedure-mappings', asyncHandler(async (req, res) => {
  const data = await procedureMappings.get();
  res.send(data);
}));

// Testing endpoint 2
// Use this to test our ability to query by procedure identifier
app.get('/encounters', asyncHandler(async (req, res) => {
  const data = await getEncountersByProcedureIdentifier(req.query);
  res.send(data);
}));

// Error Handler
app.use((e, req, res, next) => {
  console.error(e);
  res.status(e.status || 500).send(e.message);
});

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server Runnin'`, NODE_ENV === 'development' ? `at localhost:${PORT}` : '');
});

export default app;

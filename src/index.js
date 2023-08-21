import express from 'express';
import asyncHandler from 'express-async-handler';
import * as procedureMappings from './procedureMappings/procedureMappings.js';

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
// Use this to test the outcome
app.get('/procedure-mappings', asyncHandler(async (req, res) => {
  const data = await procedureMappings.get();
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

module.exports = async function () {
  const syncProcedureMappings = (await import('../src/procedureMappings/procedureMappings.js')).runSync;
  await syncProcedureMappings();
}

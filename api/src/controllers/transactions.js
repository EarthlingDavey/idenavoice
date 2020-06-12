async function getSyncedUpTo(session) {
  try {
    const result = await session.run(
      `
      MATCH (m:Meta { key: 'syncedUpTo' })
      RETURN m { .value } AS m`,
      {}
    );

    const singleRecord = result.records[0];
    if (!singleRecord) {
      return false;
    }
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getSyncedUpTo,
};

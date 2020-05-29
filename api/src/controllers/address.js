async function createUpdateUser(session, tx) {
  try {
    const result = await session.run(
      `
      MERGE (u:User { address: $address })
      ON CREATE SET  u.address = $address
      ON MATCH SET  u.address = $address
      RETURN u { .address } AS u`,
      {
        address: tx.from,
      }
    );

    const singleRecord = result.records[0];
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  createUpdateUser,
};

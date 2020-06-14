async function getTagAction(session, tagId, address, name) {
  try {
    const result = await session.run(
      `
      MATCH (t:Tag { id: $tagId })
      MATCH (u:User {address: $address})
      MATCH (t)<-[r:ACTION_ON_TAG]-(a:Action { name: $name } )-[r2:USER_ACTION]->(u)
      RETURN a { .name, .quantity } AS a`,
      { tagId: tagId, address, name }
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

async function creatUpdateTagAction(session, tagId, address, name, quantity) {
  console.log({ tagId, address, name, quantity });
  try {
    const result = await session.run(
      `
      MATCH (t:Tag { id: $tagId }), (u:User {address: $address})
      MERGE (t)<-[r:ACTION_ON_TAG]-(a:Action { name: $name, quantity: $quantity })-[r2:USER_ACTION]->(u)
      RETURN a { .name, .quantity } AS a`,
      { tagId: tagId, address, name, quantity }
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
  getTagAction,
  creatUpdateTagAction,
};

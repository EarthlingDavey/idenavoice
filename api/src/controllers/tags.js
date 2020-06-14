async function createTagWithUser(session, tag, address) {
  try {
    const result = await session.run(
      `
      MATCH (user:User {address: $address})
      CREATE (tag:Tag { name: $tagName, id : apoc.create.uuid() })-[r:USER_TAG]->(user)
      RETURN tag { .name, .id } AS tag`,
      { tagName: tag.name, address }
    );

    const singleRecord = result.records[0];
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getTagByName(session, tagName) {
  try {
    const result = await session.run(
      `
      MATCH (tag:Tag { name: $tagName })
      RETURN tag { .name, .id } AS tag`,
      { tagName: tagName }
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
async function getTagByIdAndUser(session, tagId, address) {
  try {
    const result = await session.run(
      `
      MATCH (tag:Tag { id: $tagId })-[r:USER_TAG]->(user:User {address: $address})
      RETURN tag { .name, .id } AS tag`,
      { tagId: tagId, address }
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
  getTagByName,
  getTagByIdAndUser,
  createTagWithUser,
};

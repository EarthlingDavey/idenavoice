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

async function tagAndQuestionExists(session, tagId, questionId) {
  try {
    const result = await session.run(
      `
      MATCH (tag:Tag {id: $tagId})<-[r:TAG_FOR_QUESTION]-(question:Question {id: $questionId})
      RETURN tag { .name, .id } AS tag`,
      { tagId, questionId }
    );

    if (!result.records[0]) {
      return false;
    } else {
      return true;
    }
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
async function tagsToRecount(dbActions, dbRemovedActions) {
  // array fo tags that have been maybeEdited

  //Find values that are in result1 but not in result2
  var diff1 = dbActions.filter(function (obj) {
    return !dbRemovedActions.some(function (obj2) {
      return obj.tagId == obj2.tagId && obj.qty == obj2.qty;
    });
  });

  //Find tagIds that are in result2 but not in result1
  var diff2 = dbRemovedActions.filter(function (obj) {
    return !dbActions.some(function (obj2) {
      return obj.tagId == obj2.tagId && obj.qty == obj2.qty;
    });
  });

  //Combine the two arrays of unique entries
  var diff = diff1.concat(diff2);

  const tags = diff.filter(function ({ tagId }) {
    return !this[tagId] && (this[tagId] = tagId);
  }, {});

  return tags;
}
async function updateTagCount(session, tagId) {
  console.log('tagId', tagId);

  try {
    const result = await session.run(
      `
      MATCH (t:Tag)<-[r:ACTION_ON_TAG]-(a:Action)
      WHERE t.id = $tagId AND NOT (a)-[:ACTION_ON_QUESTION]-()
      // RETURN sum(a.qty)
      WITH t, sum(a.qty) AS qtySum

      SET t.voteCountCache = qtySum

      WITH count(*) as dummy 

      MATCH (t2:Tag)
      WHERE t2.id = $tagId AND NOT (t2)<-[:ACTION_ON_TAG]-()
      SET t2.voteCountCache = 0

      RETURN t2
      `,
      { tagId: tagId }
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
  tagAndQuestionExists,
  getTagByIdAndUser,
  createTagWithUser,
  tagsToRecount,
  updateTagCount,
};
